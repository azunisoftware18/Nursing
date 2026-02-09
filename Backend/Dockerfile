# ---------- Base Image ----------
FROM node:20-alpine

# ---------- App Directory ----------
WORKDIR /app

# ---------- Install Dependencies ----------
COPY package*.json ./

# Install only production deps
RUN npm install --omit=dev

# ---------- Copy Source Code ----------
COPY . .

# Ensure uploads folder exists
RUN mkdir -p uploads

# ---------- Environment ----------
ENV NODE_ENV=production

# ---------- Expose Port ----------
EXPOSE 5000

# ---------- Start App ----------
CMD ["npm", "start"]
