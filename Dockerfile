FROM node:alpine AS builder

WORKDIR /app

RUN npm cache clean --force

COPY package*.json ./

RUN npm install --verbose

COPY . .

RUN export NODE_OPTIONS=--max_old_space_size=4096

RUN npm run build --verbose

FROM node:alpine
WORKDIR /app

COPY --from=builder /app ./

CMD ["npm", "start"]
EXPOSE 3000