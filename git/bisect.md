# Find the commit that broke your app with Git Bisect

```
git bisect start
```

Look for a past commit hash where the app was working
```
git bisect good [good-commit-hash]
```

And the branch or commit hash where the app is failing
```
git bisect bad develop
```

Then, you will start bisecting.

When you find that it works: `git bisect good`

When you find that it doesn't: `git bisect bad`

Repeat until you find the culprit.

Then you can use `git whatchanged -p [culprit-commit-hash]` to check the changes.
