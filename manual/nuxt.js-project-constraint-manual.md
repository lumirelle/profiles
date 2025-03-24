<!-- cSpell:ignore execpath -->

# Nuxt.js 项目规范手册 Nuxt.js Project Constraint Manual (Nuxt 2 / Vue 2)

Based on node@^16, npm@^8, nuxt@2.17.3 (vue@2, webpack@4, babel@7, core-js@3).

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
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    }
  },
  "exclude": ["node_modules", ".nuxt", "dist"]
}
```

## 1. nuxt 升级

shell

```shell
ni nuxt@2.17.3 -E
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
ni -D prettier@^3.5.3

# eslint
ni -D eslint@^8.57.1
# eslint module for nuxt2，提供服务端 eslint 支持
ni -D @nuxtjs/eslint-module@nuxt2
# eslint plugins
ni -D eslint-plugin-vue@^9.33.0 eslint-plugin-nuxt@^4.0.0
# eslint configs
ni -D @nuxtjs/eslint-config@12.0.0

# eslint plugin for prettier ... Well, you don't really need it
# eslint config for prettier, 关闭所有（包括其他 eslint 插件）与 prettier 冲突的规则
ni -D eslint-config-prettier@^10.1.1

# Babel 解析器，为 eslint 提供语法的解析支持（可选），受 babel.config.js 配置影响
nun babel-eslint
ni -D @babel/eslint-parser@^7.26.10
```

.eslintrc.js

```js
module.exports = {
  root: true,
  // 自定义解析器
  parserOptions: {
    // 修改的是 parserOptions 这里的 parser ！！！
    // parser 由 babel-eslint 换成 @babel/eslint-parser
    parser: '@babel/eslint-parser',
    // 设置为无需 babel 配置文件
    requireConfigFile: false,
  },

  // 继承插件 plugins 的推荐配置或共享配置 configs
  extends: [
    // 内含了 plugin:vue/recommended
    '@nuxtjs',
    'plugin:nuxt/recommended',
    // 必须将 prettier 放在最后
    'prettier',
  ],

  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  // 加载插件（扩展的插件会自动加载，无需配置）
  plugins: [],
  // 自定义规则
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
  // 定义全局已有的变量，消除变量未定义
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
    '@nuxtjs/eslint-module',
  ],
}
```

## 4. 设置样式检查与格式化

stylelint-config-recommende-vue 未对依赖做精细版本限制，导致依赖 stylelint-config-recommended 解析为最新不支持 node@16 的版本，需要配置 resolutions 来解决：

package.json

```json
{
  // ...
  "resolutions": {
    "stylelint-config-recommended": "^13.0.0"
  }
}
```

shell

```shell
# stylelint
ni -D stylelint@^15.11.0
# stylelint module for nux，类同 eslint-module
ni -D @nuxtjs/stylelint-module@nuxt2
# stylelint plugins ... Well, you don't really need them
# stylelint configs
ni -D stylelint-config-standard@^34.0.0 stylelint-config-recommended-vue@^1.6.0 stylelint-config-recess-order@^6.0.0

# eslint plugin & config for prettier ... Well, you don't really need them

