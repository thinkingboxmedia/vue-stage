<template>
  <div class="About">
    <p>About</p>
    <div class="blocks">
      <ListBlock title="Praesent ultricies" />
      <TextBlock title="Placerat dui erat" :right="true" />
      <TextBlock title="quis accumsan tortor" />
      <ListBlock title="Fusce lectus nisl" :right="true" />
    </div>
  </div>
</template>

<script>

import ListBlock from '@/components/ListBlock.vue'
import TextBlock from '@/components/TextBlock.vue'

export default {
  name: 'About',
  components: {
    ListBlock,
    TextBlock
  }
}
</script>

<style lang="scss" scoped>

.About {

  .blocks {

    overflow: hidden;

    /* position: absolute; */
    /* left: 0; */
    /* top: 0; */

    width: 100%;
    height: 100%;

    padding: 10vw;

    display: flex;
    justify-content: space-between;
    /* align-content: space-between; */
    flex-wrap: wrap;

  }


}

</style>
