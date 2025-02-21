<!-- cSpell:disable -->

# Windows Setup

## How to use?

### 1. 准备 Ventoy，安装 Windows 系统

注意：对于 Windows 11 系统，Ventoy 将默认跳过设备检查和联网激活，如你不小心联网，可以通过把网线再登录的方式实现本地账户登录。

- 插入 U 盘，下载安装 [Ventoy](https://www.ventoy.net/cn/download.html)，安装过程遵循[官方说明](https://www.ventoy.net/cn/doc_start.html)
- 下载安装 BT 工具[qBittorrent 增强版](https://github.com/c0re100/qBittorrent-Enhanced-Edition/releases)
- 设置 Tracker <https://fastly.jsdelivr.net/gh/XIU2/TrackersListCollection/all.txt>
- 使用 BT 工具下载 Windows ISO（推荐专业版），并放入 U 盘（如你正在使用 Clash，请切换到直连模式）

  - [Windows 11 ISO](https://next.itellyou.cn/Original/#cbp=Product?ID=42e87ac8-9cd6-eb11-bdf8-e0d4e850c9c6)
  - [Windows 10 ISO](https://next.itellyou.cn/Original/#cbp=Product?ID=f905b2d9-11e7-4ee3-8b52-407a8befe8d1)
  - [其他](https://next.itellyou.cn/Original/#)

- （可选）在 U 盘中常备必要软件及其配置
- U 盘启动，选择 Ventoy 中的 Windows ISO 文件，启动执行引导程序，选择企业版，完成系统安装

### 2. 安装必要软件，卸载无用软件

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
- 按顺序安装配置剩余的必备软件，必备软件必须系统级安装

  | 软件名称                     | 来源/安装                                                                  |
  | ---------------------------- | -------------------------------------------------------------------------- |
  | uTools                       | <https://www.u-tools.cn/download/>                                         |
  | KeePass 2                    | <https://keepass.info/download.html>                                       |
  | Visual Studio Code           | <https://code.visualstudio.com/Download>                                   |
  | Clash for Windows            | <https://github.com/clashdownload/Clash_for_Windows/releases>              |
  | IDM                          | <https://www.internetdownloadmanager.com/download.html>                    |
  | 7-zip                        | <https://www.7-zip.org/download.html>                                      |
  | Auto Dark Mode               | <https://apps.microsoft.com/detail/xp8jk4hzbvf435>                         |
  | Git                          | <https://git-scm.com/download/win>                                         |
  | PixPin                       | <https://pixpin.cn/>                                                       |
  | PotPlayer                    | <https://apps.microsoft.com/detail/xp8bsbgqw2dks0>                         |
  | NVIDIA App                   | <https://www.nvidia.cn/software/nvidia-app/>                               |
  | Office Tools Plus            | <https://otp.landian.vip/zh-cn/download.html>                              |
  | Visual C++ Redistributable   | <https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist> |
  | Revo Uninstaller             | <https://www.revouninstaller.com/zh/revo-uninstaller-free-download/>       |
  | Context Menu Manager         | <https://github.com/BluePointLilac/ContextMenuManager/releases>            |
  | Driver Store Explorer [RAPR] | <https://github.com/lostindark/DriverStoreExplorer/releases>               |
  | DISM++                       | <https://github.com/Chuyu-Team/Dism-Multi-language/releases>               |

- 卸载无用软件：One Drive、微软电脑管家等
- （可选）安装配置其他软件，其他软件可以用户级安装

  | 软件名称             | 来源/安装                                                          |
  | -------------------- | ------------------------------------------------------------------ |
  | WSL                  | `wsl --install`                                                    |
  | Oh My Posh           | `winget install JanDeDobbeleer.OhMyPosh`                           |
  | FNM                  | `winget install Schniz.fnm`                                        |
  | Crystal Disk Info    | <https://crystalmark.info/en/software/crystaldiskinfo/>            |
  | Epic Games           | <https://store.epicgames.com/zh-CN/download>                       |
  | Google Earth Pro     | /                                                                  |
  | JDK                  | <https://www.oracle.com/cn/java/technologies/downloads/>           |
  | JetBrains ToolBox    | <https://www.jetbrains.com/zh-cn/toolbox-app/>                     |
  | KeyboardSplitter     | <https://github.com/djlastnight/KeyboardSplitterXbox/releases>     |
  | LX Music Desktop     | <https://github.com/lyswhut/lx-music-desktop/releases>             |
  | No!! MeiryoUI        | <https://github.com/Tatsu-syo/noMeiryoUI/releases>                 |
  | OBS Studio           | <https://obsproject.com/download>                                  |
  | qBittorrent Enhanced | <https://github.com/c0re100/qBittorrent-Enhanced-Edition/releases> |
  | QQ                   | <https://im.qq.com/pcqq/index.shtml>                               |
  | Steam                | <https://store.steampowered.com/about>                             |
  | Ventoy               | <https://github.com/ventoy/Ventoy/releases>                        |
  | 微信                 | <https://pc.weixin.qq.com/>                                        |

### 3. 维护

- 定期使用 Revo Uninstaller 卸载无用软件
- 定期使用 DISM++ 清理系统
- 定期断电关机重启
