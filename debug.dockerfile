# Use the same base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including 'react-scripts'
RUN npm install

# Copy the local code to the container's working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app using npm
CMD ["npm", "start"]