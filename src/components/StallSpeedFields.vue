<template>
  <div>
    <fieldset>
      <legend>Stall speed</legend>
      <Equation data="$$\frac{W_{TO}}{S} = \frac{\rho V^2}{2} \cdot C_{L_{max}}$$"/>
      <label><Equation data="$\rho$" title="Density"/>
        <input type="range" min="0.0004" max=".003" step="0.0001"
          v-model.number="constraint.density"/>
        <span><input v-model.number="constraint.density"/>
        <Equation data="$slugs/ft^3$"/></span>
      </label>
      <label><Equation data="$C_{L_{max}}$" title="Max lift coefficient at landing"/>
        <input type="range" min="0" max="3" step="0.05"
          v-model.number="constraint.liftCoefficient"/>
        <input v-model.number="constraint.liftCoefficient"/>
      </label>
      <label><Equation data="$V$" title="Velocity"/>
        <input type="range" min="0" max="500" step="10"
          v-model.number="constraint.velocity"/>
        <span><input v-model.number="constraint.velocity"/>
        <Equation data="$ft/s$"/></span>
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
