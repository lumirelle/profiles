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
- [Catalogs](#catalogs)
- [Usage](#usage)
  - [Manually Setup](#manually_setup)
  - [Script Setup](#script_setup)
- [Authors](#authors)

## 🧐 About <a name="about"></a>

Development profiles or something else.

## 📑 Catalogs <a name="catalogs"></a>

Top level directory structure, group by purpose:

- `/for-personal`: **&lt;purpose&gt;** Personal usage profiles, support [<u>quickly setup & delete & copy and paste</u>](#script_setup)
- `/for-work`: **&lt;purpose&gt;** Work only profiles (Of course, it's include in `.gitignore`)
- `/manual`: Manuals

Second level directory structure of **&lt;purpose&gt;**, group by category:

- `/constraint`: **&lt;collection|constraint&gt;** Collection of constraint profiles, such as `.editorconfig`, support quickly <u>setup & delete & copy and paste</u>
- `/preferences`: **&lt;collection|preferences&gt;** Collection of preferences profiles, such as `.zshrc`, support quickly <u>setup & delete & copy and paste</u>
- `/templates`: **&lt;collection|templates&gt;** Collection of profile templates, such as `Dockerfile`, support quickly <u>copy and paste</u>
- `/resources`: Resources, such as fonts

Third level directory structure of **&lt;collection|constraint&gt;**, group by situation:

- `/common`: For commonly usage
- `/nodejs`: For node.js based project
- `/webpack`: For webpack based project（It is usually a pure js project）
- `/vue2`: For vue@^2 based project

Third level directory structure of **&lt;collection|preferences&gt;**, group by application:

- `/clash-for-windows`
- `/git`
- `/maven`
- `/neovim`
- `/powershell`
- `/volta`
- `/vs`
- `/vscode`
- `/windows-terminal`
- `/zsh`

Third level directory structure of **&lt;collection|templates&gt;**, group by situation:

- `/common`: For commonly usage
- `/nodejs`: For node.js based project
- `/tomcat`: For tomcat based project
- `/spring-boot`: For spring based project

Total catalogs:

- `for-personal/`

  - `constraint/`

    - `common/`
    - `nodejs/`
    - `webpack/`
    - `vue2/`

  - `preferences/`

    - `clash-for-windows/`
    - `windows-terminal/`
    - `powershell/`
    - `zsh/`
    - `git/`
    - `neovim/`
    - `vscode/`
    - `vscode-ws/`
    - `vs/`
    - `idea/`
    - `maven/`
    - `volta/`

  - `templates/`

    - `common/`
    - `nodejs/`
    - `tomcat/`
    - `spring-boot/`

  - `resources/`

    - `fonts/`

- `for-work/`

  - `constraint/`

    - `common/`

  - `preferences/`

    - `git/`
    - `vscode/`

- `manual/`

  - `life/`
  - `os/`
  - `git/`
  - `nodejs/`
  - `vue/`
  - `nuxt/`

## 🎈 Usage <a name="usage"></a>

### ✋🏼 Manually Setup <a name="manually_setup"></a>

Just download the profiles you want and put it on the right place.

**NOTE: On windows, you should add `create symbolic link permission` to your current user. For more detail, please Google yourself.**

```shell
# cd PATH_TO_HOLD_THIS_REPO
# eg:
cd C:/Projects

# Clone this repo
git clone -c core.symlinks=true https://github.com/Lumirelle/profiles.git
```

### 📜 Script Setup <a name="script_setup"></a>

If you want to use scripts for lazy setup, you should download and unzip this repo, then, add the root path to the `PATH` environment variable of your computer.

Now, you can use [the setup script](pset.ps1) for quick setup and receive the updates automatically:

```shell
# Use PowerShell command `help pset -Full` for more detail.
pset
```

You can also use [the delete script](pdel.ps1) for quick set-down:

```shell
# Use PowerShell command `help pdel -Full` for more detail.
pdel
```

You can also use [the copy and paste script](pcp.ps1) to copy and paste specified profile every where.

```shell
# Use PowerShell command `help pcp -Full` for more detail.
pcp .editorconfig
```

## ✍️ Authors <a name="authors"></a>

- [@Lumirelle](https://github.com/Lumirelle) - Anything
