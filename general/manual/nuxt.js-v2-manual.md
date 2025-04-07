# Nuxt.js 手册 Nuxt.js Manual

Based on node@^18.20.7, yarn@^1.22.22, nuxt@^2.18.1 (vue@^2, webpack@^4, babel@^7, core-js@^3).

## 为什么使用？ Why use it?

1. 基于 Vue.js 生态
2. 模块化功能，无需重复造轮子
3. 高性能和默认的应用优化
4. 封装好的 SSR 渲染模式，开箱即用，SEO 友好

## 依赖 Dependency

核心支持:

- @nuxt/core: 核心功能支持
- @nuxt/utils: Nuxt.js 工具库、工具函数集
- @nuxt/vue-app: Nuxt.js 的 Vue.js 集成
- @nuxt/components: Vue.js 组件自动导入能力支持
- @nuxt/webpack: Nuxt.js 的 Webpack 集成
- @nuxt/babel-preset-app: Nuxt.js 的 Babel 集成
- @nuxt/config: Nuxt.js 默认的应用优化配置以及 nuxt.config.js 配置处理
- @nuxt/server: Nuxt.js 服务器支持
- @nuxt/vue-renderer: Nuxt.js 渲染器，对 Universal（SSR/SSG） 和 SPA 的支持
- @nuxt/generator: Nuxt.js 对 SSG 的支持
- @nuxt/builder: 构建工具
- @nuxt/cli: 命令行支持

其他:

- @nuxt/opencollective: 在本包被安装时展示 open collective 链接
- @nuxt/loading-screen: 项目启动页面
- @nuxt/telemetry: Nuxt.js 遥测数据收集

## 最佳使用！ Best practice

### 1. 配置！ Setup

```shell
nlx create-nuxt-app@4 # requires @antfu/ni
# Choose the agent: yarn

# Project name: xxx
# Programming language: JavaScript
# Package manager: Yarn
# UI framework: Element(PC) / Vant (Mobile)
# Nuxt.js modules: Axios
# Linting tools: ESLint, Prettier, Lint staged files (We will add StyleLint manually for compatible reason)
# Testing framework: None
# Rendering mode: Universal (SSR/SSG)
# Deployment target: Server (Node.js hosting)
# Development tools: jsconfig.json (Recommended for VS Code if you're not using typescript)
# Continuous integration: None
# Version control system: Git
```

然后依照 [Nuxt.js Project Constraint Manual](nuxt.js-project-constraint-manual.md) 完成基础设置。
