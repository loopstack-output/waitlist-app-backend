FROM node:20 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build