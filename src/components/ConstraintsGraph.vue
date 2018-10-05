<template>
  <div class="constraints-graph">
    <h1>Constraint Analysis</h1>
    <h2>Inputs</h2>
    <div id="inputs">
      <label><Equation data="$C_{L_{TO}}$" title="Takeoff Lift Coefficient"/>
        <input type="range" min="0" max="2" step="0.05" v-model.number="liftCoefficientTakeoff"/> <input v-model.number="liftCoefficientTakeoff"/>
      </label>
      <label><Equation data="$C_{D_{TO}}$" title="Takeoff Drag Coefficient"/>
        <input type="range" min="0" max="2" step="0.05" v-model.number="dragCoefficientTakeoff"/> <input v-model.number="dragCoefficientTakeoff"/>
      </label>
      <label><Equation data="$C_{D_{min}}$" title="Minimum Drag Coefficient"/>
        <input type="range" min="0" max="0.05" step=".005" v-model.number="minDragCoeff"/> <input v-model.number="minDragCoeff"/>
      </label>
      <label><Equation data="$C_{D_{LI}}$" title="Lift Induced Drag Coefficient"/>
        <input type="range" min="0" max="2" step="0.05" v-model.number="dragCoefficientLiftInduced"/> <input v-model.number="dragCoefficientLiftInduced"/>
      </label>
      <label><Equation data="$h$" title="Altitude"/>
        <input type="range" min="0" max="50000" step="1000" v-model.number="altitude"/> <input v-model.number="altitude"/>&nbsp;ft
      </label>
      <label><Equation data="$V_{stall}$" title="Stall Speed"/>
        <input type="range" min="0" max="500" step="10" v-model.number="stallSpeed"/> <input v-model.number="stallSpeed"/>&nbsp;ft/s
      </label>
      <label><Equation data="$V_{cruise}$" title="Cruise Airspeed"/>
        <input type="range" min="0" max="500" step="10" v-model.number="cruiseAirspeed"/> <input v-model.number="cruiseAirspeed"/>&nbsp;ft/s
      </label>
      <label><Equation data="$V_{v}$" title="Vertical Speed"/>
        <input type="range" min="0" max="20" step="1" v-model.number="verticalSpeed"/> <input v-model.number="verticalSpeed"/>&nbsp;ft/s
      </label>
      <label><Equation data="$s_{G}$" title="Ground Run"/>
        <input type="range" min="0" max="3000" step="100" v-model.number="groundRun"/> <input v-model.number="groundRun"/>&nbsp;ft
      </label>
      <label><Equation data="$\mu$" title="Ground Friction Coefficient"/>
        <input type="range" min="0" max="1" step=".05" v-model.number="groundFrictionCoeff"/> <input v-model.number="groundFrictionCoeff"/>
      </label>
    </div>
    <h2>Calculated</h2>
    <div id="calculated">
      <dl>
        <dt>Dynamic Pressure (lb/ft^2)</dt>
        <dd>{{dynamicPressure}}</dd>
        <dt>Takeoff Speed (ft/s)</dt>
        <dd>{{takeoffSpeed}}</dd>
      </dl>
    </div>
    <label>Ymin<input v-model.number="ymin"/></label>
    <label>Ymax<input v-model.number="ymax"/></label>
    <GChart type="AreaChart" :data="chartData" :options="chartOptions"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GChart } from 'vue-google-charts';
import Equation from '@/components/Equation.vue';

@Component({
  components: {
  GChart,
  Equation
  }
  })
export default class ConstraintsGraph extends Vue {
  /**
   * density at sea level in lb/ft^3
   * 0.0765
   * 0.0023768924 slugs/ft^3
   */
  public densitySeaLevel: number =  0.0023768924;

  /**
   * take off speed in ft/s
   */
  public get takeoffSpeed(): number {
    return 1.2 * this.stallSpeed;
  };

  /**
   * crusing airspeed in ft/s
   */
  public cruiseAirspeed: number = 220;

  /**
   * altitude in ft
   */
  public altitude: number = 0;

  /**
   * dynamic pressure in lb/ft^2
   */
  public get dynamicPressure(): number {
    return 0.5 * this.densitySeaLevel * Math.pow(this.takeoffSpeed, 2);
  };

