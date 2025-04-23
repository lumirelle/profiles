# 请将该 Dockerfile 放在后端项目的根目录下
FROM ghcr.io/graalvm/graalvm-ce:latest

# 工作目录
WORKDIR /app

# 复制并重命名最新的 .jar 文件
COPY /target/*.jar .
RUN mv $(ls -t -- *.jar | head -n1) app.jar

# 启动参数
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
