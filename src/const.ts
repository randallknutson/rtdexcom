// Dexcom Share API base urls
export const DEXCOM_BASE_URL = 'https://share2.dexcom.com/ShareWebServices/Services';
export const DEXCOM_BASE_URL_OUS = 'https://shareous1.dexcom.com/ShareWebServices/Services';

// Dexcom Share API endpoints
export const DEXCOM_LOGIN_ENDPOINT = 'General/LoginPublisherAccountByName';
export const DEXCOM_AUTHENTICATE_ENDPOINT = 'General/AuthenticatePublisherAccount';
export const DEXCOM_VERIFY_SERIAL_NUMBER_ENDPOINT =
	'Publisher/CheckMonitoredReceiverAssignmentStatus';
export const DEXCOM_GLUCOSE_READINGS_ENDPOINT = 'Publisher/ReadPublisherLatestGlucoseValues';

export const DEXCOM_APPLICATION_ID = 'd89443d2-327c-4a6f-89e5-496bbb0317db';

// Dexcom error strings
export const ACCOUNT_ERROR_USERNAME_NULL_EMPTY = 'Username null or empty';
export const ACCOUNT_ERROR_PASSWORD_NULL_EMPTY = 'Password null or empty';
export const ACCOUNT_ERROR_ACCOUNT_NOT_FOUND = 'Account not found';
export const ACCOUNT_ERROR_PASSWORD_INVALID = 'Password not valid';
export const ACCOUNT_ERROR_UNKNOWN = 'Account error';

export const SESSION_ERROR_SESSION_ID_NULL = 'Session ID null';
export const SESSION_ERROR_SESSION_ID_DEFAULT = 'Session ID default';
export const SESSION_ERROR_SESSION_NOT_VALID = 'Session ID not valid';
export const SESSION_ERROR_SESSION_NOT_FOUND = 'Session ID not found';

export const ARGUEMENT_ERROR_MINUTES_INVALID = 'Minutes must be between 1 and 1440';
export const ARGUEMENT_ERROR_MAX_COUNT_INVALID = 'Max count must be between 1 and 288';
export const ARGUEMENT_ERROR_SERIAL_NUMBER_NULL_EMPTY = 'Serial number null or empty';

// Other
export type DEXCOM_TREND = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type DEXCOM_TREND_DESCRIPTION_STRINGS =
	| ''
	| 'rising quickly'
	| 'rising'
	| 'rising slightly'
	| 'steady'
	| 'falling slightly'
	| 'falling'
	| 'falling quickly'
	| 'unable to determine trend'
	| 'trend unavailable';

export const DEXCOM_TREND_DESCRIPTIONS: DEXCOM_TREND_DESCRIPTION_STRINGS[] = [
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

export type DEXCOM_TREND_ARROW_STRINGS = '' | '↑↑' | '↑' | '↗' | '→' | '↘' | '↓' | '↓↓' | '?' | '-';

export const DEXCOM_TREND_ARROWS: DEXCOM_TREND_ARROW_STRINGS[] = [
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

export const DEFAULT_SESSION_ID = '00000000-0000-0000-0000-000000000000';

export const MMOL_L_CONVERTION_FACTOR = 0.0555;
