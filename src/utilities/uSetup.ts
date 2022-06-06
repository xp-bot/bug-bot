import fs from "fs";

export function backupSetupFile() {
  
  fs.writeFileSync(`./build/setup.json`, JSON.stringify(setup, null, 2));
}
