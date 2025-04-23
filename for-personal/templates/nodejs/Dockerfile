# 请将该 Dockerfile 放在前端项目的根目录下
FROM node:lts-slim

# 工作目录
WORKDIR /app

# 在 docker 环境中执行 npm install
COPY . .
RUN npm install && npm run build:prod

# 启动参数
EXPOSE 80

ENTRYPOINT [ "npm", "run", "start:prod" ]
