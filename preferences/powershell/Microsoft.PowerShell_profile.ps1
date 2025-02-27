$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = [Text.Encoding]::UTF8

fnm env --use-on-cd --corepack-enabled --shell powershell | Out-String | Invoke-Expression

oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/the-unnamed.omp.json" | Invoke-Expression
