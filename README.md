# zonemta-regex-router
RegEx mail router for [ZoneMTA](https://github.com/zone-eu/zone-mta).

This plugin is used to set the sending zone based on a RegExp

## Setup

Add this as a dependency for your ZoneMTA app

```
npm install zonemta-regex-router --save
```

Add a configuration entry in the "plugins" section of your ZoneMTA app

```json
...
  "plugins": {
    "modules/zonemta-regex-router": {
      "enabled": "main",
      "regex": [
        "@t-(online|com)\\.de$": {
          "sendingZone": "default"
        }
      ]
    }
  }
...
```

## License

MIT License