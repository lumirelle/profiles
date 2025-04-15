# Nuxt.js 项目规范手册 Nuxt.js Project Constraint Manual

Requires node@'^18.12.0 || ^20.9.0 || >=22', npm@>=9, yarn@\*, pnpm@\*.

Using node@18.20.7, npm@10.8.2, yarn@1.22.22, pnpm@10.7.1.

Main dependencies:

- nuxt@2.18.1 (vue@^2, webpack@^4, babel@^7, core-js@^3)
- prettier@^3, eslint@^8, stylelint@^15

## 0. 更新 vscode 配置

.editorconfig

See [here](../constraint/.editorconfig).

.vscode/extensions.json

See [here](../preferences/vscode/extensions.project.nuxtjs2.jsonc).

.vscode/settings.json

See [here](../preferences/vscode/settings.project.nuxtjs2.jsonc).

jsconfig.json

See [here](../constraint/jsconfig.json).

## 1. 基础依赖升级

shell

```shell
ni nuxt@2.18.1 -E
ni @nuxt/types@2.18.1 -E -D
```

## 2. 限制开发环境

package.json

```json
{
  // ...

  // Used by corepack
  "packageManager": "pnpm@10.7.1+sha512.2d92c86b7928dc8284f53494fb4201f983da65f0fb4f0d40baafa5cf628fa31dae3e5968f12466f17df7e97310e30f343a648baea1b9b350685dafafffdf5808",
  "engines": {
    "node": "^18.12.0 || ^20.9.0 || >=22",
    "npm": ">=9"
  }

  // ...
}
```

## 3. 设置代码检查与格式化

> 随着 Biome 功能逐渐稳定，我觉得很快就是时候把 ESLint + Prettier 迁移为 Biome 了（等它完全支持 Vue）。

shell（安装依赖）

```shell
# prettier
ni prettier@3.5.3 -D

# eslint
ni eslint@8.57.1 -D
# eslint configs，捆绑了 eslint-plugin-vue
ni @nuxtjs/eslint-config@12.0.0 -D
# eslint plugins，提供 SSR 模式禁止操作的 lint
ni eslint-plugin-nuxt@4.0.0 -D

# eslint config for prettier, 关闭所有（包括其他 eslint 插件）与 prettier 冲突的规则
ni eslint-config-prettier@10.1.2 -D

# Babel 解析器，为 eslint 提供语法的解析支持（可选），受 babel.config.js 配置影响（如有）
# 删除旧的解析器（如有）
nun babel-eslint
# 安装新的解析器
ni @babel/eslint-parser@7.27.0 -D
```

.eslintrc.js

See [here](../constraint/.eslintrc.js).

.prettierrc.yaml

See [here](../constraint/.prettierrc.yaml).

## 4. 设置样式检查与格式化

> 随着 Biome 功能逐渐稳定，我觉得很快就是时候把 ESLint + Prettier 迁移为 Biome 了（等它完全支持 Vue）。

stylelint-config-recommended-vue 未对依赖做精细版本限制，stylelint-config-recommended@>=14.0.0 需要 stylelint@^16，而 nuxt@^2 最高仅支持到 stylelint@^15。

为此，需要通过配置 overrides 或 resolutions 或 pnpm.overrides 来解决：

package.json（require pnpm@>=6.25.0）

```json
{
  // ...
  "pnpm": {
    "overrides": {
      "stylelint-config-recommended": "13.0.0"
    }
  }
}
```

package.json（require npm@>=8.3.0）

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
ni stylelint@15.11.0 -D
# stylelint configs，捆绑了 stylelint-scss、stylelint-order
ni stylelint-config-recommended-scss@13.1.0 stylelint-config-recommended-vue@1.6.0 stylelint-config-recess-order@4.6.0 -D

# stylelint config for prettier ... Unnecessary after stylelint 15

# FIXME: 理论上说，stylelint-config-recommended-vue 和 stylelint-config-recommended-scss 捆绑了 postcss 解析器的配置和依赖，
# FIXME: nuxt.js 2 项目（node@^18）无需显示安装依赖，但 vue.js 2 项目 (node@^14) 需要显示安装依赖，也许是 npm 的原因？
# stylelint 需要 postcss 解析器提供语法解析支持（地位可以说是类同 babel）
ni -D postcss-html@1.8.0 postcss-scss@4.0.9
```

stylelint.config.js

See [here](../constraint/stylelint.config.js).

## 5. 引入 sass 支持和 @nuxtjs/style-resources

shell（安装依赖）

```shell
# 限制 node 版本的罪魁祸首！
nun node-sass

# sass 和 sass-loader
ni sass@1.86.3 sass-loader@version-10 -D

# nuxt 模块，通过自动导入实现样式 mixin
ni @nuxtjs/style-resources@1.2.2 -D
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

```shell
ni npm-run-all2@7.0.2 -D
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
    "fix:js": "eslint --fix --ext .js,.vue .",
    "fix:style": "stylelint --fix **/*.{css,scss,html,vue}"
  }
}
```

.prettierignore

```ignore
# Build output
.nuxt
# Assets and static files
assets/icon
assets/images
assets/lang
static
**/iconfont.*
# Node modules
node_modules
# Nuxt app
app/view
app.html

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
ni simple-git-hooks@2.12.1 lint-staged@15.5.0 @commitlint/cli@19.8.0 @commitlint/config-conventional@19.8.0 -D
```

.lintstagedrc.yaml

See [here](../constraint/.lintstagedrc.yaml).

commitlint.config.js

See [here](../constraint/commitlint.config.js).

## 8. 设置 webpack 打包优化

shell（安装依赖）

```shell
ni nuxt-precompress@0.5.9
```

nuxt.config.js

```js
// Uncomment if you want to analyze useless files, just works on dev mode
// import UselessAnalyzerWebpackPlugin from 'useless-analyzer-webpack-plugin'

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

    // Webpack Optimization Plugins
    // nuxt@2.18.1 依赖的 @nuxt/webpack 内置了如下优化插件
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
    terser: ['preprod', 'production'].includes(process.env.NODE_ENV)
      ? {
          extractComments: false,
          terserOptions: {
            // 移除 console.*
            compress: { drop_console: true },
            mangle: true, // 混淆变量名
            output: { comments: false, beautify: false },
          },
        }
      : {},

    // Uncomment if you want to analyze useless files, just works on localDevelopment mode
    // plugins: [
    //   new UselessAnalyzerWebpackPlugin({
    //     preset: 'nuxt',
    //     ignores: [
    //       // 添加你需要忽略的文件... / Add files you need to ignore...
    //       'app.html',
    //       '**/*.scss',
    //     ],
    //     important: [
    //       // 添加你不想忽略的文件... / Add files you don't want to ignore...
    //     ],
    //   }),
    // ],

    // Webpack Optimization Configuration
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true,
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

    // ...
  },
}
```

## 9. 项目兼容性

### Browsers List

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
  }

  // ...
}
```

## 10. 项目可维护性

### Rimraf

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
    "clean": "npm-run-all clean:dist clean:deps",
    "clean:dist": "rimraf .nuxt",
    "clean:deps": "rimraf package-lock.json yarn.lock pnpm-lock.yaml node_modules"
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

- locales

  - modules

    - module-a

      - sub-module
        - en.json
        - zh-CN.json

    - module-b
      - en.json
      - zh-CN.json

  - index.js
