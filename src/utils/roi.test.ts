import { describe, it, expect } from "vitest";
import { calculateAnnualReclaimedHours, calculateEngineeredLeverage } from "./roi";

describe("ROI Calculation Logic", () => {
    it("calculates annual reclaimed hours correctly (standard: 50 weeks)", () => {
        // 10 members * 5 hours/week * 50 weeks = 2500 hours
        expect(calculateAnnualReclaimedHours(10, 5)).toBe(2500);

        // 1 member * 1 hour/week * 50 weeks = 50 hours
        expect(calculateAnnualReclaimedHours(1, 1)).toBe(50);

        // 100 members * 20 hours/week * 50 weeks = 100,000 hours
        expect(calculateAnnualReclaimedHours(100, 20)).toBe(100000);
    });

    it("calculates engineered leverage correctly (standard: 2000 hours per FTU)", () => {
        // 2500 hours / 2000 = 1.25 (rounded to 1 decimal: 1.3)
        // Wait, (2500/2000).toFixed(1) should be "1.3"
        expect(calculateEngineeredLeverage(2500)).toBe("1.3");

        // 2000 hours / 2000 = 1.0
        expect(calculateEngineeredLeverage(2000)).toBe("1.0");

        // 100,000 hours / 2000 = 50.0
        expect(calculateEngineeredLeverage(100000)).toBe("50.0");
    });
});
