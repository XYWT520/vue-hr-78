import Layout from '@/layout'

export default {
  path: '/social_securitys',
  component: Layout,
  children: [{
    path: '', // 作为默认渲染路由
    name: 'social_securitys',
    component: () => import('@/views/social_securitys'),
    meta: { title: 'social_securitys', icon: 'social_securitys' }
  }]
}
