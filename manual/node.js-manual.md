# Node.js Environment

## What is Node.js?

独立于浏览器运行的 JS 运行时环境（类同与 JDK/JVM）。

## How to Use?

### 1. 环境配置（using Windows，Volta）

Volta 是一个 Node.js 和 Node.js 包管理器（npm、yarn、pnpm 等）的版本管理器。

```shell
winget install volta.volta -l "D:\\.DevTools\\node.js\\volta" # 选择你最喜欢的安装位置

volta install node@14 # 安装 node@14 并设为默认
volta install npm@6 # 安装 npm@6 并设为默认
volta install yarn@1 # 安装 yarn@1 并设为默认
volta install pnpm@10 # 安装 pnpm@10 并设为默认

cd npm-project
volta pin node@14 # 为项目选择 node@14
volta pin yarn@1 # 为项目选择 yarn@1

yarn install
# ...
```

### 2. 安装事项

- volta 与 corepack 功能重复/可能存在冲突，二者取其一就好；
- yarn 安装依赖时会严格检查 Node.js 版本是否满足依赖包中 `package.json` 的 `engines` 字段。

  可以使用如下指令来禁用版本检查（可能导致程序运行出现版本兼容性问题）：

  ```shell
  yarn config set ignore-engines true
  ```

- node-sass 对 Node.js 版本有[严格要求](https://www.npmjs.com/package/node-sass?activeTab=readme#node-version-support-policy)，会导致依赖安装失败/程序运行失败。

  `node-sass@4` 最高仅支持到 `node@14`，因此强烈推荐将 node-sass 迁移至 sass。
