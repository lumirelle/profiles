# Vue.js 2 规范手册 / Vue.js 2 Specification Manual

Requires node@'^18.12.0 || ^20.9.0 || >=22', npm@>=9, pnpm@>=7.

This article is based on node@18.20.8, npm@10.9.2, corepack@0.32.0, pnpm@10.11.1.

Main dependencies:

- vue@^2.7.16, vue-cli@^4 (webpack@^4, babel@^7, core-js@^3)
- eslint@latest, stylelint@latest
- simple-git-hooks@latest, lint-staged@latest, commitlint@latest

## 🔧 更新 vscode 配置和 git 配置

### 快速配置

shell（For command `pp`, please see [README.md#script_setup](../../../../../../README.md#script_setup)）

```shell
# vscode 配置
# -- 推荐扩展
pp vue/extensions.json .vscode/ -o
# -- 工作区设置
pp vue/settings.json .vscode/ -o
# -- js 编译器设置
pp vue/jsconfig.json -o
# -- 通用代码格式设置
pp .editorconfig -o

# git 配置
# -- 文件属性
pp .gitattributes -o
# -- 忽略文件
pp nodejs.gitignore .gitignore -o
```

### 手动配置

.vscode/extensions.json

See [here](../../../../preferences/editor/vscode-workspace/vue/extensions.json).

.vscode/settings.json

See [here](../../../../preferences/editor/vscode-workspace/vue/settings.json).

jsconfig.json

See [here](../../../../preferences/editor/vscode-workspace/vue/jsconfig.json).

.editorconfig

See [here](../../../../preferences/editor/.editorconfig).

.gitattributes

See [here](../../../../preferences/vcs/git/.gitattributes).

.gitignore

See [here](../../../../preferences/vcs/git/nodejs.gitignore).

## 📦 配置包管理器和 .npmrc

### 前置任务

shell

```shell
npm i corepack@latest -g
npm i @antfu/ni@latest -g
```

### 快速配置

shell（This syntax of command `npm pkg set` requires npm@>=10.9.2）

```shell
corepack use pnpm@latest-10

# 本文所安装的依赖要求:
# node 版本符合 ^18.12.0 || ^20.9.0 || >=22，
# npm 版本符合 >=9
# pnpm 版本符合 >=7
npm pkg set 'engines.node=^18.12.0 || ^20.9.0 || >=22' 'engines.npm=>=9' 'engines.pnpm=>=7' 'engines.yarn=Please use pnpm for instead!'

# TEST NEEDED
# npm pkg set 'pnpm.overrides.@achrinza/node-ipc=9.2.9'
# npm pkg set 'overrides.@achrinza/node-ipc=9.2.9'

pp npm/.npmrc -o
```

### 手动配置

package.json

```json
{
  // ...

  // Used by corepack
  "packageManager": "pnpm@10.11.1+sha512.e519b9f7639869dc8d5c3c5dfef73b3f091094b0a006d7317353c72b124e80e1afd429732e28705ad6bfa1ee879c1fce46c128ccebd3192101f43dd67c667912",
  "engines": {
    "node": "^18.12.0 || ^20.9.0 || >=22",
    "npm": ">=9",
    "pnpm": ">=7",
    "yarn": "Please use pnpm for instead!"
  }

  // ...
}
```

`````shell
# TEST NEEDED
# 为兼容 node 18 版本，还需要配置 pnpm.overrides（requires pnpm@>=6.25.0）或 overrides（requires npm@>=8.3.0）

# package.json

# ```json
# {
#   // ...

#   "pnpm": {
#     "overrides": {
#       "@achrinza/node-ipc": "9.2.9"
#     }
#   },
#   "overrides": {
#     "@achrinza/node-ipc": "9.2.9"
#   }

#   // ...
# }
# ````
`````

.npmrc

See [here](../../../../preferences/package-manager/npm/.npmrc).

## 🥡 基础依赖升级

shell

```shell
# vue, vue-router, vuex, core-js
ni vue@^2.7.16 vue-router@legacy vuex@^3.6.2 core-js@latest
# vue-cli, vue-template-compiler
ni @vue/cli-service@^4.5.19 @vue/cli-plugin-babel@latest vue-template-compiler@latest -D
```

## 🌟 设置代码检查与格式化

> 真心期待前端有一个大统一的、完整的生态工具链！！！

### 前置任务

shell

```shell
# eslint
ni eslint@latest -D
# eslint config
ni @antfu/eslint-config@latest -D
# eslint & prettier plugin
ni eslint-plugin-format@latest @prettier/plugin-xml@latest -D
```

### 快速配置

shell

```shell
pp vue2/eslint.config.mjs -o
```

### 手动配置

eslint.config.mjs

See [here](../../../../preferences/linter/eslint/vue2/eslint.config.mjs).

## ✨ 设置样式检查与格式化

> 真心期待前端有一个大统一的、完整的生态工具链！！！

### 前置任务

shell

```shell
# stylelint
ni stylelint@latest -D
# stylelint config for scss
ni stylelint-config-standard-scss@latest -D
# stylelint config for vue
ni stylelint-config-standard-vue@latest -D
# stylelint config for stylistic
ni @stylistic/stylelint-config@latest stylelint-config-recess-order@latest -D
# stylelint config for html
ni stylelint-config-html@latest -D
```

### 快速配置

shell

```shell
pp vue/stylelint.config.mjs -o
```

### 手动配置

stylelint.config.mjs

See [here](../../../../preferences/linter/stylelint/vue/stylelint.config.mjs).

## 📜 配置 npm 快速检查与格式化脚本

### 前置任务

shell

```shell
ni npm-run-all2@latest -D
```

### 快速配置

shell

```shell
npm pkg set 'scripts.lint=run-s lint:*'
npm pkg set 'scripts.lint:js=eslint --cache .'
npm pkg set 'scripts.lint:style=stylelint --cache **/*.{css,postcss,scss,html,vue}'
npm pkg set 'scripts.fix=run-s fix:*'
npm pkg set 'scripts.fix:js=eslint --cache --fix .'
npm pkg set 'scripts.fix:style=stylelint --cache --fix **/*.{css,postcss,scss,html,vue}'
```

### 手动配置

package.json

```json
{
  // ...
  "scripts": {
    // ...

    "lint": "run-s lint:*",
    "lint:js": "eslint --cache .",
    "lint:style": "stylelint --cache **/*.{css,postcss,scss,html,vue}",
    "fix": "run-s fix:*",
    "fix:js": "eslint --cache --fix .",
    "fix:style": "stylelint --cache --fix **/*.{css,postcss,scss,html,vue}"

    // ...
  }
}
```

## 🤖 配置提交检查与格式化

### 前置任务

shell

```shell
# The performance of `simple-git-hooks` is much better than `husky`
ni simple-git-hooks@latest -D
# lint-staged & commitlint
ni lint-staged@latest @commitlint/cli@latest @commitlint/config-conventional@latest -D
```

### 快速配置

shell

```shell
npm pkg set 'scripts.prepare=simple-git-hooks'
npm pkg set 'simple-git-hooks.pre-commit=npx lint-staged'
npm pkg set 'simple-git-hooks.commit-msg=npx commitlint --edit $1'
npm pkg set 'lint-staged.*=eslint --fix'
npm pkg set 'lint-staged[*.{css,postcss,scss,html,vue}]=stylelint --cache --fix'

pp commitlint/commitlint.config.mjs -o
```

### 手动配置

package.json（配置 simple-git-hooks）

```json
{
  // ...

  "scripts": {
    // ...
    "prepare": "simple-git-hooks"
  },

  // ...

  "simple-git-hooks": {
    "pre-commit": "npx lint-staged",
    "commit-msg": "npx commitlint --edit $1"
  },
  "lint-staged": {
    "*": "eslint --cache --fix",
    "*.{css,postcss,scss,html,vue}": "stylelint --cache --fix"
  }

  // ...
}
```

commitlint.config.mjs

See [here](../../../../preferences/linter/commitlint/commitlint.config.mjs).

## 💪🏼 使用 Dart Sass 提供 Sass 支持，移除 Node Sass

### 前置任务

shell

```shell
# 限制 node 版本的罪魁祸首！
nun node-sass

# sass 和 sass-loader
ni sass@latest sass-loader@version-10 -D
```

### 手动配置

vue.config.js

```js
module.exports = {
  // ...

  css: {
    loaderOptions: {
      scss: {
        sassOptions: {
          // scss 支持本身不需要任何配置
          // 只有代码中使用到大量的弃用 API 时，才需要禁用警告（因为警告输出实在是太多咧）
          silenceDeprecations: [
            'legacy-js-api',
            'mixed-decls',
            'import',
            'slash-div',
            'global-builtin',
            'function-units',
          ],
        },
      },
    },
  },

  // ...
}
```

## 🧹 项目兼容性 & 可维护性

### [taze](https://www.npmjs.com/package/taze)

#### 使用

```shell
# taze：帮你轻松完成依赖升级
npx taze minor -Iw
```
