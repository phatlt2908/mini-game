import Vue from 'vue'
import VueRouter from 'vue-router'
import pathConstant from '../constants/path'

import MainLayout from '../components/layouts/MainLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/' + pathConstant.luckyWheel
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: pathConstant.luckyWheel,
        component: () => import('@/views/Wheel'),
        name: 'wheel',
        meta: {
          title: 'Vòng quay',
          active: 'wheel'
        }
      },
      {
        path: pathConstant.randomNumber,
        component: () => import('@/views/RanNum'),
        name: 'ranNum',
        meta: {
          title: 'Số ngẫu nhiên',
          active: 'ranNum'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/' + pathConstant.luckyWheel
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' | Đây này'
  next()
})

export default router
