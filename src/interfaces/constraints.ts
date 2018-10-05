export interface TakeoffRunConstraint {
  /**
   * takeoff speed coefficient
   */
  takeoffSpeedCoeff: number,
  /**
   * lift coefficient at takeoff [dimensionless]
   */
  liftCoefficientTakeoff: number,
  /**
   * length of ground run before rotation [ft]
   */
  groundRun: number,
  /**
   * density at takeoff [slugs/ft^3]
   */
  densityAtTakeoff: number,
}

export interface SustainedTurnConstraint {
  /**
   * unknown coefficient
   */
  unknownCoeff: number,
  /**
   * dynamic pressure [lb/ft^2]
   */
  dynamicPressure: number,
  /**
   * minimum drag coefficient [dimensionless]
   */
  minDragCoeff: number,
  /**
   * load factor [dimensionless]
   */
  loadFactor: number,
}

export interface ClimbRateConstraint {
  /**
   * dynamic pressure [lb/ft^2]
   */
  dynamicPressure: number,
  /**
   * vertical speed [ft/s]
   */
  verticalSpeed: number,
  /**
   * cruise speed [ft/s]
   */
  cruiseSpeed: number,
  /**
   * minimum drag coefficient [dimensionless]
   */
  minDragCoeff: number,
  /**
   * lift induced drag 
   */
  liftInducedDragCoeff: number,
}