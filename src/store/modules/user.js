import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken() || null
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
    }

  },
  actions: {
    // 登录请求 在 vuex 里面的 actions 封装
    async userLogin(context, obj) {
      const res = await login(obj)
      context.commit('setToken', res.data)
    }
  },
  getters: {

  }
}
