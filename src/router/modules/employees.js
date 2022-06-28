import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [{
    path: '', // 作为默认渲染路由
    name: 'employees',
    component: () => import('@/views/employees'),
    meta: { title: 'employees', icon: 'employees' }
  }]
}
