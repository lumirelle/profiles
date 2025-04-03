<#
.DESCRIPTION
  Quick setup profiles

.PARAMETER TargetDir
  The directory you want to store profiles

.PARAMETER IgnoreFiles
  The files you want to ignore, separated by comma

.PARAMETER Force
  Force to override the existing files

.PARAMETER Purpose
  The purpose of the profiles, expected values: `self`, `work`

  It is designed for my self, because no one will upload his working profile to github.

.EXAMPLE
  .\scripts\setup.ps1 -TargetDir "C:\Projects"

  This will clone this repository to `C:\Projects\profiles` and create the symbolic links of supported profiles to your computer, so that you can receive the updates automatically.

.EXAMPLE
  .\scripts\setup.ps1 -TargetDir "C:\Projects" -UserIgnoreFiles ".gitconfig,.npmrc,.zshrc"

  If you want to ignore some files, you can add them to the `IgnoreFiles` parameter.

  This will ignore `.gitconfig`, `.npmrc` and `.zshrc`.

.EXAMPLE
  .\scripts\setup.ps1 -TargetDir "C:\Projects" -Force

  If you want to force override the existing files, you can add the `Force` parameter.

  This will force override the existing files.

.EXAMPLE
  .\scripts\setup.ps1 -TargetDir "C:\Projects" -Purpose "work"

  If you want to use a specific purpose, you can add the `Purpose` parameter.

  This will use configs designed for work.
#>

param (
  [Parameter(Mandatory = $true)]
  [Alias("t")]
  [string]$TargetDir,

  [Parameter(Mandatory = $false)]
  [Alias("i")]
  [string[]]$IgnoreFiles = @(),

  [Parameter(Mandatory = $false)]
  [Alias("f")]
  [switch]$Force,

  [Parameter(Mandatory = $false)]
  [Alias("p")]
  [ValidateSet('self', 'work')]
  [string]$Purpose = 'self'
)

Write-Debug 'Parameters:`n'
Write-Debug "TargetDir = $TargetDir`n"
Write-Debug "IgnoreFiles = $IgnoreFiles`n"
Write-Debug "Force = $Force`n"
Write-Debug "Purpose = $Purpose`n"

# == INIT ==
# 仓库地址
$GIT_REPO_URL = "https://github.com/Lyana-nullptr/profiles.git"

# TODO: Support `general/preferences/clash-for-windows`
# 配置文件目录 Name -> Path
$PROFILE_FOLDERS = @(
  # General
  @{Name = "general/constraint"; Path = '~' },
  @{Name = "general/preferences/maven"; Path = '~/.m2' },
  @{Name = "general/preferences/nvim"; Path = "$env:USERPROFILE/AppData/Local/nvim" },
  @{Name = "general/preferences/powershell"; Path = Split-Path -Path $PROFILE -Parent }
  # With Purpose
  @{Name = "$Purpose/constraint"; Path = '~' },
  @{Name = "$Purpose/preferences/git"; Path = '~' }
)

# == CHECK ==
# 如果 TargetDir 不存在，则创建
if (-not (Test-Path $TargetDir)) {
  New-Item -ItemType Directory -Path $TargetDir > $null
}

# 如果 TargetDir/profiles 不存在，则克隆仓库
$ProfilesDir = Join-Path $TargetDir "profiles"
if (-not (Test-Path $ProfilesDir)) {
  Write-Host 'No profiles locally, clone repository...'
  git clone $GIT_REPO_URL $ProfilesDir > $null
}

# == SETUP ==
Write-Host "Start to setup profiles...`n" -ForegroundColor Green

# 创建符号链接
foreach ($folder in $PROFILE_FOLDERS) {
  # 获取目标目录 $folder.Path 下的所有文件
  $SourceDir = Join-Path $ProfilesDir $folder.Name
  if (-not (Test-Path $SourceDir)) {
    Write-Debug "Source directory not found: $SourceDir, skip"
    continue
  }

  $files = Get-ChildItem -Path $SourceDir -Recurse -File
  foreach ($file in $files) {
    # 如果 $file.Name 在 $IgnoreFiles 中，则跳过
    if ($IgnoreFiles -contains $file.Name) {
      Write-Host "Ignore files: $($file.Name)" -ForegroundColor Cyan
      continue
    }

    # 计算目标路径
    $relativePath = $file.FullName.Substring($SourceDir.Length + 1)
    $targetPath = Join-Path $folder.Path $relativePath
    $targetDir = Split-Path -Path $targetPath -Parent

    # 如果目标目录 $targetDir 不存在，则创建
    if (-not (Test-Path $targetDir)) {
      New-Item -ItemType Directory -Path $targetDir -Force > $null
    }

    # 如果目标文件已存在
    if (Test-Path $targetPath) {
      if ($Force) {
        Write-Host "File already exists: $relativePath, will force override" -ForegroundColor Yellow
      }
      else {
        Write-Host "File already exists: $relativePath, will skip" -ForegroundColor Yellow
        continue
      }
    }

    # 创建符号链接
    New-Item -ItemType SymbolicLink -Path $targetPath -Target $file.FullName -Force:$Force > $null
    Write-Host "Created symbolic link: $targetPath -> $($file.FullName)`n"
  }
}

