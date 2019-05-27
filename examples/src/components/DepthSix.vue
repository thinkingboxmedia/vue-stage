<template>
  <div class="DepthSix">
    <p>Components deep: 6</p>
    <DepthSeven />
  </div>
</template>

<script>
import DepthSeven from './DepthSeven'

export default {
  name: 'DepthSix',
  components: {
    DepthSeven
  }
}
</script>
