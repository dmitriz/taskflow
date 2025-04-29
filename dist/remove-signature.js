import { SIGNATURE } from './config.js';
export function remove_signature(email_body) {
    // split on the signature marker and return everything before it
    return email_body.split(SIGNATURE.SEPARATOR)[0].trim();
}
//# sourceMappingURL=remove-signature.js.map