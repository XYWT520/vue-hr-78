import Layout from '@/layout'

export default {
  path: '/departments',
  component: Layout,
  children: [{
    path: '', // 作为默认渲染路由
    name: 'departments',
    component: () => import('@/views/departments'),
    meta: { title: 'departments', icon: 'departments' }
  }]
}
