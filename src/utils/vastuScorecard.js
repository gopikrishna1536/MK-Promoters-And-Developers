/**
 * Architectural Vastu Shastra Compliance Scorecard
 */
export class VastuScorecard {
  static IDEAL_ZONES = {
    main_entrance: ['north', 'east', 'north_east'],
    master_bedroom: ['south_west'],
    kitchen: ['south_east', 'north_west'],
    pooja_room: ['north_east'],
    overhead_tank: ['south_west', 'west']
  };

  static evaluateLayout(rooms = {}) {
    let score = 0;
    const maxScore = Object.keys(VastuScorecard.IDEAL_ZONES).length * 20;
    const findings = [];

    for (const [room, idealList] of Object.entries(VastuScorecard.IDEAL_ZONES)) {
      const placement = (rooms[room] || '').toLowerCase().replace(/\s+/g, '_');
      if (idealList.includes(placement)) {
        score += 20;
      } else {
        findings.push(`${room} in ${placement || 'unspecified'} deviates from recommended zones`);
      }
    }

    const percentage = Number(((score / maxScore) * 100).toFixed(1));
    return {
      vastuScore: score,
      maxScore,
      compliancePercentage: percentage,
      isVastuCompliant: percentage >= 80.0,
      deviations: findings
    };
  }
}
