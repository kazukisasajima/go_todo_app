package main

import (
	"backend/db"
	"backend/handlers"
	"backend/middleware"
	"context"
	"log"
	"net/http"
)

func main() {
    // データベース接続を取得
    conn := db.GetDBConnection()
    defer conn.Close(context.Background())

    // 必要なテーブルが存在しない場合は作成
    err := db.SetupDatabase(conn)
    if err != nil {
        log.Fatalf("Failed to set up database: %v\n", err)
    }

    // エンドポイントのハンドラを登録
    http.Handle("/add_todo", middleware.EnableCORS(handlers.AddTodoHandler(conn)))
    http.Handle("/todos", middleware.EnableCORS(http.HandlerFunc(handlers.TodoHandler(conn))))
    http.Handle("/update_todos/", middleware.EnableCORS(http.HandlerFunc(handlers.UpdateTodoHandler(conn))))
    http.Handle("/delete_todos/", middleware.EnableCORS(http.HandlerFunc(handlers.DeleteTodoHandler(conn))))

    // サーバー起動
    log.Println("Server started on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
