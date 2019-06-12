<template>
  <div class="TextBlock">
    <transition
      name="slide"
      v-on:after-leave="onSlideLeaveComplete"
      v-on:after-enter="onSlideEnterComplete"
    >
      <div class="inner" :class="{ right }" v-show="isActiveOnStage">
        <h3>{{ title }}</h3>
        <p :class="{ active: showParagraph }">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    right: Boolean
  },
  data () {
    return {
      showParagraph: false,
      onSlideEnterComplete: () => {},
      onSlideLeaveComplete: () => {}
    }
  },
  methods: {
    stageEnter () {
      this.$nextTick( () => { this.showParagraph = true } )
      return new Promise(resolve => { this.onSlideEnterComplete = resolve })
    },
    stageLeave () {
      this.showParagraph = false
      return new Promise(resolve => { this.onSlideLeaveComplete = resolve })
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/styles/Block.scss';

.TextBlock {

  @include Block();

  p {

    opacity: 0;
    transform: translateY(20px);

    transition: all 1s cubic-bezier(0.165, 0.840, 0.440, 1.000);

    &.active {

      opacity: 1;
      transform: translateY(0);

      transition: all 1s 0.65s cubic-bezier(0.165, 0.840, 0.440, 1.000);

    }

  }

}

</style>
