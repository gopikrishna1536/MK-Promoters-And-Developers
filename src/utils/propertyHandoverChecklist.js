/**
 * Property Handover Snag List & Defect Liability Inspection State Machine
 */
export class PropertyHandoverChecklist {
  static evaluateHandoverReadiness(snagItems = []) {
    let criticalOpen = 0;
    let minorOpen = 0;

    for (const item of snagItems) {
      if (item.status !== 'RESOLVED') {
        if (item.severity === 'CRITICAL') criticalOpen++;
        else minorOpen++;
      }
    }

    const readyForOccupancy = criticalOpen === 0 && minorOpen <= 2;
    return {
      totalSnags: snagItems.length,
      criticalOpen,
      minorOpen,
      readyForOccupancy,
      status: readyForOccupancy ? 'APPROVED_FOR_KEY_HANDOVER' : 'HOLD_REPAIR_REQUIRED'
    };
  }
}
