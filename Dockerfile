# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run build

# Install `serve` to serve the app on port 5006
RUN npm install -g serve

# Open port 5006 to the outside world
EXPOSE 5006

# Serve the app
CMD ["serve", "dist", "-l", "5006"]
