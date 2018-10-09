<template>
  <div class="constraints-graph">
    <h1>Constraint Analysis</h1>
    <div id="constraints-graph-ui">
      <div id="chart" v-if="isOnline">
        <GChart type="ComboChart" :data="chartData" :options="chartOptions"/>
        <label>Ymin: <input v-model.number="ymin"/></label><br>
        <label>Ymax: <input v-model.number="ymax"/></label><br>
      </div>
      <div v-else>Charts are not available offline</div>
      <div id="inputs">
        <form id="constraint-form">
          <select v-model="editWhichConstraint">
            <option disabled value="">Select a constraint to edit</option>
            <option value="editTakeoffRun">Takeoff run</option>
            <option value="editSustainedTurn">Sustained turn</option>
            <option value="editClimbRate">Climb rate</option>
            <option value="editClimbAngle">Climb angle</option>
            <option value="editLandingDistance">Landing distance</option>
            <option value="editStallSpeed">Stall speed</option>
            <option value="editServiceCeiling">Service ceiling</option>
            <option value="editCruiseSpeed">Cruise speed</option>
          </select>
          <TakeoffRunFields :constraint="takeoffRunConstraint"
            v-show="editWhichConstraint === 'editTakeoffRun'"/>
          <SustainedTurnFields :constraint="sustainedTurnConstraint"
            v-show="editWhichConstraint === 'editSustainedTurn'"/>
          <ClimbRateFields :constraint="climbRateConstraint"
            v-show="editWhichConstraint === 'editClimbRate'"/>
          <ClimbAngleFields :constraint="climbAngleConstraint"
            v-show="editWhichConstraint === 'editClimbAngle'"/>
          <LandingDistanceFields :constraint="landingDistanceConstraint"
            v-show="editWhichConstraint === 'editLandingDistance'"/>
          <StallSpeedFields :constraint="stallSpeedConstraint"
            v-show="editWhichConstraint === 'editStallSpeed'"/>
          <ServiceCeilingFields :constraint="serviceCeilingConstraint"
            v-show="editWhichConstraint === 'editServiceCeiling'"/>
          <CruiseSpeedFields :constraint="cruiseSpeedConstraint"
            v-show="editWhichConstraint === 'editCruiseSpeed'"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GChart, loadGoogleCharts } from 'vue-google-charts';
import {
  TakeoffRunConstraint,
  SustainedTurnConstraint,
  ClimbRateConstraint,
  ClimbAngleConstraint,
  LandingDistanceConstraint,
  StallSpeedConstraint,
  ServiceCeilingConstraint,
  CruiseSpeedConstraint,
} from '@/interfaces/constraints';
import Equation from '@/components/Equation.vue';
import TakeoffRunFields from '@/components/TakeoffRunFields.vue';
import SustainedTurnFields from '@/components/SustainedTurnFields.vue';
import ClimbRateFields from '@/components/ClimbRateFields.vue';
import ClimbAngleFields from '@/components/ClimbAngleFields.vue';
import LandingDistanceFields from '@/components/LandingDistanceFields.vue';
import StallSpeedFields from '@/components/StallSpeedFields.vue';
import ServiceCeilingFields from '@/components/ServiceCeilingFields.vue';
import CruiseSpeedFields from '@/components/CruiseSpeedFields.vue';

@Component({
  components: {
  GChart,
  Equation,
  TakeoffRunFields,
  SustainedTurnFields,
  ClimbRateFields,
  ClimbAngleFields,
  LandingDistanceFields,
  StallSpeedFields,
  ServiceCeilingFields,
  CruiseSpeedFields,
  }
  })
export default class ConstraintsGraph extends Vue {
  /**
   * whether the app is online or not
   */
  /* eslint-disable-next-line class-methods-use-this */
  get isOnline() {
    return window.navigator.onLine;
  }

