<template>
  <div class="constraints-graph">
    <h1>Constraint Analysis</h1>
    <h2>Inputs</h2>
    <form id="inputs">
      <fieldset>
        <legend>Takeoff run</legend>
        <Equation data="$$\frac{T_{TO}}{W_{TO}} = \frac{k_{TO}^2}{s_G\cdot\rho_{TO}
          \cdot g_0\cdot C_{L_{TO}}}\cdot\frac{W_{TO}}{S}$$"/>
        <label><Equation data="$k_{TO}$" title="Takeoff speed coefficient"/>
          <input type="range" min="1" max="2" step="0.05"
            v-model.number="takeoffRunConstraint.takeoffSpeedCoeff"/>
          <input v-model.number="takeoffRunConstraint.takeoffSpeedCoeff"/>
        </label>
        <label><Equation data="$C_{L_{TO}}$" title="Takeoff lift coefficient"/>
          <input type="range" min="0" max="3" step="0.05"
            v-model.number="takeoffRunConstraint.liftCoefficientTakeoff"/>
          <input v-model.number="takeoffRunConstraint.liftCoefficientTakeoff"/>
        </label>
        <label><Equation data="$s_{G}$" title="Ground run"/>
          <input type="range" min="0" max="3000" step="100"
            v-model.number="takeoffRunConstraint.groundRun"/>
          <input v-model.number="takeoffRunConstraint.groundRun"/>
          <Equation data="$ft$"/>
        </label>
        <label><Equation data="$\rho_{TO}$" title="Density at takeoff"/>
          <input type="range" min="0.0004" max=".003" step="0.0001"
            v-model.number="takeoffRunConstraint.densityAtTakeoff"/>
          <input v-model.number="takeoffRunConstraint.densityAtTakeoff"/>
          <Equation data="$slugs/ft^3$"/>
        </label>
      </fieldset>
      <fieldset>
        <legend>Sustained turn</legend>
        <Equation data="$$\frac{T_{TO}}{W_{TO}} = q\left[\frac{C_{D_{min}}}{(W_{TO}/S)}\right]
          + k\left(\frac{n}{q}\right)^2\left(\frac{W_{TO}}{S}\right)$$"/>
        <label><Equation data="$q$" title="Dynamic pressure"/>
          <input type="range" min="0" max="1000" step=".1"
            v-model.number="sustainedTurnConstraint.dynamicPressure"/>
          <input v-model.number="sustainedTurnConstraint.dynamicPressure"/>
          <Equation data="$lb/ft^2$"/>
        </label>
        <label><Equation data="$C_{D_{min}}$" title="Minimum drag coefficient"/>
          <input type="range" min="0" max="0.05" step=".005"
            v-model.number="sustainedTurnConstraint.minDragCoeff"/>
          <input v-model.number="sustainedTurnConstraint.minDragCoeff"/>
        </label>
        <label><Equation data="$k$" title="Unknown Coefficient"/>
          <input type="range" min="0" max="2" step="0.05"
            v-model.number="sustainedTurnConstraint.unknownCoeff"/>
          <input v-model.number="sustainedTurnConstraint.unknownCoeff"/>
        </label>
        <label><Equation data="$n$" title="Load factor"/>
          <input type="range" min="0" max="2" step="0.05"
            v-model.number="sustainedTurnConstraint.loadFactor"/>
          <input v-model.number="sustainedTurnConstraint.loadFactor"/>
        </label>
      </fieldset>
      <fieldset>
        <legend>Climb rate</legend>
        <Equation data="$$\frac{T_{TO}}{W_{TO}} = \frac{V_v}{V_{cruise}}+ \frac{q}{W_{TO}/S}
          \cdot C_{D_{min}} + \frac{C_{D_{induced}}}{q}\cdot\frac{W_{TO}}{S}$$"/>
        <label><Equation data="$q$" title="Dynamic pressure"/>
          <input type="range" min="0" max="1000" step=".1"
            v-model.number="climbRateConstraint.dynamicPressure"/>
          <input v-model.number="climbRateConstraint.dynamicPressure"/>
          <Equation data="$lb/ft^2$"/>
        </label>
        <label><Equation data="$V_{v}$" title="Vertical speed"/>
          <input type="range" min="0" max="20" step="1"
            v-model.number="climbRateConstraint.verticalSpeed"/>
          <input v-model.number="climbRateConstraint.verticalSpeed"/>
          <Equation data="$ft/s$"/>
        </label>
        <label><Equation data="$V_{cruise}$" title="Cruise speed"/>
          <input type="range" min="0" max="500" step="10"
            v-model.number="climbRateConstraint.cruiseSpeed"/>
          <input v-model.number="climbRateConstraint.cruiseSpeed"/>
          <Equation data="$ft/s$"/>
        </label>
        <label><Equation data="$C_{D_{min}}$" title="Minimum drag coefficient"/>
          <input type="range" min="0" max="0.05" step=".005"
            v-model.number="climbRateConstraint.minDragCoeff"/>
          <input v-model.number="climbRateConstraint.minDragCoeff"/>
        </label>
        <label><Equation data="$C_{D_{induced}}$" title="Lift induced drag coefficient"/>
          <input type="range" min="0" max="0.05" step=".005"
            v-model.number="climbRateConstraint.liftInducedDragCoeff "/>
          <input v-model.number="climbRateConstraint.liftInducedDragCoeff"/>
        </label>
      </fieldset>
    </form>
    <GChart type="ComboChart" :data="chartData" :options="chartOptions"/>
    <label>Ymin: <input v-model.number="ymin"/></label>&nbsp;
    <label>Ymax: <input v-model.number="ymax"/></label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GChart, loadGoogleCharts } from 'vue-google-charts';
