const regedit = require("regedit").promisified;
const cliProgress = require("cli-progress");
const fs = require('fs');

class GetWinSoftware {
  static HKLMSoftUnintstall =
    "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall";

  /**
   * Getting an array of objects with a description of installed programs. Each element contains DisplayName, Publisher, DisplayVersion. If there is InstallLocation data.
   * @param {[]} otherKey [keyName, registryKeyName] Add any key in installed application.
   * @returns Objects of installed applications
   */
  static async getAIS(otherKey) {
    let progress = new cliProgress.SingleBar({
      format: "Receive: [[36m{bar}[0m] {percentage}% ({value}/{total})",
      barCompleteChar: "■",
      barIncompleteChar: "•",
      hideCursor: true,
    });
    let out = [];
    const keyList = await regedit
      .list(GetWinSoftware.HKLMSoftUnintstall)
      .then((res) => res[GetWinSoftware.HKLMSoftUnintstall].keys);
    progress.start(keyList.length, 0);
    for (let i = 0; i < keyList.length; i++) {
      const el = await regedit
        .list(GetWinSoftware.HKLMSoftUnintstall + "\\" + keyList[i])
        .then(
          (res) =>
            res[GetWinSoftware.HKLMSoftUnintstall + "\\" + keyList[i]].values
        );
      let o = {};
      if (el.DisplayName) {
        o["name"] = el.DisplayName.value || null;
        if (el.Publisher) o["publisher"] = el.Publisher.value || null;
        if (el.DisplayVersion) o["version"] = el.DisplayVersion.value || null;
        if (el.InstallLocation)
          o["location"] = el.InstallLocation.value || null;
        if (otherKey) {
          otherKey.forEach((key) => {
            if (el[key[1]]) {
              o[key[0]] = el[key[1]].value || null;
            }
          });
        }
        out.push(o);
      }
      progress.increment();
    }
    progress.stop();
    return out;
  }

  /**
   * Function for custom data output.
   * @param {[]} otherKey [keyName, registryKeyName] Add any key in installed application. 
   * @returns Custom objects of installed applications
   */
  static async getAISCustom(otherKey) {
    let progress = new cliProgress.SingleBar({
      format: "Receive: [[36m{bar}[0m] {percentage}% ({value}/{total})",
      barCompleteChar: "■",
      barIncompleteChar: "•",
      hideCursor: true,
    });
    let out = [];
    const keyList = await regedit
      .list(GetWinSoftware.HKLMSoftUnintstall)
      .then((res) => res[GetWinSoftware.HKLMSoftUnintstall].keys);
    progress.start(keyList.length, 0);
    for (let i = 0; i < keyList.length; i++) {
      const el = await regedit
        .list(GetWinSoftware.HKLMSoftUnintstall + "\\" + keyList[i])
        .then(
          (res) =>
            res[GetWinSoftware.HKLMSoftUnintstall + "\\" + keyList[i]].values
        );
      let o = {};
      if (otherKey) {
        otherKey.forEach((key) => {
          if (el[key[1]]) {
            o[key[0]] = el[key[1]].value || null;
          }
        });
        out.push(o);
      }
      progress.increment();
    }
    progress.stop();
    return out;
  }

  /**
   * Function for save data to a file.
   * Saves `data` to a file
   * @param {object} data Promise result
   * @param {string} path Save path with file name (e.g. ./file.json). It is recommended to use the path module.
   */
  static saveToFile(data, path) {
    try {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
      return err
    }
  }
}

module.exports = GetWinSoftware;