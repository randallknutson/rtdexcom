"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dexcom = exports.GlucoseReading = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const const_1 = require("./const");
class GlucoseReading {
    constructor(reading) {
        this.value = reading.Value;
        this.mdDl = this.value;
        this.mmolL = Math.round(this.value * const_1.MMOL_L_CONVERTION_FACTOR);
        this.trend = reading.Trend;
        this.trendDescription = const_1.DEXCOM_TREND_DESCRIPTIONS[this.trend];
        this.trendArrow = const_1.DEXCOM_TREND_ARROWS[this.trend];
        this.time = new Date(parseInt(reading.WT.replace(/\D/g, '')));
    }
}
exports.GlucoseReading = GlucoseReading;
class Dexcom {
    constructor(username, password, ous = false) {
        this.baseUrl = ous ? const_1.DEXCOM_BASE_URL_OUS : const_1.DEXCOM_BASE_URL;
        this.username = username;
        this.password = password;
    }
    async request(method, endpoint, params, body, depth = 0) {
        try {
            const qs = params
                ? '?' +
                    Object.keys(params)
                        .map((key) => `${key}=${params[key]}`)
                        .join('&')
                : '';
            const response = await node_fetch_1.default(`${this.baseUrl}/${endpoint}${qs}`, {
                method,
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                return response.json();
            }
            else {
                throw {
                    status: response.status,
                    statusText: response.statusText,
                    session: response.statusText.startsWith('Session'),
                };
            }
        }
        catch (err) {
            // Retry on session error up to 3 times.
            if (depth < 3 && err.session) {
                this.createSession();
                return this.request(method, endpoint, params, body, depth++);
            }
            throw err;
        }
    }
    validationSessionId() {
        if (!this.sessionId) {
            throw new Error(const_1.SESSION_ERROR_SESSION_ID_NULL);
        }
        if (this.sessionId === const_1.DEFAULT_SESSION_ID) {
            throw new Error(const_1.SESSION_ERROR_SESSION_ID_DEFAULT);
        }
    }
    validateAccount() {
        if (!this.username) {
            throw new Error(const_1.ACCOUNT_ERROR_USERNAME_NULL_EMPTY);
        }
        if (!this.password) {
            throw new Error(const_1.ACCOUNT_ERROR_PASSWORD_NULL_EMPTY);
        }
    }
    async createSession() {
        if (this.sessionId) {
            this.validationSessionId();
            return;
        }
        this.validateAccount();
        const json = {
            accountName: this.username,
            password: this.password,
            applicationId: const_1.DEXCOM_APPLICATION_ID,
        };
        this.sessionId = await this.request('post', const_1.DEXCOM_AUTHENTICATE_ENDPOINT, null, json);
        try {
            this.validationSessionId();
            this.sessionId = await this.request('post', const_1.DEXCOM_LOGIN_ENDPOINT, null, json);
            this.validationSessionId();
        }
        catch (err) {
            if (err.status === 500) {
                if (err.statusText === 'SessionNotValid') {
                    throw new Error(const_1.SESSION_ERROR_SESSION_NOT_VALID);
                }
                if (err.statusText === 'SessionIdNotFound') {
                    throw new Error(const_1.SESSION_ERROR_SESSION_NOT_FOUND);
                }
                if (err.statusText === 'SSO_AuthenticateAccountNotFound') {
                    throw new Error(const_1.ACCOUNT_ERROR_ACCOUNT_NOT_FOUND);
                }
                if (err.statusText === 'SSO_AuthenticatePasswordInvalid') {
                    throw new Error(const_1.ACCOUNT_ERROR_PASSWORD_INVALID);
                }
            }
            throw new Error(const_1.ACCOUNT_ERROR_UNKNOWN);
        }
    }
    async verifySerialNumber(serialNumber) {
        await this.createSession();
        if (!serialNumber) {
            throw new Error(const_1.ARGUEMENT_ERROR_SERIAL_NUMBER_NULL_EMPTY);
        }
        const params = { sessionId: this.sessionId, serialNumber };
        return ((await this.request('post', const_1.DEXCOM_VERIFY_SERIAL_NUMBER_ENDPOINT, params)) === 'AssignedToYou');
    }
    async getGlucoseReadings(minutes = 1440, maxCount = 288) {
        await this.createSession();
        if (minutes < 1 || minutes > 1440) {
            throw new Error(const_1.ARGUEMENT_ERROR_MINUTES_INVALID);
        }
        if (maxCount < 1 || maxCount > 288) {
            throw new Error(const_1.ARGUEMENT_ERROR_MAX_COUNT_INVALID);
        }
        const params = {
            sessionId: this.sessionId,
            minutes,
            maxCount,
        };
        const readings = await this.request('post', const_1.DEXCOM_GLUCOSE_READINGS_ENDPOINT, params);
        return readings.map((reading) => new GlucoseReading(reading));
    }
    async getLatestGlucoseReading() {
        return (await this.getGlucoseReadings(undefined, 1))[0];
    }
    async getCurrentGlucoseReading() {
        return (await this.getGlucoseReadings(10, 1))[0];
    }
}
exports.Dexcom = Dexcom;
//# sourceMappingURL=index.js.map