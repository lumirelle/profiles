<#
.DESCRIPTION
  Quick setup supported global profiles

.PARAMETER IgnoredFiles
  The files you want to ignore, separated by comma

.PARAMETER Override
  Force to override the existing files

.PARAMETER Purpose
  The purpose of the profiles, expected values: `for-personal`, `for-work`

  It is designed for my self, because no one will upload his working profile to github.

.EXAMPLE
  prof-setup

  This will create the symbolic links of supported profiles to your computer, so that you can receive the updates automatically.

.EXAMPLE
  prof-setup -i ".gitconfig,.npmrc,.zshrc"

  If you want to ignore some files, you can add them to the `IgnoredFiles` parameter.

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
  [string[]]$IgnoredFiles = @(),

  [Parameter(Mandatory = $false)]
  [Alias("o")]
  [switch]$Override,

  [Parameter(Mandatory = $false)]
  [Alias("p")]
  [ValidateSet('for-personal', 'for-work')]
  [string]$Purpose = 'for-personal'
)

Write-Debug "Parameters:"
Write-Debug "IgnoredFiles = $IgnoredFiles"
Write-Debug "Override = $Override"
Write-Debug "Purpose = $Purpose`n"

# == INIT & CHECK ==
$Separator = [IO.Path]::DirectorySeparatorChar
# 配置文件目录 Path -> Destination
$SUPPORTED_PROFILE_FOLDERS = @(
  @{ 
    Path            = "for-personal${Separator}constraint"; 
    DestinationPath = "~"; 
    Ignores         = @(
      "common${Separator}.gitattributes",
      "common${Separator}.lintstagedrc.yaml",
      "common${Separator}.markdownlint.yaml",
      "common${Separator}.npmrc",
      "common${Separator}.prettierrc.yaml",
      "common${Separator}commitlint.config.js",
      "common${Separator}eslint.config.mjs",
      "common${Separator}jsconfig.json",
      "common${Separator}stylelint.config.js",
      "nodejs${Separator}.gitignore",
      "vue2${Separator}.lintstagedrc.yaml",
      "vue2${Separator}eslint.config.mjs",
      "vue2${Separator}stylelint.config.js",
      "webpack${Separator}eslint.config.mjs"
    ) 
  },
  @{ 
    Path            = "for-personal${Separator}preferences"; 
    DestinationPath = @{
      "git"        = "~";
      "maven"      = "~$Separator.m2";
      "neovim"     = "$($env:LOCALAPPDATA)${Separator}nvim";
      "powershell" = $(Split-Path -Path $PROFILE -Parent);
    };
    Ignores         = @(
      "common${Separator}clash-for-windows${Separator}",
      "common${Separator}idea${Separator}",
      "common${Separator}volta${Separator}",
      "common${Separator}vs${Separator}",
      "common${Separator}vscode${Separator}",
      "common${Separator}windows-terminal${Separator}",
      "common${Separator}zsh${Separator}",
      "java${Separator}vscode${Separator}",
      "js${Separator}vscode${Separator}",
      "vue2${Separator}vscode${Separator}"
    ) 
  }
)

# 根目录路径
$RootPath = Split-Path -Path $MyInvocation.MyCommand.Path -Parent

# == SETUP ==
Write-Host "`nStart to setup profiles...`n" -ForegroundColor Green

# 遍历 $SUPPORTED_PROFILE_FOLDERS 中的每个文件夹
foreach ($Folder in $SUPPORTED_PROFILE_FOLDERS) {
  # 获取 $Folder.Path 的完整路径，如果目录不存在，则跳过并输出提示信息
  $FolderPath = Join-Path $RootPath $Folder.Path
  if (-not (Test-Path $FolderPath)) {
    Write-Host "Profiles directory not found: $FolderPath, skip`n" -ForegroundColor Yellow
    continue
  }



  # 获取 $FolderPath 下的所有文件
  $Profiles = Get-ChildItem -Path $FolderPath -Recurse -File
  :profile_loop foreach ($Profile in $Profiles) {
    # $PathRelativeToFolderPath 是具体配置文件相对 $FolderPath 的路径
    $PathRelativeToFolderPath = $Profile.FullName.Substring($FolderPath.Length + 1)

    # 如果 $Profile.Path 在 $IgnoredFiles 中，则跳过
    foreach ($Ignore in $Folder.Ignores) {
      if ($PathRelativeToFolderPath.StartsWith($Ignore)) {
        Write-Debug "Ignore files: $($Folder.Path)$Separator$PathRelativeToFolderPath`n"
        continue profile_loop
      }
    }

    # 如果 $Folder.DestinationPath 是字典，则基于 $PathRelativeToFolderPath 的文件夹名获取目标目录
    if ($Folder.DestinationPath -is [System.Collections.IDictionary]) {
      $DestinationRelativeToFolderPath = $Folder.DestinationPath[$PathRelativeToFolderPath.Split($Separator)[1]]
    }
    else {
      $DestinationRelativeToFolderPath = $Folder.DestinationPath
    }
    # 如果目标目录 $DestinationRelativeToFolderPath 不存在，则创建
    if (-not (Test-Path $DestinationRelativeToFolderPath)) {
      New-Item -ItemType Directory -Path $DestinationRelativeToFolderPath -Force > $null
    }

    # 如果目标文件已存在
    $Destination = Join-Path $DestinationRelativeToFolderPath $PathRelativeToFolderPath
    if (Test-Path $Destination) {
      if ($Override) {
        Write-Host "Profile already exists: $PathRelativeToFolderPath, will force override" -ForegroundColor Yellow
      }
      else {
        Write-Host "Profile already exists: $PathRelativeToFolderPath, will skip`n" -ForegroundColor Yellow
        continue
      }
    }

    # 创建符号链接
    New-Item -ItemType SymbolicLink -Path $Destination -Target $Profile.FullName -Force:$Override > $null
    Write-Host "Created symbolic link: $Destination -> $($Profile.FullName)`n"
  }
}