  /**
   * data fields for take off run constraint
   */
  public takeoffRunConstraint: TakeoffRunConstraint = {
    weightFraction: 1,
    thrustFraction: 1,
    takeoffSpeedCoeff: 1.2,
    liftCoefficientTakeoff: 2.9,
    groundRun: 1200, // ft
    density: 0.0023768924, // slugs/ft^3
  }

  /**
   * data fields for sustained turn constraint
   */
  public sustainedTurnConstraint: SustainedTurnConstraint = {
    dynamicPressure: 63.9698, // lb/ft^2
    minDragCoeff: 0.024,
    loadFactor: 1.4142,
    liftInducedDragConst: 0.0396,
  }

  /**
   * data fields for sustained turn constraint
   */
  public climbRateConstraint: ClimbRateConstraint = {
    dynamicPressure: 16, // lb/ft^2
    minDragCoeff: 0.03,
    liftInducedDragConst: 0.0396,
    verticalSpeed: 20, // ft/s
    airspeed: 220, // ft/s
  }

  /**
   * data fields for climb angle constraint
   */
  public climbAngleConstraint: ClimbAngleConstraint = {
    weightFraction: 1,
    thrustFraction: 1,
    liftInducedDragConst: 0.0396,
    dynamicPressure: 59,
    minDragCoeff: 0.03,
    climbAngle: 3.1,
  }

  /**
   * data fields for landing distance
   */
  public landingDistanceConstraint: LandingDistanceConstraint = {
    density: 0.0023768924, // slug/ft^3
    landingDistance: 2500, // ft
    liftCoefficient: 2.5,
    weightFraction: 0.94,
  }

  /**
   * data fields for stall speed
   */
  public stallSpeedConstraint: StallSpeedConstraint = {
    density: 0.0023768924, // slug/ft^3
    velocity: 113, // ft/s
    liftCoefficient: 2.5,
  }

  /**
   * data fields for service ceiling
   */
  public serviceCeilingConstraint: ServiceCeilingConstraint = {
    verticalSpeed: 1.667, // ft/s
    density: 0.0023768924, // slug/ft^3
    liftInducedDragConst: 0.03832985835,
    minDragCoeff: 0.03,
  }

  /**
   * data fields for cruise speed
   */
  public cruiseSpeedConstraint: CruiseSpeedConstraint = {
    liftInducedDragConst: 0.03832985835,
    minDragCoeff: 0.03,
    dynamicPressure: 63.9698, // lb/ft^2
  }

  /**
   * the wing loading as determined by the stall speed constraint
   */
  get stallSpeedWingLoading(): number {
    const rho = this.stallSpeedConstraint.density;
    const V = this.stallSpeedConstraint.velocity;
    const CLmax = this.stallSpeedConstraint.liftCoefficient;
    return 0.5 * rho * (V**2) * CLmax;
  }

  /**
   * the wing loading as determined by the landing distance constraint
   */
  get landingDistanceWingLoading(): number {
    const b = this.landingDistanceConstraint.weightFraction;
    const rho = this.landingDistanceConstraint.density;
    const CLmax = this.landingDistanceConstraint.liftCoefficient;
    const SL = this.landingDistanceConstraint.landingDistance;
    return 2.889 * (1 / b) * rho * CLmax * SL;
  }

  /**
   * which constraint fields to show for editing
   */
  public editWhichConstraint: string = '';

  /**
   * the values for the x-axis
   */
  private xAxis = Array.from({ length: 1300 }, (v, k) => (k+1) / 10);

  /**
   * takes an index and returns the chart data for the constraint series at that index
   * @param {number} index the index of the chart data
   * @returns an array containing the chart data for each series at the given index
   */
  private aggregatedConstraintSeriesData(index: number): number[] {
    return ([
      this.takeoffRunChartData[index],
      this.sustainedTurnChartData[index],
      this.climbRateChartData[index],
      this.climbAngleChartData[index],
      this.landingDistanceChartData[index],
      this.stallSpeedChartData[index],
      this.serviceCeilingChartData[index],
      this.cruiseSpeedChartData[index],
    ] as number[]);
  }

