<template>
  <div class="TextBlock">
    <transition
      name="slide"
      v-on:after-leave="onSlideLeaveComplete"
      v-on:after-enter="onSlideEnterComplete"
    >
      <div class="inner" :class="{ right }" v-show="isActiveOnStage">
        <h3>{{ title }}</h3>
        <transition
          name="text"
          tag="ul"
        >
          <p v-show="isActiveOnStage">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
        </transition>
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
      onSlideEnterComplete: () => {},
      onSlideLeaveComplete: () => {},
      items: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Duis vestibulum consequat porttitor.',
        'Aenean ac lacinia odio.',
      ]
    }
  },
  methods: {
    stageLeave () {
      return new Promise(resolve => { this.onSlideLeaveComplete = resolve })
    },
    stageEnter () {
      return new Promise(resolve => { this.onSlideEnterComplete = resolve })
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/styles/Block.scss';

.TextBlock {

  @include Block();

}

.text-enter-active {
  transition: all 1s 0.65s cubic-bezier(0.165, 0.840, 0.440, 1.000);
  &:nth-child(2) { transition-delay: 0.70s; }
  &:nth-child(3) { transition-delay: 0.78s; }
}

.text-leave-active {
  transition: all 1s cubic-bezier(0.165, 0.840, 0.440, 1.000);
  &:nth-child(2) { transition-delay: 0.07s; }
  &:nth-child(1) { transition-delay: 0.15s; }
}

.text-enter,
.text-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

</style>
