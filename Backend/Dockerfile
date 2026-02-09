FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# 👇 install all deps (including dev)
RUN npm install

COPY . .

RUN mkdir -p uploads

EXPOSE 5000

CMD ["npm", "start"]
