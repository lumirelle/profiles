# Node.js 包管理器 - NPM 手册 Node.js Package Manager - NPM Manual

Based on node^18.20.7 (npm@^10.8.2)。

NOTE：未指明何种 LTS 则表示二者都适用。

## 什么是 NPM？ What is NPM?

Node.js 包管理器（Node.js Package Manager），和 Node.js ~~捆绑销售~~。

## 如何配置？ How to Setup?

### 1. 配置 & 切换镜像源

shell

```shell
npm i -g nrm

# https://registry.npmjs.org/
nrm use npm
# https://registry.npmmirror.com/
nrm use taobao
# ...
```

## 如何使用？ How to use?

### 1. 登录 NPM 源

shell

```shell
# 确保使用 NPM 官方源
nrm use npm
npm adduser
# 跟随步骤完成登录
```

### 2. 发布 NPM 包

```shell
# 确保在 NPM 项目中使用命令
cd my-npm-project
npm publish
```

### 3. 更新 NPM 项目版本

如果版本号没有更新，则 NPM 发布会失败。

```shell
# 补丁版本,最后一位数加1
npm version patch
# 增加了新功能 中间的数字加1
npm version minor
# 大改动,不向下兼容 第一位数字加1
npm version major
```

### 3. 删除 NPM 包

```shell
npm unpublish my-npm-package -f
```