import Equation from '@/components/Equation.vue';
import {
  TakeoffRunConstraint,
  SustainedTurnConstraint,
  ClimbRateConstraint,
} from '@/interfaces/constraints';

@Component({
  components: {
  GChart,
  Equation
  }
  })
export default class ConstraintsGraph extends Vue {
  /**
   * data fields for take off run constraint
   */
  public takeoffRunConstraint: TakeoffRunConstraint = {
    takeoffSpeedCoeff: 1.2,
    liftCoefficientTakeoff: 2.9,
    groundRun: 1200, // ft
    densityAtTakeoff: 0.0023768924, // slugs/ft^3
  }

  /**
   * data fields for sustained turn constraint
   */
  public sustainedTurnConstraint: SustainedTurnConstraint = {
    dynamicPressure: 59, // lb/ft^2
    minDragCoeff: 0.03,
    loadFactor: 1.41,
    unknownCoeff: 0.045,
  }

  /**
   * data fields for sustained turn constraint
   */
  public climbRateConstraint: ClimbRateConstraint = {
    dynamicPressure: 59, // lb/ft^2
    minDragCoeff: 0.03,
    liftInducedDragCoeff: 0.022,
    verticalSpeed: 10, // ft/s
    cruiseSpeed: 220, // ft/s
  }

  private xAxis = Array.from({ length: 500 }, (v, k) => (k+1) / 10);

  /**
   * the minimum thrust to weight ratio
   */
  get minThrustToWeight(): number {
    let minThrustToWeight: number = Math.max(
      this.takeoffRun(this.xAxis[0]),
      this.sustainedTurn(this.xAxis[0]),
      this.climbRate(this.xAxis[0]),
    );
    let wingLoadingAtMinThrustToWeight: number = this.xAxis[0];
    this.xAxis.forEach((wingLoading) => {
      const minThrustToWeightAtThisWingLoading = Math.max(
        this.takeoffRun(wingLoading),
        this.sustainedTurn(wingLoading),
        this.climbRate(wingLoading),
      );
      if (minThrustToWeightAtThisWingLoading < minThrustToWeight) {
        minThrustToWeight = minThrustToWeightAtThisWingLoading;
        wingLoadingAtMinThrustToWeight = wingLoading;
      }
      minThrustToWeight = Math.min(minThrustToWeight, minThrustToWeightAtThisWingLoading);
    });
    return minThrustToWeight;
  }

