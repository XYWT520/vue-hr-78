import Layout from '@/layout'

export default {
  path: '/permissions',
  component: Layout,
  children: [{
    path: '', // 作为默认渲染路由
    name: 'permissions',
    component: () => import('@/views/permissions'),
    meta: { title: '权限管理', icon: 'dashboard' }
  }]
}
