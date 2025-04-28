# Windows 手册 Windows Manual

## 如何配置？ How to setup?

### 1. 使用 Ventoy 制作 U 盘启动器，安装 Windows 系统

> 注意：Ventoy 默认跳过了 Windows 系统的设备检测和联网激活，如你不小心联网，可以通过拔掉网线再登录的方式实现本地账户登录。

- 插入 U 盘，下载并安装 [Ventoy](https://www.ventoy.net/cn/download.html)，安装过程遵循[官方说明](https://www.ventoy.net/cn/doc_start.html)
- 下载并安装 BT 工具[qBittorrent 增强版](https://github.com/c0re100/qBittorrent-Enhanced-Edition/releases)
- 设置 Tracker <https://fastly.jsdelivr.net/gh/XIU2/TrackersListCollection/all.txt>
- 使用 BT 工具下载 Windows ISO（推荐专业版），并放入 U 盘（如你正在使用 Clash，请切换到直连模式）

  - [Windows 11 ISO](https://next.itellyou.cn/Original/#cbp=Product?ID=42e87ac8-9cd6-eb11-bdf8-e0d4e850c9c6)
  - [Windows 10 ISO](https://next.itellyou.cn/Original/#cbp=Product?ID=f905b2d9-11e7-4ee3-8b52-407a8befe8d1)
  - [其他](https://next.itellyou.cn/Original/#)

- （可选）在 U 盘中准备必要软件及其配置
- U 盘启动，选择 Ventoy 中的 Windows ISO 文件，启动执行引导程序，选择专业版，完成系统安装

### 2. 安装必要软件，卸载无用软件

- 关闭 Windows Defender 的防病毒功能
- 安装火绒并重启系统

  | 软件名称 | 来源/安装                       |
  | -------- | ------------------------------- |
  | 火绒     | <https://www.huorong.cn/person> |

- 使用 Windows 11 轻松设置关闭防火墙、调整系统设置（Windows 10 可用）并重启

  | 软件名称            | 来源/安装                                          |
  | ------------------- | -------------------------------------------------- |
  | Windows 11 轻松设置 | <https://www.bilibili.com/opus/904672369138729017> |

- 使用 HEU KMS Activator 激活 Windows

  | 软件名称          | 来源/安装                                             |
  | ----------------- | ----------------------------------------------------- |
  | HEU KMS Activator | <https://github.com/zbezj/HEU_KMS_Activator/releases> |

- 登录 Microsoft 账号，同步系统数据，调整系统设置
- 浏览器登录 Microsoft 账号同步数据，设置 Adguard、Dark Reader 等插件
- 按顺序系统级安装并配置如下基建软件：

  | 软件名称                     | 来源/安装                                                                  |
  | ---------------------------- | -------------------------------------------------------------------------- |
  | uTools                       | <https://www.u-tools.cn/download/>                                         |
  | KeePass 2                    | <https://keepass.info/download.html>                                       |
  | Visual Studio Code           | <https://code.visualstudio.com/Download>                                   |
  | Clash for Windows            | <https://github.com/clashdownload/Clash_for_Windows/releases>              |
  | IDM                          | <https://www.internetdownloadmanager.com/download.html>                    |
  | 7-zip                        | <https://www.7-zip.org/download.html>                                      |
  | Git                          | <https://git-scm.com/download/win>                                         |
  | Visual C++ Redistributable   | <https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist> |
  | Revo Uninstaller             | <https://www.revouninstaller.com/zh/revo-uninstaller-free-download/>       |
  | Context Menu Manager         | <https://github.com/BluePointLilac/ContextMenuManager/releases>            |
  | Driver Store Explorer [RAPR] | <https://github.com/lostindark/DriverStoreExplorer/releases>               |
  | DISM++                       | <https://github.com/Chuyu-Team/Dism-Multi-language/releases>               |

- 按顺序系统级安装如下工具软件：

  | 软件名称          | 来源/安装                                              |
  | ----------------- | ------------------------------------------------------ |
  | 微信              | <https://pc.weixin.qq.com/>                            |
  | QQ                | <https://im.qq.com/pcqq/index.shtml>                   |
  | Office Tools Plus | <https://otp.landian.vip/zh-cn/download.html>          |
  | LX Music Desktop  | <https://github.com/lyswhut/lx-music-desktop/releases> |
  | NVIDIA App        | <https://www.nvidia.cn/software/nvidia-app/>           |
  | Steam             | <https://store.steampowered.com/about>                 |
  | Epic Games        | <https://store.epicgames.com/zh-CN/download>           |
  | Auto Dark Mode    | <https://apps.microsoft.com/detail/xp8jk4hzbvf435>     |
  | PixPin            | <https://pixpin.cn/>                                   |
  | Cursor            | <https://www.cursor.com/cn/downloads>                  |
  | Neovim            | `winget install Neovim.Neovim`                         |
  | PotPlayer         | <https://apps.microsoft.com/detail/xp8bsbgqw2dks0>     |
  | OBS Studio        | <https://obsproject.com/download>                      |

- 按顺序系统级安装如下开发环境：

  | 软件名称           | 来源/安装                                                              |
  | ------------------ | ---------------------------------------------------------------------- |
  | PowerShell 7       | <https://github.com/PowerShell/PowerShell/releases/latest>             |
  | Oh My Posh         | `winget install JanDeDobbeleer.OhMyPosh`                               |
  | LazyVim            | <https://www.lazyvim.org/installation>                                 |
  | Mingw-w64          | <https://github.com/niXman/mingw-builds-binaries/releases/latest>      |
  | FNM & Node.js      | `winget install Schniz.fnm`                                            |
  | JDK                | <https://www.oracle.com/cn/java/technologies/downloads/#graalvmjava21> |
  | Miniconda          | <https://www.anaconda.com/download/success#miniconda>                  |
  | Visual Studio      | <https://visualstudio.microsoft.com/zh-hans/downloads/>                |
  | Visual Studio Code | 先前已安装                                                             |
  | JetBrains Toolbox  | <https://www.jetbrains.com/zh-cn/lp/toolbox/>                          |
  | JetBrains IDEA     | 使用 JetBrains Toolbox 安装                                            |
  | JetBrains PyCharm  | 使用 JetBrains Toolbox 安装                                            |
  | WSL                | `wsl --install`                                                        |

- 卸载无用软件：One Drive、微软电脑管家等
- （可选）安装配置其他软件，其他软件可以用户级安装

  | 软件名称             | 来源/安装                                                          |
  | -------------------- | ------------------------------------------------------------------ |
  | Ventoy               | <https://github.com/ventoy/Ventoy/releases>                        |
  | qBittorrent Enhanced | <https://github.com/c0re100/qBittorrent-Enhanced-Edition/releases> |
  | Crystal Disk Info    | <https://crystalmark.info/en/software/crystaldiskinfo/>            |
  | Google Earth Pro     | /                                                                  |
  | KeyboardSplitter     | <https://github.com/djlastnight/KeyboardSplitterXbox/releases>     |
  | No!! MeiryoUI        | <https://github.com/Tatsu-syo/noMeiryoUI/releases>                 |

### 3. 设置必要配置文件

使用 [setup.ps1](../../setup.ps1)。

### 4. 维护

- 定期使用 Revo Uninstaller 卸载无用软件
- 定期使用 DISM++ 清理系统
- 定期断电关机重启
