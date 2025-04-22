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

Top level directory structure, group by purpose:

- `/for-personal`: **&lt;collection&gt;** Collection of personal usage profiles, support [quickly setup](#script_setup)
- `/for-work`: **&lt;collection&gt;** Collection of work only profiles (Of course, it's include in `.gitignore`)
- `/manual`: Manuals

Second level directory structure of **&lt;collection&gt;**, group by category:

- `/constraint`: **&lt;folder|constraint&gt;** Constraint profiles, like `.editorconfig`
- `/preferences`: **&lt;folder|preferences&gt;** Preferences profiles, like `.zshrc`
- `/templates`: **&lt;folder|templates&gt;** Profile templates, like `Dockerfile`
- `/resources`: Resources, like fonts

Third level directory structure of **&lt;constraint&gt;**, group by situation:

- `/common`: For commonly usage
- `/nodejs`: For node.js based project
- `/webpack`: For webpack based project（It is usually a pure js project）
- `/vue2`: For vue@^2 based project

Third level directory structure of **&lt;preferences&gt;**, group by application:

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

## 🎈 Usage <a name="usage"></a>

### ✋🏼 Manually Setup <a name="manually_setup"></a>

Just download the profiles you want and put it on the right place.

**NOTE: On windows, you should add `create symbolic link permission` to your current user.**

Just run `gpedit.msc`, navigate to `计算机配置 - Windows 设置 - 安全设置 - 本地策略 - 用户权限分配`, and add your current user to `创建符号链接` option.

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

You can also use [the delete script](pdel.ps1) for quick setdown:

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
