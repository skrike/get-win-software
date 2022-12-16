# get-win-software
[Install](https://github.com/skrike/get-win-software#install) | [Functions](https://github.com/skrike/get-win-software#functions) | [Roadmap](https://github.com/skrike/get-win-software#roadmap) | [Example](https://github.com/skrike/get-win-software#example) | [Updates](https://github.com/skrike/get-win-software#updates)

<sub>Если можете помочь с правильным переводом на английский язык, буду премного благодарен. Использовался Google Translate</sub>

Obtaining information about installed programs of the Windows operating system.

# Install
```
npm i get-win-software
```

# Functions
| Name of Function  | Description |
| ------------- | ------------- |
| `GetWinSoftware.getAIS()`  | Getting an array of objects with a description of installed programs. Each element contains *DisplayName*, *Publisher*, *DisplayVersion*. If there is *InstallLocation* data.  |
| `GetWinSoftware.getAISCustom()`  | Function for custom data output.  |
| `GetWinSoftware.saveToFile()`  | Function for save data to a file.  |

# Roadmap
- [ ] Add information about Google Chrome
- [ ] Optimize script performance
- [x] Push package to NPM

# Example
> **Example 1** - With custom properties
```javascript
const gws = require('get-win-software')

gws.getAIS([
    ['uninstall', 'UninstallString']
]).then(res => {
    console.log(res[0])
})
```

> **Example 2** - Get all installed software
```javascript
const gws = require('get-win-software')

gws.getAIS().then(res => {
    console.log(res[0])
})
```

# Updates
| Date  | Version | Decription  |
| ------------- | ------------- | ------------- |
| 12/16/2022  | 0.1.3  | Added savetoFile() function to save data to a file.  |
| 12/15/2022  | 0.1.2  | Changed directory structure. Renamed function names (getAllInstalledSoftware() > getAIS()). Added getAISCustom() function for custom data output.  |