<template>
  <div class="DepthSeven">
    <p>Components deep: 7</p>
    <DepthEight />
  </div>
</template>

<script>
import DepthEight from './DepthEight'

export default {
  name: 'DepthSeven',
  components: {
    DepthEight
  }
}
</script>
