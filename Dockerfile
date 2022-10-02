from node:18
workdir /app
copy package*.json .
run npm i
copy . .
entrypoint sleep 5 && npm run dev:2
