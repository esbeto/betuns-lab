# Create a Custom Extension to add custom CSS and JS to a webapp.

I used this format to add additional JS and CSS on some websites.

## To enable it:

1. Open `about:debugging` in Firefox
2. Click on "This Firefox"
3. Click on "Load Temporary Add-on..."
4. Open the manifest.json file

## Manifest.json

Modify the `manifest.json` file to match your usage:

This is an example to add custom CSS and JS to pivotal tracker:
```
{
  "manifest_version": 2,
  "name": "Pivotal Custom",
  "version": "1.0",
  "description": "Adds style improvements to Pivotal Tracker.",
  "content_scripts": [
    {
      "matches": ["*://*.pivotaltracker.com/n/projects/*"],
      "js": ["pivotalcustom.js"],
      "css": ["pivotalcustom.css"]
    }
  ],
  "applications": {
    "gecko": {
      "id": "es.beto.pivotalcustom@gmail.com"
    }
  }
}
```

## Publish an extension
If you want to publish the extension you must add a real [Gecko ID](https://extensionworkshop.com/documentation/develop/extensions-and-the-add-on-id/). And add an extension image, etc.
