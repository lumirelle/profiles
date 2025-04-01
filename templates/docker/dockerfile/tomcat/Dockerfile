# 请将该 Dockerfile 放在后端项目的根目录下
FROM tomcat:9-jre21
LABEL authors="Lyana-nullptr"\
  description="基于 Tomcat 9 构建的用于运行 Tomcat 后端项目的镜像"

# 工作目录
WORKDIR /usr/local/tomcat/webapps/

# 复制并重命名最新的 .war 文件
COPY /target/artifacts/*.war .
RUN mv $(ls -t -- *.war | head -n1) app.war

# 启动参数
EXPOSE 8080

ENTRYPOINT ["catalina.sh", "run"]
