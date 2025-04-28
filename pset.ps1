<#
.DESCRIPTION
  Quickly setup supported global profiles

.PARAMETER override
  Force to override the existing files

.EXAMPLE
  pset

  This will create the symbolic links of supported profiles to your computer, so that you can receive the updates automatically.

.EXAMPLE
  pset -o

  If you want to force override the existing files, you can add the `override` parameter.

  This will force override the existing files.
#>

param (
  [Parameter(Mandatory = $false)]
  [Alias("o")]
  [switch]$override
)

Write-Debug "Parameters:"
Write-Debug "override = $override`n"

# -- INIT & CHECK --

$rootPath = Split-Path -Path $MyInvocation.MyCommand.Path -Parent

$slash = [IO.Path]::DirectorySeparatorChar

# Supported profile collections
$SUPPORTED_PROFILE_COLLECTIONS = @(
  @{
    # `source` is path of collection relative to `rootPath`
    source       = "for-personal${slash}constraint";
    # `targetFolder` supports `string` and `dictionary`
    targetFolder = "~";
    # `ignores` is relative path to `source`, supports folder and file
    ignores      = @(
      "common${slash}.gitattributes",
      "common${slash}.markdownlint.yaml",
      "nodejs${slash}.gitattributes",
      "nodejs${slash}.gitignore",
      "nodejs${slash}.npmrc",
      "nodejs${slash}commitlint.config.mjs",
      "nodejs${slash}eslint.config.mjs",
      "nodejs${slash}jsconfig.json",
      "nodejs${slash}stylelint.config.mjs",
      "vue2${slash}eslint.config.mjs",
      "vue3${slash}eslint.config.mjs",
      "vue${slash}stylelint.config.mjs",
      "webpack${slash}eslint.config.mjs"
    );
  },
  @{
    source       = "for-personal${slash}preferences";
    targetFolder = @{
      "git"        = "~";
      "maven"      = "~$slash.m2";
      "neovim"     = "$($env:LOCALAPPDATA)${slash}nvim";
      "powershell" = $(Split-Path -Path $PROFILE -Parent);
    };
    ignores      = @(
      "clash-for-windows${slash}",
      "idea${slash}",
      "vs${slash}",
      "vscode${slash}",
      "vscode-ws${slash}",
      "windows-terminal${slash}",
      "zsh${slash}"
    );
  },
  @{
    source       = "for-work${slash}constraint";
    targetFolder = "~";
    ignores      = @();
  }
)

# -- START TO SETUP --

Write-Host "`nStart to setup profiles...`n" -ForegroundColor Green

# Foreach supported profile collection
foreach ($collection in $SUPPORTED_PROFILE_COLLECTIONS) {
  $collectionFullName = Join-Path $rootPath $collection.source
  if (-not (Test-Path $collectionFullName)) {
    Write-Host "Profiles collection not found: $collectionFullName, skip`n" -ForegroundColor Yellow
    continue
  }

  # Foreach profile folder in the collection
  $folders = Get-ChildItem -Path $collectionFullName -Directory
  foreach ($folder in $folders) {
    $folderFullName = $folder.FullName
    $folderName = $folder.Name

    # Foreach profile
    $profiles = Get-ChildItem -Path $folderFullName -Recurse -File
    :FOREACH_PROFILE foreach ($profile in $profiles) {
      $profileFullName = $profile.FullName
      $profileName = $profile.Name
      $profileKey = Join-Path $folderName $profileName

      # If $profileKey starts with $ignore, skip it
      foreach ($ignore in $collection.ignores) {
        if ($profileKey.StartsWith($ignore)) {
          Write-Debug "Ignore files: $($collection.source)$slash$profileKey`n"
          continue FOREACH_PROFILE
        }
      }

      # If $collection.targetFolder is Dictionary, use $folderName as the key to get the $targetFolderFullName
      if ($collection.targetFolder -is [System.Collections.IDictionary]) {
        $targetFolderFullName = $collection.targetFolder[$folderName]
      }
      else {
        $targetFolderFullName = $collection.targetFolder
      }

      # If $targetFolderFullName does not exist, create it
      if (-not (Test-Path $targetFolderFullName)) {
        New-Item -ItemType Directory -Path $targetFolderFullName -Force | Out-Null
      }

      # If the targetFolder file already exists
      $targetProfileFullName = Join-Path $targetFolderFullName $profileName
      if (Test-Path $targetProfileFullName) {
        if ($override) {
          Write-Host "profile already exists: $targetProfileFullName, will force override" -ForegroundColor Yellow
        }
        else {
          Write-Host "profile already exists: $targetProfileFullName, will skip`n" -ForegroundColor Yellow
          continue FOREACH_PROFILE
        }
      }

      # Create a symbolic link
      New-Item -ItemType SymbolicLink -Path $targetProfileFullName -Target $profileFullName -Force:$override | Out-Null
      Write-Host "Created symbolic link: $targetProfileFullName -> $profileFullName`n"
    }
  }
}

