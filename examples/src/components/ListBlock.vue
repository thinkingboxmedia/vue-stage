<template>
  <div class="ListBlock">
    <transition
      name="slide"
      v-on:after-leave="onLeaveComplete"
      v-on:after-enter="onEnterComplete"
    >
      <div class="inner" :class="{ right }" v-show="isActiveOnStage">
        <h3>{{ title }}</h3>
        <transition-group name="list" tag="ul">
          <li
            v-for="item in items"
            :key="item"
            v-show="isActiveOnStage"
          >
            {{ item }}
          </li>
        </transition-group>
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
      onEnterComplete: () => {},
      onLeaveComplete: () => {},
      items: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Duis vestibulum consequat porttitor.',
        'Aenean ac lacinia odio.',
      ]
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

@import '@/styles/Block.scss';

.ListBlock {

  @include Block();

  li {

    margin: 10px 0;

  }

}

.list-enter-active {
  transition: all 1s 0.65s cubic-bezier(0.165, 0.840, 0.440, 1.000);
  &:nth-child(2) { transition-delay: 0.70s; }
  &:nth-child(3) { transition-delay: 0.78s; }
}

.list-leave-active {
  transition: all 1s cubic-bezier(0.165, 0.840, 0.440, 1.000);
  &:nth-child(2) { transition-delay: 0.02s; }
  &:nth-child(1) { transition-delay: 0.05s; }
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

</style>
