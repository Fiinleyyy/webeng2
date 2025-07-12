# Dockerfile
FROM node:slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Baue mit HTTPS config (optional auch per ARG umschaltbar)
ARG CONFIG=vite.config.https.js
RUN npm run build -- --config $CONFIG

EXPOSE 5173
EXPOSE 5174

CMD ["node", "-e", "require('child_process').spawn('vite', ['preview', '--host'], { stdio: 'inherit' })"]
