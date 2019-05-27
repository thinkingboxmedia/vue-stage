<template>
  <div class="DepthThree">
    <p>Components deep: 3</p>
    <DepthFour />
  </div>
</template>

<script>
import DepthFour from './DepthFour'

export default {
  name: 'DepthThree',
  components: {
    DepthFour
  }
}
</script>