# stylelint 需要 postcss 解析器提供语法解析支持（地位可以说是类同 babel）
nun @nuxt/postcss8
ni -D postcss-html@^1.8.0
```

stylelint.config.js

```js
module.exports = {
  // 自定义解析器
  // 使用 postcss-html 解析 .html,js,css, ... 等文件中的样式
  customSyntax: 'postcss-html',

  // 继承插件 plugins 的推荐配置或共享配置 configs
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue', 'stylelint-config-recess-order'],

  plugins: [],
  rules: {
    // stylelint-config-recommended
    'block-no-empty': [true, { severity: 'warning' }],
    'font-family-no-missing-generic-family-keyword': [true, { severity: 'warning' }],
    'no-descending-specificity': [true, { severity: 'warning' }],
    'no-duplicate-selectors': [true, { severity: 'warning' }],
    'no-empty-source': [true, { severity: 'warning' }],
    'selector-pseudo-class-no-unknown': [true, { severity: 'warning', ignorePseudoClasses: ['deep'] }],
    'selector-pseudo-element-no-unknown': [true, { severity: 'warning', ignorePseudoElements: ['input-placeholder'] }],
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

## 5. 引入 sass 支持和 @nuxtjs/style-resources

shell

```shell
# 限制 node 版本的罪魁祸首！
nun node-sass

# sass 和 sass-loader
ni -D sass@^1.85.1 sass-loader@version-10

# nuxt 模块，通过自动导入实现样式 mixin
ni -D @nuxtjs/style-resources@^1.2.2
```

nuxt.config.js

```js
export default {
  buildModules: [
    // ...
    '@nuxtjs/style-resources',
  ],
  // 设置需要作为 mixin 的样式文件
  styleResources: {
    scss: ['assets/styles/variables.scss', 'assets/styles/mixin.scss'],
  },

  build: {
    // ...
    loaders: {
      scss: {
        sassOptions: {
          // scss 支持本身不需要任何配置
          // 只有代码中使用到大量的弃用 API 时，才需要禁用警告（因为实在是太多咧）
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

## 6. 配置 npm 快速检查/修复脚本和 eslint、stylelint 忽略文件

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

# 忽略其他纯 js 目录
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

na pkg delete lint-staged
```

package.json

```json
{
  // ...
  // 配置 lint-staged
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

## 10. 设置 babel 解析器

```shell
# NOTE: nuxt@2.17.3 依赖 @nuxt/babel-preset-app@2.17.3，默认集成了 babel@7 和 core-js@3

# babel plugins，自动移除代码中的 console
ni -D babel-plugin-transform-remove-console@^6.9.4
# @babel/plugin-proposal-private-property-in-object 已弃用，为兼容，需指定安装旧版本
# ni -D @babel/plugin-proposal-private-property-in-object@^7.21.11

# babel@7 后不再维护 babel-polyfill，需要转为使用 core-js/stable
nun babel-polyfill
```

nuxt.config.js

```js
export default {
  // ...
  build: {
    // ...
    // nuxt 默认不读取 babel 配置，要使用外部 babel 配置文件，需要更改默认配置
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
  const plugins = []

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

## TODO: 11. 设置 postcss 处理器

shell

```shell
# ：postcss 插件
```

## 12. 设置 webpack 打包优化

```shell
ni nuxt-precompress@^0.5.9

ni -D uglifyjs-webpack-plugin@^2.2.0 optimize-css-assets-webpack-plugin@^6.0.1
```

nuxt.config.js

```js
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

export default {
  // ...

  modules: [
    //...
    'nuxt-precompress',
  ],
  nuxtPrecompress: {
    enabled: true,
    report: false,
    test: /\.(js|css|json|txt|html|ico|svg|xml|)$/,
    middleware: {
      enabled: true,
      enabledStatic: true,
      encodingsPriority: ['br', 'gzip'],
    },
    gzip: {
      enabled: true,
      filename: '[path].gz[query]',
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      enabled: true,
      filename: '[path].br[query]',
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
  },

  build: {
    // ...
    // 将所有 CSS 提取到单个文件中，避免刷新时样式未加载，导致元素移动，受 splitChunks 配置影响
    extractCSS: true,

    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 5000000, //  5M
        maxSize: 10000000, // 10M
        cacheGroups: {
          // 先抽离第三方模块，再抽离公共模块，要不然执行抽离公共模块就截止不会往下执行
          vendors: {
            chunks: 'initial',
            priority: 100,
            test: /[\\/]node_modules[\\/]/,
          },
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
          common: {
            chunks: 'all',
            priority: 10,
            minSize: 0,
            minChunks: 2,
            reuseExistingChunk: true,
          },
          elementui: {
            test: /node_modules[\\/]element-ui/,
            chunks: 'all',
            priority: 20,
            name: 'element-ui',
          },
        },
      },

      minimizer: [
        new UglifyJsPlugin({
          exclude: /\/node_modules/,
          uglifyOptions: {
            // 删除注释
            output: { comments: false },
          },
          cache: true,
          parallel: true,
          sourceMap: false,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                zindex: false, // 保持 z-index 不变
              },
            ],
          },
          canPrint: false,
          assetNameRegExp: /\.css$/g,
        }),
      ],
    },
  },
}
```
