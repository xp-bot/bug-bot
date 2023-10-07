"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupSetupFile = void 0;
const fs_1 = __importDefault(require("fs"));
function backupSetupFile() {
    fs_1.default.writeFileSync(`./setup.json`, JSON.stringify(setup, null, 2));
}
exports.backupSetupFile = backupSetupFile;
