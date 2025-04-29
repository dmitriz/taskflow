"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSignature = removeSignature;
const config_js_1 = require("./config.js");
function removeSignature(emailBody) {
    const separatorIndex = emailBody.indexOf(config_js_1.SIGNATURE.SEPARATOR);
    if (separatorIndex === -1) {
        return emailBody.trim();
    }
    return emailBody.substring(0, separatorIndex).trim();
}
