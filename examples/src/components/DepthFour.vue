<template>
  <div class="DepthFour">
    <p>Components deep: 4</p>
    <DepthFive />
  </div>
</template>

<script>
import DepthFive from './DepthFive'

export default {
  name: 'DepthFour',
  components: {
    DepthFive
  }
}
</script>
