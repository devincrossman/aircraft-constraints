export interface TakeoffRunConstraint {
  /**
   * weight fraction [dimensionless]
   */
  weightFraction: number,
  /**
   * thrust fraction [dimensionless]
   */
  thrustFraction: number,
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
   * density [slugs/ft^3]
   */
  density: number,
}

export interface SustainedTurnConstraint {
  /**
   * lift induced drag constant
   */
  liftInducedDragConst: number,
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
   * airspeed for best rate of climb [ft/s]
   */
  airspeed: number,
  /**
   * minimum drag coefficient [dimensionless]
   */
  minDragCoeff: number,
  /**
   * lift induced drag constant [dimensionless]
   */
  liftInducedDragConst: number,
}

export interface ClimbAngleConstraint {
  /**
   * weight fraction [dimensionless]
   */
  weightFraction: number,
  /**
   * thrust fraction [dimensionless]
   */
  thrustFraction: number,
  /**
   * lift induced drag constant [dimensionless]
   */
  liftInducedDragConst: number,
  /**
   * dynamic pressure [lb/ft^2]
   */
  dynamicPressure: number,
  /**
   * minimum drag coefficient [dimensionless]
   */
  minDragCoeff: number,
  /**
   * climb angle [deg]
   */
  climbAngle: number
}

export interface StallSpeedConstraint {
  /**
   * density [slugs/ft^3]
   */
  density: number,
  /**
   * velocity [ft/s]
   */
  velocity: number,
  /**
   * lift coefficient [dimensionless]
   */
  liftCoefficient: number,
}

export interface LandingDistanceConstraint {
  /**
   * landing weight fraction [dimensionless]
   */
  weightFraction: number,
  /**
   * density [slugs/ft^3]
   */
  density: number,
  /**
   * landingDistance [ft]
   */
  landingDistance: number,
  /**
   * lift coefficient [dimensionless]
   */
  liftCoefficient: number,
}

export interface ServiceCeilingConstraint {
  /**
   * vertical speed [ft/s]
   */
  verticalSpeed: number,
  /**
   * density [slugs/ft^3]
   */
  density: number,
  /**
   * lift induced drag constant [dimensionless]
   */
  liftInducedDragConst: number,
  /**
   * minimum drag coefficient [dimensionless]
   */
  minDragCoeff: number,
}

export interface CruiseSpeedConstraint {
  /**
   * lift induced drag constant [dimensionless]
   */
  liftInducedDragConst: number,
  /**
   * minimum drag coefficient [dimensionless]
   */
  minDragCoeff: number,
  /**
   * dynamic pressure [lb/ft^2]
   */
  dynamicPressure: number,
}
