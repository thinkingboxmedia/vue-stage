<template>
  <div class="ExampleChildComponentTwo">
    <transition
      name="fade"
      v-on:after-leave="onLeaveComplete"
      v-on:after-enter="onEnterComplete"
    >
      <p v-show="isActiveOnStage">ExampleChildComponentTwo</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ExampleChildComponentTwo',
  props: {
    label: String
  },
  data () {
    return {
      onEnterComplete: () => {},
      onLeaveComplete: () => {}
    }
  },
  methods: {
    stageLeave () {
      return new Promise(resolve => { this.onLeaveComplete = resolve })
    },
    stageEnter () {
      return new Promise(resolve => { this.onEnterComplete = resolve })
    }
  }
}
</script>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {

  transition: opacity 2s;

}

.fade-enter, .fade-leave-to {

  opacity: 0;

}

</style>
