<#
.DESCRIPTION
  Quickly delete supported global profiles

.EXAMPLE
  pdel

  This will remove the symbolic links (just symbolic links) of supported profiles in your computer.
#>

param ()

Write-Debug "Parameters:`n"

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

Write-Host "`nStart to delete profiles...`n" -ForegroundColor Green

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

      # If $targetFolderFullName does not exist, skip it
      if (-not (Test-Path $targetFolderFullName)) {
        continue FOREACH_PROFILE
      }

      # If the targetFolder file already exists
      $targetProfileFullName = Join-Path $targetFolderFullName $profileName
      if (Test-Path $targetProfileFullName) {
        # If the target file is a symbolic link, delete it
        if ((Get-Item $targetProfileFullName).LinkType -eq 'SymbolicLink') {
          Remove-Item -Path $targetProfileFullName -Force | Out-Null
          Write-Host "Removed symbolic link: $targetProfileFullName`n"
        }
        # If the target file is not a symbolic link, skip
        else {
          Write-Host "Target file are not symbolic link: $targetProfileFullName, skip`n" -ForegroundColor Yellow
          continue FOREACH_PROFILE
        }
      }
    }
  }
}

