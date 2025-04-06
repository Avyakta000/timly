# # Use Node.js image
# FROM node:18

# # Set working directory inside the container
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the source code
# COPY . .

# # Expose the port used by React's development server
# EXPOSE 3000

# # Start the React development server
# CMD ["npm", "run", "dev"]


# # Use Node.js for building the app
# FROM node:18 AS build

# # Set working directory inside the container
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the source code and build the React app
# COPY . .
# RUN npm run build

# # Use Nginx to serve the React app
# FROM nginx:alpine

# RUN rm /etc/nginx/conf.d/default.conf

# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose Nginx default port
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build React App
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the React app
COPY . .
RUN npm run build

# Stage 2: Serve the build output using 'serve'
FROM node:18-alpine

WORKDIR /app

# Copy build files from the build stage to /app/dist
COPY --from=build /usr/src/app/dist ./dist

# Install 'serve' globally
RUN npm install -g serve

# Expose the port 'serve' will use (default is 3000)
EXPOSE 3000

# Command to start the 'serve' server
CMD ["serve", "-s", "dist", "-l", "3000"]