package db

import (
    "context"
    "fmt"
    "github.com/jackc/pgx/v4"
    "log"
    "os"
)

func GetDBConnection() *pgx.Conn {
    dbUser := os.Getenv("POSTGRES_USER")
    if dbUser == "" {
        dbUser = "todo"
    }
    dbPassword := os.Getenv("POSTGRES_PASSWORD")
    if dbPassword == "" {
        dbPassword = "todopp"
    }
    dbName := os.Getenv("POSTGRES_DB")
    if dbName == "" {
        dbName = "tododb"
    }
    dbHost := "postgres_db"

    connStr := fmt.Sprintf("postgres://%s:%s@%s:5432/%s", dbUser, dbPassword, dbHost, dbName)

    conn, err := pgx.Connect(context.Background(), connStr)
    if err != nil {
        log.Fatalf("Unable to connect to database: %v\n", err)
    }

    return conn
}
