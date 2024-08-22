# Global Git Ignore

I usually like to add a .TODO file on my projects to keep track locally of what I'm focused on now.

To achieve this without having it bother you in git add a global git ignore file

```bash
$ touch ~/.gitignore
$ echo ".TODO" > ~/.gitignore
$ git config --global core.excludesFile '~/.gitignore'
```
