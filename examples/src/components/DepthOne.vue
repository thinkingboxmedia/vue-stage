<template>
  <div class="DepthOne">
    <p>Components deep: 1</p>
    <DepthTwo />
  </div>
</template>

<script>
import DepthTwo from './DepthTwo'

export default {
  name: 'DepthOne',
  components: {
    DepthTwo
  }
}
</script>
