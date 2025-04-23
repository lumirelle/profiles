# Nuxt.js 2 规范手册 Nuxt.js 2 Specification Manual

Requires node@'^18.18.0 || ^20.9.0 || >=22', npm@>=9, pnpm@>=7.

Using node@18.20.8, npm@10.9.2, pnpm@10.9.0.

Main dependencies:

- nuxt@^2.18.1 (vue@^2, webpack@^4, babel@^7, core-js@^3)
- eslint@latest, stylelint@latest

## 0. 更新 vscode 和 git 配置

### 快速配置

shell（For command `pcp`, please see [README.md#script_setup](../../README.md#script_setup)）

```shell
pcp vscode-ws/extensions.vue2.jsonc .vscode/extensions.json -o
pcp vscode-ws/settings.vue2.jsonc .vscode/settings.json -o
pcp nodejs/jsconfig.json -o
pcp .editorconfig -o
pcp .gitattributes -o
pcp nodejs/.gitignore -o
```

### 手动配置

.vscode/extensions.json

See [here](../../for-personal/preferences/vscode-ws/extensions.vue2.jsonc).

.vscode/settings.json

See [here](../../for-personal/preferences/vscode-ws/settings.vue2.jsonc).

jsconfig.json

See [here](../../for-personal/constraint/nodejs/jsconfig.json).

.editorconfig

See [here](../../for-personal/constraint/common/.editorconfig).

.gitattributes

See [here](../../for-personal/constraint/common/.gitattributes).

.gitignore

See [here](../../for-personal/constraint/nodejs/.gitignore).

## 1. 更新 package.json 和 .npmrc

### 快速配置

shell（This `npm pkg set` syntax requires npm@>=10.9.2）

```shell
corepack use pnpm@latest-10
# or
npm pkg set 'packageManager=pnpm@10.9.0+sha512.0486e394640d3c1fb3c9d43d49cf92879ff74f8516959c235308f5a8f62e2e19528a65cdc2a3058f587cde71eba3d5b56327c8c33a97e4c4051ca48a10ca2d5f'

npm pkg set 'engines.node=^18.12.0 || ^20.9.0 || >=22' 'engines.npm=>=9' 'engines.pnpm=>=7' 'engines.yarn=Please use pnpm for instead!'

npm pkg set 'pnpm.overrides.eslint-plugin-import-x>minimatch=9.0.5'
npm pkg set 'overrides.eslint-plugin-import-x.minimatch=9.0.5'

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

为兼容 node 版本，还需要配置 pnpm.overrides（requires pnpm@>=6.25.0）或 overrides（requires npm@>=8.3.0）

package.json

```json
{
  // ...

  "pnpm": {
    "overrides": {
      "eslint-plugin-import-x>minimatch": "9.0.5"
    }
  },
  "overrides": {
    "eslint-plugin-import-x": {
      "minimatch": "9.0.5"
    }
  }

  // ...
}
```

.npmrc

See [here](../../for-personal/constraint/nodejs/.npmrc).

## 2. 基础依赖升级

shell（Command `ni` requires @antfu/ni）

```shell
ni nuxt@^2.18.1
ni @nuxt/types@^2.18.1 -D
```

## 3. 设置代码检查与格式化

> 随着 Biome 功能逐渐稳定，我觉得很快就是时候把 ESLint 迁移为 Biome 了（等它完全支持 Vue）。

### 依赖安装

shell

```shell
# eslint & config & plugin
ni eslint@latest @antfu/eslint-config@latest eslint-plugin-format@latest -D

# NOTE: 一般无需。Babel 解析器，为 eslint 提供新 js 语法的解析支持
# 删除旧的解析器（如有）
nun babel-eslint
# 安装新的解析器（一般无需）
ni @babel/eslint-parser -D
```

### 快速配置

shell

```shell
pcp vue2/eslint.config.mjs -o
```

### 手动配置

eslint.config.mjs

See [here](../../for-personal/constraint/vue2/eslint.config.mjs).

## 4. 设置样式检查与格式化

> 随着 Biome 功能逐渐稳定，我觉得很快就是时候把 Stylelint 迁移为 Biome 了（等它完全支持 Vue）。

### 依赖安装

shell

```shell
# stylelint & configs，捆绑了 stylelint-scss、stylelint-order
ni stylelint@latest stylelint-config-standard-scss@latest stylelint-config-standard-vue@latest stylelint-config-recess-order@latest @stylistic/stylelint-config@latest -D

# stylelint 需要 postcss 解析器提供语法解析支持
# FIXME: 理论上说，stylelint-config-standard-vue 和 stylelint-config-standard-scss 捆绑了 postcss 解析器的配置和依赖，
# FIXME: nuxt.js 2 项目（node@^18）无需显示安装依赖，但 vue.js 2 项目 (node@^14) 需要显示安装依赖，也许是 npm 的原因？
# ni postcss-html postcss-scss -D
```

### 快速配置

shell

```shell
pcp vue2/stylelint.config.mjs -o
```

### 手动配置

stylelint.config.mjs

See [here](../../for-personal/constraint/vue2/stylelint.config.mjs).

## 5. 使用 Dart Sass 提供 Sass 支持，移除 Node Sass

### 依赖安装

shell

```shell
# 限制 node 版本的罪魁祸首！
nun node-sass

# sass 和 sass-loader
ni sass@latest sass-loader@version-10 -D
```

### 手动配置

nuxt.config.js

```js
export default {
  // ...

  build: {
    // ...

    loaders: {
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

    // ...
  },

  // ...
}
```

## 6. 配置 npm 快速检查/修复脚本

### 依赖安装

```shell
ni npm-run-all2@latest -D
```

### 快速配置

shell（This `npm pkg set` syntax requires npm@>=10.9.2）

```shell
npm pkg set 'scripts.lint=npm-run-all -s lint:js lint:style'
npm pkg set 'scripts.lint:js=eslint --cache .'
npm pkg set 'scripts.lint:style=stylelint --cache **/*.{css,postcss,scss,html,vue}'
npm pkg set 'scripts.fix=npm-run-all -s fix:js fix:style'
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

    "lint": "npm-run-all -s lint:js lint:style",
    "lint:js": "eslint --cache .",
    "lint:style": "stylelint --cache **/*.{css,postcss,scss,html,vue}",
    "fix": "npm-run-all -s fix:js fix:style",
    "fix:js": "eslint --cache --fix .",
    "fix:style": "stylelint --cache --fix **/*.{css,postcss,scss,html,vue}"

    // ...
  }
}
```

## 7. 配置提交检查/修复

### 依赖安装

shell

```shell
ni simple-git-hooks@latest lint-staged@latest @commitlint/cli@latest @commitlint/config-conventional@latest -D
```

### 快速配置

shell（This `npm pkg set` syntax requires npm@>=10.9.2）

```shell
npm pkg set 'scripts.postinstall=simple-git-hooks'
npm pkg set 'simple-git-hooks.pre-commit=npx lint-staged'

