const regedit = require("regedit").promisified;
const cliProgress = require("cli-progress");

class GetWinSoftware {
  static HKLMSoftUnintstall =
    "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall";

  /**
   *
   * @param {[]} otherKey [keyName, registryKeyName] Add any key in installed application.
   * @returns Custom objects of installed applications
   */
  static async getAllInstalledSoftware(otherKey) {
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
}

module.exports = GetWinSoftware;
