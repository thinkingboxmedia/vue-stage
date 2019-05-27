<template>
  <transition
    appear
    mode="out-in"
    v-on:enter="enter"
    v-on:leave="leave"
  >
    <keep-alive>
      <router-view ref="view" />
    </keep-alive>
  </transition>
</template>

<script>
export default {
  props: {
    beforeEnter: {
      type: Function,
      default: () => {}
    },
    afterEnter: {
      type: Function,
      default: () => {}
    },
    beforeLeave: {
      type: Function,
      default: () => {}
    },
    afterLeave: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    enter (el, done) {
      this.beforeEnter()
      this.$refs.view.$_stageEnter(() => {
        done()
        this.afterEnter()
      })
    },
    leave (el, done) {
      this.beforeLeave()
      this.$refs.view.$_stageLeave(() => {
        done()
        this.afterLeave()
      })
    }
  }
}
</script>
