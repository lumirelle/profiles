<#
.DESCRIPTION
  Quick copy and paste profile to current directory

.PARAMETER TargetFileName
  The target profile you want to copy and paste

.PARAMETER Override
  Force to override the existing file

.PARAMETER Purpose
  The purpose of the profiles, expected values: `self`, `work`

  It is designed for my self, because no one will upload his working profile to github.

.EXAMPLE
  .\scripts\prof.ps1 .gitconfig

  This will copy and paste `.gitconfig` (under `general` or `self` folder) to current directory.

.EXAMPLE
  .\scripts\prof.ps1 .gitconfig -Override

  If you want to force override the existing file, you can add the `Override` parameter.

  This will force override the existing file.

.EXAMPLE
  .\scripts\prof.ps1 .gitconfig -Purpose "work"

  If you want to use a specific purpose, you can add the `Purpose` parameter.

  This will use configs designed for work, copy and paste `.gitconfig` (under `general` or `work` folder) to current directory.
#>

param (
  [Parameter(Mandatory = $true)]
  [Alias("t")]
  [string]$TargetFileName,

  [Parameter(Mandatory = $false)]
  [Alias("o")]
  [switch]$Override,

  [Parameter(Mandatory = $false)]
  [Alias("p")]
  [ValidateSet('self', 'work')]
  [string]$Purpose = 'self'
)

Write-Debug "Parameters:"
Write-Debug "TargetFileName = $TargetFileName"
Write-Debug "Override = $Override"
Write-Debug "Purpose = $Purpose`n"

# == INIT & CHECK ==
# 配置文件目录 Name -> Path
$PROFILE_FOLDERS = @(
  # General
  @{ Name = "general/constraint" }
  @{ Name = "general/preferences/clash-for-windows" }
  @{ Name = "general/preferences/git" }
  @{ Name = "general/preferences/maven" }
  @{ Name = "general/preferences/nvim" }
  @{ Name = "general/preferences/powershell" }
  # With Purpose
  @{ Name = "$Purpose/constraint" }
)

# 根目录路径
$RootDirPath = Split-Path -Path $MyInvocation.MyCommand.Path -Parent

# 当前目录路径
$CurrentDirPath = Get-Location

# == Copy & Paste ==
# 在 PROFILE_FOLDERS 中寻找目标文件，获取文件路径
$TargetFilePath = $null
foreach ($Folder in $PROFILE_FOLDERS) {
  # 获取目标目录 $Folder.Path 下的所有文件
  $ProfilesDirPath = Join-Path $RootDirPath $Folder.Name
  if (-not (Test-Path $ProfilesDirPath)) {
    Write-Debug "Profiles directory not found: $ProfilesDirPath, skip`n"
    continue
  }

  $Files = Get-ChildItem -Path $ProfilesDirPath -Recurse -File
  foreach ($File in $Files) {
    if ($File.Name -eq $TargetFileName) {
      $TargetFilePath = $File.FullName
      Write-Debug "Found matched target file: $TargetFilePath`n"
      break
    }
  }
}

# 如果没有找到目标文件，则输出错误信息
if (-not $TargetFilePath) {
  Write-Error "Target file not found in any profile folders."
  return
}

# 如果当前路径已存在同名文件，则根据 Override 参数决定是否覆盖
$CurrentFilePath = Join-Path $CurrentDirPath $TargetFileName
Write-Debug "Current file path: $CurrentFilePath`n"
if (Test-Path $CurrentFilePath) {
  if ($Override) {
    Write-Host "File already exists: $TargetFileName, will force override" -ForegroundColor Yellow
    Copy-Item -Path $TargetFilePath -Destination $CurrentDirPath -Force -ErrorAction SilentlyContinue
  }
  else {
    Write-Host "File already exists: $TargetFileName, will skip" -ForegroundColor Yellow
  }
}
else {
  # 如果不存在，则直接复制
  Write-Host "Copying and paste file: $TargetFileName" -ForegroundColor Green
  Copy-Item -Path $TargetFilePath -Destination $CurrentDirPath -ErrorAction SilentlyContinue
}

