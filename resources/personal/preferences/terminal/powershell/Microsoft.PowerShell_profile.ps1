# ENCODING
$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = [Text.Encoding]::UTF8

# VARIABLES
# -- `$env:PATH`: Add current node_modules/.bin to PATH if it exists, so you can run npm scripts without `npx`
if (Test-Path -Path "node_modules") {
  $env:PATH = "{0}{1}node_modules{1}.bin;{2}" -f (Get-Location), [System.IO.Path]::DirectorySeparatorChar, $env:PATH
}
# -- `$HISTORY`: Path to the PowerShell history file
$HISTORY = Join-Path $env:APPDATA "Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt"

# DEV ENVIRONMENT
fnm env --use-on-cd --corepack-enabled --shell powershell | Out-String | Invoke-Expression

# UI
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/the-unnamed.omp.json" | Invoke-Expression

# COMMANDS ENHANCEMENTS
# -- `Clear-AllHistory`
function Clear-AllHistory {
  [Microsoft.PowerShell.PSConsoleReadLine]::ClearHistory()
  if (Test-Path $HISTORY) {
    Clear-Content $HISTORY -Force
  }
}

# COMMAND ALIASES
# -- `which`: Show the path of commands
New-Alias -Name which -Value where.exe
# -- `touch`: Create a file, using `touch` instead of `ni` (We use `ni` for `@antfu/ni`)
Remove-Item Alias:ni -Force -ErrorAction Ignore
New-Alias -Name touch -Value New-Item
# -- `grep`
New-Alias -Name grep -Value Select-String
# -- `clh`: Clear All History
New-Alias -Name clh -Value Clear-AllHistory
