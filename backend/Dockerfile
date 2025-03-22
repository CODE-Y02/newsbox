FROM oven/bun:latest
WORKDIR /app
COPY package.json /app/
RUN  bun install
COPY . .
EXPOSE 3000