  /**
   * vertical speed in ft/s
   */
  public verticalSpeed: number = 10;

  /**
   * minimum drag coefficient
   */
  public minDragCoeff: number = 0.03;

  /**
   * lift induced drag coefficient
   */
  public dragCoefficientLiftInduced: number = 0.022;

  /**
   * lift induced drag
   */
  public get liftInducedDrag(): number {
    return this.dragCoefficientLiftInduced * 0.5 * this.densitySeaLevel * Math.pow(this.takeoffSpeed,2);
  }

  /**
   * ground run in ft
   */
  public groundRun: number = 1200;

  /**
   * stall speed in ft/s
   */
  public stallSpeed: number = 112;

  /**
   * take off drag coefficient
   */
  public dragCoefficientTakeoff: number = 0.028;

  /**
   * take off lift coefficient
   */
  public liftCoefficientTakeoff: number = 2.9;

  /**
   * ground friction coeff
   */
  public groundFrictionCoeff: number = 0.3;

  /**
   * load factor
   */
  public loadFactor: number = 1.41;

  /**
   * data for the google chart
   */
  get chartData(): (string | number | object)[][] {
    const xAxis = Array.from({ length: 500 }, (v, k) => (k+1) / 10);
    const data = xAxis.map(x =>
      [x, this.takeoffRun(x), this.sustainedTurn(x), this.climbRate(x)]);
    console.log(data);
    return [
      ['x', 'Take Off Length', 'Sustained Turn', 'Climb Rate'],
      ...data,
    ];
  }

  /**
   * the max value on the vertical axis
   */
  public ymax:number = 2;

  /**
   * the min value on the vertical axis
   */
  public ymin:number = 0;

  /**
   * options to use for the google chart
   */
  public get chartOptions(){
    return {
      title: 'Design Space',
      height:500,
      hAxis: {
        title: "W/S",
      },
      vAxis: {
        title: "T/W",
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
      annotations: {
        style: 'line'
      }
    };
  };

  /**
   * Thrust to weight ratio for take off run as a function of wing loading
   * @param {number} wingLoading the wing loading at takeoff (W_TO)/S
   */
  public takeoffRun(wingLoading: number): number {
    // return Math.pow(this.takeoffSpeed, 2) / (2 * 32.2 * this.groundRun)
    //   + this.dynamicPressure * this.dragCoefficientTakeoff / wingLoading;
    //   + this.groundFrictionCoeff * (1 - (this.dynamicPressure * this.liftCoefficientTakeoff) / wingLoading);
    return Math.pow(1.2, 2) / (this.groundRun * this.densitySeaLevel * this.liftCoefficientTakeoff) * wingLoading;
  }

  /**
   * Thrust to weight ratio for landing distance as a function of wing loading
   * @param {number} wingLoading the wing loading at takeoff (W_TO)/S
   */
  public sustainedTurn(wingLoading: number): number {
    return this.dynamicPressure * ((this.minDragCoeff / wingLoading)
      + (this.dragCoefficientLiftInduced * Math.pow(this.loadFactor / this.dynamicPressure, 2) * wingLoading));
  }

  /**
   * Thrust to weight ratio for climb rate as a function of wing loading
   * @param {number} wingLoading the wing loading at takeoff (W_TO)/S
   */
  public climbRate(wingLoading: number): number {
    return (this.verticalSpeed / this.cruiseAirspeed)
      + (this.dynamicPressure / wingLoading) * this.minDragCoeff
      + (this.dragCoefficientLiftInduced / this.dynamicPressure) * wingLoading;
    // return ((this.liftInducedDrag / this.dynamicPressure) * wingLoading)
    //   + ((this.dragCoefficientTakeoff * this.dynamicPressure) / wingLoading)
    //   + ((1 / this.takeoffSpeed) * this.verticalSpeed);
  }
}
</script>

<style lang="scss" scoped>
  #inputs {
    display: flex;
    flex-wrap: wrap;

    label {
      display: flex;
      flex: 1;
      margin: .5em 0;

      & > span {
        width: 100px;
        text-align: right;
      }
    }
  }
</style>
