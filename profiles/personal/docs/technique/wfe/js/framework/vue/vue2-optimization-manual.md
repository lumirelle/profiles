# Vue.js 2 优化手册 Vue.js 2 Optimization Manual

Requires node@'^18.12.0 || ^20.9.0 || >=22', npm@>=9, pnpm@>=7.

This article is based on node@18.20.8, npm@10.9.2, pnpm@10.11.1.

Main dependencies:

- vue@^2.7.16, vue-cli@^4 (webpack@^4, babel@^7, core-js@^3)
- eslint@latest, stylelint@latest

## 1. 设置 webpack 打包优化和未导入文件检测插件

### 依赖安装

shell

```shell
ni useless-analyzer-webpack-plugin@latest -D
```

### 手动配置

vue.config.js

```js
// TODO: ...
```
