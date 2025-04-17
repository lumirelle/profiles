<h1 align="center">
  <a href="https://github.com/Lumirelle/profiles" rel="noopener">
</h1>

<h3 align="center">Profiles</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)](.)
[![GitHub Issues](https://img.shields.io/github/issues/Lumirelle/profiles.svg)](https://github.com/Lumirelle/profiles/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Lumirelle/profiles.svg)](https://github.com/Lumirelle/profiles/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Development profiles or something else.
    <br>
</p>

## 📝 Table of Content

- [About](#about)
- [Usage](#usage)
  - [Manually Setup](#manually_setup)
  - [Script Setup](#script_setup)
- [Authors](#authors)

## 🧐 About <a name="about"></a>

Development profiles or something else.

Purpose Dir Structure:

- general: For any situation
- self: For self usage
- work: For working (ignore by git)

Sub Dir Structure:

- constraint: Constraint profiles like `.editorconfig`

  - .cspell.dev.txt
  - .editorconfig
  - .lintstagedrc.yaml
  - .markdownlint.yaml
  - .npmrc
  - .prettierrc.yaml
  - commitlint.config.mjs
  - eslint.config.mjs
  - jsconfig.json
  - stylelint.config.mjs

- manual: Manuals like `git-manual.md`

  - git

    - git-manual.md

  - life

    - prefabricated-dish-manual.md

  - nodejs

    - nodejs-manual.md
    - nodejs-pm-npm-manual.md
    - nodejs-pm-yarn-manual.md
    - nodejs-pm-pnpm-manual.md
    - nuxtjs-v2-manual.md
    - nuxtjs-v2-specification-constraint-manual.md
    - vuejs-v2-specification-constraint-manual.md
    - web-front-end-manual.md

  - os

    - windows-manual.md

- preferences: Preferences profiles like `.zshrc`

  - clash-for-windows

    - cfw-settings.yaml
    - README.md

  - git

    - .gitconfig

  - jetbrains (need update)

    - mobi.hsz.idea.gitignore/ForIDEA.xml
    - plugins-installed.txt

  - maven

    - settings.xml

  - nodejs

    - volta.hooks.jsonc

  - nvim

    - lua/config

      - autocmds.lua
      - keymaps.lua
      - options.lua

    - init.lua

  - powershell

    - Microsoft.PowerShell_profile.ps1

  - vim (need update)

    - .ideavimrc

  - vs

    - backup.vssettings

  - vscode

    - project

      - extensions.vuejs.v2.jsonc
      - settings.vuejs.v2.jsonc

    - user

      - extensions.default.jsonc
      - extensions.java.jsonc
      - extensions.js.jsonc
      - settings.default.jsonc
      - trusted-domains.jsonc

  - windows-terminal

    - windows-terminal.settings.jsonc

  - zsh

    - .zshrc

- resources: Resources like fonts

  - fonts

    - LxgwBrightCodeTC.zip
    - NerdFontsSymbolsOnly.zip
    - README.md

- templates: Profile templates like Dockerfile

  - docker

    - dockerfile

      - nodejs

        - Dockerfile
        - .dockerignore

      - spring-boot

        - Dockerfile

      - tomcat

        - Dockerfile

    - docker-compose.yml

## 🎈 Usage <a name="usage"></a>

### ✋🏼 Manually Setup <a name="manually_setup"></a>

Just download the profiles you want and put it on the right place.

```shell
# cd PATH_TO_HOLD_THIS_REPO
# eg:
cd C:/Projects

# Clone this repo
git clone -c core.symlinks=true https://github.com/Lumirelle/profiles.git
```

### 📜 Script Setup <a name="script_setup"></a>

If you want to use scripts for lazy setup,
you should download and unzip this repo,
then, add the root path to the `PATH` environment variable of your computer.

**NOTE: On windows, you should add `create symbolic link permission` to your current user.**
**Just run `gpedit.msc`, navigate to `计算机配置 - Windows 设置 - 安全设置 - 本地策略 - 用户权限分配`, and add your current user to `创建符号链接` option.**

Now, you can use [the setup script](prof-setup.ps1) for quick setup and receive the updates automatically:

```shell
# Use PowerShell command `help prof-setup -Full` for more detail.
prof-setup
```

You can also use [the setdown script](prof-setdown.ps1) for quick setdown:

```shell
# Use PowerShell command `help prof-setdown -Full` for more detail.
prof-setdown
```

You can also use [the prof script](prof.ps1) to copy and paste specified profile every where.

```shell
# Use PowerShell command `help prof -Full` for more detail.
prof
```

## ✍️ Authors <a name="authors"></a>

- [@Lumirelle](https://github.com/Lumirelle) - Anything
