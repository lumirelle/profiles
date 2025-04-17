<#
.DESCRIPTION
  Quick setup profiles

.PARAMETER IgnoreFiles
  The files you want to ignore, separated by comma

.PARAMETER Override
  Force to override the existing files

.PARAMETER Purpose
  The purpose of the profiles, expected values: `self`, `work`

  It is designed for my self, because no one will upload his working profile to github.

.EXAMPLE
  prof-setup

  This will create the symbolic links of supported profiles to your computer, so that you can receive the updates automatically.

.EXAMPLE
  prof-setup -i ".gitconfig,.npmrc,.zshrc"

  If you want to ignore some files, you can add them to the `IgnoreFiles` parameter.

  This will ignore `.gitconfig`, `.npmrc` and `.zshrc`.

.EXAMPLE
  prof-setup -o

  If you want to force override the existing files, you can add the `Override` parameter.

  This will force override the existing files.

.EXAMPLE
  prof-setup -p "work"

  If you want to use a specific purpose, you can add the `Purpose` parameter.

  This will use configs designed for work.
#>

param (
  [Parameter(Mandatory = $false)]
  [Alias("i")]
  [string[]]$IgnoreFiles = @(),

  [Parameter(Mandatory = $false)]
  [Alias("o")]
  [switch]$Override,

  [Parameter(Mandatory = $false)]
  [Alias("p")]
  [ValidateSet('self', 'work')]
  [string]$Purpose = 'self'
)

Write-Debug "Parameters:"
Write-Debug "IgnoreFiles = $IgnoreFiles"
Write-Debug "Override = $Override"
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
$IgnoreFiles += @(
  '.eslintrc.js',
  '.lintstagedrc.yaml',
  '.npmrc',
  'commitlint.config.js',
  'jsconfig.json'
  'stylelint.config.js',
  'README.md'
)

# 根目录路径
$RootDirPath = Split-Path -Path $MyInvocation.MyCommand.Path -Parent

# == SETUP ==
Write-Host "`nStart to setup profiles...`n" -ForegroundColor Green

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
    # 如果 $File.Name 在 $IgnoreFiles 中，则跳过
    if ($IgnoreFiles -contains $File.Name) {
      Write-Host "Ignore files: $($File.Name)`n" -ForegroundColor Cyan
      continue
    }

    # 计算目标路径
    # $RelativePath 是具体配置文件相对 $ProfilesDirPath 的路径
    $RelativePath = $File.FullName.Substring($ProfilesDirPath.Length + 1)
    $TargetFilePath = Join-Path $Folder.Path $RelativePath
    $TargetDirPath = Split-Path -Path $TargetFilePath -Parent

    # 如果目标目录 $TargetDirPath 不存在，则创建
    if (-not (Test-Path $TargetDirPath)) {
      New-Item -ItemType Directory -Path $TargetDirPath -Force > $null
    }

    # 如果目标文件已存在
    if (Test-Path $TargetFilePath) {
      if ($Override) {
        Write-Host "File already exists: $RelativePath, will force override" -ForegroundColor Yellow
      }
      else {
        Write-Host "File already exists: $RelativePath, will skip`n" -ForegroundColor Yellow
        continue
      }
    }

    # 创建符号链接
    New-Item -ItemType SymbolicLink -Path $TargetFilePath -Target $File.FullName -Force:$Override > $null
    Write-Host "Created symbolic link: $TargetFilePath -> $($File.FullName)`n"
  }
}

