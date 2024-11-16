# ベースイメージ
FROM golang:1.20-alpine

# 作業ディレクトリを設定
WORKDIR /app

# go.modとgo.sumをコピーして依存関係をダウンロード
# COPY go.mod go.sum ./
# RUN go mod download

# アプリケーションファイルをコピー
COPY . .

# コンパイル
# RUN go build -o main .

# ポートを公開
EXPOSE 8080

# サーバーを起動
CMD ["go", "run", "main.go"]
