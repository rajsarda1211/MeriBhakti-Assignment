# Stage 1: Build the React app
FROM node:14 as build

# Set the working directory inside the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the frontend dependencies
RUN npm install

# Copy the rest of the frontend code into the working directory
COPY . .

# Build the React app
RUN npm run build

# Check if the build folder exists (for debugging)
RUN ls -la /app/build

# Stage 2: Serve the app using nginx
FROM nginx:alpine

# Copy the build files from the first stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for nginx
EXPOSE 80
