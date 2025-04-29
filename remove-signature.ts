import { SIGNATURE } from './config.js';

export function removeSignature(emailBody: string): string {
  const separatorIndex = emailBody.indexOf(SIGNATURE.SEPARATOR);
  if (separatorIndex === -1) {
    return emailBody.trim();
  }
  return emailBody.substring(0, separatorIndex).trim();
}