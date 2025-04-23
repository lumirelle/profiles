<#
.DESCRIPTION
  Quickly copy and paste profile to current directory

.PARAMETER source
  The source profile you want to copy and paste, syntax: `[folder-name/]profile-name`

.PARAMETER target
  The target path you want to copy and paste

  If not specified, it will be the current directory.

.PARAMETER override
  Force to override the existing file

.EXAMPLE
  pcp .gitconfig

  This will copy and paste `.gitconfig` (under `general` or `self` folder) to current directory.

.EXAMPLE
  pcp .gitconfig "C:\Users\YourName\Documents\"

  If you want to copy and paste to a specific directory, you can add the `target` parameter.

  Note: The destination path **must** end with a forward slash `/` or a backslash `\`.

  This will copy and paste `.gitconfig` (under `general` or `self` folder) to `C:\Users\YourName\Documents\`.

.EXAMPLE
  pcp .gitconfig "C:\Users\YourName\Documents\.my-gitconfig"

  If you want to copy and paste to a specific directory, and rename it, you can add the `target` parameter.

  Note: The destination path **must not** end with a forward slash `/` or a backslash `\`.

  This will copy and paste `.gitconfig` (under `general` or `self` folder) to `C:\Users\YourName\Documents\gitconfig`.

  The file will be renamed to `.my-gitconfig`.

.EXAMPLE
  pcp .gitconfig -o

  If you want to force override the existing file, you can add the `override` parameter.

  This will force override the existing file.
#>

param (
  [Parameter(Mandatory = $true)]
  [Alias("s")]
  [string]$source,

  [Parameter(Mandatory = $false)]
  [Alias("t")]
  [string]$target,

  [Parameter(Mandatory = $false)]
  [Alias("l")]
  [switch]$isSymbolicLink,

  [Parameter(Mandatory = $false)]
  [Alias("o")]
  [switch]$override
)

Write-Debug "Parameters:"
Write-Debug "source = $source"
Write-Debug "target = $target"
Write-Debug "override = $override`n"

# == INIT & CHECK ==

$rootPath = Split-Path -Path $MyInvocation.MyCommand.Path -Parent

$slash = [IO.Path]::DirectorySeparatorChar

# Supported profile collections
$SUPPORTED_PROFILE_COLLECTIONS = @(
  @{
    # `source` is path of collection relative to `rootPath`
    source = "for-personal${slash}constraint";
  },
  @{
    source = "for-personal${slash}preferences";
  },
  @{
    source = "for-personal${slash}templates";
  }
)

# Process $source
# If $source is not contains `/` or `\`, add `common${slash}` to the beginning
if ($source -notmatch '[\\/]') {
  $source = "common${slash}$source"
}
Write-Debug "source: $source`n"

# Process $target
# If target is not specified, use current directory
if (-not $target) {
  $target = Get-Location
}
# Get target folder
if ($target -notmatch '[\\/]$') {
  $targetFolder = Split-Path -Path $target -Parent
}
else {
  $targetFolder = $target
}
Write-Debug "target folder: $targetFolder`n"
# If target folder not exists, create it
if (-not (Test-Path $targetFolder)) {
  Write-Debug "target parent folder path not found: $targetFolder, will create`n"
  New-Item -Path $targetFolder -ItemType Directory -Force | Out-Null
}

# -- COPY & PASTE --

# Find target file in PROFILE_FOLDERS, get file path
$sourceFullName = $null
# Foreach supported profile collection
foreach ($collection in $SUPPORTED_PROFILE_COLLECTIONS) {
  $collectionFullName = Join-Path $rootPath $collection.source
  if (-not (Test-Path $collectionFullName)) {
    Write-Host "Profiles collection not found: $collectionFullName, skip`n" -ForegroundColor Yellow
    continue
  }

  # Foreach profile folder in the collection
  $profileFullName = Join-Path $collectionFullName $source
  $profileName = Split-Path -Path $profileFullName -Leaf
  if (Test-Path $profileFullName) {
    $sourceFullName = $profileFullName
    Write-Debug "Found matched source profile: $sourceFullName`n"
    break
  }
}

# If $sourceFullName does not exist, output error information
if (-not $sourceFullName) {
  Write-Error "Source profile not found in any profile folders."
  return
}

# If the current path already exists with the same name, decide whether to override based on the override parameter
$targetFullName = Join-Path $target $profileName
Write-Debug "Current file path: $targetFullName`n"
if (Test-Path $targetFullName) {
  if ($override) {
    Write-Host "File already exists: $targetFullName, will force override" -ForegroundColor Yellow
  }
  else {
    Write-Host "File already exists: $targetFullName, will skip" -ForegroundColor Yellow
  }
}

if ($isSymbolicLink) {
  New-Item -ItemType SymbolicLink -Path $targetFullName -Target $sourceFullName -Force:$override  | Out-Null
  Write-Host "Created symbolic link: $profileName -> $target" -ForegroundColor Green
}
else {
  Copy-Item -Path $sourceFullName -Destination $targetFullName -Force:$override  | Out-Null
  Write-Host "Copied and pasted file: $profileName -> $target" -ForegroundColor Green
}
