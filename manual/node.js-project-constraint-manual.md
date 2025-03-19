<!-- cSpell:ignore execpath nuxtjs -->

# Node.js 项目规范手册 Node.js Project Constraint Manual (Nuxt 2 / Vue 2)

Require node@^16, npm@^8, nuxt@^2.18.2.

## 0. 更新 .vscode/settings.json 和 jsconfig.json

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
  "eslint.validate": ["js", "ts", "vue"],
  "stylelint.validate": ["css", "less", "sass", "scss", "html", "vue"]
}
```

jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 1. nuxt 升级

shell

```shell
ni nuxt@^2.18.1
```

## 2. 统一包管理工具

scripts/preinstall.js

```js
if (!/npm/.test(process.env.npm_execpath) || '') {
  console.warn(`\u001B[33m 请使用 npm 作为包管理工具安装！\u001B[39m\n`)
  process.exit(1)
}
```

shell (`npm pkg` require npm@>=7)

```shell
na pkg set scripts.preinstall='node ./scripts/preinstall.js'
```

## 3. 设置 js 检查、格式化与解析

shell

```shell
# eslint
ni -D eslint@^8.57.1
# eslint module for nuxt2, server side support
ni -D @nuxtjs/eslint-module@nuxt2
# eslint plugins
ni -D eslint-plugin-vue@^9.32.0 eslint-plugin-nuxt@^4.0.0

# prettier
ni -D prettier@^3.5.2
# eslint plugin & config prettier
# 将 prettier 的输出显示到 eslint 上 & 关闭所有（包括其他 eslint 插件）与 prettier 冲突的规则
ni -D eslint-plugin-prettier@^5.2.3
ni -D eslint-config-prettier@^10.0.1

# Babel 解析器，为 eslint 提供非 es5 语法的解析支持（可选），受 babel.config.js 配置影响
nun babel-eslint
ni -D @babel/eslint-parser@^7.26.8
# 如遇找不到预设，请安装
ni -D @nuxt/babel-preset-app@^2.18.1
```

.eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  parserOptions: {
    // 必须修改的是 parserOptions 里的 parser ！！！
    // parser 由 babel-eslint 换成 @babel/eslint-parser
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    ecmaVersion: 6,
  },
  // extends = plugins + default rules
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:nuxt/recommended',
    // 必须将 prettier 放在最后
    'plugin:prettier/recommended',
  ],
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 'warn',
    'vue/no-reserved-component-names': 'warn',
    'vue/no-mutating-props': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-empty': 'warn',
    'no-unused-vars': 'warn',
    eqeqeq: 'warn',
    camelcase: 'warn',
  },
}
```

.prettierrc.yaml

```yaml
semi: false
singleQuote: true
endOfLine: auto
```

nuxt.config.js

```js
export default {
  // ...
  buildModules: [
    // ...
    '@nuxtjs/eslint-module',
  ],
}
```

## 4. 设置 js 转换和 polyfill

```shell
# nuxt2 内置 babel 支持，在项目构建期间启用，转换 js 代码
# polyfill 可以由 babel presets 控制按需引入，无需自己导入
npm un babel-polyfill
# babel plugins，将 mjs 动态 import 转为 cjs 的 require、自动移除代码中的 console
npm i -D  babel-plugin-dynamic-import-node@^2.3.3 babel-plugin-transform-remove-console@^6.9.4
# @babel/plugin-proposal-private-property-in-object 已弃用，如需要或兼容，请安装旧版
npm i -D @babel/plugin-proposal-private-property-in-object@^7.21.11
# 或使用
npm i -D @babel/plugin-transform-private-property-in-object@^7.25.9
```

babel.config.js

```js
const plugins = []

if (['preprod', 'production'].includes(process.env.NODE_ENV)) {
  // 预发布和正式环境删除console打印
  plugins.push('transform-remove-console')
}

module.exports = {
  // 添加预设
  presets: ['@nuxt/babel-preset-app'],
  env: {
    development: {
      plugins: ['dynamic-import-node'],
    },
  },
  plugins: [...plugins],
}
```

## 5. 引入 sass 支持

shell

```shell
# 限制 node 版本的罪魁祸首！
npm un node-sass
npm i -D sass@^1.85.0 sass-loader@version-10
# 用来将指定的 sass 文件作为全局变量，注入到其他所有 sass 文件
npm i -D @nuxtjs/style-resources@1
```

nuxt.config.js

```js
export default {
  buildModules: [
    // ...
    '@nuxtjs/style-resources',
  ],
  // 实现 scss 文件复用（无需手动导入）
  styleResources: {
    scss: ['assets/styles/variables.scss', 'assets/styles/mixin.scss'],
  },

  build: {
    // ...
    loaders: {
      scss: {
        sassOptions: {
          // scss 支持本身不需要任何配置
          // 这是当代码中使用弃用 API 时，禁用警告（因为实在是太多咧）
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
}
```

## 6. 设置 style 检查、格式化与解析

shell

```shell
# stylelint & stylelint module
npm i -D stylelint@^15.11.0
npm i -D @nuxtjs/stylelint-module@nuxt2
# stylelint plugins，scss 支持和 排序支持
npm i -D stylelint-scss@5 stylelint-order@6
# stylelint configs，标准、scss、clean order
npm i -D stylelint-config-standard@^34.0.0 stylelint-config-standard-scss@^11.1.0 stylelint-config-clean-order@^7.0.0

# prettier
# stylelint plugin prettier，功能同 eslint plugin prettier
# stylelint 15 起，不在与 prettier 存在规则冲突，因此不需要 stylelint config prettier
npm i -D stylelint-prettier@^4.1.0

# postcss 以及解析器
npm un @nuxt/postcss8
npm i -D postcss@^8.5.3
npm i -D postcss-scss@^4.0.9 postcss-html@^1.8.0
```

