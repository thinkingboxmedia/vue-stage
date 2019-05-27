<template>
  <div class="DepthEight">
    <p>Components deep: 8</p>
    <div ref="ball" class="ball" />
  </div>
</template>

<script>
import TweenMax from 'gsap'

export default {
  name: 'DepthEight',
  data () {
    return {
      // stageEnter: 2000,
      // stageLeave: 3000
    }
  },
  methods: {
    stageEnter() {
      let onComplete
      const promise = new Promise( resolve => { onComplete = resolve } )
      TweenMax.fromTo( this.$refs.ball, 1, { scale: 0 }, { scale: 1, ease: 'Cubic.easeInOut', onComplete } )
      return promise
    },
    stageLeave() {
      let onComplete
      const promise = new Promise( resolve => { onComplete = resolve } )
      TweenMax.to( this.$refs.ball, 1, { scale: 0, ease: 'Cubic.easeInOut', onComplete } )
      return promise
    }
  }
}
</script>

<style scoped>
  .ball {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: red;
  }
</style>
