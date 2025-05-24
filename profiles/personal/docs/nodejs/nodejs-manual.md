# Node.js 手册 Node.js Manual

## 什么是 Node.js？ What is Node.js?

独立于浏览器运行的 JS 运行时环境（类同 JVM）。

## 如何配置？ How to setup?

### 1. 安装并配置（基于 Windows，PowerShell 7，FNM）

FNM 是一个跨平台的 Node.js 版本管理器，支持 `.nvmrc` 或 `.node-version` 配置，支持自动切换 node 版本。

安装 fnm，并[设置 Shell 环境](https://github.com/Schniz/fnm?tab=readme-ov-file#shell-setup)。

```shell
winget install Schniz.fnm

# 跟随官方教程设置 Shell 环境，默认启用 corepack
# 以 PowerShell 为例，需要允许执行本地脚本
echo 'fnm env --use-on-cd --corepack-enabled --shell powershell | Out-String | Invoke-Expression' >> $PROFILE

# 设置镜像源（系统环境变量），重启终端或系统
# FNM_NODE_DIST_MIRROR = https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/

# 安装 node 18 （自动设为默认）
fnm install 18
```

## 如何使用？ How to use?

### 1. 新建项目

```shell
# 设置项目 node 版本，并重启你的终端
cd your-node-project
fnm use 18
echo (node -v) > .node-version

# 使用 corepack 设置包管理器 (pnpm@>=9 需要 node@>=18)
# 包管理器发布新版本时，可以重新运行此命令
corepack use pnpm@latest-10
```

### 2. 包管理器

- [npm](nodejs-pm-npm-manual.md)
- [pnpm](nodejs-pm-pnpm-manual.md)
- [yarn](nodejs-pm-yarn-manual.md)
- ...

### 3. 最佳伙伴

```shell
# 全局安装 @antfu/ni
npm i -g @antfu/ni@latest
# 使用 ni 自动检测适用的包管理器，减轻心智负担
ni
```
