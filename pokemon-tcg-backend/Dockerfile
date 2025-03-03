# Backend Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend files
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src

# Install dependencies
RUN npm install

# Build app
RUN npm run build

# Expose port (cambia si es necesario)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
