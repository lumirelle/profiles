> [!CAUTION]
> This project is deprecated, please use project [Impurities](https://github.com/lumirelle/impurities) instead.

<h1 align="center">
  <a href="https://github.com/lumirelle/profiles" rel="noopener">
</h1>

<h3 align="center">Profiles</h3>

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/lumirelle-profiles)](https://www.npmjs.com/package/lumirelle-profiles)
[![Status](https://img.shields.io/badge/status-active-success.svg)](.)
[![GitHub Issues](https://img.shields.io/github/issues/lumirelle/profiles.svg)](https://github.com/lumirelle/profiles/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/lumirelle/profiles.svg)](https://github.com/lumirelle/profiles/pulls)
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

The directory structure under `/profiles`, is grouped by purpose:

- `/personal`: **&lt;purpose&gt;** Personal usage profiles
- `/work`: **&lt;purpose&gt;** Work-only profiles (Of course, it should be ignored by git)

The directory structure under folders marked as **&lt;purpose&gt;**, is grouped by category:

- `/docs`: Documents, such as manuals
- `/preferences`: **&lt;collection&gt;** Collection of preferences profiles, such as `.gitconfig`
- `/resources`: Resources, such as fonts

The directory structure under folders marked as **&lt;collection&gt;**, is grouped by situation:

- `/deployer`: **&lt;purpose&gt;** Profiles used by deployer
- `/editor`: **&lt;purpose&gt;** Profiles used by editor
- `/formatter`: **&lt;purpose&gt;** Profiles used by formatter
- `/linter`: **&lt;purpose&gt;** Profiles used by linter
- `/package-manager`: **&lt;purpose&gt;** Profiles used by package manager
- `/terminal`: **&lt;purpose&gt;** Profiles used by terminal
- `/vcs`: **&lt;purpose&gt;** Profiles used by version control system
- `/vpn`: **&lt;purpose&gt;** Profiles used by vpn

The directory structure under folders marked as **&lt;purpose&gt;**, is grouped by program. I will not list them all here.

See total catalogs [here](CATALOGS.json).

## 🎈 Usage <a name="usage"></a>

### ✋🏼 Manually Setup <a name="manually_setup"></a>

Just download the profile you want and put it in the right place.

### 📜 Script Setup <a name="script_setup"></a>

Install this package by node.js package manager like `npm`, `yarn`, `pnpm` and so on.

```shell
pnpm i lumirelle-profiles -g
```

Now, please enjoy! See the help information by using the command below:

```shell
pi --help
```

## ✍️ Authors <a name="authors"></a>

- [@lumirelle](https://github.com/lumirelle) - Anything