  /**
   * the minimum (optimal) thrust to weight ratio
   */
  get minThrustToWeight(): number {
    return Math.min(...this.xAxis.map((wingLoading, index) =>
      Math.max(...this.aggregatedConstraintSeriesData(index))));
  }

  /**
   * the thrust to weight chart data for takeoff run
   */
  get takeoffRunChartData(): (number | null | string)[] {
    return this.xAxis.map(wingLoading => this.takeoffRun(wingLoading));
  }

  /**
   * the thrust to weight chart data for sustained turn
   */
  get sustainedTurnChartData(): (number | null | string)[] {
    return this.xAxis.map(wingLoading => this.sustainedTurn(wingLoading));
  }

  /**
   * the thrust to weight chart data for climb rate
   */
  get climbRateChartData(): (number | null | string)[] {
    return this.xAxis.map(wingLoading => this.climbRate(wingLoading));
  }

  /**
   * the thrust to weight chart data for climb angle
   */
  get climbAngleChartData(): (number | null | string)[] {
    return this.xAxis.map(wingLoading => this.climbAngle(wingLoading));
  }

  /**
   * the thrust to weight chart data for landing distance
   */
  get landingDistanceChartData(): (number | null | string)[] {
    return this.xAxis.map(wingLoading => this.landingDistance(wingLoading));
  }

  /**
   * the thrust to weight chart data for stall speed
   */
  get stallSpeedChartData(): (number | null | string)[] {
    return this.xAxis.map(wingLoading => this.stallSpeed(wingLoading));
  }

  /**
   * the thrust to weight chart data for service ceiling
   */
  get serviceCeilingChartData(): (number | null | string)[] {
    return this.xAxis.map(wingLoading => this.serviceCeiling(wingLoading));
  }

  /**
   * the thrust to weight chart data for cruise speed
   */
  get cruiseSpeedChartData(): (number | null | string)[] {
    return this.xAxis.map(wingLoading => this.cruiseSpeed(wingLoading));
  }

  /**
   * data for the google chart
   * @returns {(string | number | null | object)[][]} a two-dimensional array of
   * data to be processed with google charts arrayToDataTable()
   */
  get chartData(): (string | number | null | object)[][] {
    const google = loadGoogleCharts('current', { packages: ['corechart'] });
    const header = [
      { label: 'Wing loading', type: 'number' },
      // separate series for example aircraft and optimum point annotations
      { type: 'number' }, { type: 'string', role: 'annotation' },
      { type: 'string', role: 'annotationText', p: { html: true } },
      // constraint series
      { label: 'Takeoff run', type: 'number' }, { label: 'Sustained turn', type: 'number' },
      { label: 'Climb rate', type: 'number' }, { label: 'Climb angle', type: 'number' },
      { label: 'Landing distance', type: 'number' }, { label: 'Stall speed', type: 'number' },
      { label: 'Service ceiling', type: 'number' }, { label: 'Cruise speed', type: 'number' },
    ];
    const exampleAircraft = [
      ['121', '.2884', '737-300', 'T/W: 0.2884<br>W/S: 121',
        ...(new Array(this.constraintFunctions.length)).fill(null)],
      ['62.83', '.212', 'ATR-300', 'T/W: 0.212<br>W/S: 62.83',
        ...(new Array(this.constraintFunctions.length)).fill(null)],
      ['71.07', '.221', 'Q300-8', 'T/W: 0.221<br>W/S: 71.07',
        ...(new Array(this.constraintFunctions.length)).fill(null)],
      ['52.06', '.3708', 'DHC-5', 'T/W: 0.3708<br>W/S: 52.06',
        ...(new Array(this.constraintFunctions.length)).fill(null)],
    ];
    const rows = this.xAxis.map((wingLoading, index) => {
      const thrustToWeightRatios = this.aggregatedConstraintSeriesData(index);
      let optimumPoint = null;
      let annotation = null;
      let annotationText = null;
      if (Math.max(...thrustToWeightRatios) === this.minThrustToWeight) {
        optimumPoint = this.minThrustToWeight;
        annotation = 'Optimum';
        annotationText = `Optimum T/W: ${this.minThrustToWeight}<br>Optimum W/S: ${wingLoading}`;
      }
      return [
        wingLoading,
        optimumPoint,
        annotation,
        annotationText,
        ...thrustToWeightRatios];
    });
    const data = [header, ...exampleAircraft, ...rows];
    return data;
  }

