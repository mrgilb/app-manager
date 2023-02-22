import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/costs-page',
    name: 'costs-page',
    component: () => import('../pages/costs-page/costs-page.vue')
  },
  {
    path: '/cash-page',
    name: 'cash-page',
    component: () => import('../pages/cash-page/cash-page.vue')
  },
  {
    path: '/target-page',
    name: 'target-page',
    component: () => import('../pages/target-page/target-page.vue')
  },
  {
    path: '/general-page',
    name: 'general-page',
    component: () => import('../pages/general-page/general-page.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
