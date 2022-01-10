import * as fs from 'fs';

export const writeJSON = (jsonObject: Object) => {
  fs.writeFile(
    './src/localsave.json',
    JSON.stringify(jsonObject),
    'utf-8',
    () => {}
  );
};
