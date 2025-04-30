# Encoding
$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = [Text.Encoding]::UTF8

# Alias
# -- touch
Remove-Item Alias:ni -Force -ErrorAction Ignore
New-Alias -Name touch -Value New-Item
# -- clr
New-Alias -Name clr -Value Clear-Host
# -- clh
function Clear-AllHistory {
  [Microsoft.PowerShell.PSConsoleReadLine]::ClearHistory()
}
New-Alias -Name clh -Value Clear-AllHistory


# Environment
fnm env --use-on-cd --corepack-enabled --shell powershell | Out-String | Invoke-Expression

# UI
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/the-unnamed.omp.json" | Invoke-Expression
