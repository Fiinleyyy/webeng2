FROM node:slim
# Set the working directory of the PWA in the container
WORKDIR /app
# Install dependencies “ci equals install”, note that package.json and
# package-lock.json are copied to make better use of the build cache.
COPY package*.json ./
RUN npm ci
# Copy source code
COPY . .
# Build application in as production - result is created in /app/www
RUN npm run build
# Expose app port
EXPOSE 5173
# Start the application
CMD ["npx", "vite", "preview", "--port", "5173", "--host"]
