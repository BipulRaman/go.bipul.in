FROM node:18

# Create app directory
WORKDIR /usr/src/go-bipul-app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Expose the port the app runs on
EXPOSE 8081

# Command to run the app with webpack-dev-server
CMD ["yarn", "dev"]