# Dockerfile
FROM node:alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép mã nguồn vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Tạo stage chạy ứng dụng
FROM node:alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép từ stage builder
COPY --from=builder /app ./

# Chạy ứng dụng
CMD ["npm", "start"]

# Expose port
EXPOSE 3000
