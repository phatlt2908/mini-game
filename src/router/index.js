import Vue from 'vue'
import VueRouter from 'vue-router'
import pathConstant from '../constants/path'

import MainLayout from '../components/layouts/MainLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/' + pathConstant.luckyWheel,
    content: 'Các mini game nhằm mục đích chọn ra ngẫu nhiên. Miễn phí, nhanh và dễ sử dụng.',
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
          content: 'Nhanh, miễn phí và dễ sử dụng. Được sử dụng để tạo không khí vui vẻ trong lớp học, nhóm bạn... nhằm mục đích chọn ra một người ngẫu nhiên.',
          active: 'wheel'
        }
      },
      {
        path: pathConstant.randomNumber,
        component: () => import('@/views/RanNum'),
        name: 'ranNum',
        meta: {
          title: 'Số ngẫu nhiên',
          content: 'Nhanh, miễn phí và dễ sử dụng. Sử dụng cho các sự kiện Giveaway, xổ số...',
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
