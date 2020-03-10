# Disable web security

Sometimes you need to test something that has CORS enabled. To bypass web security:

```
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```
