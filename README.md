# vue-stage

A Vue plugin which aims to make complex route-to-route transitions much less complex to manage. It leverages Vue's excellent [transition](https://vuejs.org/v2/guide/transitions.html) system and [router](https://router.vuejs.org/). It Uses Promises to determine animation lifecycle throughout the component tree. 

---

## Installation

```
npm install vue-stage --save
or
yarn add vue-stage
``` 

---

## Setup

`vue-stage` contains two pieces: The plugin and the top-level `<Stage />` component. 

### Plugin
```javascript
// main.js
import Vue from 'vue'
import VueStage from 'vue-stage'

Vue.use( VueStage )
```

The plugin applies new "stage" lifecycle methods and data to each Vue instance in your app via a [Global Mixin](https://vuejs.org/v2/guide/mixins.html#Global-Mixin).

### Stage component

```
// App.vue
<template>
  <Stage />
</template>

<script>
import { Stage } from 'vue-stage'
export default {
  name: 'App',
  components: { Stage }
}
</script>
```

It accepts four function props to help relay lifecycle upward to the main `App.vue`:  
`beforeEnter`, `afterEnter`, `beforeLeave`, `afterLeave`

```
// App.vue
...
<Stage :beforeLeave="beforeLeave" />
...
methods: {
  beforeLeave() {
    // Fired before views start leaving the stage
  }
}
...
```

These methods are useful when the App needs to perform tasks when views change, like updating the scroll position. 

The `Stage` component is a simple wrapper around the default `<router-view>`. It acts as the top-level stage lifecycle manager using Vue's [transition JS Hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks) and [`<keep-alive>`](https://vuejs.org/v2/api/#keep-alive). This can be easily refactored into your own template if required, see the section below on [extending](#extending).

---

## Usage

### Data

Once applied, each Vue instance in your app has these data props applied to it:

- `isEnteringStage`: _animating in_
- `isLeavingStage`: _animating out_
- `isOnStage`: _currently visible_
- `isActiveOnStage`: _currently visible, but is not animating out (useful with `v-if`/`v-show`)_

These are updated internally, and can be used to conditionally render template markup or determine the current animation state. 

### Methods

Named methods are automatically called on instances _where they are defined_. They only need to be specified on an instance if they are required.

#### Primary
- `stageEnter`
- `stageLeave`: _Particularly important, the parent view will wait for this to resolve before unmounting._

These are the primary animation methods. 
**They must return a `Promise` if the parent view should wait for their animation to complete** before proceeding. Elements can be directly animated here with GSAP or other libraries (see [JS animation example](#examples)), or the returned `Promise`'s `resolve()` can be stored for firing later (e.g. if using CSS `transition` or `animation`, see [CSS animation example](#examples)). 

#### Duration

`stageEnter` and `stageLeave` can alternatively be defined as data props; with a duration in milliseconds as their value. This replaces the method, automatically returning a promise which resolves after the specified duration. 

```
data() {
  return {
    stageLeave: 2000
  }
},
methods: {
  ...
}
```


#### Hooks
- `stageBeforeEnter`: before animating in
- `stageAfterEnter`: after inbound animation is complete
- `stageBeforeLeave`: before animating out
- `stageAfterLeave`: after outbound animation is complete

Useful if the component needs to perform additional work before or after animating. 

---

## Examples

### JS 

```html
<template>
  <div class="ComponentName">
    <div ref="animated" />
  </div>
</template>
```
```javascript
import TweenMax from 'gsap'

export default {
  name: 'ComponentName',
  methods: {
    stageEnter() {
      let onComplete
      const promise = new Promise( resolve => { onComplete = resolve } )
      TweenMax.fromTo( this.$refs.animated, 1, { scale: 0 }, { scale: 1, onComplete } )
      return promise
    },
    stageLeave() {
      let onComplete
      const promise = new Promise( resolve => { onComplete = resolve } )
      TweenMax.to( this.$refs.animated, 1, { scale: 0, onComplete } )
      return promise
    }
  }
}
```

### CSS

```html
<template>
  <transition name="fade" v-on:after-leave="onLeaveComplete" v-on:after-enter="onEnterComplete">
    <p v-show="isActiveOnStage">Oh no</p>
  </transition>
</template>
```
```javascript
export default {
  name: 'ComponentName',
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
```
```css
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
```

---

## Configuration & Warnings

#### Keep-alive

By default components are manually destroyed after they've finished leaving the stage. In certain situations you may want to keep the instances alive as if you've wrapped them in a `<keep-alive>`. This can be set when installing the plugin: `Vue.use(VueStage, { destroyAfterLeave: false })`. Note that this will keep all instances in the tree alive when set.

#### Warnings

The plugin provides console warning messaging for certain situations:

- If your Promise has not resolved after a certain timeout (10s by default):  
This timeout can be adjusted if you're using long-running animations, but it can't be turned off entirely. To change this timeout, apply it when installing the plugin: `Vue.use(VueStage, { promiseTimeout: 15000 })`

- If you've defined a `stageEnter` or `stageLeave` method, but have not returned a promise from it:  
Components _don't always need_ to return a promise (e.g. in cases where the named method is only used for lifecycle/convenience purposes). This warning is to remind you that the parent view won't wait for the component to finish animating. This can be snoozed locally for an individual component by setting the data prop `stageWarningsSnoozed` to `true`, or globally for all components when installing the plugin: `Vue.use(VueStage, { promiseWarnings: false })`.

_Tip: Specify a `name` option on your components. Error messages list the name option, pointing you directly to the component that's throwing it:_
```javascript
export default {
  name: 'ComponentName',
  methods: { ...
```

## Extending

In cases where using the provided `<Stage />` component is undesirable (i.e. when not using Vue Router), this can be easily factored into your own component. In it's most minimal form `vue-stage` requires this structure:

```html
<template>
  <transition appear mode="out-in" v-on:enter="enter" v-on:leave="leave">
    <keep-alive>
      <!-- Wraps Vue Router's router-view by default -->
      <!-- <router-view ref="view" /> -->
      <div ref="view">
        ...
      </div>
    </keep-alive>
  </transition>
</template>
```
```javascript
export default {
  methods: {
    enter (el, done) {
      this.$refs.view.$_stageEnter( done )
    },
    leave (el, done) {
      this.$refs.view.$_stageLeave( done )
    }
  }
}
```

- The `<Stage />` relies on Vue's transition system to relay view-level `enter` and `leave` lifecycle events through to the top level `<router-view />` components (main page views). It does so using [transition JS Hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks), only calling `done()` once all children have resolved their promises.
- These methods traverse the entire component tree for each top-level view, calling the appropriate lifecycle method on descendants, which then propagate upward their own animation promises. Once all promises for the view's tree are resolved, it completes the animation at the view level. 
- The `out-in` transition mode is important here, as we need the incoming view to wait for the outgoing view's entire tree to finish animating before performing the view-level mounting operation. 
- `<keep-alive>` is critical here working with CSS transitions. By default Vue immediately destroys outward transitioning elements, they're ephemeral - only visually changing, and so they are immediately removed from the virtual DOM. This makes toggling a transition with `v-if` or `v-show` impossible, as the component has already been scrapped in memory. Components are kept alive and then manually destroyed once they've finished leaving the stage.

## TODOs

### Promises
- Test browser support
- Add documentation around Promise polyfill

### Cancellation
- Cancel promises so they don't resolve if overridden by an opposite transition
- Cancel animations and immediately run inverse transition

### Hierarchy timing controls
- Add `waitForChildren` local component flag:
  - Any component should be able to set this flag locally, causing it to wait for
    it's descendants' promises to resolve before running it's own `stageLeave()`
- Add `waitForParent` local component flag:
  - Any component should be able to set this flag locally, causing it to wait for
    it's parent to finish entering before running it's own `stageEnter()`
