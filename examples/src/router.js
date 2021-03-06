import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: window.location.hostname === 'localhost' ? process.env.BASE_URL : 'vue-stage/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      props: true
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      props: true
    }
  ]
})
