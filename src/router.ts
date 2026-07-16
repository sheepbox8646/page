import {
  createRouter,
  createWebHistory,
  type RouterHistory,
  type RouteRecordRaw,
} from 'vue-router'

import GuestbookView from './views/GuestbookView.vue'
import MeView from './views/MeView.vue'
import ProjectsView from './views/ProjectsView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'me',
    component: MeView,
    meta: { title: 'Acbox' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
    meta: { title: 'Projects · Acbox' },
  },
  {
    path: '/guestbook',
    name: 'guestbook',
    component: GuestbookView,
    meta: { title: '留言板 · Acbox' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export function createAppRouter(
  history: RouterHistory = createWebHistory(import.meta.env.BASE_URL),
) {
  const router = createRouter({ history, routes })

  router.afterEach((to) => {
    document.title = (to.meta.title as string | undefined) ?? 'Acbox'
  })

  return router
}
