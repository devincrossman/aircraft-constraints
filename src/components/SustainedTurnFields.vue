<template>
  <fieldset>
    <legend>Sustained turn</legend>
    <Equation data="$$\frac{T_{TO}}{W_{TO}} = q\left[\frac{C_{D_{min}}}{(W_{TO}/S)}\right]
      + k\left(\frac{n}{q}\right)^2\left(\frac{W_{TO}}{S}\right)$$"/>
    <label><Equation data="$q$" title="Dynamic pressure"/>
      <input type="range" min="0" max="1000" step=".1"
        v-model.number="constraint.dynamicPressure"/>
      <span><input v-model.number="constraint.dynamicPressure"/>
      <Equation data="$lb/ft^2$"/></span>
    </label>
    <label><Equation data="$C_{D_{min}}$" title="Minimum drag coefficient"/>
      <input type="range" min="0" max="0.05" step=".005"
        v-model.number="constraint.minDragCoeff"/>
      <input v-model.number="constraint.minDragCoeff"/>
    </label>
    <label><Equation data="$k$" title="Unknown Coefficient"/>
      <input type="range" min="0" max="2" step="0.05"
        v-model.number="constraint.unknownCoeff"/>
      <input v-model.number="constraint.unknownCoeff"/>
    </label>
    <label><Equation data="$n$" title="Load factor"/>
      <input type="range" min="0" max="2" step="0.05"
        v-model.number="constraint.loadFactor"/>
      <input v-model.number="constraint.loadFactor"/>
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Equation from '@/components/Equation.vue';
import { SustainedTurnConstraint } from '@/interfaces/constraints';

@Component({
  components: {
  Equation,
  }
  })
export default class SustainedTurnFields extends Vue {
  @Prop() constraint!: SustainedTurnConstraint;
}
</script>
