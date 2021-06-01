import fetch from 'node-fetch';

import {
	ACCOUNT_ERROR_ACCOUNT_NOT_FOUND,
	ACCOUNT_ERROR_PASSWORD_INVALID,
	ACCOUNT_ERROR_PASSWORD_NULL_EMPTY,
	ACCOUNT_ERROR_UNKNOWN,
	ACCOUNT_ERROR_USERNAME_NULL_EMPTY,
	ARGUEMENT_ERROR_MAX_COUNT_INVALID,
	ARGUEMENT_ERROR_MINUTES_INVALID,
	ARGUEMENT_ERROR_SERIAL_NUMBER_NULL_EMPTY,
	DEFAULT_SESSION_ID,
	DEXCOM_APPLICATION_ID,
	DEXCOM_AUTHENTICATE_ENDPOINT,
	DEXCOM_BASE_URL,
	DEXCOM_BASE_URL_OUS,
	DEXCOM_GLUCOSE_READINGS_ENDPOINT,
	DEXCOM_LOGIN_ENDPOINT,
	DEXCOM_TREND,
	DEXCOM_TREND_ARROWS,
	DEXCOM_TREND_ARROW_STRINGS,
	DEXCOM_TREND_DESCRIPTIONS,
	DEXCOM_TREND_DESCRIPTION_STRINGS,
	DEXCOM_VERIFY_SERIAL_NUMBER_ENDPOINT,
	MMOL_L_CONVERTION_FACTOR,
	SESSION_ERROR_SESSION_ID_DEFAULT,
	SESSION_ERROR_SESSION_ID_NULL,
	SESSION_ERROR_SESSION_NOT_FOUND,
	SESSION_ERROR_SESSION_NOT_VALID,
} from './const';

export class GlucoseReading {
	value: number;
	mdDl: number;
	mmolL: number;
	trend: DEXCOM_TREND;
	trendDescription: DEXCOM_TREND_DESCRIPTION_STRINGS;
	trendArrow: DEXCOM_TREND_ARROW_STRINGS;
	time: Date;

	constructor(reading: { Value: number; Trend: DEXCOM_TREND; WT: string }) {
		this.value = reading.Value;
		this.mdDl = this.value;
		this.mmolL = Math.round(this.value * MMOL_L_CONVERTION_FACTOR);
		this.trend = reading.Trend;
		this.trendDescription = DEXCOM_TREND_DESCRIPTIONS[this.trend];
		this.trendArrow = DEXCOM_TREND_ARROWS[this.trend];
		this.time = new Date(reading.WT);
	}
}

export class Dexcom {
	username: string;
	password: string;
	baseUrl: string;
	sessionId: string;

	constructor(username: string, password: string, ous: boolean) {
		this.baseUrl = ous ? DEXCOM_BASE_URL_OUS : DEXCOM_BASE_URL;
		this.username = username;
		this.password = password;
		this.createSession();
	}

	private async request(method: string, endpoint: string, params: any, body?: any, depth = 0) {
		try {
			const qs = params
				? '?' +
				  Object.keys(params)
						.map((key) => `${key}=${params[key]}`)
						.join('&')
				: '';
			const response = await fetch(`${this.baseUrl}/${endpoint}${qs}`, { method, body });
			if (response.ok) {
				return response.json();
			} else {
				throw {
					status: response.status,
					statusText: response.statusText,
					session: response.statusText.startsWith('Session'),
				};
			}
		} catch (err) {
			// Retry on session error up to 3 times.
			if (depth < 3 && err.session) {
				this.createSession();
				return this.request(method, endpoint, params, body, depth++);
			}
			throw err;
		}
	}

	private validationSessionId() {
		if (!this.sessionId) {
			throw new Error(SESSION_ERROR_SESSION_ID_NULL);
		}
		if (this.sessionId === DEFAULT_SESSION_ID) {
			throw new Error(SESSION_ERROR_SESSION_ID_DEFAULT);
		}
	}

	private validateAccount() {
		if (!this.username) {
			throw new Error(ACCOUNT_ERROR_USERNAME_NULL_EMPTY);
		}
		if (!this.password) {
			throw new Error(ACCOUNT_ERROR_PASSWORD_NULL_EMPTY);
		}
	}

	async createSession() {
		this.validateAccount();

		const json = {
			accountName: this.username,
			password: this.password,
			applicationId: DEXCOM_APPLICATION_ID,
		};

		this.sessionId = await this.request('post', DEXCOM_AUTHENTICATE_ENDPOINT, null, json);
		try {
			this.validationSessionId();
			this.sessionId = await this.request('post', DEXCOM_LOGIN_ENDPOINT, null, json);
			this.validationSessionId();
		} catch (err) {
			if (err.status === 500) {
				if (err.statusText === 'SessionNotValid') {
					throw new Error(SESSION_ERROR_SESSION_NOT_VALID);
				}
				if (err.statusText === 'SessionIdNotFound') {
					throw new Error(SESSION_ERROR_SESSION_NOT_FOUND);
				}
				if (err.statusText === 'SSO_AuthenticateAccountNotFound') {
					throw new Error(ACCOUNT_ERROR_ACCOUNT_NOT_FOUND);
				}
				if (err.statusText === 'SSO_AuthenticatePasswordInvalid') {
					throw new Error(ACCOUNT_ERROR_PASSWORD_INVALID);
				}
			}
			throw new Error(ACCOUNT_ERROR_UNKNOWN);
		}
	}

	async verifySerialNumber(serialNumber: string) {
		this.validationSessionId();
		if (!serialNumber) {
			throw new Error(ARGUEMENT_ERROR_SERIAL_NUMBER_NULL_EMPTY);
		}

		const params = { sessionId: this.sessionId, serialNumber };

		return (
			(await this.request('post', DEXCOM_VERIFY_SERIAL_NUMBER_ENDPOINT, params)) === 'AssignedToYou'
		);
	}

	async getGlucoseReadings(minutes = 1440, maxCount = 288): Promise<GlucoseReading[]> {
		this.validationSessionId();
		if (minutes < 1 || minutes > 1440) {
			throw new Error(ARGUEMENT_ERROR_MINUTES_INVALID);
		}
		if (maxCount < 1 || maxCount > 288) {
			throw new Error(ARGUEMENT_ERROR_MAX_COUNT_INVALID);
		}

		const params = {
			sessionId: this.sessionId,
			minutes,
			maxCount,
		};

		const readings = await this.request('post', DEXCOM_GLUCOSE_READINGS_ENDPOINT, params);
		return readings.map((reading) => new GlucoseReading(reading));
	}

	async getLatestGlucoseReading(): Promise<GlucoseReading> {
		return (await this.getGlucoseReadings(null, 1))[0];
	}

	async getCurrentGlucoseReading(): Promise<GlucoseReading> {
		return (await this.getGlucoseReadings(10, 1))[0];
	}
}
