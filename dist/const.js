"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MMOL_L_CONVERTION_FACTOR = exports.DEFAULT_SESSION_ID = exports.DEXCOM_TREND_ARROWS = exports.DEXCOM_TREND_DESCRIPTIONS = exports.ARGUEMENT_ERROR_SERIAL_NUMBER_NULL_EMPTY = exports.ARGUEMENT_ERROR_MAX_COUNT_INVALID = exports.ARGUEMENT_ERROR_MINUTES_INVALID = exports.SESSION_ERROR_SESSION_NOT_FOUND = exports.SESSION_ERROR_SESSION_NOT_VALID = exports.SESSION_ERROR_SESSION_ID_DEFAULT = exports.SESSION_ERROR_SESSION_ID_NULL = exports.ACCOUNT_ERROR_UNKNOWN = exports.ACCOUNT_ERROR_PASSWORD_INVALID = exports.ACCOUNT_ERROR_ACCOUNT_NOT_FOUND = exports.ACCOUNT_ERROR_PASSWORD_NULL_EMPTY = exports.ACCOUNT_ERROR_USERNAME_NULL_EMPTY = exports.DEXCOM_APPLICATION_ID = exports.DEXCOM_GLUCOSE_READINGS_ENDPOINT = exports.DEXCOM_VERIFY_SERIAL_NUMBER_ENDPOINT = exports.DEXCOM_AUTHENTICATE_ENDPOINT = exports.DEXCOM_LOGIN_ENDPOINT = exports.DEXCOM_BASE_URL_OUS = exports.DEXCOM_BASE_URL = void 0;
// Dexcom Share API base urls
exports.DEXCOM_BASE_URL = 'https://share2.dexcom.com/ShareWebServices/Services';
exports.DEXCOM_BASE_URL_OUS = 'https://shareous1.dexcom.com/ShareWebServices/Services';
// Dexcom Share API endpoints
exports.DEXCOM_LOGIN_ENDPOINT = 'General/LoginPublisherAccountByName';
exports.DEXCOM_AUTHENTICATE_ENDPOINT = 'General/AuthenticatePublisherAccount';
exports.DEXCOM_VERIFY_SERIAL_NUMBER_ENDPOINT = 'Publisher/CheckMonitoredReceiverAssignmentStatus';
exports.DEXCOM_GLUCOSE_READINGS_ENDPOINT = 'Publisher/ReadPublisherLatestGlucoseValues';
exports.DEXCOM_APPLICATION_ID = 'd89443d2-327c-4a6f-89e5-496bbb0317db';
// Dexcom error strings
exports.ACCOUNT_ERROR_USERNAME_NULL_EMPTY = 'Username null or empty';
exports.ACCOUNT_ERROR_PASSWORD_NULL_EMPTY = 'Password null or empty';
exports.ACCOUNT_ERROR_ACCOUNT_NOT_FOUND = 'Account not found';
exports.ACCOUNT_ERROR_PASSWORD_INVALID = 'Password not valid';
exports.ACCOUNT_ERROR_UNKNOWN = 'Account error';
exports.SESSION_ERROR_SESSION_ID_NULL = 'Session ID null';
exports.SESSION_ERROR_SESSION_ID_DEFAULT = 'Session ID default';
exports.SESSION_ERROR_SESSION_NOT_VALID = 'Session ID not valid';
exports.SESSION_ERROR_SESSION_NOT_FOUND = 'Session ID not found';
exports.ARGUEMENT_ERROR_MINUTES_INVALID = 'Minutes must be between 1 and 1440';
exports.ARGUEMENT_ERROR_MAX_COUNT_INVALID = 'Max count must be between 1 and 288';
exports.ARGUEMENT_ERROR_SERIAL_NUMBER_NULL_EMPTY = 'Serial number null or empty';
exports.DEXCOM_TREND_DESCRIPTIONS = [
    '',
    'rising quickly',
    'rising',
    'rising slightly',
    'steady',
    'falling slightly',
    'falling',
    'falling quickly',
    'unable to determine trend',
    'trend unavailable',
];
exports.DEXCOM_TREND_ARROWS = [
    '',
    '↑↑',
    '↑',
    '↗',
    '→',
    '↘',
    '↓',
    '↓↓',
    '?',
    '-',
];
exports.DEFAULT_SESSION_ID = '00000000-0000-0000-0000-000000000000';
exports.MMOL_L_CONVERTION_FACTOR = 0.0555;
//# sourceMappingURL=const.js.map