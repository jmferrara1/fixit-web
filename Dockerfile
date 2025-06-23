FROM node:20-bullseye
WORKDIR /app
COPY package.json package-lock.json* .npmrc ./
RUN npm ci || npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
