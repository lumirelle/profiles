<#
.DESCRIPTION
  Quick setup profiles

.PARAMETER TargetDir
  The directory you want to store profiles

.PARAMETER UserIgnoreFiles
  The files you want to ignore, separated by comma

.PARAMETER Force
  Force to override the existing files

.EXAMPLE
  .\scripts\setup.ps1 -TargetDir "C:\Projects"

  This will clone this repository to `C:\Projects\profiles` and create the symbolic links to your computer, so than you can receive the updates automatically.

  If you want to ignore some files, you can add them to the `UserIgnoreFiles` parameter.

  .\scripts\setup.ps1 -TargetDir "C:\Projects" -UserIgnoreFiles ".gitconfig,.npmrc,.zshrc"

  This will ignore `.gitconfig`, `.npmrc` and `.zshrc`.

  If you want to force override the existing files, you can add the `Force` parameter.

  .\scripts\setup.ps1 -TargetDir "C:\Projects" -Force

  This will force override the existing files.
#>

param (
  [Parameter(Mandatory = $true)]
  [Alias("t")]
  [string]$TargetDir,
  [Parameter(Mandatory = $false)]
  [Alias("i")]
  [string[]]$UserIgnoreFiles = @(),
  [Parameter(Mandatory = $false)]
  [Alias("f")]
  [switch]$Force
)

# == INIT ==
# 仓库地址
$GIT_REPO_URL = "https://github.com/Lyana-nullptr/profiles.git"

# 配置文件目录 Name -> Path
$PROFILE_FOLDERS = @(
  @{Name = "constraint"; Path = '~' },
  @{Name = "preferences/git"; Path = '~' },
  @{Name = "preferences/maven"; Path = '~/.m2' },
  @{Name = "preferences/node.js"; Path = '~' },
  @{Name = "preferences/nvim"; Path = "$env:USERPROFILE/AppData/Local/nvim" },
  @{Name = "preferences/powershell"; Path = Split-Path -Path $PROFILE -Parent }
)

# 忽略文件
$IGNORE_FILES = @("wrk.gitconfig", "volta.hooks.jsonc") + $UserIgnoreFiles

# == CHECK ==
# 如果 TargetDir 不存在，则创建
if (-not (Test-Path $TargetDir)) {
  New-Item -ItemType Directory -Path $TargetDir > $null
}

# 如果 TargetDir/profiles 不存在，则克隆仓库
$ProfilesDir = Join-Path $TargetDir "profiles"
if (-not (Test-Path $ProfilesDir)) {
  git clone $GIT_REPO_URL $ProfilesDir > $null
}

# == SETUP ==
Write-Host "开始创建符号链接..." -ForegroundColor Green

# 创建符号链接
foreach ($folder in $PROFILE_FOLDERS) {
  # 获取目标目录 $folder.Path 下的所有文件
  $SourceDir = Join-Path $ProfilesDir $folder.Name
  $files = Get-ChildItem -Path $SourceDir -Recurse -File
  foreach ($file in $files) {
    # 如果 $file.Name 在 $IGNORE_FILES 中，则跳过
    if ($IGNORE_FILES -contains $file.Name) {
      Write-Host "忽略文件: $($file.Name)" -ForegroundColor Cyan
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
        Write-Host "文件已存在: $relativePath, 将强制覆盖" -ForegroundColor Yellow
      }
      else {
        Write-Host "文件已存在: $relativePath, 将跳过" -ForegroundColor Yellow
        continue
      }
    }

    # 创建符号链接
    New-Item -ItemType SymbolicLink -Path $targetPath -Target $file.FullName -Force:$Force > $null
    Write-Host "已创建符号链接: $relativePath -> $($file.FullName)"
  }
}

