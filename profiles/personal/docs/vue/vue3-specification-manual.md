# Vue.js 3 规范手册 Vue.js 3 Specification Manual

Requires node@'^18.12.0 || ^20.9.0 || >=22', npm@>=9, pnpm@>=7.

Using node@18.20.8, npm@10.9.2, pnpm@10.9.0.

Main dependencies:

- vue@latest, vite@latest (@vitejs/plugin-vue@latest)
- eslint@latest, stylelint@latest

## 0. 更新 vscode 配置 和 git 配置

### 快速配置

shell（For command `pcp`, please see [README.md#script_setup](../../README.md#script_setup)）

```shell
pcp vscode-ws/extensions.vue.jsonc .vscode/extensions.json -o
pcp vscode-ws/settings.vue.jsonc .vscode/settings.json -o
pcp nodejs/jsconfig.json -o
pcp .editorconfig -o
pcp .gitattributes -o
pcp nodejs/.gitignore -o
```

### 手动配置

.vscode/extensions.json

See [here](../../for-personal/preferences/vscode-ws/extensions.vue.jsonc).

.vscode/settings.json

See [here](../../for-personal/preferences/vscode-ws/settings.vue.jsonc).

jsconfig.json

See [here](../../for-personal/constraint/nodejs/jsconfig.json).

.editorconfig

See [here](../../for-personal/constraint/common/.editorconfig).

.gitattributes

See [here](../../for-personal/constraint/nodejs/.gitattributes).

.gitignore

See [here](../../for-personal/constraint/nodejs/.gitignore).

## 1. 配置包管理器和 .npmrc

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

npm pkg set 'engines.node=^18.12.0 || ^20.9.0 || >=22' 'engines.npm=>=9' 'engines.pnpm=>=7' 'engines.yarn=Please use pnpm for instead!'

pcp nodejs/.npmrc -o
```

### 手动配置

package.json

```json
{
  // ...

  // Used by corepack
  "packageManager": "pnpm@10.9.0+sha512.0486e394640d3c1fb3c9d43d49cf92879ff74f8516959c235308f5a8f62e2e19528a65cdc2a3058f587cde71eba3d5b56327c8c33a97e4c4051ca48a10ca2d5f",
  "engines": {
    "node": "^18.12.0 || ^20.9.0 || >=22",
    "npm": ">=9",
    "pnpm": ">=7",
    "yarn": "Please use pnpm for instead!"
  }

  // ...
}
```

.npmrc

See [here](../../for-personal/constraint/nodejs/.npmrc).

## 2. 基础依赖升级

shell

```shell
ni vue@latest vue-router@latest pinia@latest
ni vite@latest @vitejs/plugin-vue@latest -D
```

## 3. 设置代码检查与格式化

> 随着 Biome 功能逐渐稳定，我觉得很快就是时候把 ESLint 迁移为 Biome 了（等它完全支持 Vue）。

### 前置任务

shell

```shell
# eslint & config & plugin
ni eslint@latest @antfu/eslint-config@latest eslint-plugin-format@latest @prettier/plugin-xml@latest -D
```

### 快速配置

shell

```shell
pcp vue3/eslint.config.mjs -o
```

### 手动配置

eslint.config.mjs

See [here](../../for-personal/constraint/vue3/eslint.config.mjs).

## 4. 设置样式检查与格式化

> 随着 Biome 功能逐渐稳定，我觉得很快就是时候把 Stylelint 迁移为 Biome 了（等它完全支持 Vue）。

### 前置任务

shell

```shell
# stylelint & configs，捆绑了 stylelint-scss、stylelint-order，以及 postcss 处理器
ni stylelint@latest stylelint-config-standard-scss@latest stylelint-config-standard-vue@latest stylelint-config-recess-order@latest @stylistic/stylelint-config@latest stylelint-config-html@latest -D
```

### 快速配置

shell

```shell
pcp vue/stylelint.config.mjs -o
```

### 手动配置

stylelint.config.mjs

See [here](../../for-personal/constraint/vue/stylelint.config.mjs).

## 5. 使用 Dart Sass 提供 Sass 支持，移除 Node Sass

### 前置任务

shell

```shell
# 限制 node 版本的罪魁祸首！
nun node-sass

# sass
ni sass@latest -D
```

### 手动配置

vue.config.js

```js
module.exports = {
  // ...

  css: {
    preprocessorOptions: {
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

## 6. 配置 npm 快速检查/修复脚本

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

## 7. 配置提交检查/修复

### 前置任务

shell

```shell
ni simple-git-hooks@latest lint-staged@latest @commitlint/cli@latest @commitlint/config-conventional@latest -D
```

### 快速配置

shell

```shell
npm pkg set 'scripts.postinstall=simple-git-hooks'
npm pkg set 'simple-git-hooks.pre-commit=npx lint-staged'
npm pkg set 'lint-staged.*=eslint --fix'
npm pkg set 'lint-staged[*.{css,postcss,scss,html,vue}]=stylelint --cache --fix'

pcp nodejs/commitlint.config.mjs -o
```

### 手动配置

package.json（配置 simple-git-hooks）

```json
{
  // ...

  "scripts": {
    // ...
    "postinstall": "simple-git-hooks"
  },

  // ...

  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "*": "eslint --cache --fix",
    "*.{css,postcss,scss,html,vue}": "stylelint --cache --fix"
  }

  // ...
}
```

commitlint.config.mjs

See [here](../../for-personal/constraint/nodejs/commitlint.config.mjs).
