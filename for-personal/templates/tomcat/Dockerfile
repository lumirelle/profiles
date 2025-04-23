# 请将该 Dockerfile 放在后端项目的根目录下
FROM tomcat:11-jre21

# 工作目录
WORKDIR /usr/local/tomcat/webapps/

# 复制并重命名最新的 .war 文件
COPY /target/artifacts/*.war .
RUN mv $(ls -t -- *.war | head -n1) app.war

# 启动参数
EXPOSE 8080

ENTRYPOINT ["catalina.sh", "run"]
