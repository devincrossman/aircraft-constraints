<template>
  <span :key="data" ref="mathJaxEl" v-html="data" class="tex2jax_process"></span>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class Equation extends Vue {
  /**
   * the equation to display
   */
  @Prop({ default: '' }) data!: string;

  /**
   * vue mounted lifecycle hook
   */
  mounted() {
    this.renderMathJax();
  }

  /**
   * render the mathjax
   */
  @Watch('data')
  renderMathJax() {
    if ((window as any).MathJax) {
      this.$nextTick().then(() => {
        (window as any).MathJax.Hub.Queue(['Typeset', (window as any).MathJax.Hub, this.$refs.mathJaxEl]);
      });
    }
  }
}
</script>
