import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
// import { Message } from 'element-ui'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
// 不是在vue组件中，不能通过this.$store.state.user....来获取token
// 要导入

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: 'http://127.0.0.1:8080/csf/hallCommon_IResAdminCSV_resReturn',
  // baseURL: 'http://localhost:3000',
  // baseURL: 'http://ihrm-java.itheima.net',
  // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 响应拦截器
service.interceptors.response.use(response => {
  if (response.data.success) {
    // 操作成功
    return response.data // 脱壳处理
  } else {
    // 如果success为false 业务出错,直接触发reject
    // 被catch分支捕获
    return Promise.reject(new Error('请求错误'))
  }
}, error => {
  // 判断 token 是否失效 如果失效了就提醒用户重新登录
  if (error.response.data.code === 10002) {
    // console.log('token 失效')
    // 可以直接调用 vuex 里的退出登录的方法
    store.dispatch('user/loginOut')
    router.push({
      path: '/login',
      query: {
        return_url: location.hash.substring(1) //  打印的结果是 #/form/index  所以可以利用字符串的方法(字符串截取) 把前面的 # 给删除掉
      }
    })
    Message.error('登录超时')
  }
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = store.state.user.token
    if (token) {
      config.headers['Authorization'] = `Beater ${token}`
    }
    return config
  }
  , error => {
    return Promise.reject(error)
  })

export default service