stylelint.config.js

```js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    'stylelint-prettier/recommended',
  ],
  plugins: [],
  overrides: [
    // 使用 postcss-html 的 html 语法解析器匹配文件中的 style
    {
      files: ['**/*.{html,vue}'],
      customSyntax: 'postcss-html',
    },
    // 使用 postcss-scss 的 scss 语法解析器匹配文件中的 style
    {
      files: ['**/*.{css,sass,scss}'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    // stylelint-config-recommended
    'block-no-empty': [true, { severity: 'warning' }],
    'font-family-no-missing-generic-family-keyword': [true, { severity: 'warning' }],
    'no-descending-specificity': [true, { severity: 'warning' }],
    'no-duplicate-selectors': [true, { severity: 'warning' }],
    'no-empty-source': [true, { severity: 'warning' }],
    'selector-pseudo-class-no-unknown': [true, { severity: 'warning' }],
    'selector-pseudo-element-no-unknown': [true, { severity: 'warning' }],
    // stylelint-config-standard
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
        severity: 'warning',
      },
    ],
    'custom-property-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      { message: (name) => `Expected custom property name "${name}" to be kebab-case`, severity: 'warning' },
    ],
    'keyframes-name-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      { message: (name) => `Expected keyframe name "${name}" to be kebab-case`, severity: 'warning' },
    ],
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)((-|__|--)[a-z0-9]+)*$',
      { message: (selector) => `Expected class selector "${selector}" to be BEM case`, severity: 'warning' },
    ],
    'selector-id-pattern': [
      '^([a-z][a-z0-9]*)((-|__|--)[a-z0-9]+)*$',
      { message: (selector) => `Expected id selector "${selector}" to be BEM case`, severity: 'warning' },
    ],

    // stylelint-config-recommended-scss
    'scss/at-extend-no-missing-placeholder': [true, { severity: 'warning' }],
    'scss/comment-no-empty': [true, { severity: 'warning' }],
    'scss/no-global-function-names': [true, { severity: 'warning' }],
    // stylelint-config-standard-scss
    'scss/at-mixin-pattern': [
      '^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected mixin name to be kebab-case',
        severity: 'warning',
      },
    ],
    'scss/dollar-variable-pattern': [
      '^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected variable to be kebab-case',
        severity: 'warning',
      },
    ],
    'scss/double-slash-comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['between-comments', 'stylelint-commands'],
        severity: 'warning',
      },
    ],
    'scss/double-slash-comment-whitespace-inside': ['always', { severity: 'warning' }],
  },
}
```

nuxt.config.js

```js
export default {
  buildModules: [
    // ...
    '@nuxtjs/stylelint-module',
  ],
  // ...
}
```

## 7. 设置 style 转换（postcss）

shell

```shell
# TODO：postcss 插件
```

## 8. 配置 npm 快速检查/修复脚本和忽略文件

shell

```shell
na pkg set scripts.lint:js='eslint --ignore-path .eslintignore --ext .js,.vue .'
na pkg set scripts.fix:js='eslint --fix --ignore-path .eslintignore --ext .js,.vue .'
na pkg set scripts.lint:style='stylelint --ignore-path .stylelintignore **/*.{css,scss,html,vue}'
na pkg set scripts.fix:style='stylelint --fix --ignore-path .stylelintignore **/*.{css,scss,html,vue}'
na pkg set scripts.lint='npm run lint:js && npm run lint:style'
na pkg set scripts.fix='npm run fix:js && npm run fix:style'
```

.eslintignore

```shell
.nuxt
# 忽略assets目录下文件的语法检查
assets/fonts
assets/icons
assets/images
# 忽略node目录下文件的语法检查
node_modules
# 忽略static目录下文件的语法检查
static
```

.stylelintignore

```shell
.nuxt
# 忽略assets目录下文件的语法检查
assets/enum
assets/fonts
assets/icons
assets/images
assets/lang
assets/utils
# 忽略node目录下文件的语法检查
node_modules
# 忽略纯js目录
api
locales
middleware
mixins
plugins
router
scripts
store
utils
# 忽略static目录下文件的语法检查
static
```

## 9. 配置提交检查/修复

shell

```shell
ni -D husky@^8.0.3 lint-staged@^14.0.1
```

shell

```shell
# 删除 husky@4 配置
na pkg delete husky
# 配置 husky@8
na pkg set scripts.prepare='husky install'
nr prepare
nlx husky add .husky/pre-commit 'npx lint-staged'

# 配置 lint-staged
na pkg delete lint-staged
```

package.json

```json
{
  // ...
  "lint-staged": {
    "*.{js,vue}": ["eslint --fix --ignore-path .eslintignore", "prettier --write --ignore-path .eslintignore"],
    "*.{css,scss,html,vue}": [
      "stylelint --fix --ignore-path .stylelintignore --allow-empty-input",
      "prettier --write --ignore-path .stylelintignore"
    ],
    "!(*.js|*.html|*.vue|*.css|*.scss)": ["prettier --write --ignore-unknown"]
  }
  // ...
}
```

## 10. TODO：webpack

```shell
npm i -D compression-webpack-plugin@6
```

nuxt.config.js

```js
export default {
  // ...
  build: {
    // ...
    plugins: [
      // ...
      new CompressionPlugin({
        // 由 [path].gz[query] 转换为 [path][base].gz
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }),
    ],
  },
}
```