  /**
   * the max value on the vertical axis
   */
  private ymax:number = 0.5;

  /**
   * the min value on the vertical axis
   */
  private ymin:number = 0;

  /**
   * options to use for the google chart
   */
  private get chartOptions() {
    return {
      title: 'Design space',
      height: 500,
      tooltip: { isHtml: true },
      seriesType: 'area',
      series: {
        0: { visibleInLegend: false, type: 'line', lineWidth: 0 },
        5: { type: 'steppedArea' },
        6: { type: 'steppedArea' },
      },
      hAxis: {
        title: 'W/S',
      },
      vAxis: {
        title: 'T/W',
        viewWindow: {
          max: this.ymax,
          min: this.ymin,
        },
      },
      animation: {
        startup: true,
        duration: 300,
        easing: 'out',
      },
    };
  }

  /**
   * an array of constraint functions that calculate the thrust to weight ratio
   * and take the wing loading (W_TO)/S as an input paramater
   */
  private constraintFunctions = [
    this.takeoffRun,
    this.sustainedTurn,
    this.climbRate,
    this.climbAngle,
    this.landingDistance,
    this.stallSpeed,
    this.serviceCeiling,
    this.cruiseSpeed,
  ];

  /**
   * Thrust to weight ratio for take off run as a function of wing loading
   * @param {number} wingLoading the wing loading (W_TO)/S [lbf/ft^2]
   * @returns {number} thrust to weight ratio
   */
  public takeoffRun(wingLoading: number): number {
    const b = this.takeoffRunConstraint.weightFraction;
    const a = this.takeoffRunConstraint.thrustFraction;
    const k = this.takeoffRunConstraint.takeoffSpeedCoeff;
    const Sg = this.takeoffRunConstraint.groundRun;
    const rho = this.takeoffRunConstraint.density;
    const CL = this.takeoffRunConstraint.liftCoefficientTakeoff;
    return ((b**2) / a) * ((k**2) / (Sg * rho * 32.2 * CL)) * wingLoading;
  }

  /**
   * Thrust to weight ratio for landing distance as a function of wing loading
   * @param {number} wingLoading the wing loading (W_TO)/S
   * @returns {number} thrust to weight ratio
   */
  public sustainedTurn(wingLoading: number): number {
    const q = this.sustainedTurnConstraint.dynamicPressure;
    const n = this.sustainedTurnConstraint.loadFactor;
    const CDmin = this.sustainedTurnConstraint.minDragCoeff;
    const k = this.sustainedTurnConstraint.liftInducedDragConst;
    return q * ((CDmin / wingLoading) + (k * ((n / q)**2) * wingLoading));
  }

  /**
   * Thrust to weight ratio for climb rate as a function of wing loading
   * @param {number} wingLoading the wing loading (W_TO)/S
   * @returns {number} thrust to weight ratio
   */
  public climbRate(wingLoading: number): number {
    const q = this.climbRateConstraint.dynamicPressure;
    const Vv = this.climbRateConstraint.verticalSpeed;
    const V = this.climbRateConstraint.airspeed;
    const CDmin = this.climbRateConstraint.minDragCoeff;
    const CDinduced = this.climbRateConstraint.liftInducedDragConst;
    return (Vv / V) + ((q / wingLoading) * CDmin) + ((CDinduced / q) * wingLoading);
  }

