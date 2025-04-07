<h1 align="center">
  <a href="https://github.com/Lyana-nullptr/profiles" rel="noopener">
</h1>

<h3 align="center">Profiles</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)](.)
[![GitHub Issues](https://img.shields.io/github/issues/Lyana-nullptr/profiles.svg)](https://github.com/Lyana-nullptr/profiles/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Lyana-nullptr/profiles.svg)](https://github.com/Lyana-nullptr/profiles/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Development profiles or something else.
    <br>
</p>

## 📝 Table of Content

- [About](#about)
- [Usage](#usage)
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
  - .markdownlint.yml
  - .prettierrc.yml

- manual: Manuals like `git-manual.md`

  - git-manual.md
  - node.js-manual.md
  - node.js-pm-npm-manual.md
  - node.js-pm-yarn-manual.md
  - nuxt.js-v2-manual.md
  - nuxt.js-v2-project-constraint-manual.md
  - prefabricated-dish-manual.md
  - web-front-end-manual.md
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

  - node.js

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

    - extensions.jsonc
    - settings.project.jsonc
    - settings.user.jsonc
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

      - nuxt.js

        - Dockerfile
        - .dockerignore

      - spring-boot/Dockerfile
      - tomcat/Dockerfile

    - docker-compose.yml

## 🎈 Usage <a name="usage"></a>

Just download the profiles you want and put it on the right place.

Or you can use [the setup script](setup.ps1) for quick setup and receive the updates automatically:

```shell
# cd PATH_TO_HOLD_THIS_REPO
# eg:
cd C:/Projects

# Clone this repo, need sudo
sudo git clone -c core.symlinks=true https://github.com/Lyana-nullptr/profiles.git

# Use PowerShell command `help ./setup.ps1 -Full` for more detail.
./setup.ps1
```

You can also use [the setdown script](setdown.ps1) for quick setdown:

```shell
# cd PATH_TO_THIS_REPO
# eg:
cd C:/Projects/profiles

# Use PowerShell command `help ./setdown.ps1 -Full` for more detail.
./setdown.ps1
```

## ✍️ Authors <a name="authors"></a>

- [@Lyana-nullptr](https://github.com/Lyana-nullptr) - Anything
