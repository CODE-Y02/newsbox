FROM oven/bun:latest
WORKDIR /app
COPY package.json /app/
RUN  npm install
COPY . .
EXPOSE 3000

# Build your app
RUN npm run build


# Start your app
CMD ["npm", "start"]

# # Use an official Node.js runtime as a base image (since Bun is Node-compatible)
# FROM oven/bun:latest

# # Set working directory
# WORKDIR /app

# # Copy package files and install dependencies
# COPY package.json /app/
# RUN bun install

# # Copy the rest of your app
# COPY . .

# # Build your app
# RUN bun run build

# # Start your app
# CMD ["bun", "start"]