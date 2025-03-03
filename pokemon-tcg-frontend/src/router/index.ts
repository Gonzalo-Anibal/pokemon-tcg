import { createRouter, createWebHistory } from 'vue-router'
import CardsView from '@/views/CardsView.vue'
import SetsList from '@/views/SetsList.vue'
import SetDetail from '@/views/SetDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sets',
      component: SetsList,
    },
    {
      path: '/cards',
      name: 'cards',
      component: CardsView,
    },
    {
      path: '/cards/:id',
      component: () => import('../views/CardDetail.vue'),
    },
    {
      path: '/sets',
      name: 'sets',
      component: SetsList,
    },
    {
      path: '/sets/:id',
      name: 'set-detail',
      component: SetDetail,
    },
  ],
})

export default router
