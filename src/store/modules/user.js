import { login, getUserProfile } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken() || null,
    userInfo: {}
  },
  mutations: {
    // 设置 token
    setToken(state, token) {
      state.token = token
      // 本地存储 token
      setToken(token)
    },
    // 删除 token
    removeToken(state) {
      state.token = null
      // 删除本地 token
      removeToken()
    },

    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {}
    }

  },
  actions: {
    // 登录请求 在 vuex 里面的 actions 封装
    async userLogin(context, obj) {
      const res = await login(obj)
      context.commit('setToken', res.data)
    },

    // 获取用户个人信息
    async getUserInfo(context) {
      const res1 = await getUserProfile()
      console.log('用来获取用户信息的,', res1)
      context.commit('setUserInfo', res1.data)
    }
  },
  getters: {

  }
}
