# Zsh config

After many years of using oh-my-zsh and failing to understand why my terminal is
so slow I decided to re-create it and evaluate the performance of my plugins
until I'm satisfied with the tradeoff of functionality vs speed.

This is my current .zshrc file. It includes most of the features that I get from
oh-my-zsh with an understandable speed sacrifice.

```bash
# Measure shell performance
timezsh() {
  shell=${1-$SHELL}
  for i in $(seq 1 10); do /usr/bin/time $shell -i -c exit; done
}

# Autocompletions
if type brew &>/dev/null; then
    FPATH=$(brew --prefix)/share/zsh/site-functions:$FPATH
fi

autoload -Uz compinit
compinit

# Git details in prompt
function current_branch() {
  git branch --show-current 2> /dev/null
}

function git_branch_name() {
  branch=$(current_branch)
  if [[ -n $branch ]]; then
    echo '(%F{yellow}'$branch'%f) '
  fi
}

function git_dirty() {
  if [[ -n $(git status -s 2> /dev/null) ]]; then
    echo "%F{yellow}✗ %f"
  fi
}

function set_prompt() {
  if [[ -n $(git rev-parse --is-inside-work-tree 2> /dev/null) ]]; then
    PS1='%F{cyan}%1/%f $(git_branch_name)$(git_dirty)%F{blue}⏵%f '
  else
    PS1='%F{cyan}%1/%f %F{blue}⏵%f '
  fi
}

# Set prompt dynamically
setopt prompt_subst
autoload -U add-zsh-hook
add-zsh-hook chpwd set_prompt
set_prompt

# Z jump (brew install z)
. /opt/homebrew/etc/profile.d/z.sh

# ZSH plugins (brew install zsh-autosuggestions zsh-syntax-highlighting)
source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# Aliases
alias g="git"
alias gst="git status"
alias gc="git commit"
alias gp="git push"
alias gl="git pull"
alias gsw="git switch"
alias gpf="git push --force-with-lease"
alias groh='git reset --hard origin/$(current_branch)'

alias gg="lazygit"
alias rebase_main="git rebase -i origin/main"
alias rebase_master="git rebase -i origin/master"
alias rebase_develop="git rebase -i origin/develop"
alias ls="ls --color"
alias ll="ls -lh"
alias la="ls -lah"

# Show current command and directory in the title bar.
preexec() {
  echo -ne "\033]0;$1 - ${PWD##*/}\007"
}

# Bind Option (Alt) + Arrow keys for word navigation in Alacritty
bindkey '\e[1;3D' backward-word  # Option + Left Arrow
bindkey '\e[1;3C' forward-word   # Option + Right Arrow
```

Using a fast terminal emulator like Alacritty or Warp helps too.

This is my Alacritty config file
```toml
# ~/.config/alacritty/alacritty.toml
import = ["~/.alacritty-colorscheme/themes/one_dark.toml"]

[font]
size = 17

[font.normal]
family = "JetBrains Mono"
style = "ExtraLight"

[font.bold]
style = "Light"

[[keyboard.bindings]]
action = "CreateNewWindow"
key = "T"
mods = "Command"

[window.dimensions]
columns = 110
lines = 40

[window.padding]
x = 16
y = 16
```
