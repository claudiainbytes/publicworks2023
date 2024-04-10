import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',  
        name: 'Intro',
        component: () => import('../views/Intro.vue')
      },
      {
        path: '/skills', 
        name: 'Skills',
        component: () => import('../views/Skills.vue')
      },
      {
        path: '/projects', 
        name: 'Projects',
        component: () => import('../views/Projects.vue')
      },
      {
        path: '/:catchAll(.*)',
        name: '404Name',
        redirect: { name: 'Intro' } 
      }
    ]
  })
  
  export default router