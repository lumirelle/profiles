# Encoding
$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = [Text.Encoding]::UTF8

# Alias
Remove-Item Alias:ni -Force -ErrorAction Ignore
New-Alias -Name touch -Value New-Item

# Environment
fnm env --use-on-cd --corepack-enabled --shell powershell | Out-String | Invoke-Expression

# UI
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/the-unnamed.omp.json" | Invoke-Expression
