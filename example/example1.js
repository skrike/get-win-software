const gws = require('../index')

gws.getAllInstalledSoftware([
    ['uninstall', 'UninstallString']
]).then(res => {
    console.log(res[0])
})