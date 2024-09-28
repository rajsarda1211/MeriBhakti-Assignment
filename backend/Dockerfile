# Use Node.js 16 or later to support the nullish coalescing operator
FROM node:16

# Set the working directory inside the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the backend dependencies
RUN npm install

# Copy the rest of the backend code into the working directory
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

# Expose port 5000 (where your backend runs)
EXPOSE 5000

# Command to start the server using nodemon
CMD ["npm", "run", "server"]
