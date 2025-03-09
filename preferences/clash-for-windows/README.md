# Better Usage

> R.I.P. Clash.

## Windows 任务计划程序

参考配置如下：

- 常规
  - 安全选项
    - 运行任务时，请使用管理员账户
    - 不管用户是否登录都要运行
    - 不使用最高权限允许
- 触发器
  - 登陆时
  - 所有用户
- 操作
  - 启动程序
  - "C:\Program Files\Clash for Windows Service\clash-core-service.exe"
- 条件
  - 无条件（全不勾选）
- 设置
  - 允许按需允许任务
  - 如果过了计划开始时间，立即启动任务
  - 如果任务失败，以 1 分钟的频率重新启动
  - 请勿启动新实例

## GEO IP & Rules Provider

见 <https://github.com/Loyalsoldier/geoip> 和 <https://github.com/Loyalsoldier/clash-rules>。
