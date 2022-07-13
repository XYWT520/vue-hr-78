import router from './router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
// 全局前置路由守卫
//  to:  要去哪个页面
//  from:从哪里来
//  next:它是一个函数。
//     如果直接放行 next()
//     如果要跳到其它页 next(其它页)
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 取出 token
  const token = store.state.user.token
  if (token) {
    // 用户登录时调用 vuex 里的 actions
    await store.dispatch('user/getUserInfo')
    // 有 token 代表已经登录了
    // 如果你已经登录了 并且还要去登录页,那我就不让你去,让你强制去首页
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      // 判断 如果没有 userId 那就去获取
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有 token 代表没有的登录
    // 如果你要去白名单,那么放行,如果你要去白名单以外的页面,那我就只能让你去白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 获取标题的名字
router.beforeEach((to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  next()
})

router.afterEach(() => {
  NProgress.done()
})
