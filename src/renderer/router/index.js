import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    name: '首页',
    meta: { title: '首页', icon: 'example' },
    children: [
      {
        path: 'welcome',
        name: '欢迎',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '欢迎', icon: 'home' }
      }
    ]
  },
  {
    path: '/favourite',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '我的最爱',
        component: () => import('@/views/favourite/index'),
        meta: { title: '我的最爱', icon: 'favourite' }
      }
    ]
  },
  {
    path: '/file',
    component: Layout,
    redirect: '/file/girls',
    name: '所有文件',
    meta: { title: '所有文件', icon: 'welcome' },
    children: [
      {
        path: 'girls',
        name: '福利姬',
        component: () => import('@/views/collection/girls'),
        meta: { title: '福利姬', icon: 'local' }
      },
      {
        path: 'net',
        name: '图集',
        component: () => import('@/views/collection/girls'),
        meta: { title: '图集', icon: 'net' }
      },
      {
        path: 'cos',
        name: 'COS',
        component: () => import('@/views/collection/girls'),
        meta: { title: 'COS', icon: 'net' }
      }
    ]
  },
  {
    path: '/girlsitem',
    component: Layout,
    hidden: true,
    redirect: '/girlsitem/index',
    children: [
      {
        path: 'index/:id',
        name: '详情',
        component: () => import('@/views/collection/girlitems'),
        meta: { title: '详情', icon: 'archives' }
      }
    ]
  },
  {
    path: '/archives',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '归档',
        component: () => import('@/views/favourite/index'),
        meta: { title: '归档', icon: 'archives' }
      }
    ]
  },
  {
    path: '/recycle',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '回收站',
        component: () => import('@/views/favourite/index'),
        meta: { title: '回收站', icon: 'recycle' }
      }
    ]
  },
  {
    path: '/setting',
    hidden: true,
    redirect: '/setting/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '设置',
        component: () => import('@/views/setting/index'),
        meta: { title: '设置', icon: 'recycle' }
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

