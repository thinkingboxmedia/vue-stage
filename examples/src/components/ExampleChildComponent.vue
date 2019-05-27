<template>
  <div class="ExampleChildComponent">
    <transition
      name="fade" appear
      v-on:after-leave="onLeaveComplete"
      v-on:after-enter="onEnterComplete"
    >
      <div v-show="isActiveOnStage">
        <p>ExampleChildComponent - {{ label }}</p>
      </div>
    </transition>
    <ExampleChildComponentTwo />
  </div>
</template>

<script>

import ExampleChildComponentTwo from './ExampleChildComponentTwo'

export default {
  name: 'ExampleChildComponent',
  components: {
    ExampleChildComponentTwo
  },
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

  transition: opacity 1s;

}

.fade-enter, .fade-leave-to {

  opacity: 0;

}

</style>
