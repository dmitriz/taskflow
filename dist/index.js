"use strict";
// Main entry point for the gmail-task-capture package
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIGNATURE = exports.QUERY_FILTERS = exports.SETTINGS = exports.authorize = exports.writeTask = exports.removeSignature = exports.fetchAndProcessEmails = void 0;
// Export the main functionality
var email_processor_1 = require("./email-processor");
Object.defineProperty(exports, "fetchAndProcessEmails", { enumerable: true, get: function () { return email_processor_1.fetchAndProcessEmails; } });
var remove_signature_1 = require("./remove-signature");
Object.defineProperty(exports, "removeSignature", { enumerable: true, get: function () { return remove_signature_1.removeSignature; } });
var tasks_writer_1 = require("./tasks-writer");
Object.defineProperty(exports, "writeTask", { enumerable: true, get: function () { return tasks_writer_1.writeTask; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "authorize", { enumerable: true, get: function () { return auth_1.authorize; } });
// Export configuration
var config_1 = require("./config");
Object.defineProperty(exports, "SETTINGS", { enumerable: true, get: function () { return config_1.SETTINGS; } });
Object.defineProperty(exports, "QUERY_FILTERS", { enumerable: true, get: function () { return config_1.QUERY_FILTERS; } });
Object.defineProperty(exports, "SIGNATURE", { enumerable: true, get: function () { return config_1.SIGNATURE; } });
