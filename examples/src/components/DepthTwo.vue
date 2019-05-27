<template>
  <div class="DepthTwo">
    <p>Components deep: 2</p>
    <DepthThree />
  </div>
</template>

<script>
import DepthThree from './DepthThree'

export default {
  name: 'DepthTwo',
  components: {
    DepthThree
  }
}
</script>
