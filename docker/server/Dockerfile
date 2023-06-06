# Stage 1: Build the application
FROM node:latest
# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Expose the port on which the application will run
EXPOSE 3001

CMD npm run migrations:execute; npm start;
