<template>
  <fieldset>
    <legend>Climb angle</legend>
    <Equation data="$$\frac{T_{TO}}{W_{TO}} = \frac{\beta}{\alpha} \left[ k\left(
      \frac{\beta W_{TO}}{qS}\right) + \frac{C_{D_{min}}}{\left(\frac{\beta W_{TO}}{qS}
      \right)} + \sin\theta\right]$$"/>
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
    <label><Equation data="$k$" title="Lift induced drag constant"/>
      <input type="range" min="0" max="10" step=".1"
        v-model.number="constraint.liftInducedDragConst"/>
      <input v-model.number="constraint.liftInducedDragConst"/>
    </label>
    <label><Equation data="$q$" title="Dynamic pressure"/>
      <input type="range" min="0" max="1000" step="1"
        v-model.number="constraint.dynamicPressure"/>
      <span><input v-model.number="constraint.dynamicPressure"/>
      <Equation data="$lb/ft^2$"/></span>
    </label>
    <label><Equation data="$C_{D_{min}}$" title="Minimum drag coefficient"/>
      <input type="range" min="0" max="0.05" step=".005"
        v-model.number="constraint.minDragCoeff"/>
      <input v-model.number="constraint.minDragCoeff"/>
    </label>
    <label><Equation data="$\theta$" title="Climb angle"/>
      <input type="range" min="0" max="20" step=".1"
        v-model.number="constraint.climbAngle "/>
      <span><input v-model.number="constraint.climbAngle"/>
      <Equation data="$\deg$"/></span>
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Equation from '@/components/Equation.vue';
import { ClimbAngleConstraint } from '@/interfaces/constraints';

@Component({
  components: {
  Equation,
  }
  })
export default class ClimbAngleFields extends Vue {
  @Prop() constraint!: ClimbAngleConstraint;
}
</script>
