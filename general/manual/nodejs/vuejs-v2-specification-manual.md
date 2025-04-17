# Vue.js v2 规范手册 Vue.js v2 Specification Manual

Requires node@'^18.12.0 || ^20.9.0 || >=22', npm@>=9, yarn@\*, pnpm@>=6.25.0.

Using node@18.20.7, npm@10.8.2, yarn@1.22.22, pnpm@10.7.1.

Main dependencies:

- vue@2.7.16, webpack@^4, babel@^7, core-js@^3
- prettier@latest, eslint@^8, stylelint@^15

## 0. 更新 vscode 配置

.editorconfig

See [here](../../constraint/.editorconfig).

.vscode/extensions.json

See [here](../../preferences/vscode/project/extensions.vuejs.v2.jsonc).

.vscode/settings.json

See [here](../../preferences/vscode/project/settings.vuejs.v2.jsonc).

jsconfig.json

See [here](../../constraint/jsconfig.json).

## 1. 更新 package.json

package.json

```json
{
  // ...

  // Used by corepack
  "packageManager": "pnpm@10.7.1+sha512.2d92c86b7928dc8284f53494fb4201f983da65f0fb4f0d40baafa5cf628fa31dae3e5968f12466f17df7e97310e30f343a648baea1b9b350685dafafffdf5808",
  "engines": {
    "node": "^18.12.0 || ^20.9.0 || >=22",
    "npm": ">=9",
    "pnpm": ">=6.25.0"
  }

  // ...
}
```

## 2. 基础依赖升级

shell

```shell
ni vue@2.7.16 vue-router@^3 vuex@^3 webpack@^5 core-js@^3
ni @vue/cli-service -D
```

## 3. 设置代码检查与格式化

shell（安装依赖）

```shell
# prettier
ni prettier -D

# eslint
ni eslint@^8 -D
# eslint plugins, for vue
ni eslint-plugin-vue -D

# eslint config for prettier, 关闭所有（包括其他 eslint 插件）与 prettier 冲突的规则
ni eslint-config-prettier -D

# Babel 解析器，为 eslint 提供语法的解析支持（可选），受 babel.config.js 配置影响（如有）
# 删除旧的解析器（如有）
nun babel-eslint
# 安装新的解析器
ni @babel/eslint-parser -D
```

.eslintrc.js

See [here](../../constraint/.eslintrc.js).

.prettierrc.yaml

See [here](../../constraint/.prettierrc.yaml).

## 4. 设置样式检查与格式化

> 随着 Biome 功能逐渐稳定，我觉得很快就是时候把 ESLint + Prettier 迁移为 Biome 了（等它完全支持 Vue）。

stylelint-config-recommended-vue 未对依赖做精细版本限制，stylelint-config-recommended@>=14.0.0 需要 stylelint@^16，而 nuxt@^2 最高仅支持到 stylelint@^15。

为此，需要通过配置 overrides 或 resolutions 来解决：

package.json（require npm@^8.3.0）

```json
{
  // ...
  "overrides": {
    "stylelint-config-recommended": "13.0.0"
  }
}
```

package.json（require yarn@\*）

```json
{
  // ...
  "resolutions": {
    "stylelint-config-recommended": "13.0.0"
  }
}
```

shell（安装依赖）

```shell
# stylelint
ni stylelint@15 -D
# stylelint configs，捆绑了 stylelint-scss、stylelint-order
ni stylelint-config-recommended-scss@13.1.0 stylelint-config-recommended-vue@1.6.0 stylelint-config-clean-order@7.0.0 -D

# stylelint config & plugin for prettier ... Unnecessary after stylelint 15

# FIXME: 理论上说，stylelint-config-recommended-vue 和 stylelint-config-recommended-scss 捆绑了 postcss 解析器的配置和依赖，
# FIXME: nuxt.js 2 项目（node@^18）无需显示安装依赖，但 vue.js 2 项目 (node@^14) 需要显示安装依赖，也许是 npm 的原因？
# stylelint 需要 postcss 解析器提供语法解析支持（地位可以说是类同 babel）
ni -D postcss-html@1.8.0 postcss-scss@4.0.9
```

stylelint.config.js

See [here](../../constraint/stylelint.config.js).

## 5. 引入 sass 支持和 @nuxtjs/style-resources

shell（安装依赖）

```shell
# 限制 node 版本的罪魁祸首！
nun node-sass

# sass 和 sass-loader
ni sass@1.86.3 sass-loader@version-10 -D
```

## 6. 配置 npm 快速检查/修复脚本和 eslint、stylelint 忽略文件

package.json

```json
{
  // ...
  "scripts": {
    // ...
    "lint": "npm run lint:js && npm run lint:style",
    "lint:js": "eslint --ignore-path .eslintignore --ext .js,.vue src",
    "lint:style": "stylelint --ignore-path .stylelintignore src/**/*.{css,scss,html,vue}",
    "fix": "npm run fix:js && npm run fix:style",
    "fix:js": "eslint --fix --ignore-path .eslintignore --ext .js,.vue src",
    "fix:style": "stylelint --fix --ignore-path .stylelintignore src/**/*.{css,scss,html,vue}"
  }
}
```

.eslintignore

```ignore
build
dist
mock
node_modules
public
theme
```

.stylelintignore

```ignore
build
mock
node_modules
public
test
src/api
src/assets
src/icons
src/router
src/store
src/utils
theme
```

.prettierignore

```ignore
build
dist
mock
node_modules
public
theme
```

## 7. 项目兼容性

### Browsers List

.browserslistrc

```browserslist
> 1%
last 2 versions
```
