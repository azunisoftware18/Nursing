FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build app
RUN npm run build

# Expose preview port
EXPOSE 4173

# Run preview server
CMD ["npm", "run", "preview", "--", "--host"]
