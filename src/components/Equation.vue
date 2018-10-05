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
    if((<any>window).MathJax) {
      this.$nextTick().then(()=>{
        (<any>window).MathJax.Hub.Queue(["Typeset", (<any>window).MathJax.Hub, this.$refs.mathJaxEl]);
      });
    }
  }
}
</script>