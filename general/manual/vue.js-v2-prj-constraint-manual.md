# Vue.js 项目规范手册 Vue.js Project Constraint Manual

Based on node@^14.21.3 (npm@^6.14.18):

- vue@^2.7.16, webpack@^4, babel@^7, core-js@^3
- eslint@^6, stylelint@^16, prettier@^2

## 0. 更新 vscode 配置

.vscode/settings.json

```json
{
  // cspell:disable
  // == vscode: format ==
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit",
    "source.fixAll.markdownlint": "explicit"
  },
  // == extensions: lint ==
  "eslint.validate": ["js", "jsx", "ts", "tsx", "vue"],
  "stylelint.validate": ["css", "less", "sass", "scss", "html", "vue"],
  // == extensions: i18n ==
  "i18n-ally.localesPaths": ["locales", "assets/lang"],
  "i18n-ally.namespace": true,
  "i18n-ally.pathMatcher": "modules/{namespaces}/{locale}.json"
}
```

jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    }
  },
  "exclude": ["node_modules", ".nuxt", "dist"]
}
```

## 1. 基础依赖升级

shell

```shell
ni vue@^2.7.16 vue-router@^3.6.5 vuex@^3.6.2 webpack@^4.47.0 core-js@^3.41.0
ni @vue/cli-service@^4.5.19 -D
```

## 2. 限制包管理器

package.json

```json
{
  // ...
  "engines": {
    "node": ">=14.21.3",
    "npm": ">=6.14.18",
    "yarn": "Please use npm or yarn instead of pnpm to install dependencies",
    "pnpm": "Please use npm or yarn instead of pnpm to install dependencies"
  },
  "packageManager": "npm@6.14.18"
}
```

## 3. 设置代码检查与格式化

shell（安装依赖）

```shell
# prettier
ni prettier@^2.8.8 -D

# eslint
ni eslint@^6.8.0 -D

# eslint plugin for vue
ni @vue/cli-plugin-eslint@^4.5.19 -D

# eslint config for prettier, 关闭所有（包括其他 eslint 插件）与 prettier 冲突的规则
ni eslint-config-prettier@^6.15.0 -D
# eslint plugin for prettier ... Not recommended

# Babel 解析器，为 eslint 提供语法的解析支持（可选），受 babel.config.js 配置影响（如有）
ni babel-eslint@^10.1.0 -D
```

.eslintrc.js

```js
module.exports = {
  root: true,
  // 自定义解析器
  parserOptions: {
    parser: 'babel-eslint',
  },

  // 继承共享配置 configs 或插件 plugins 的推荐配置
  extends: ['plugin:vue/recommended', 'prettier'],

  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  // 加载插件（extends 了的插件会自动加载，无需再设置）
  // plugins: [],
  // 自定义规则
  rules: {
    'vue/no-reserved-component-names': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    eqeqeq: 'warn',
    camelcase: 'warn',
  },
}
```

.prettierrc.yaml

```yaml
endOfLine: auto
semi: false
singleQuote: true
printWidth: 120
```

## 4. 设置样式检查与格式化

> 随着 Biome 功能逐渐稳定，我觉得很快就是时候把 ESLint + Prettier 迁移为 Biome 了（等它完全支持 Vue）。

stylelint-config-recommende-vue 未对依赖 stylelint-config-recommended 做精细版本限制，导致解析到最新版本，不支持 stylelint@^15，而 nuxt@^2 最高仅支持到 stylelint@^15。

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
ni stylelint@^15.11.0 -D
# stylelint configs（捆绑了 stylelint-order）
ni stylelint-config-recommended-scss@^13.1.0 stylelint-config-recommended-vue@^1.6.0 stylelint-config-clean-order@^7.0.0 -D

# stylelint config & plugin for prettier ... Unnecessary after stylelint 15

# stylelint 需要 postcss 解析器提供语法解析支持（地位可以说是类同 babel）
ni -D postcss-html@^1.8.0 postcss-scss@^4.0.9
```

stylelint.config.js

```js
module.exports = {
  // 配置 html 和 scss 的语法解析器
  overrides: [
    {
      files: ['*.html', '*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],

  // 继承共享配置 configs
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-clean-order',
  ],

  rules: {
    // stylelint-config-recommended
    'block-no-empty': [true, { severity: 'warning' }],
    'font-family-no-missing-generic-family-keyword': [true, { severity: 'warning' }],
    'no-descending-specificity': [true, { severity: 'warning' }],
    'no-empty-source': [true, { severity: 'warning' }],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'global', 'slotted'] }],
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted', 'input-placeholder'] },
    ],
    // stylelint-config-recommended-scss
    'scss/at-extend-no-missing-placeholder': [true, { severity: 'warning' }],
    'scss/comment-no-empty': [true, { severity: 'warning' }],
    // stylelint-config-clean-order
    'at-rule-empty-line-before': [
      'always',
      {
        ignore: ['first-nested', 'blockless-after-same-name-blockless', 'after-comment'],
        ignoreAtRules: ['if', 'else'],
        severity: 'warning',
      },
    ],
  },
}
```

## 5. 引入 sass 支持和 @nuxtjs/style-resources

shell（安装依赖）

```shell
# 限制 node 版本的罪魁祸首！
nun node-sass

# sass 和 sass-loader
ni sass@1.26.8 sass-loader@8.0.2 -D -E
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

### Broswers List

.browserslistrc

```browserslist
> 1%
last 2 versions
```
