<!-- cSpell:ignore execpath -->

# Nuxt.js 项目规范手册 Nuxt.js Project Constraint Manual

Based on node^18.20.7 (npm@^10.8.2):

- nuxt@2.18.1 (vue@^2, webpack@^4, babel@^7, core-js@^3)
- eslint@^8, stylelint@^16, prettier@^3

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
ni nuxt@^2.18.1
ni @nuxt/types@^2.18.1 -D
```

## 2. 限制包管理器

package.json

```json
{
  // ...
  "engines": {
    "node": ">=18.20.7",
    "npm": ">=10.8.2",
    "yarn": "Please use npm instead of yarn to install dependencies",
    "pnpm": "Please use npm instead of pnpm to install dependencies"
  },
  "packageManager": "npm@10.8.2"
}
```

## 3. 设置代码检查与格式化

> 随着 Biome 功能逐渐稳定，我觉得很快就是时候把 ESLint + Prettier 迁移为 Biome 了（等它完全支持 Vue）。

shell（安装依赖）

```shell
# prettier
ni prettier@^3.5.3 -D

# eslint
ni eslint@^8.57.1 -D
# eslint module for nuxt2，提供服务端 eslint 支持
ni @nuxtjs/eslint-module@nuxt2 -D
# eslint configs（捆绑了 eslint-plugin-vue）
ni @nuxtjs/eslint-config@^12.0.0 -D

# eslint plugin for nuxt，提供 SSR 模式某些禁止操作的 lint
ni eslint-plugin-nuxt@^4.0.0 -D

# eslint config for prettier, 关闭所有（包括其他 eslint 插件）与 prettier 冲突的规则
ni eslint-config-prettier@^10.1.1 -D
# eslint plugin for prettier ... Not recommended

