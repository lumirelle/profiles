# Nuxt.js 2 优化手册 / Nuxt.js 2 Optimization Manual

Requires node@'^18.18.0 || ^20.9.0 || >=22', npm@>=9, pnpm@>=7.

This article base on node@18.20.8, npm@10.9.2, pnpm@10.11.1.

Main dependencies:

- nuxt@^2.18.1 (vue@^2, webpack@^4, babel@^7, core-js@^3)
- eslint@latest, stylelint@latest

## 1. 设置 webpack 打包优化和未导入文件检测插件

### 依赖安装

shell

```shell
ni nuxt-precompress@latest
ni useless-analyzer-webpack-plugin@latest -D
```

### 手动配置

nuxt.config.js

```js
// Uncomment if you want to analyze useless files, just works on dev mode
// import UselessAnalyzerWebpackPlugin from 'useless-analyzer-webpack-plugin'

export default {
  // ...

  modules: [
    // ...
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
            // 混淆变量名
            mangle: true,
            // 去除注释 & 压缩代码
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
    //       '**/*.scss',
    //     ],
    //     important: [
    //       // 添加你不想忽略的文件... / Add files you don't want to ignore...
    //     ],
    //   }),
    // ],

    // Webpack Optimization Configuration
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
