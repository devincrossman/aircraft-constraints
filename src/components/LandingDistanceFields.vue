<template>
  <fieldset>
    <legend>Landing distance</legend>
    <Equation data="$$\frac{W_{TO}}{S} = 2.889\beta\rho C_{L_{max}} S_L$$"/>
    <label><Equation data="$\beta$" title="Weight fraction at landing"/>
      <input type="range" min="0" max="1" step="0.05"
        v-model.number="constraint.weightFraction"/>
      <input v-model.number="constraint.weightFraction"/>
    </label>
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
    <label><Equation data="$S_L$" title="Landing distance"/>
      <input type="range" min="0" max="3000" step="100"
        v-model.number="constraint.landingDistance"/>
      <span><input v-model.number="constraint.landingDistance"/>
      <Equation data="$ft$"/></span>
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Equation from '@/components/Equation.vue';
import { LandingDistanceConstraint } from '@/interfaces/constraints';

@Component({
  components: {
  Equation,
  }
  })
export default class LandingDistanceFields extends Vue {
  @Prop() constraint!: LandingDistanceConstraint;
}
</script>
