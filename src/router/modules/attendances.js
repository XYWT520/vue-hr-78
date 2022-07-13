import Layout from '@/layout'

export default {
  path: '/attendances',
  component: Layout,
  children: [{
    path: '', // 作为默认渲染路由
    name: 'attendances',
    component: () => import('@/views/attendances'),
    meta: { title: '考勤', icon: 'dashboard' }
  }]
}
