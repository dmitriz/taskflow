import { SIGNATURE } from './config.js';
export function remove_signature(emailBody) {
    const separatorIndex = emailBody.indexOf(SIGNATURE.SEPARATOR);
    if (separatorIndex === -1) {
        return emailBody.trim();
    }
    return emailBody.substring(0, separatorIndex).trim();
}
