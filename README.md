# get-win-software
[Install](https://github.com/skrike/get-win-software#install) | [Roadmap](https://github.com/skrike/get-win-software#roadmap) | [Example](https://github.com/skrike/get-win-software#example)

<sub>Если можете помочь с правильным переводом на английский язык, буду премного благодарен. Использовался Google Translate</sub>

Obtaining information about installed programs of the Windows operating system.

Получение информации об установленных программах операционной системы Windows.

# Install
```
npm i get-win-software
```

# Roadmap
- [ ] Add information about Google Chrome / Добавьте информацию о Google Chrome
- [ ] Optimize script performance / Оптимизация производительности скрипта
- [ ] Push package to NPM / Разместить пакет в NPM

# Example
> **Example 1** - With custom properties
```javascript
const gws = require('get-win-software')

gws.getAllInstalledSoftware([
    ['uninstall', 'UninstallString']
]).then(res => {
    console.log(res[0])
})
```

> **Example 2** - Get all installed software
```javascript
const gws = require('get-win-software')

gws.getAllInstalledSoftware().then(res => {
    console.log(res[0])
})
```
