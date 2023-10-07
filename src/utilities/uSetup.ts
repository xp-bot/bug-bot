import fs from "fs";

export function backupSetupFile() {
  fs.writeFileSync(`./setup.json`, JSON.stringify(setup, null, 2));
}
