import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Message from '../views/Message.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ladning',
    component: Landing
  },
  {
    path: '/message',
    name: 'message',
    component: Message
  },
  {
    path: '/dates',
    name: 'dates',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dates.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
