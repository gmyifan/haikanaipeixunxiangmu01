import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '海看AI培训战略汇报平台'
    }
  },
  {
    path: '/strategy',
    name: 'Strategy',
    component: () => import('@/views/Strategy.vue'),
    meta: {
      title: '战略定位 - 海看AI培训'
    }
  },
  {
    path: '/why',
    name: 'Why',
    component: () => import('@/views/Why.vue'),
    meta: {
      title: 'WHY：为什么做？ - 海看AI培训'
    }
  },
  {
    path: '/what',
    name: 'What',
    component: () => import('@/views/What.vue'),
    meta: {
      title: 'WHAT：做什么？ - 海看AI培训'
    }
  },
  {
    path: '/how',
    name: 'How',
    component: () => import('@/views/How.vue'),
    meta: {
      title: 'HOW：如何做？ - 海看AI培训'
    }
  },
  {
    path: '/summary',
    name: 'Summary',
    component: () => import('@/views/Summary.vue'),
    meta: {
      title: '总结与建议 - 海看AI培训'
    }
  },
  {
    path: '/full-content',
    name: 'FullContent',
    component: () => import('@/views/FullContent.vue'),
    meta: {
      title: '完整内容 - 海看AI培训'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
  // 跳转后滚动到顶部
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 0)
})

export default router