<template>
  <div class="DepthFive">
    <p>Components deep: 5</p>
    <DepthSix />
  </div>
</template>

<script>
import DepthSix from './DepthSix'

export default {
  name: 'DepthFive',
  components: {
    DepthSix
  }
}
</script>
