# 请将该 Dockerfile 放在前端项目的根目录下
FROM node:lts
LABEL authors="Lyana-nullptr"\
  description="基于 Node.js 22 构建的用于运行 Nuxt.js 前端项目的镜像"

# 工作目录
WORKDIR /app

# 在 docker 环境中执行 npm install
COPY . .
RUN npm install && npm run build:prod

# 启动参数
EXPOSE 80

ENTRYPOINT [ "npm", "run", "start:prod" ]
