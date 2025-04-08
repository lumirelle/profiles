<#
.DESCRIPTION
  Quick set down profiles

.PARAMETER Purpose
  The purpose of the profiles, expected values: `self`, `work`

  It is designed for my self, because no one will upload his working profile to github.

.EXAMPLE
  .\scripts\prof-setdown.ps1

  This will remove the symbolic links of supported profiles to your computer.

.EXAMPLE
  .\scripts\prof-setdown.ps1 -Purpose "work"

  If you want to use a specific purpose, you can add the `Purpose` parameter.

  This will use configs designed for work.
#>

param (
  [Parameter(Mandatory = $false)]
  [Alias("p")]
  [ValidateSet('self', 'work')]
  [string]$Purpose = 'self'
)

Write-Debug "Parameters:"
Write-Debug "Purpose = $Purpose`n"

# == INIT & CHECK ==
# 配置文件目录 Name -> Path
$PROFILE_FOLDERS = @(
  # General
  @{ Name = "general/constraint"; Path = '~' }
  @{ Name = "general/preferences/clash-for-windows"; Path = "$env:USERPROFILE/.config/clash" }
  @{ Name = "general/preferences/git"; Path = '~' }
  @{ Name = "general/preferences/maven"; Path = '~/.m2' }
  @{ Name = "general/preferences/nvim"; Path = "$env:USERPROFILE/AppData/Local/nvim" }
  @{ Name = "general/preferences/powershell"; Path = Split-Path -Path $PROFILE -Parent }
  # With Purpose
  @{ Name = "$Purpose/constraint"; Path = '~' }
)

# 忽略文件（增加内置）

# 根目录路径
$RootDirPath = Split-Path -Path $MyInvocation.MyCommand.Path -Parent

# == SETUP ==
Write-Host "`nStart to setdown profiles...`n" -ForegroundColor Green

# 创建符号链接
foreach ($Folder in $PROFILE_FOLDERS) {
  # 获取目标目录 $Folder.Path 下的所有文件
  $ProfilesDirPath = Join-Path $RootDirPath $Folder.Name
  if (-not (Test-Path $ProfilesDirPath)) {
    Write-Host "Profiles directory not found: $ProfilesDirPath, skip`n" -ForegroundColor Yellow
    continue
  }

  $Files = Get-ChildItem -Path $ProfilesDirPath -Recurse -File
  foreach ($File in $Files) {
    # 计算目标路径
    # $RelativePath 是具体配置文件相对 $ProfilesDirPath 的路径
    $RelativePath = $File.FullName.Substring($ProfilesDirPath.Length + 1)
    $TargetFilePath = Join-Path $Folder.Path $RelativePath
    $TargetDirPath = Split-Path -Path $TargetFilePath -Parent

    # 如果目标目录 $TargetDirPath 不存在，则跳过
    if (-not (Test-Path $TargetDirPath)) {
      continue
    }

    # 如果目标文件已存在
    if (Test-Path $TargetFilePath) {
      # 如果目标文件是符号链接，则删除
      if ((Get-Item $TargetFilePath).LinkType -eq 'SymbolicLink') {
        Remove-Item -Path $TargetFilePath -Force:$Force > $null
        Write-Host "Removed symbolic link: $TargetFilePath`n"
      }
      # 如果目标文件不是符号链接，则提示
      else {
        Write-Host "Target file are not symbolic link: $TargetFilePath, skip`n" -ForegroundColor Yellow
        continue
      }
    }
  }
}

