<template>
  <div class="Home">
    <p>Home</p>
    <transition
      name="fade" appear
      v-on:after-leave="onLeaveComplete"
      v-on:after-enter="onEnterComplete"
    >
      <transition-group name="list" tag="div" class="block" v-show="isActiveOnStage">
        <h2 :key="0" :class="{ active: isActiveOnStage }">Home</h2>
        <p :key="1" :class="{ active: isActiveOnStage }">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec odio ut nisi sodales pulvinar. Proin posuere nunc vel euismod dictum. Duis placerat dui erat, quis accumsan tortor pellentesque ut.</p>
        <p :key="2" :class="{ active: isActiveOnStage }">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      </transition-group>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  },
  data () {
    return {
      onLeaveComplete: () => {},
      onEnterComplete: () => {}
    }
  },
  methods: {
    stageLeave () {
      return new Promise(resolve => { this.onLeaveComplete = resolve })
    },
    stageEnter () {
      return new Promise(resolve => { this.onEnterComplete = resolve })
    },
  }
}
</script>

<style lang="scss" scoped>

.Home {

  .block {

    padding: 10vw;
    margin: 5vw;

    background: #202020;
    color: #f8f8f8;

    h2 {

      font-size: 200%;

    }

    h2, p {

      opacity: 0;
      transform: translateY(20px);
      transition: all 1s cubic-bezier(0.550, 0.055, 0.675, 0.190);

      &:nth-child(2) { transition-delay: 20ms; }
      &:nth-child(1) { transition-delay: 50ms; }

      &.active {

        opacity: 1;
        transform: translateY(0);
        transition: all 1s cubic-bezier(0.165, 0.840, 0.440, 1.000);

        &:nth-child(2) { transition-delay: 150ms; }
        &:nth-child(3) { transition-delay: 350ms; }

      }

    }

  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-leave-active {
    transition-delay: 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

}

</style>
