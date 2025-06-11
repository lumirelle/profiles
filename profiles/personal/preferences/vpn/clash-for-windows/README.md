# Best Usage

> R.I.P. Clash.

## Windows Task Scheduler

Recommend configuration:

- 常规

  - 安全选项

    - 运行任务时，请使用下列账户： SYSTEM
    - [x] 不管用户是否登录都要运行
    - [ ] 不使用最高权限允许

  - 配置：Windows Vista、Windows Server 2008

- 触发器

  - 开始任务：登陆时
  - 设置：所有用户

- 操作

  - 操作：启动程序
  - 程序或脚本："C:\Program Files\Clash for Windows Service\clash-core-service.exe"

- 条件

  - 全不勾选

- 设置

  - [x] 允许按需允许任务
  - [x] 如果过了计划开始时间，立即启动任务
  - 如果任务失败，按以下频率重新启动：1 分钟
  - 如果此任务已经运行，以下规则适用：请勿启动新实例

## Clash Geo Ip & Rules Provider

See <https://github.com/Loyalsoldier/geoip> & <https://github.com/Loyalsoldier/clash-rules> for more detail.
