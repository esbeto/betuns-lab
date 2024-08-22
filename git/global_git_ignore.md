# Global Git Ignore

I usually like to add a `.TODO` file on my projects to keep track locally of what I'm focused on now. This works in conjunction with Fabio Spampinato's [Todo+](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus) VSCode extension

To achieve this without having this bother you in your git history, simply add a global `gitignore` file

```bash
$ touch ~/.gitignore
$ echo ".TODO" > ~/.gitignore
$ git config --global core.excludesFile '~/.gitignore'
```