# Babel 解析器，为 eslint 提供语法的解析支持（可选），受 babel.config.js 配置影响（如有）
# 删除旧的解析器（如有）
nun babel-eslint
# 安装新的解析器
ni @babel/eslint-parser@^7.27.0 -D
```

.eslintrc.js

```js
module.exports = {
  root: true,
  // 自定义解析器
  parserOptions: {
    parser: '@babel/eslint-parser',
    // 设置为无需 babel 配置文件
    requireConfigFile: false,
    ecmaVersion: 6,
  },

  // 继承共享配置 configs 或插件 plugins 的推荐配置
  extends: [
    // 包含了 plugin:vue/recommended
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
  // 加载插件（extends 了的插件会自动加载，无需再设置）
  // plugins: [],
  // 自定义规则
  rules: {
    'vue/multi-word-component-names': 'warn',
    'vue/no-reserved-component-names': 'warn',
    'vue/no-mutating-props': 'warn',
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
# stylelint module for nux，类同 eslint-module
ni @nuxtjs/stylelint-module@nuxt2 -D
# stylelint configs（捆绑了 stylelint-order）
ni stylelint-config-recommended-scss@^13.1.0 stylelint-config-recommended-vue@^1.6.0 stylelint-config-clean-order@^7.0.0 -D

# stylelint config & plugin for prettier ... Unnecessary after stylelint 15

# stylelint 需要 postcss 解析器提供语法解析支持（地位可以说是类同 babel）
# 然鹅，stylelint-config-recommended-vue 和 stylelint-config-recommended-scss 捆绑了这两个解析器依赖，因此，无需主动安装
# ni -D postcss-html@^1.8.0 postcss-scss@^4.0.9
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

shell（安装依赖）

```shell
# 限制 node 版本的罪魁祸首！
nun node-sass

# sass 和 sass-loader
ni sass@^1.86.0 sass-loader@version-10 -D

# nuxt 模块，通过自动导入实现样式 mixin
ni @nuxtjs/style-resources@^1.2.2 -D
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

package.json

```json
{
  // ...
  "scripts": {
    // ...
    "lint": "npm run lint:js && npm run lint:style",
    "lint:js": "eslint --ignore-path .eslintignore --ext .js,.vue .",
    "lint:style": "stylelint --ignore-path .stylelintignore **/*.{css,scss,html,vue}",
    "fix": "npm run fix:js && npm run fix:style",
    "fix:js": "eslint --fix --ignore-path .eslintignore --ext .js,.vue .",
    "fix:style": "stylelint --fix --ignore-path .stylelintignore **/*.{css,scss,html,vue}"
  }
}
```

.eslintignore

```ignore
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

# 忽略 app.html 文件的语法检查
app.html
```

.stylelintignore

```ignore
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

# 忽略 app.html 文件的语法检查
app.html
```

.prettierignore

```ignore
# 忽略 . 目录下文件的语法检查
.husky
.nuxt
.vscode

# 忽略 assets 目录下文件的语法检查
assets/fonts
assets/icons
assets/images
assets/lang

# 忽略 static 目录下文件的语法检查
static

# 忽略 node_modules 目录下文件的语法检查
node_modules

# 忽略 modules 目录下 plugin.js 文件的语法检查
modules/**/plugin.js

# 忽略 app.html 文件的语法检查
app.html
```

## 7. 配置提交检查/修复

shell（安装依赖，配置 husky）

```shell
ni husky@^9.1.7 lint-staged@^15.5.0 -D

nlx husky init

echo 'npx lint-staged' > .husky/pre-commit
```

.lintstagedrc.yaml

```yaml
'*.{js,vue}':
  - 'eslint --fix --ignore-path .eslintignore'
  - 'prettier --write --ignore-path .eslintignore'
'*.{css,scss,html,vue}':
  - 'stylelint --fix --ignore-path .stylelintignore --allow-empty-input'
  - 'prettier --write --ignore-path .stylelintignore'
'!(*.js|*.html|*.vue|*.css|*.scss)':
  - 'prettier --write --ignore-path .prettierignore --ignore-unknown'
```

## 8. 设置 webpack 打包优化

shell（安装依赖）

```shell
ni nuxt-precompress@^0.5.9
```

nuxt.config.js

```js
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
    // nuxt@2.17.3 依赖的 @nuxt/webpack 内置了如下优化插件
    // extract-css-chunks-webpack-plugin
    extractCSS: true,
    // optimize-css-assets-webpack-plugin
    optimizeCSS: {
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    },
    // terser-webpack-plugin
    terser:
      process.env.NODE_ENV === 'preprod' || process.env.NODE_ENV === 'production'
        ? {
            extractComments: false,
            terserOptions: {
              // 移除 console.*
              compress: { drop_console: true },
              mangle: true, // 混淆变量名
              output: { comments: false, beautify: false },
            },
          }
        : undefined,

    // webpack
    splitChunks: {
      layouts: false, // 不自动拆分布局代码
      pages: true, // 自动拆分页面代码
      commons: true, // 自动拆分公共模块
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 244 * 1024, // 244kb
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        cacheGroups: {
          styles: {
            test: /\.(css|vue)$/,
            name: 'styles',
            priority: 50,
            enforce: true,
            reuseExistingChunk: true,
          },
          elementUI: {
            name: 'element-ui',
            test: /node_modules[\\/]element-ui/,
            priority: 20,
          },
        },
      },
    },
  },
}
```

## 9. 项目兼容性

### Polyfill

shell（安装依赖）

```shell
# babel@7 后不再维护 babel-polyfill，转为使用 core-js/stable
nun babel-polyfill
```

### Broswers List

.browserslistrc

```browserslist
> 1%
last 2 versions
```

### Cross Env

shell（安装依赖）

```shell
# 为环境变量提供跨平台兼容性
ni -D cross-env
```

package.json（设置了环境变量的 npm scripts，改为通过 cross-env 来执行）

```json
{
  // ...
  "scripts": {
    // ...
    // 设置了环境变量，改为通过 cross-env 来执行
    "dev": "cross-env NODE_ENV=localDevelopment nuxt --max_old_space_size=16384",
    "build:dev": "cross-env NODE_ENV=development nuxt build",
    "build:test": "cross-env NODE_ENV=tests nuxt build",
    "build:preprod": "cross-env NODE_ENV=preprod nuxt build",
    "build:prod": "cross-env NODE_ENV=production nuxt build",
    // 没设置环境变量，无需改变
    "start": "nuxt start"
  }
}
```

## 10. 项目可维护性

shell（安装依赖）

```shell
ni -D rimraf@v5-legacy
```

package.json

```json
{
  // ...
  "scripts": {
    // ...
    "clean": "npm run clean:dist && npm run clean:deps",
    "clean:dist": "rimraf .nuxt",
    "clean:deps": "rimraf package-lock.json yarn.lock node_modules"
  }
}
```

## 11. 项目国际化（Vue i18n）

locales/index.js

```js
import VueI18n from 'vue-i18n'
import Vue from 'vue'

