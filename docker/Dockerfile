FROM node:slim

# Set working directory
WORKDIR /app

# Copy only package files first to install dependencies (better cache)
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the app
RUN npm run build

# Expose dev server port
EXPOSE 4173

# Start the Vite preview server
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4173", "--outDir", "www"]