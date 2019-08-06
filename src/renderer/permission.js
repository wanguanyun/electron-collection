import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  Message
} from 'element-ui'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // if (!sessionStorage.getItem("userInfo")) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({
              path: '/'
            })
          })
        })
      // } else {
      //   //从缓存中拿取
      //   let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
      //   store.commit('SET_AVATAR', userInfo.default_avatar)
      //   store.commit('SET_NAME', userInfo.userName)
      //   store.commit('SET_DEFAULT_COVER', userInfo.gallery_img)
      //   store.commit('SET_DEFAULT_ITEM_COVER', userInfo.gallery_item_img)
      //   store.commit('SET_LAST_LOGIN_TIME', userInfo.last_login_time)
      //   store.commit('SET_APP_MODULE', userInfo.app_module)
      //   next()
      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})