  /**
   * Thrust to weight ratio for climb angle as a function of wing loading
   * @param {number} wingLoading the wing loading (W_TO)/S
   * @returns {number} thrust to weight ratio
   */
  public climbAngle(wingLoading: number): number {
    const b = this.climbAngleConstraint.weightFraction;
    const a = this.climbAngleConstraint.thrustFraction;
    const k = this.climbAngleConstraint.liftInducedDragConst;
    const q = this.climbAngleConstraint.dynamicPressure;
    const CDmin = this.climbAngleConstraint.minDragCoeff;
    const theta = this.climbAngleConstraint.climbAngle * (Math.PI / 180);
    return (b / a) * ((k * (b / q) * wingLoading) + (CDmin / ((b / q) * wingLoading))
      + Math.sin(theta));
  }

  /**
   * plot the stall speed by returning a high thrust to weight ratio
   * when wing loading is equal or greater than the stall speed wing loading
   * @param {number} wingLoading the wing loading (W_TO)/S
   * @return {number} thrust to weight ratio
   */
  public stallSpeed(wingLoading: number): number | null {
    if (wingLoading >= this.stallSpeedWingLoading) {
      return 999;
    }
    return null;
  }

  /**
   * plot the landing distance by returning a high thrust to weight ratio
   * when wing loading is equal or greater than the landing distance wing loading
   * @param {number} wingLoading the wing loading (W_TO)/S
   * @return {number} thrust to weight ratio
   */
  public landingDistance(wingLoading: number): number | null {
    if (wingLoading >= this.landingDistanceWingLoading) {
      return 999;
    }
    return null;
  }

  /**
   * Thrust to weight ratio for service ceiling
   * @param {number} wingLoading the wing loading (W_TO)/S
   * @return {number} thrust to weight ratio
   */
  public serviceCeiling(wingLoading: number): number {
    const k = this.serviceCeilingConstraint.liftInducedDragConst;
    const Vv = this.serviceCeilingConstraint.verticalSpeed;
    const CDmin = this.serviceCeilingConstraint.minDragCoeff;
    const rho = this.serviceCeilingConstraint.density;
    return (Vv / Math.sqrt(((2 * k)/(3 * rho * CDmin)) * wingLoading))
      + (4 * Math.sqrt((k * CDmin) / 3));
  }

  /**
   * Thrust to weight ratio for service ceiling
   * @param {number} wingLoading the wing loading (W_TO)/S
   * @return {number} thrust to weight ratio
   */
  public cruiseSpeed(wingLoading: number): number {
    const k = this.cruiseSpeedConstraint.liftInducedDragConst;
    const CDmin = this.cruiseSpeedConstraint.minDragCoeff;
    const q = this.cruiseSpeedConstraint.dynamicPressure;
    return ((q * CDmin) / (wingLoading)) + ((k * wingLoading) / q);
  }
}
</script>

<style lang="scss">
  $desktopWidth: 1325px;
  #constraints-graph-ui {
    display: flex;
    flex-wrap: wrap;
  }

  #chart {
    width:100%;
  }

  #inputs {
    flex: 1;
  }
  @media screen and (min-width: $desktopWidth) {
    #chart {
      flex: 1;
      max-width: 70%;
    }

    #inputs {
      flex: 1;
      max-width:30%;
      order: -1;
    }
  }
  #constraint-form {
    display: flex;
    flex-direction: column;

    select {
      flex: 1;
      max-width: 300px;
      margin: 1.5em auto;
    }

    fieldset {
      padding: 0.5em;
      flex: 1;
      max-width: 600px;
      margin: 0 auto;
    }

    label {
      display: flex;
      flex-direction: column;
      padding: 0.5em 0;

      & > input[type="range"] {
        width: 100%;
        margin: 0.5em 0;
        padding: 0;
      }

      & > span:last-child {
        display: flex;

        & > input {
          flex: 1;
        }

        & > span {
          margin-left: 0.5em;
        }
      }
    }
  }
</style>
