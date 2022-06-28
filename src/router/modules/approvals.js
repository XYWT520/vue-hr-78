import Layout from '@/layout'

export default {
  path: '/approvals',
  component: Layout,
  children: [{
    path: '', // 作为默认渲染路由
    name: 'approvals',
    component: () => import('@/views/approvals'),
    meta: { title: 'approvals', icon: 'approvals' }
  }]
}
