-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua
-- Add any additional options here

local opt = vim.opt

opt.wrap = true
opt.spell = false
opt.guifont = { "LXGW Bright Code", "Symbols Nerd Font", "monospace" }
opt.shell = "pwsh -nologo"
opt.shellcmdflag = "-command"
opt.shellquote = '"'
opt.shellxquote = ""
