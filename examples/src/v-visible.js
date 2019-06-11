/**
 * Directly ported from Vue's core visible directive:
 * https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/show.js
 */

import { enter, leave } from 'vue/src/platforms/web/runtime/modules/transition'

console.log('~~~~~~~\n', enter, leave)

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

export default {
  install (Vue, options = {}) {
    Vue.directive('visible', {
      bind: function (el, { value }, vnode) {
        vnode = locateNode(vnode)
        const transition = vnode.data && vnode.data.transition
        const originalVisibility = el.__vOriginalVisibility =
          el.style.visibility === 'hidden' ? '' : el.style.visibility
        if (value && transition) {
          vnode.data.visible = true
          enter(vnode, () => {
            el.style.visibility = originalVisibility
          })
        } else {
          el.style.visibility = value ? originalVisibility : 'hidden'
        }
      },
      update: function (el, { value, oldValue }, vnode) {
        if (!value === !oldValue) return
        vnode = locateNode(vnode)
        const transition = vnode.data && vnode.data.transition
        if (transition) {
          vnode.data.visible = true
          if (value) {
            enter(vnode, () => {
              el.style.visibility = el.__vOriginalVisibility
            })
          } else {
            leave(vnode, () => {
              el.style.visibility = 'hidden'
            })
          }
        } else {
          el.style.visibility = value ? el.__vOriginalVisibility : 'hidden'
        }
      },
      unbind: function (el, binding, vnode, oldVnode, isDestroy) {
        if (!isDestroy) {
          el.style.visibility = el.__vOriginalVisibility
        }
      }
    })
  }
}
