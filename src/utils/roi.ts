/**
 * Calculates the annual reclaimed hours based on team size and manual hours per week.
 * Assumes a 50-week operational year.
 */
export const calculateAnnualReclaimedHours = (teamSize: number, hoursPerWeek: number): number => {
    return teamSize * hoursPerWeek * 50;
};

/**
 * Calculates the engineered leverage in Full-Time Units (FTUs).
 * Assumes 2000 hours per FTU.
 */
export const calculateEngineeredLeverage = (reclaimedHours: number): string => {
    return (reclaimedHours / 2000).toFixed(1);
};
