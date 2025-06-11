# Web 前端手册 / Web Front End Manual

## 📚 目录 / TOC

- [规范开发 / Standardized Development](#standardized-dev)

- [前端技术发展 / Development of Front End Techniques](#dev-of-front-end)

- [HTML & CSS & JS](#html-css-js)

  - [必学滴 Flex 布局](#flex-layout)
  - [必学滴 Grid 布局](#grid-layout)
  - [必学滴 JS 知识](#js-basic)

- [框架 / Framework](#framework)

  - [CSS 框架](#css-framework)
  - [JS 框架](#js-framework)
  - [UI 构建框架（及其衍生的应用框架 & 组件库）](#ui-framework)

    - Vue.js

      - Vue 响应式系统
      - Vue SFC
      - Vue 生命周期
      - Vue 渲染机制和渲染函数
      - Vue 内置组件
      - Vue 性能优化
      - Vue Router
      - Vuex & Pinia
      - CSR、SSR、SSG 渲染模式
      - Nuxt.js（适用于 Vue.js 的应用框架）
      - Element UI/Plus（适用于 Vue.js 的 PC 端组件库）
      - Vant（适用于 Vue.js 的 H5 端组件库）

- [前端项目工程化 / Engineering of Front End Project](#engineering-of-project)

  - [TS](#ts)
  - [模块化](#modularization)

  - [工具生态](#tool-ecosystem)

    - Parser
    - Transformer
    - Test runner
    - Linter
    - Formatter

    - [Bundler](#bundler)

      - Webpack
      - Vite

    - Monorepo tool
    - Runtime
    - Package manager

  - [CSS 预处理](#pre-css)
  - [CSS 后处理](#post-css)

  - [设备屏幕兼容](#screen-comp)

    - [设备像素 & 逻辑像素](#dpx-lpx)
    - [rem & postcss-pxtorem](#rem)

- 必会滴工具库

  - cross-env
  - Axios
  - Day.js
  - Lodash
  - SheetJS
  - Math.js
  - bignumber.js
  - clipboard.js
  - JS Cookie
  - NProgress
  - ECharts

## 👩🏼‍💻 规范开发 / Standardized Development <a name="standardized-dev"></a>

- 代码规范：使用 editorconfig + eslint + stylelint
- 提交规范：使用 simple-git-hook + commitlint
- 开发环境规范：使用 fnm + corepack + npm/pnpm/yarn
- 配置文件：<https://github.com/Lumirelle/profiles>

## 🚀 前端技术发展 / Development of Front End Techniques <a name="dev-of-front-end"></a>

1990 年 12 月，Tim Berners-Lee 创造了万维网（World Wide Web）和 HTML，与随后诞生的 CSS、JavaScript
技术，一同标志着静态网页技术的诞生。

网页的静态、动态指的并不是网页的动效，而是动态展示内容和提供丰富用户交互的能力。

1995 年，Rasmus Lerdof 创造了 PHP，让 Web 可以访问数据库，实现了动态网页。自此，各式各样的动态网页技术（如
ASP、JSP）出现， Web 项目也迎来了以后端主导的 MVC（Model View Controller）架构。在架构里，前端技术承担着 View
的职责，后端技术承担着 Model 和 Controller 的职责。

2005 年，AJAX（Async JavaScript And XML）的普及，允许前端访问后端服务来取得数据，标志着前后端的逐步分离，一个
Web 项目划分成了前端、后端两个独立的项目。

2008 年，HTML5 草案提出，带来前端代码复杂度的增加，使得前端项目也急需实现自己的架构，三大 UI 框架 AngularJS、
React.js、Vue.js 随之诞生，带来了 MVP、MVVM 等前端项目架构，也带来了单页面应用（SPA）和前端路由的兴起。SPA
与前端路由使得后端不再负责渲染模板，也不再控制页面路由。自此，前端技术在 Web 项目中承担着 View 和 Controller
的职责，后端技术则变得侧重于数据提供和数据安全，承担着 Model 的职责。在 Web 项目中，以后端主导的 MVC
架构慢慢转为了以前端主导的 MVC 架构。

2010 年，基于 V8 引擎的 Node.js JavaScript 运行时诞生，为前端项目带来了服务端能力。SPA 客户端侧渲染（CSR）导致
SEO 不友好、网页白屏时间长、界面渲染慢等问题得到缓解，基于 Vue.js、React.js 生态的应用框架 Nuxt.js、Next.js
诞生，提供了服务端侧渲染（SSR）的解决方案。也因此，衍生出了基于前端技术的全栈开发、跨平台原生开发。

NOTE：现代前端技术的核心可以说是 JS 技术，HTML 与 CSS 都成为了 JS 所管理的成分。

## 🎭 HTML & CSS & JS <a name="html-css-js"></a>

### 必学滴 Flex 布局 <a name="flex-layout"></a>

每天看一遍 MDN 之 [Flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)。

### 必学滴 Grid 布局 <a name="grid-layout"></a>

每天看一遍 MDN 之 [Grid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid)。

### 必学滴 JS 知识 <a name="js-basic"></a>

见 [js-basic.md](js/js-basic-manual.md)

## 🏹 框架 / Framework <a name="framework"></a>

### CSS 框架 <a name="css-framework"></a>

基于原子化 CSS 的概念诞生了如下 CSS 框架：

- Bootstrap
- Tailwind

### JS 框架 <a name="js-framework"></a>

JS 框架主要有如下：

- JQuery

### UI 构建框架（及其衍生的应用框架 & 组件库） <a name="ui-framework"></a>

用户界面构建框架：

- AngularJS/Angular

  其下应用框架：Angular Universal

  其下组件库：Angular Material

- React.js

  其下应用框架：Next.js

  其下组件库：Material UI、Ant Design

- Vue.js

  其下应用框架：Nuxt.js

  其下组件库：Element UI/Element Plus、Vuetify、Ant Design Vue、Vant

## 📏 前端项目工程化 / Engineering of Front End Project <a name="engineering-of-project"></a>

### TS <a name="ts"></a>

TypeScript 相较于 JavaScript 增加了类型检查，在项目工程化中起到提高可读性、可维护性的作用。

### 模块化 <a name="modularization"></a>

随着前端技术的发展和项目代码量的膨胀，外联 JS 的方式已经无法满足组织项目代码的需求，由 RequireJS 带来的 AMD
规范和 Sea.js 带来的 CMD 规范随之诞生，二者使用异步模块加载方式，带来了 JS 模块化。

随着 Node.js 的兴起，CommonJS 模块化规范成为主流，采用同步模块加载方式。2015 年，JS 官方模块化规范 ESM
才姗姗来迟，同时支持同步和异步模块加载方式，成为了现今最流行的模块化规范。

- CommonJS 方案由 Node.js 原生支持，其他 JS 运行时兼容但非核心，使用 `require` 函数和 `modules.export` 属性实现模块化
- ESM 方案在现代浏览器（除 IE 11）和主流 JS 运行时（Node.js、Deno、Bun）中都支持，使用 `import` 和 `export` 关键字实现模块化

### 工具生态 <a name="tool-ecosystem"></a>

- Parser: babel / acorn / esbuild / espree / flow / TS / swc / uglify-js
- Transformer: babel / esbuild / swc / sucrase / TS
- Test runner: mocha / jasmine / tape / ava / jest
- Linter: jshint / eslint / biome / hint
- Formatter: prettier / eslint
- Bundler: webpack / rollup / esbuild / parcel
- Monorepo tools: nx / tuborepo / rush / lerna / lage / wireit

#### Bundler <a name="bundler"></a>

构建，最终的目标是将源代码转换为生产环境下的代码。围绕着这个终极目标，我们需要使用构建工具的模块打包、代码压缩、代码分割、树摇优化等功能，优化产出的代码。

随着 Node.js 的兴起，让得 JS 拥有了脱离浏览器执行的能力和文件操作能力，也让得 CommonJS
规范成为了主流，一批基于 Node.js 和 CommonJS 规范的前端构建工具如 Grunt、Gulp、Browserify 出现。Grunt
能够基于配置和插件自动完成重复任务，如代码压缩、编译、单元测试，但其 IO 操作频繁且缓慢；基于流的
Gulp 则提供了一种更优雅的流式构建方式，使得构建工具性能和效率得到提升；Browserify 的功能单一，只提供了
CommonJS 模块打包能力（即将多个 CommonJS 模块打包转换成一个浏览器上可以运行的 JS 文件）。

随着 SPA 以及 ESM 规范的流行，Webpack2 顺势发布，宣布支持 AMD、CommonJS、ESM 等规范，CSS、LESS、SASS
等语言，Angular、Vue 等框架，其强大和全面的能力，成为构建复杂 SPA 的最佳工具之选。Webpack
也是配置驱动的，大而全的配置模式导致配置过程非常繁琐，也促使了更小巧的 Rollup 的诞生，不过 Rollup
作为后起之秀，生态完整度和社区支持度不如 Webpack。

随着前端工程化的壮大，庞大前端项目的构建时间动辄数十分钟，构建工具的构建性能逐渐成为关注重点。Esbuild
等底层使用高性能语言编写的构建工具随之诞生。需要注意的是，Esbuild 至今（2025/01/23）还未发布稳定版。

随着 ESM 的浏览器支持越来越好，如 Vite 等主打不打包（budless）概念的构建工具诞生。在开发模式下，Vite
使用 Esbuild 对项目的依赖进行预构建，将其中的 CommonJS 模块转换为 ESM 模块，并将如 lodash-es
这样的依赖项打包为一个文件，避免瀑布请求，此后直接输出 ESM 至浏览器，极大地加快了构建速度；在生产模式下的
Vite，考虑到 Esbuild 稳定性、浏览器兼容性和 RTT 时间，转为使用 Rollup 对整个项目均进行构建。

### CSS 预处理 <a name="pre-css"></a>

CSS 预处理器可以为开发人员解决 CSS 在开发中不支持嵌套、变量等特性的痛点。常见的 CSS 预处理器有：

- [SASS/SCSS](http://www.sass.hk/docs/)
- LESS
- Stylus

### CSS 后处理 <a name="post-css"></a>

Postcss 是一个支持插件的 CSS 后处理器，能为开发人员解决浏览器兼容、px rem 转换等问题，常用的 Postcss 插件有：

- autoprefixer
- postcss-pxtorem

### 设备屏幕兼容 <a name="screen-comp"></a>

#### 设备像素 & 逻辑像素 <a name="dpx-lpx"></a>

像素每英寸（PPI）表示设备屏幕对角线上每英寸长度的像素数量，是用来衡量设备屏幕上像素密度的值。PPI
越大则单个像素的物理尺寸越小。

当我们基于设备像素做设计时，会出现同样像素尺寸的元素在 PPI 大的屏幕上的物理尺寸变小。如高度设置为
1080 设备像素的元素在同为 24 英寸 16:9 的 1080p 屏幕上高 29.90cm，而在 1440p 屏幕上只高
22.425cm，因此引入了逻辑像素。

$1 \; 设备像素（physical \; px）= 1 \; 逻辑像素（logic \; px）* 设备像素比（DPR）$。通过提高 DPR
和使用逻辑像素，能够解决高分辨率屏幕的显示问题。CSS 中的 px 就是逻辑像素。

对于一些设备，DPR 采用的是操作系统中的缩放设置，如 Windows 中“缩放布局”下的设置；对于
iOS 设备，DPR 是固定的，如 iPhone 6 的 DPR 为 2、iPhone 13 Pro Max 的 DPR 为 3。

移动端的界面设计通常会以 iPhone 6 为设计基准，它的设备像素分辨率是 750x1334，逻辑像素分辨率是
375x667，因此产出的设计稿通常宽度是 375 逻辑像素。

#### rem & postcss-pxtorem <a name="rem"></a>

逻辑像素（以下简称 px）解决了高分辨率屏幕的显示问题，但他仍然是一个绝对单位（取决于
DPR），无法实现与屏幕成比例的尺寸。实现一个这样的尺寸主要是为了完成移动设备的适配。

rem 可以实现与屏幕成比例的尺寸。当我们给 HTML 页面设置了 meta 标签，将视口宽度设置为逻辑像素宽度，配合 CSS 样式，将 HTML 元素的字体设置为 10vw 后，我们就可以在任意设备上实现 1rem = 10% 屏幕宽度。通过这种方式，使用 rem
可以实现在不同的设备上实现统一的显示效果。

```html
<html>
  <head>
    <!-- 设置 meta 标签，1vw = 1 logic px = 1% 屏幕宽度 -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- 设置样式：1rem = 10vw = 10% 屏幕宽度 -->
    <style>
      html {
        font-size: 10vw;
      }
    </style>
  </head>
</html>
```

在将设计稿中的尺寸从 px 转换为 rem 时，需要不停地换算，如 375px 的设计稿中宽度 120px 的元素需要换算为
$\frac{元素宽度}{设计稿宽度} * 10 = \frac{120px}{375px} * 10 = 3.2rem$，这对开发来说是一种负担。
postcss-pxtorem 通过设置 rootValue（设计稿宽度 / 10），利用 CSS 后置处理器实现了自动换算。使用了
postcss-pxtorem ，我们只需要将设计稿的宽度（蓝湖等工具支持设计稿宽度自适应）或 rootValue
设置为相对应的值，即可直接使用 px 进行开发。
