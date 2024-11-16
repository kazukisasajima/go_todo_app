package handlers

import (
    "backend/models"
    "context"
    "encoding/json"
    "net/http"
    "strconv"
    "strings"

    "github.com/jackc/pgx/v4"
)

func AddTodoHandler(conn *pgx.Conn) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        var todo models.Todo
        if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
            http.Error(w, "Invalid request payload", http.StatusBadRequest)
            return
        }

        err := conn.QueryRow(context.Background(), `
            INSERT INTO todos (title, description, completed) VALUES ($1, $2, $3)
            RETURNING id
        `, todo.Title, todo.Description, todo.Completed).Scan(&todo.ID)
        if err != nil {
            http.Error(w, "Failed to insert todo", http.StatusInternalServerError)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(todo)
    }
}

func TodoHandler(conn *pgx.Conn) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        rows, err := conn.Query(context.Background(), `
            SELECT id, title, description, completed FROM todos
        `)
        if err != nil {
            http.Error(w, "Failed to retrieve todos", http.StatusInternalServerError)
            return
        }
        defer rows.Close()

        var todos []models.Todo
        for rows.Next() {
            var todo models.Todo
            if err := rows.Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Completed); err != nil {
                http.Error(w, "Failed to scan todo", http.StatusInternalServerError)
                return
            }
            todos = append(todos, todo)
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(todos)
    }
}

func UpdateTodoHandler(conn *pgx.Conn) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        pathParts := strings.Split(strings.Trim(r.URL.Path, "/"), "/")
        id, err := strconv.Atoi(pathParts[len(pathParts)-1])
        if err != nil {
            http.Error(w, "Invalid ID format", http.StatusBadRequest)
            return
        }

        var todo models.Todo
        if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
            http.Error(w, "Invalid request payload", http.StatusBadRequest)
            return
        }

        err = conn.QueryRow(context.Background(), `
            UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4
            RETURNING id, title, description, completed
        `, todo.Title, todo.Description, todo.Completed, id).Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Completed)
        if err != nil {
            http.Error(w, "Failed to update todo", http.StatusInternalServerError)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(todo)
    }
}

func DeleteTodoHandler(conn *pgx.Conn) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        pathParts := strings.Split(strings.Trim(r.URL.Path, "/"), "/")
        id, err := strconv.Atoi(pathParts[len(pathParts)-1])
        if err != nil {
            http.Error(w, "Invalid ID format", http.StatusBadRequest)
            return
        }

        cmd, err := conn.Exec(context.Background(), `
            DELETE FROM todos WHERE id = $1
        `, id)
        if err != nil {
            http.Error(w, "Failed to delete todo", http.StatusInternalServerError)
            return
        }

        if cmd.RowsAffected() == 0 {
            http.Error(w, "Todo not found", http.StatusNotFound)
            return
        }

        w.WriteHeader(http.StatusNoContent)
    }
}
