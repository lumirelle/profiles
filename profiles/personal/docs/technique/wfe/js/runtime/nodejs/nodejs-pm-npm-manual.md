# Node.js 包管理器 - NPM 手册 / Node.js Package Manager - NPM Manual

This article is based on node@18.20.8 (npm@10.9.2)。

## 📚 什么是 NPM？ / What is NPM?

Node.js 包管理器（Node.js Package Manager），和 Node.js 天天在一起~~捆绑销售~~。

## 🔧 如何配置？ / How to Setup?

### 1. 登录

```shell
npm adduser
```

### 2. 配置 & 切换镜像源

```shell
npm i -g nrm

nrm ls
# npm ---------- https://registry.npmjs.org/
# yarn --------- https://registry.yarnpkg.com/
# tencent ------ https://mirrors.tencent.com/npm/
# cnpm --------- https://r.cnpmjs.org/
# taobao ------- https://registry.npmmirror.com/
# npmMirror ---- https://skimdb.npmjs.com/registry/
# huawei ------- https://repo.huaweicloud.com/repository/npm/

nrm use npm

nrm use taobao

# ...
```

## 💪🏼 如何使用？ / How to use?

### 1. 发布 NPM 包

```shell
# 确保使用了 NPM 源并且已经登录
nrm use npm
npm adduser

# 确保在 NPM 项目中使用命令
cd my-npm-project

npm publish
```

### 2. 弃用 NPM 包的指定版本

```shell
npm deprecate my-npm-package@<1.0.0 'This is a deprecate message.'
```

### 3. 删除发布的 NPM 包

```shell
npm unpublish my-npm-package -f
```
