const regedit = require("regedit").promisified;
const cliProgress = require("cli-progress");

class RegistryKeys {
  static HKLMSoftUnintstall =
    "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall";
}
let defRequest = RegistryKeys.HKLMSoftUnintstall;

const progress = new cliProgress.SingleBar({
    format: "Receive: [[36m{bar}[0m] {percentage}% ({value}/{total})",
    barCompleteChar: "■",
    barIncompleteChar: "•",
    hideCursor: true,
  });

/**
 *
 * @param {[]} otherKey [keyName, registryKeyName] add any key from installed apps.
 * @returns Object of app
 */
async function getCustomAllInstalledSoftware(otherKey) {
  let out = [];
  const keyList = await regedit
    .list(defRequest)
    .then((res) => res[defRequest].keys);
  progress.start(keyList.length, 0);
  for (let i = 0; i < keyList.length; i++) {
    const el = await regedit
      .list(defRequest + "\\" + keyList[i])
      .then((res) => res[defRequest + "\\" + keyList[i]].values);
    let o = {};
    if (el.DisplayName) {
      o["name"] = el.DisplayName.value || null;
      if (el.Publisher) o["publisher"] = el.Publisher.value || null;
      if (el.DisplayVersion) o["version"] = el.DisplayVersion.value || null;
      if (el.InstallLocation) o["location"] = el.InstallLocation.value || null;
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
  progress.stop()
  return out;
}

/**
 *
 * @returns Object of installed Apps
 */
async function getAllInstalledSoftware() {
  let out = [];
  const keyList = await regedit
    .list(defRequest)
    .then((res) => res[defRequest].keys);
    progress.start(keyList.length, 0);
  for (let i = 0; i < keyList.length; i++) {
    const el = await regedit
      .list(defRequest + "\\" + keyList[i])
      .then((res) => res[defRequest + "\\" + keyList[i]].values);
    let o = {};
    if (el.DisplayName) {
      o["name"] = el.DisplayName.value || null;
      if (el.Publisher) o["publisher"] = el.Publisher.value || null;
      if (el.DisplayVersion) o["version"] = el.DisplayVersion.value || null;
      if (el.InstallLocation) o["location"] = el.InstallLocation.value || null;
      out.push(o);
    }
    progress.increment();
  }
  progress.stop()
  return out;
}

// getCustomAllInstalledSoftware([
//   ["installDate", "InstallDate"],
//   ["installSource", "InstallSource"],
// ]).then((res) => {
// //   console.log(res.filter((res) => res));
// });

getAllInstalledSoftware().then(res => {
    console.log(res.filter(res => res)[0])
})
