import { SIGNATURE } from './config.js';

export function remove_signature(email_body: string): string {
  const separatorIndex = email_body.indexOf(SIGNATURE.SEPARATOR);
  if (separatorIndex === -1) {
    return email_body.trim();
  }
  return email_body.slice(0, separatorIndex).trim();
}