package db

import (
    "context"
    "github.com/jackc/pgx/v4"
    "log"
)

// 必要なテーブルが存在しない場合は作成
func SetupDatabase(conn *pgx.Conn) error {
    _, err := conn.Exec(context.Background(), `
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
    if err != nil {
        log.Printf("Failed to create tables: %v\n", err)
        return err
    }

    return nil
}