import elementMessagesInEN from 'element-ui/lib/locale/lang/en'
import elementMessagesInZH from 'element-ui/lib/locale/lang/zh-CN'
import elementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const SUPPORT_LANGUAGES = ['en', 'zh-CN']

// 1. 初始化 messages
const messages = SUPPORT_LANGUAGES.reduce((messages, language) => {
  messages[language] = {}
  return messages
}, {})

// 2. 获取并设置所有模块的语言内容
const modules = require.context('./modules', true, /\.json$/)

// 拆分后进行排序，保证层级多的放在后面，防止被覆盖
// 例如，level1/level2/level3/zh-CN.json，level1/level2/zh-CN.json, 在后面给level1设置level2时会将刚才的level2覆盖
// 长度越长，越靠后，也可以在下面进行处理，但是我觉得这样会快一点
const keys = modules.keys()
const afterSplitAndSort = keys
  .map((path) => ({ names: path.split('/'), path }))
  .sort((a, b) => a.names.length - b.names.length)

// 用于存储已处理的模块，用于校验配对
const processedModules = new Map()

afterSplitAndSort.forEach(({ names, path }) => {
  const namespaces = names.slice(1, names.length - 1) // 语言文件命名空间
  const language = names[names.length - 1].split('.')[0] // 语言文件名
  const message = modules(path) // 语言文件内容

  // 校验语言文件名
  if (!SUPPORT_LANGUAGES.includes(language)) {
    console.warn(`[i18n] 警告: 文件 ${path} 不是有效的语言文件，应为 ${SUPPORT_LANGUAGES.join(', ')} 之一`)
    return
  }

  // 处理语言文件内容
  let root = messages[language]
  // 构建命名空间结构
  let idx = 0
  while (idx < namespaces.length - 1) {
    const leafKey = namespaces[idx]
    if (!Reflect.get(root, leafKey)) {
      Reflect.set(root, leafKey, {})
    }
    root = Reflect.get(root, leafKey)
    idx++
  }
  // 为构建出的最后一个命名空间层级，设置翻译内容
  Reflect.set(root, namespaces[namespaces.length - 1], message)

  // 记录已处理的模块
  const folderPath = namespaces.join('/')
  if (!processedModules.has(folderPath)) {
    processedModules.set(folderPath, new Set())
  }
  processedModules.get(folderPath).add(language)
})

// 校验语言文件配对
processedModules.forEach((files, folderPath) => {
  if (files.size !== SUPPORT_LANGUAGES.length) {
    console.warn(
      `[i18n] 警告: 文件夹 ${folderPath} 缺少必须的语言文件，当前为: ${Array.from(files).join(
        ', '
      )}, 应为: ${SUPPORT_LANGUAGES.join(', ')}`
    )
  }
})

// 3. 合并饿了么组件库的国际化
const elementMessages = {
  en: elementMessagesInEN,
  'zh-CN': elementMessagesInZH,
}
for (const language of SUPPORT_LANGUAGES) {
  messages[language] = { ...messages[language], ...elementMessages[language] }
}

// 4. 初始化 VueI18n 实例
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en', // 语言环境中不存在相应massage键时回退到英语
  messages,
  silentTranslationWarn: true,
  // 处理复数形式的规则，例如：
  // modules/xxx/en.json
  // {
  //   "apple": {
  //     "0": "1 apple",    // 单数
  //     "1": "{n} apples"  // 复数，其中 key 为 pluralizationRules 返回值
  //   }
  // }
  // xxx.js
  // $t('apple', { n: 1 })  // 输出: "1 apple"，其中 n 为 choice
  // $t('apple', { n: 2 })  // 输出: "2 apples"
  pluralizationRules: {
    en: (choice) => {
      return choice <= 1 ? 0 : 1
    },
  },
})

export default function ({ app }) {
  const locale = app.$cookies.get('language')

  if (!app.i18n) {
    app.i18n = i18n
  }

  i18n.locale = locale

  elementLocale.i18n((key, value) => app.i18n.t(key, value))
}

export { i18n }
```

项目结构

```text
-- locales

  -- modules

    -- module-a
      -- sub-module
        -- en.json
        -- zh-CN.json

    -- module-b
      -- en.json
      -- zh-CN.json

  -- index.js
```
