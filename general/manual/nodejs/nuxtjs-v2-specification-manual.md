# Nuxt.js v2 规范手册 Nuxt.js v2 Constraint Manual

Requires node@'^18.18.0 || ^20.9.0 || >=22', npm@>=9, yarn@\*, pnpm@>=7.

Using node@18.20.7, npm@10.8.2, yarn@1.22.22, pnpm@10.7.1.

Main dependencies:

- nuxt@^2.18.1 (vue@^2, webpack@^4, babel@^7, core-js@^3)
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
ni nuxt@^2.18.1
ni @nuxt/types@^2.18.1 -D
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
# eslint
ni eslint@latest -D
# eslint config
ni @antfu/eslint-config@latest -D
# eslint plugin
ni eslint-plugin-format@latest -D

# 一般无需： Babel 解析器，为 eslint 提供新 js 语法的解析支持
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
# stylelint
ni stylelint@latest -D
# stylelint configs，捆绑了 stylelint-scss、stylelint-order
ni stylelint-config-standard-scss@latest stylelint-config-standard-vue@latest stylelint-config-recess-order@latest @stylistic/stylelint-config@latest -D

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
ni sass@latest sass-loader@version-10 -D
```

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

## 6. 配置 npm 快速检查/修复脚本和 eslint、stylelint 忽略文件

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

commitlint.config.js

See [here](../../constraint/commitlint.config.js).

## 8. 设置 webpack 打包优化

shell（安装依赖）

```shell
ni nuxt-precompress@latest
ni useless-analyzer-webpack-plugin@latest -D
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
    test: /\.(js|css|json|txt|html|ico|svg|xml)$/,
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

    // Uncomment if you want to analyze useless files, just works on dev mode
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

```shell
> 1%
last 2 versions
```

### Cross Env

shell（安装依赖）

```shell
# 为环境变量提供跨平台兼容性
ni -D cross-env@latest
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
