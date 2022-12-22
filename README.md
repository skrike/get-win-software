# get-win-software
[![status](https://img.shields.io/badge/Install-666?style=for-the-badge)](#install)
[![status](https://img.shields.io/badge/API-666?style=for-the-badge)](#api)
[![status](https://img.shields.io/badge/Roadmap-666?style=for-the-badge)](#roadmap)
[![status](https://img.shields.io/badge/Example-666?style=for-the-badge)](#example)
[![status](https://img.shields.io/badge/Updates-666?style=for-the-badge)](#updates)

![status](https://img.shields.io/badge/status-development-0bd48a)
![license](https://img.shields.io/badge/version-0.1.4-e00d4c)
![license](https://img.shields.io/badge/license-GPLv3-brightgreen)


<sub>Если можете помочь с правильным переводом на английский язык, буду премного благодарен. Использовался Google Translate</sub>

Obtaining information about installed programs of the Windows operating system.

# Install
```
npm i get-win-software
```

# API
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
| xx/xx/202x  | 0.1.4  | Added ...  |
| 12/16/2022  | 0.1.3  | Added savetoFile() function to save data to a file.  |
| 12/15/2022  | 0.1.2  | Changed directory structure. Renamed function names (getAllInstalledSoftware() > getAIS()). Added getAISCustom() function for custom data output.  |