  /**
   * data for the google chart
   * @returns {(string | number | null | object)[][]} a two-dimensional array of
   * data to be processed with google charts arrayToDataTable()
   */
  get chartData(): (string | number | null | object)[][] {
    const google = loadGoogleCharts('current', { packages: ['corechart'] });
    const header = [
      { label: 'Wing loading', type: 'number' }, { label: 'Takeoff run', type: 'number' },
      { label: 'Sustained turn', type: 'number' }, { label: 'Climb rate', type: 'number' },
      { type: 'number' }, { type: 'string', role: 'annotation' },
      { type: 'string', role: 'annotationText' },
    ];
    const rows = this.xAxis.map((wingLoading) => {
      const thrustToWeightRatios = [
        this.takeoffRun(wingLoading),
        this.sustainedTurn(wingLoading),
        this.climbRate(wingLoading),
      ];
      let annotation = null;
      let annotationText = null;
      let optimumPoint = null;
      if (Math.max(...thrustToWeightRatios) === this.minThrustToWeight) {
        annotation = 'Optimum';
        annotationText = `Optimum T/W: ${this.minThrustToWeight}`;
        optimumPoint = this.minThrustToWeight;
      }
      return [
        wingLoading,
        ...thrustToWeightRatios,
        optimumPoint,
        annotation,
        annotationText];
    });
    const data = [header, ...rows];
    console.log(data);
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
      seriesType: 'area',
      series: {
        3: { visibleInLegend: false },
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
   * Thrust to weight ratio for take off run as a function of wing loading
   * @param {number} wingLoading the wing loading at takeoff (W_TO)/S [lbf/ft^2]
   * @return {number} thrust to weight ratio
   */
  public takeoffRun(wingLoading: number): number {
    const k = this.takeoffRunConstraint.takeoffSpeedCoeff;
    const Sg = this.takeoffRunConstraint.groundRun;
    const rho = this.takeoffRunConstraint.densityAtTakeoff;
    const CL = this.takeoffRunConstraint.liftCoefficientTakeoff;
    return ((k**2) / (Sg * rho * 32.2 * CL)) * wingLoading;
  }

  /**
   * Thrust to weight ratio for landing distance as a function of wing loading
   * @param {number} wingLoading the wing loading at takeoff (W_TO)/S
   * @return {number} thrust to weight ratio
   */
  public sustainedTurn(wingLoading: number): number {
    const q = this.sustainedTurnConstraint.dynamicPressure;
    const n = this.sustainedTurnConstraint.loadFactor;
    const CDmin = this.sustainedTurnConstraint.minDragCoeff;
    const k = this.sustainedTurnConstraint.unknownCoeff;
    return q * ((CDmin / wingLoading) + (k * ((n / q)**2) * wingLoading));
  }

  /**
   * Thrust to weight ratio for climb rate as a function of wing loading
   * @param {number} wingLoading the wing loading at takeoff (W_TO)/S
   * @return {number} thrust to weight ratio
   */
  public climbRate(wingLoading: number): number {
    const q = this.climbRateConstraint.dynamicPressure;
    const Vv = this.climbRateConstraint.verticalSpeed;
    const V = this.climbRateConstraint.cruiseSpeed;
    const CDmin = this.climbRateConstraint.minDragCoeff;
    const CDinduced = this.climbRateConstraint.liftInducedDragCoeff;
    return (Vv / V) + ((q / wingLoading) * CDmin) + ((CDinduced / q) * wingLoading);
  }
}
</script>

<style lang="scss" scoped>
  #inputs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    label {
      display: flex;
      flex: 1;
      margin: 0.5em 0;

      & > span:first-child {
        width: 70px;
        text-align: right;
      }
      & > span:last-child {
        margin-left: 0.5em;
      }
    }
  }
</style>
