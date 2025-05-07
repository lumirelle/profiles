# Encoding
$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = [Text.Encoding]::UTF8

# Environment Variables
# -- $env:PATH
# Add current node_modules/.bin to PATH if it exists, so you can run npm scripts without `npx`
$sep = [System.IO.Path]::DirectorySeparatorChar
if (Test-Path -Path "node_modules") {
  $env:PATH = "{0}{1}node_modules{1}.bin;{2}" -f (Get-Location), $sep, $env:PATH
}
# -- $env:HISTORY
$history = Join-Path $env:APPDATA "Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt"
if (Test-Path $history) {
  $env:HISTORY = $history
}

# Command Aliases
# -- touch
Remove-Item Alias:ni -Force -ErrorAction Ignore
New-Alias -Name touch -Value New-Item
# -- grep
New-Alias -Name grep -Value Select-String
# -- clh
function Clear-AllHistory {
  [Microsoft.PowerShell.PSConsoleReadLine]::ClearHistory()
  $historyPath = Join-Path $env:APPDATA "Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt"
  if (Test-Path $historyPath) {
    Clear-Content $historyPath -Force
  }
}
New-Alias -Name clh -Value Clear-AllHistory


# Dev Environment
fnm env --use-on-cd --corepack-enabled --shell powershell | Out-String | Invoke-Expression

# UI
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/the-unnamed.omp.json" | Invoke-Expression