pcp vue2/.lintstagedrc.yaml -o
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
  }

  // ...
}
```

.lintstagedrc.yaml

See [here](../../for-personal/constraint/vue2/.lintstagedrc.yaml).

commitlint.config.mjs

See [here](../../for-personal/constraint/nodejs/commitlint.config.mjs).

## 8. 项目兼容性 & 可维护性

### 依赖安装

shell

```shell
# cross-env：为环境变量提供跨平台兼容性
ni -D cross-env@latest
```

### 手动配置

NOTE：需要使用 cross-env 代理的 npm 脚本应手动配置。设置了环境变量，才需要改为通过 cross-env 来执行。

package.json（Requires npm-run-all2）

```json
{
  // ...

  "scripts": {
    // ...

    // 设置了环境变量，改为通过 cross-env 来执行
    "dev": "cross-env BUILD_ENV=develop nuxt",
    "dev:test": "cross-env BUILD_ENV=test nuxt",
    "dev:preprod": "cross-env BUILD_ENV=preprod nuxt",
    "dev:prod": "cross-env BUILD_ENV=production nuxt",
    "build:dev": "cross-env BUILD_ENV=develop nuxt build",
    "build:test": "cross-env BUILD_ENV=test  nuxt build",
    "build:preprod": "cross-env BUILD_ENV=preprod  nuxt build",
    "build:prod": "cross-env BUILD_ENV=production  nuxt build",
    // 没设置环境变量，无需改变
    "start": "nuxt start"

    // ...
  }

  // ...
}
```
