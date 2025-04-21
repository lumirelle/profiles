# Vue.js v2 规范手册 Vue.js v2 Specification Manual

Requires node@'^18.12.0 || ^20.9.0 || >=22', npm@>=9, yarn@\*, pnpm@>=7.

Using node@18.20.7, npm@10.8.2, yarn@1.22.22, pnpm@10.7.1.

Main dependencies:

- vue@2.7.16, webpack@^4, babel@^7, core-js@^3
- eslint@latest, stylelint@latest

## 0. 更新 vscode 配置

.editorconfig

See [here](../../constraint/.editorconfig).

.vscode/extensions.json

See [here](../../preferences/vscode/project/extensions.vuejs.v2.jsonc).

.vscode/settings.json

See [here](../../preferences/vscode/project/settings.vuejs.v2.jsonc).

jsconfig.json

See [here](../../constraint/jsconfig.json).

## 1. 更新 package.json 和 .npmrc

package.json

```json
{
  // ...

  // Used by corepack
  "packageManager": "pnpm@10.7.1+sha512.2d92c86b7928dc8284f53494fb4201f983da65f0fb4f0d40baafa5cf628fa31dae3e5968f12466f17df7e97310e30f343a648baea1b9b350685dafafffdf5808",
  "engines": {
    "node": "^18.12.0 || ^20.9.0 || >=22",
    "npm": ">=9",
    "pnpm": ">=7"
  }

  // ...
}
```

.npmrc

See [here](../../constraint/.npmrc).

## 2. 基础依赖升级

shell

```shell
ni vue@2.7.16 vue-router@legacy vuex@^3.6.2 webpack@latest core-js@latest
ni @vue/cli-service@latest -D
```

## 3. 设置代码检查与格式化

> 随着 Biome 功能逐渐稳定，我觉得很快就是时候把 ESLint 迁移为 Biome 了（等它完全支持 Vue）。

为兼容 node@^18，需要配置 pnpm.overrides 或 overrides 或 resolutions：

package.json

```json
{
  // ...

  // require pnpm@>=6.25.0
  "pnpm": {
    "overrides": {
      "minimatch": "<10.0.0"
    }
  },
  // require npm@>=8.3.0
  "overrides": {
    "minimatch": "<10.0.0"
  },
  // require yarn@*
  "resolutions": {
    "minimatch": "<10.0.0"
  }

  // ...
}
```

shell（安装依赖）

```shell
# eslint & config & plugin
ni eslint@latest  @antfu/eslint-config@latest eslint-plugin-format@latest -D

# NOTE: 一般无需。Babel 解析器，为 eslint 提供新 js 语法的解析支持
# 删除旧的解析器（如有）
nun babel-eslint
# 安装新的解析器（一般无需）
ni @babel/eslint-parser -D
```

eslint.config.mjs

See [here](../../constraint/eslint.config.mjs).

## 4. 设置样式检查与格式化

> 随着 Biome 功能逐渐稳定，我觉得很快就是时候把 Stylelint 迁移为 Biome 了（等它完全支持 Vue）。

shell（安装依赖）

```shell
# stylelint & configs，捆绑了 stylelint-scss、stylelint-order
ni stylelint@latest stylelint-config-standard-scss@latest stylelint-config-standard-vue@latest stylelint-config-recess-order@latest @stylistic/stylelint-config@latest -D

# stylelint 需要 postcss 解析器提供语法解析支持
# FIXME: 理论上说，stylelint-config-standard-vue 和 stylelint-config-standard-scss 捆绑了 postcss 解析器的配置和依赖，
# FIXME: nuxt.js 2 项目（node@^18）无需显示安装依赖，但 vue.js 2 项目 (node@^14) 需要显示安装依赖，也许是 npm 的原因？
# ni postcss-html postcss-scss -D
```

stylelint.config.mjs

See [here](../../constraint/stylelint.config.mjs).

## 5. 使用 Dart Sass 提供 Sass 支持，移除 Node Sass

shell（安装依赖）

```shell
# 限制 node 版本的罪魁祸首！
nun node-sass

# sass 和 sass-loader
ni sass@1.86.3 sass-loader@version-10 -D
```

vue.config.js

```js
module.exports = {
  // ...

  css: {
    loaderOptions: {
      scss: {
        sassOptions: {
          // 禁用 SCSS 废弃功能警告
          quietDeps: true,
          // 或者可以按需禁用特定警告
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

```shell
ni npm-run-all2@latest -D
```

package.json

```json
{
  // ...
  "scripts": {
    // ...
    "lint": "npm-run-all -s lint:js lint:style",
    "lint:js": "eslint --cache .",
    "lint:style": "stylelint --cache **/*.{css,scss,html,vue}",
    "fix": "npm-run-all -s fix:js fix:style",
    "fix:js": "eslint --cache --fix .",
    "fix:style": "stylelint --cache --fix **/*.{css,scss,html,vue}"
  }
}
```

## 7. 配置提交检查/修复

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

shell（安装依赖）

```shell
ni simple-git-hooks@latest lint-staged@latest @commitlint/cli@latest @commitlint/config-conventional@latest -D
```

.lintstagedrc.yaml

See [here](../../constraint/.lintstagedrc.yaml).

commitlint.config.mjs

See [here](../../constraint/commitlint.config.mjs).

## 8. 设置 webpack 打包优化和未导入文件检测插件

shell（安装依赖）

```shell
ni useless-analyzer-webpack-plugin@latest -D
```

vue.config.js

```js
// TODO: ...
```

## 9. 项目兼容性

### Browsers List

.browserslistrc

See [here](../../constraint/.browserslistrc).

## 10. 项目可维护性

### Rimraf

FIXME: 在使用 pnpm 的项目中，会出现 vscode 打开状态占用 node_modules 致使无法删除的问题。

shell（安装依赖）

```shell
ni -D rimraf@v5-legacy
```

package.json (require npm-run-all2)

```json
{
  // ...
  "scripts": {
    // ...
    "clean": "npm-run-all -s clean:dist clean:deps",
    "clean:dist": "rimraf .nuxt",
    "clean:deps": "rimraf package-lock.json yarn.lock pnpm-lock.yaml node_modules"
  }
}
```
