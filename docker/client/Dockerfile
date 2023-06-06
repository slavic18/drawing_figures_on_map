# Stage 1: Build the application
FROM node AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY client/package.json client/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY client/ .

# Build the application
RUN npm run build

# Stage 2: Serve the built application
FROM node AS production

# Set the working directory in the container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=builder /app/dist/ ./build

# Install serve globally to serve the application
RUN npm install -g serve

# Expose the port on which the application will run
EXPOSE 3000

# Set the command to serve the application
CMD ["serve", "-s", "./build"]




# Stage 3: Run the application for development
FROM node AS development

# Set the working directory in the container
WORKDIR /app

COPY --from=builder /app/node_modules/ ./node_modules

# Expose the port on which the application will run
EXPOSE 3000

# Run the webpack dev server
CMD ["npm", "run", "serve"]
