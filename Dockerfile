from node:18
workdir /app
copy package*.json .
run npm i
copy . .
run npm run build
run chmod +x src/scripts/entrypoint.sh
entrypoint src/scripts/entrypoint.sh
