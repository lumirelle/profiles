# Node.js 手册 / Node.js Manual

## 📚 什么是 Node.js？ / What is Node.js?

独立于浏览器运行的 JS 运行时环境。

## 🔧 如何配置？ / How to setup?

### 1. 安装并配置（基于 Windows 11，PowerShell 7，fnm）

fnm 是一个跨平台的 Node.js 版本管理器，支持读取 `.node-version` 或 `.nvmrc` 配置，同时支持自动切换 node 版本。

安装 fnm，并[设置 Shell 环境](https://github.com/Schniz/fnm?tab=readme-ov-file#shell-setup)。

```powershell
winget install Schniz.fnm

# 允许执行本地脚本
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# 启用 fnm 环境
fnm env --use-on-cd --corepack-enabled --shell powershell | Out-String | Invoke-Expression

# 安装 node 18 （将被设为默认版本）
fnm install 18
```

### 2. 安装必备全局依赖

```shell
npm i nrm @antfu/ni @antfu/nip hint -g

# 如果你使用 node 18，推荐升级 npm 至 >= 10.9.2
npm i npm@^10.9.2 -g
```

## 💪🏼 如何使用？ / How to use?

### 1. 新建项目

```shell
cd your-node-project

# 设置项目 node 版本，并重启你的终端
fnm use 18
echo (node -v) > .node-version

# 使用 corepack 设置包管理器 (pnpm@>=9 需要 node@>=18)
# 包管理器发布新版本时，可以重新运行此命令
corepack use pnpm@latest-10
```

### 2. 包管理器

- [npm](nodejs-pm-npm-manual.md)
- [pnpm（推荐）](nodejs-pm-pnpm-manual.md)
- [yarn](nodejs-pm-yarn-manual.md)
- ...
