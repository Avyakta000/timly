# Use Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose the port used by React's development server
EXPOSE 3000

# Start the React development server
CMD ["npm", "run", "dev"]


# # Use Node.js for building the app
# FROM node:18 as build

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
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose Nginx default port
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
