export default {

  install ( Vue, options = {} ) {

    const destroyAfterLeave = options.destroyAfterLeave !== false
    const promiseWarnings = options.promiseWarnings !== false
    const promiseTimeout = options.promiseTimeout > 10000 ? options.promiseTimeout : 10000

    Vue.mixin( {
      data () {
        return {
          // Control flags
          stageWarningsSnoozed: false,
          // Lifecycle state
          isEnteringStage: false,
          isLeavingStage: false,
          isOnStage: false,
          isActiveOnStage: false
        }
      },
      methods: {

        // Stage hooks
        // -----------

        $_stageEnter ( done = null ) {

          this.$_stageBeforeEnter()

          // Add this component's action to the tree if defined
          const cast = [
            ( function () {
              // Action defined as a duration, return a promise that will resolve after the duration
              if ( typeof this.stageEnter === 'number' ) {
                return new Promise( resolve => setTimeout( () => resolve(), this.stageEnter ) )
              }
              // Action defined as a method on this component
              else if ( typeof this.stageEnter === 'function' ) {
                const result = this.stageEnter()
                if ( !( result instanceof Promise ) && promiseWarnings && !this.stageWarningsSnoozed ) console.warn( `vue-stage: %c${ this.$options.name || `[unnamed component] - uid: ${ this._uid }` }%c \nThe stageEnter() method did not return a promise. stageAfterEnter() hooks may fire before this has finished transitioning. \n- This isn't as critical for enter animations as it is for leave animations\n- This warning can be dismissed for this component by setting it's data property stageWarningsSnoozed to true\n- This warning can be dismissed globally by passing false to the promiseWarnings property in the plugin options object: Vue.use( vueStage, { promiseWarnings: false } )`, 'font-weight: bold', 'font-weight: regular' )
                return result
              }
            }.bind( this ) () )
          ]

          // Continue down to direct descendant components and add their actions to the tree
          this.$children.forEach( child => cast.push( child.$_stageEnter() ) )

          // Setup timers to catch unresolved promises within the tree
          clearTimeout( this.enterResolveTimer )
          clearTimeout( this.leaveResolveTimer )
          this.enterResolveTimer = setTimeout( () => { console.error( `vue-stage: %c${ this.$options.name || `[unnamed component] - uid: ${ this._uid }` }%c \nThe promise returned from stageEnter() has not resolved after ${ promiseTimeout }ms. Please check that the component resolves it's promise once it has finished transitioning. \n- If this component's transitions should not prevent the animation tree from completing, don't return a promise from it's stageEnter() and stageLeave() methods \n- If your transition correctly resolves but it takes longer than ${ promiseTimeout }ms, this timeout duration can be adjusted by passing a duration as promiseTimeout in the plugin options object: Vue.use( vueStage, { promiseTimeout: 15000 } )`, 'font-weight: bold', 'font-weight: regular' ) }, promiseTimeout )

          // Once this component and it's descendants' actions are complete
          return Promise.all( cast ).then( () => {

            clearTimeout( this.enterResolveTimer )

            // @TODO - KM - Add cancellation catch here, currently the transition Promise
            //              will continue to resolve and fire "after" callbacks even if
            //              visually it's been overwritten by a new opposite transition

            this.$_stageAfterEnter()

            // View-level tree actions complete, propogate up to the Stage
            done && done()
          } )
        },

        $_stageLeave ( done = null ) {

          this.$_stageBeforeLeave()

          // Add this component's action to the tree if defined
          const cast = [
            ( function () {
              // Action defined as a duration, return a promise that will resolve after the duration
              if ( typeof this.stageLeave === 'number' ) {
                return new Promise( resolve => setTimeout( () => resolve(), this.stageLeave ) )
              }
              // Action defined as a method on this component
              else if ( typeof this.stageLeave === 'function' ) {
                const result = this.stageLeave()
                if ( !( result instanceof Promise ) && promiseWarnings && !this.stageWarningsSnoozed ) console.warn( `vue-stage: %c${ this.$options.name || `[unnamed component] - uid: ${ this._uid }` }%c \nThe stageLeave() method did not return a promise. The parent view may unmount before this component has finished leaving. \n- You must return a promise from stageLeave() if the parent view should wait for this component's transition to complete before unmounting.\n- This warning can be dismissed for this component by setting it's data property stageWarningsSnoozed to true\n- This warning can be dismissed globally by passing false to the promiseWarnings property in the plugin options object: Vue.use( vueStage, { promiseWarnings: false } )`, 'font-weight: bold', 'font-weight: regular' )
                return result
              }
            }.bind( this ) () )
          ]

          // Continue down to direct descendant components and add their actions to the tree
          this.$children.forEach( child => cast.push( child.$_stageLeave() ) )

          // Setup timers to catch unresolved promises within the tree
          clearTimeout( this.enterResolveTimer )
          clearTimeout( this.leaveResolveTimer )
          this.leaveResolveTimer = setTimeout( () => { console.error( `vue-stage: %c${ this.$options.name || `[unnamed component] - uid: ${ this._uid }` }%c \nThe promise returned from stageLeave() has not resolved after ${ promiseTimeout }ms. Please check that the component resolves it's promise once it has finished transitioning. \n- If this component's transitions should not prevent the animation tree from completing, don't return a promise from it's stageEnter() and stageLeave() methods \n- If your transition correctly resolves but it takes longer than ${ promiseTimeout }ms, this timeout duration can be adjusted by passing a duration as promiseTimeout in the plugin options object: Vue.use( vueStage, { promiseTimeout: 15000 } )`, 'font-weight: bold', 'font-weight: regular' ) }, promiseTimeout )

          // Once this component and it's descendants' actions are complete
          return Promise.all( cast ).then( () => {

            clearTimeout( this.leaveResolveTimer )

            // @TODO - KM - Add cancellation catch here, currently the transition Promise
            //              will continue to resolve and fire "after" callbacks even if
            //              visually it's been overwritten by a new opposite transition

            this.$_stageAfterLeave()

            // View-level tree actions complete, propogate up to the Stage
            done && done()
          } )
        },

        // Lifecycle
        // ---------

        $_stageBeforeEnter () {

          // Only run this hook if it's defined on the instance
          if ( typeof this.stageBeforeEnter === 'function' ) {
            this.stageBeforeEnter()
          }

          this.isEnteringStage = true
          this.isOnStage = true
          this.isActiveOnStage = true
        },

        $_stageAfterEnter () {

          this.isEnteringStage = false

          // Only run this hook if it's defined on the instance
          if ( typeof this.stageAfterEnter === 'function' ) {
            this.stageAfterEnter()
          }
        },

        $_stageBeforeLeave () {

          // Only run this hook if it's defined on the instance
          if ( typeof this.stageBeforeLeave === 'function' ) {
            this.stageBeforeLeave()
          }

          this.isLeavingStage = true
          this.isActiveOnStage = false
        },

        $_stageAfterLeave () {

          this.isOnStage = false
          this.isLeavingStage = false

          // Only run this hook if it's defined on the instance
          if ( typeof this.stageAfterLeave === 'function' ) {
            this.stageAfterLeave()
          }

          // Manually destroy the instance when off the stage unless overridden
          destroyAfterLeave && this.$destroy()
        }
      }
    } )
  }
}
