import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',  
        name: 'PublicWorks',
        component: () => import('../views/PublicWorks.vue')
      },
      {
        path: '/projects', 
        name: 'Projects',
        component: () => import('../views/Projects.vue')
      },
      {
        path: '/:catchAll(.*)',
        name: '404Name',
        redirect: { name: 'PublicWorks' } 
      }
    ]
  })
  
  export default router