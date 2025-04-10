<#
.DESCRIPTION
  Quick copy and paste profile to current directory

.PARAMETER SourceFileName
  The source profile you want to copy and paste

.PARAMETER Destination
  The destination path you want to copy and paste

  If not specified, it will be the current directory.

.PARAMETER Override
  Force to override the existing file

.PARAMETER Purpose
  The purpose of the profiles, expected values: `self`, `work`

  It is designed for my self, because no one will upload his working profile to github.

.EXAMPLE
  prof .gitconfig

  This will copy and paste `.gitconfig` (under `general` or `self` folder) to current directory.

.EXAMPLE
  prof .gitconfig -d "C:\Users\YourName\Documents"

  If you want to copy and paste to a specific directory, you can add the `Destination` parameter.

  This will copy and paste `.gitconfig` (under `general` or `self` folder) to `C:\Users\YourName\Documents`.

.EXAMPLE
  prof .gitconfig -o

  If you want to force override the existing file, you can add the `Override` parameter.

  This will force override the existing file.

.EXAMPLE
  prof .gitconfig -p "work"

  If you want to use a specific purpose, you can add the `Purpose` parameter.

  This will use configs designed for work, copy and paste `.gitconfig` (under `general` or `work` folder) to current directory.
#>

param (
  [Parameter(Mandatory = $true)]
  [Alias("s")]
  [string]$SourceFileName,

  [Parameter(Mandatory = $false)]
  [Alias("d")]
  [string]$Destination,

  [Parameter(Mandatory = $false)]
  [Alias("o")]
  [switch]$Override,

  [Parameter(Mandatory = $false)]
  [Alias("p")]
  [ValidateSet('self', 'work')]
  [string]$Purpose = 'self'
)

Write-Debug "Parameters:"
Write-Debug "SourceFileName = $SourceFileName"
Write-Debug "Destination = $Destination"
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

# 如果 Destination 为空，则使用当前路径
if (-not $Destination) {
  $Destination = Get-Location
}

# == Copy & Paste ==
# 在 PROFILE_FOLDERS 中寻找目标文件，获取文件路径
$SourceFilePath = $null
foreach ($Folder in $PROFILE_FOLDERS) {
  # 获取目标目录 $Folder.Path 下的所有文件
  $ProfilesDirPath = Join-Path $RootDirPath $Folder.Name
  if (-not (Test-Path $ProfilesDirPath)) {
    Write-Debug "Profiles directory not found: $ProfilesDirPath, skip`n"
    continue
  }

  $Files = Get-ChildItem -Path $ProfilesDirPath -Recurse -File
  foreach ($File in $Files) {
    if ($File.Name -eq $SourceFileName) {
      $SourceFilePath = $File.FullName
      Write-Debug "Found matched source profile: $SourceFilePath`n"
      break
    }
  }
}

# 如果没有找到目标文件，则输出错误信息
if (-not $SourceFilePath) {
  Write-Error "Source profile not found in any profile folders."
  return
}

# 如果当前路径已存在同名文件，则根据 Override 参数决定是否覆盖
$CurrentFilePath = Join-Path $Destination $SourceFileName
Write-Debug "Current file path: $CurrentFilePath`n"
if (Test-Path $CurrentFilePath) {
  if ($Override) {
    Write-Host "File already exists: $SourceFileName, will force override" -ForegroundColor Yellow
    Copy-Item -Path $SourceFilePath -Destination $Destination -Force -ErrorAction SilentlyContinue
  }
  else {
    Write-Host "File already exists: $SourceFileName, will skip" -ForegroundColor Yellow
  }
}
else {
  Write-Host "Copying and paste file: $SourceFileName" -ForegroundColor Green
  Copy-Item -Path $SourceFilePath -Destination $Destination -ErrorAction SilentlyContinue
}

