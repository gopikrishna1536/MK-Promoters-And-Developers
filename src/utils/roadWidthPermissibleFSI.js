/**
 * Municipal Road Width to Permissible Floor Space Index (FSI/FAR) Calculator
 */
export class RoadWidthPermissibleFSI {
  static getPermissibleFSI(roadWidthMeters, isTransitCorridor = false) {
    let baseFSI = 1.5;
    if (roadWidthMeters >= 24) baseFSI = 2.5;
    else if (roadWidthMeters >= 18) baseFSI = 2.0;
    else if (roadWidthMeters >= 12) baseFSI = 1.75;

    if (isTransitCorridor) baseFSI += 0.5;

    return {
      roadWidthMeters,
      isTransitCorridor,
      permissibleFSI: baseFSI,
      maxBuildableAreaMultiplier: baseFSI
    };
  }
}
