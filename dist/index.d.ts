import { DEXCOM_TREND, DEXCOM_TREND_ARROW_STRINGS, DEXCOM_TREND_DESCRIPTION_STRINGS } from './const';
export declare class GlucoseReading {
    value: number;
    mdDl: number;
    mmolL: number;
    trend: DEXCOM_TREND;
    trendDescription: DEXCOM_TREND_DESCRIPTION_STRINGS;
    trendArrow: DEXCOM_TREND_ARROW_STRINGS;
    time: Date;
    constructor(reading: {
        Value: number;
        Trend: DEXCOM_TREND;
        WT: string;
    });
}
export declare class Dexcom {
    username: string;
    password: string;
    baseUrl: string;
    sessionId: string;
    constructor(username: string, password: string, ous?: boolean);
    private request;
    private validationSessionId;
    private validateAccount;
    createSession(): Promise<void>;
    verifySerialNumber(serialNumber: string): Promise<boolean>;
    getGlucoseReadings(minutes?: number, maxCount?: number): Promise<GlucoseReading[]>;
    getLatestGlucoseReading(): Promise<GlucoseReading>;
    getCurrentGlucoseReading(): Promise<GlucoseReading>;
}
//# sourceMappingURL=index.d.ts.map