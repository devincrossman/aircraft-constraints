<template>
  <fieldset>
    <legend>Takeoff run</legend>
    <Equation data="$$\frac{T_{TO}}{W_{TO}} = \frac{\beta^2}{\alpha} \cdot
      \frac{k_{TO}^2}{s_G\cdot\rho_{TO} \cdot g_0\cdot C_{L_{TO}}}\cdot
      \frac{W_{TO}}{S}$$"/>
    <label><Equation data="$\beta$" title="Weight fraction"/>
      <input type="range" min="0" max="1" step=".05"
        v-model.number="constraint.weightFraction"/>
      <input v-model.number="constraint.weightFraction"/>
    </label>
    <label><Equation data="$\alpha$" title="Thrust fraction"/>
      <input type="range" min="0" max="1" step=".05"
        v-model.number="constraint.thrustFraction"/>
      <input v-model.number="constraint.thrustFraction"/>
    </label>
    <label><Equation data="$k_{TO}$" title="Takeoff speed coefficient"/>
      <input type="range" min="1" max="2" step="0.05"
        v-model.number="constraint.takeoffSpeedCoeff"/>
      <input v-model.number="constraint.takeoffSpeedCoeff"/>
    </label>
    <label><Equation data="$C_{L_{TO}}$" title="Lift coefficient"/>
      <input type="range" min="0" max="3" step="0.05"
        v-model.number="constraint.liftCoefficientTakeoff"/>
      <input v-model.number="constraint.liftCoefficientTakeoff"/>
    </label>
    <label><Equation data="$s_{G}$" title="Ground run"/>
      <input type="range" min="0" max="3000" step="100"
        v-model.number="constraint.groundRun"/>
      <span><input v-model.number="constraint.groundRun"/>
      <Equation data="$ft$"/></span>
    </label>
    <label><Equation data="$\rho$" title="Density"/>
      <input type="range" min="0.0004" max=".003" step="0.0001"
        v-model.number="constraint.density"/>
      <span><input v-model.number="constraint.density"/>
      <Equation data="$slugs/ft^3$"/></span>
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Equation from '@/components/Equation.vue';
import { TakeoffRunConstraint } from '@/interfaces/constraints';

@Component({
  components: {
  Equation,
  }
  })
export default class TakeoffRunFields extends Vue {
  @Prop() constraint!: TakeoffRunConstraint;
}
</script>
