<template>
  <div>
    <fieldset>
      <legend>Cruise speed</legend>
      <Equation data="$$\frac{W_{TO}}{S} = \frac{q C_{D_{min}}}{W_{TO}/S}
        + k\frac{W_{TO}/S}{q}$$"/>
      <label><Equation data="$k$" title="Lift induced drag constant"/>
        <input type="range" min="0" max="0.05" step=".005"
          v-model.number="constraint.liftInducedDragConst "/>
        <input v-model.number="constraint.liftInducedDragConst"/>
      </label>
      <label><Equation data="$C_{D_{min}}$" title="Minimum drag coefficient"/>
        <input type="range" min="0" max="0.05" step=".005"
          v-model.number="constraint.minDragCoeff"/>
        <input v-model.number="constraint.minDragCoeff"/>
      </label>
      <label><Equation data="$q$" title="Dynamic pressure"/>
        <input type="range" min="0" max="1000" step=".1"
          v-model.number="constraint.dynamicPressure"/>
        <span><input v-model.number="constraint.dynamicPressure"/>
        <Equation data="$lb/ft^2$"/></span>
      </label>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Equation from '@/components/Equation.vue';
import { StallSpeedConstraint } from '@/interfaces/constraints';

@Component({
  components: {
  Equation,
  }
  })
export default class StallSpeedFields extends Vue {
  @Prop() constraint!: StallSpeedConstraint;
}
</script>
