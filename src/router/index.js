import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/Home.vue"
import Index from "@/views/Index.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/index",
    name: "Index",
    component: Index,
    children: [
      {
        path: '/index/searchList:keyword',
        name: 'searchList',
        component: () => import('@/views/search/list')
      },
      {
        path: '/index/dramaSeriesList',
        name: 'dramaSeriesList',
        component: () => import('@/views/drama-series/list')
      },
      {
        path: '/index/dramaSeriesDetail:pkId',
        name: 'dramaSeriesDetail',
        component: () => import('@/views/drama-series/detail')
      },
      {
        path: '/index/dramaSeries/index',
        name: 'dramaSeriesIndex',
        component: () => import('@/views/drama-series/index'),
        children: [
          {
            path: '/index/dramaSeries/index/basic',
            name: 'dramaSeriesBasic',
            component: () => import('@/views/drama-series/components/basic')
          },
          {
            path: '/index/dramaSeries/index/alias',
            name: 'dramaSeriesAlias',
            component: () => import('@/views/drama-series/components/alias')
          },
          {
            path: '/index/dramaSeries/index/season',
            name: 'dramaSeriesSeason',
            component: () => import('@/views/drama-series/components/season')
          }
        ]
      }
    ]
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;