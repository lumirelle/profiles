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
  "eslint.validate": ["js", "jsx", "ts", "tsx", "vue"],
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

## 3. 设置代码检查与格式化

shell

```shell
# prettier
ni -D prettier@^3.5.2

# eslint
ni -D eslint@^8.57.1
# eslint module for nuxt2，提供服务端 eslint 支持，nuxt < v2.9 时，需要将其安装为依赖
ni -D @nuxtjs/eslint-module@nuxt2
# eslint plugins
ni -D eslint-plugin-vue@^9.32.0 eslint-plugin-nuxt@^4.0.0
# eslint plugin & config for prettier
# 将 prettier 的规则插入到 eslint & 关闭所有（包括其他 eslint 插件）与 prettier 冲突的规则
ni -D eslint-plugin-prettier@^5.2.3
ni -D eslint-config-prettier@^10.0.1

# Babel 解析器，为 eslint 提供语法的解析支持（可选），受 babel.config.js 配置影响
nun babel-eslint
ni -D @babel/eslint-parser@^7.26.8
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
  // 全局变量，避免 eslint 报变量未定义的错
  globals: {
    // ...
  },
}
```

.prettierrc.yaml

```yaml
semi: false
singleQuote: true
endOfLine: auto
printWidth: 120
```

nuxt.config.js

```js
export default {
  // ...
  buildModules: [
    // ...
    // nuxt < v2.9 时，需要将其放置在 modules
    '@nuxtjs/eslint-module',
  ],
}
```

## 4. 设置 babel 解析器

```shell
# NOTE: nuxt@^2.18.1 依赖 @nuxt/babel-preset-app@^2.18.1，默认集成了 babel@7 和 core-js@3

# babel plugins，自动移除代码中的 console 和自动导入 UI 样式
ni -D babel-plugin-transform-remove-console@^6.9.4 babel-plugin-component@^1.1.1
# @nuxt/babel-preset-app@^2.18.1 依赖的 @babel/plugin-proposal-private-property-in-object 已弃用，为兼容，需指定安装旧版本
ni -D @babel/plugin-proposal-private-property-in-object@^7.21.11

# babel@7 后不再维护 babel-polyfill，需要转为使用 core-js/stable
nun babel-polyfill
```

nuxt.config.js

```js
export default {
  // ...
  build: {
    // ...
    // nuxt@^2.18.1 拥有默认的 babel 选项和配置，要使用外部 babel 配置文件，需要更改默认选项
    babel: {
      babelrc: true,
      configFile: './babel.config.js',
    },
  },
}
```

babel.config.js

```js
// 此配置会在 nuxt 构建和 eslint 解析时共同使用
module.exports = function (api) {
  api.cache(true)

  // nuxt babel 预设，使用 core-js@3（必要！！！）
  const presets = [['@nuxt/babel-preset-app', { corejs: { version: 3 } }]]
  // element ui 自动导入样式
  const plugins = [['component', { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }]]

  if (['preprod', 'production'].includes(process.env.NODE_ENV)) {
    // 预发布和正式环境删除console打印
    plugins.push('transform-remove-console')
  }

  return {
    presets,
    plugins,
  }
}
```

## 5. 引入 sass 支持

shell

```shell
# 限制 node 版本的罪魁祸首！
nun node-sass

# sass 和 sass-loader
ni -D sass@^1.85.1 sass-loader@version-10
# nuxt 模块，用于为其他的样式文件复用指定的样式文件
ni -D @nuxtjs/style-resources@1
```

nuxt.config.js

```js
export default {
  buildModules: [
    // ...
    '@nuxtjs/style-resources',
  ],
  // 设置需要复用的样式文件
  styleResources: {
    scss: ['assets/styles/variables.scss', 'assets/styles/mixin.scss'],
  },

  build: {
    // ...
    loaders: {
      scss: {
        sassOptions: {
          // scss 支持本身不需要任何配置
          // 这是当代码中使用到大量的弃用 API 时，需要禁用警告（因为实在是太多咧）
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

## 6. 设置样式检查、格式化

shell

```shell
# stylelint
ni -D stylelint@^15.11.0
# stylelint module for nux，类同 eslint-module
ni -D @nuxtjs/stylelint-module@nuxt2
# stylelint plugins，scss 支持和 排序支持
ni -D stylelint-scss@5 stylelint-order@6
# stylelint configs，标准、scss、clean order
ni -D stylelint-config-standard@^34.0.0 stylelint-config-standard-scss@^11.1.0 stylelint-config-clean-order@^7.0.0
# stylelint plugin for prettier，类同 eslint-plugin-prettier
# stylelint 15 起，不再与 prettier 存在规则冲突，因此不需要 stylelint-config-prettier
ni -D stylelint-prettier@^4.1.0

# stylelint 需要 postcss 解析器提供语法解析支持（地位类同 babel）
nun @nuxt/postcss8
ni -D postcss@^8.5.3
ni -D postcss-scss@^4.0.9 postcss-html@^1.8.0
```

stylelint.config.js

```js
module.exports = {
  // extends = plugins + rules
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    // 必须将 prettier 放在最后
    'stylelint-prettier/recommended',
  ],
  plugins: [],
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
      '^(-{1,2}?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
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

## 7. 设置 postcss 后处理器

shell

```shell
# TODO：postcss 插件
```

## 8. 配置 npm 快速检查/修复脚本和 eslint、stylelint 忽略文件

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
# 忽略 . 目录下文件的语法检查
.husky
.nuxt
.vscode

# 忽略 assets 目录下文件的语法检查
assets/fonts
assets/icons
assets/images
assets/lang
assets/styles
# 忽略 static 目录下文件的语法检查
static

# 忽略 node_modules 目录下文件的语法检查
node_modules

# 忽略 modules 目录下 plugin.js 文件的语法检查
modules/**/plugin.js
```

.stylelintignore

```shell
# 忽略 . 目录下文件的语法检查
.husky
.nuxt
.vscode

# 忽略 assets 目录下文件的语法检查
assets/enum
assets/fonts
assets/icons
assets/images
assets/lang
assets/utils

# 忽略 static 目录下文件的语法检查
static

# 忽略 node_modules 目录下文件的语法检查
node_modules

# 忽略其他纯js目录
api
locales
middleware
mixins
modules
plugins
router
scripts
store
utils
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
