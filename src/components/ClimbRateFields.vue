<template>
  <fieldset>
    <legend>Climb rate</legend>
    <Equation data="$$\frac{T_{TO}}{W_{TO}} = \frac{V_v}{V} + \frac{q}{W_{TO}/S}
      \cdot C_{D_{min}} + \frac{k}{q}\cdot\frac{W_{TO}}{S}$$"/>
    <label><Equation data="$q$" title="Dynamic pressure"/>
      <input type="range" min="0" max="1000" step=".1"
        v-model.number="constraint.dynamicPressure"/>
      <span><input v-model.number="constraint.dynamicPressure"/>
      <Equation data="$lb/ft^2$"/></span>
    </label>
    <label><Equation data="$V_{v}$" title="Vertical speed"/>
      <input type="range" min="0" max="40" step="1"
        v-model.number="constraint.verticalSpeed"/>
      <span><input v-model.number="constraint.verticalSpeed"/>
      <Equation data="$ft/s$"/></span>
    </label>
    <label><Equation data="$V$" title="airspeed"/>
      <input type="range" min="0" max="500" step="10"
        v-model.number="constraint.airspeed"/>
      <span><input v-model.number="constraint.airspeed"/>
      <Equation data="$ft/s$"/></span>
    </label>
    <label><Equation data="$C_{D_{min}}$" title="Minimum drag coefficient"/>
      <input type="range" min="0" max="0.05" step=".005"
        v-model.number="constraint.minDragCoeff"/>
      <input v-model.number="constraint.minDragCoeff"/>
    </label>
    <label><Equation data="$k$" title="Lift induced drag constant"/>
      <input type="range" min="0" max="0.05" step=".005"
        v-model.number="constraint.liftInducedDragConst "/>
      <input v-model.number="constraint.liftInducedDragConst"/>
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Equation from '@/components/Equation.vue';
import { ClimbRateConstraint } from '@/interfaces/constraints';

@Component({
  components: {
  Equation,
  }
  })
export default class ClimbRateFields extends Vue {
  @Prop() constraint!: ClimbRateConstraint;
}
</script>
