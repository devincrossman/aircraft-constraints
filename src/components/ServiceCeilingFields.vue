<template>
  <div>
    <fieldset>
      <legend>Service ceiling</legend>
      <Equation data="$$\frac{W_{TO}}{S} = \frac{V_v}{\sqrt{\frac{2}{\rho}
        \sqrt{\frac{k}{3C_{D_{min}}}} \cdot\frac{W_{TO}}{S}}}
        + 4\sqrt{\frac{k\cdot C_{D_{min}}}{3}}$$"/>
      <label><Equation data="$\rho$" title="Density"/>
        <input type="range" min="0.0004" max=".003" step="0.0001"
          v-model.number="constraint.density"/>
        <span><input v-model.number="constraint.density"/>
        <Equation data="$slugs/ft^3$"/></span>
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
      <label><Equation data="$V_{v}$" title="Vertical speed"/>
        <input type="range" min="0" max="40" step="1"
          v-model.number="constraint.verticalSpeed"/>
        <span><input v-model.number="constraint.verticalSpeed"/>
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
