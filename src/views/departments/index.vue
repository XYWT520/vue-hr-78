<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20">
            <svg-icon icon-class="home" /><span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="hAdd('')">添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!-- 树形组件 -->
        <el-tree :data="list" :default-expand-all="true">
          <template #default="{ data }">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%;">
              <el-col :span="20">
                <span>{{ data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ data.manager }}</el-col>
                  <el-col>
                    <!-- 下拉菜单 element -->
                    <el-dropdown>
                      <span> 操作<i class="el-icon-arrow-down" /> </span>
                      <!-- 下拉菜单 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="hAdd(data.id)">添加子部门</el-dropdown-item>
                        <el-dropdown-item @click.native="hEdit(data.id)">编辑部门</el-dropdown-item>
                        <el-dropdown-item v-if="data.children.length === 0 " @click.native="remove(data.id)">删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>

        <!-- 子组件弹层 -->
        <el-dialog
          :title="isEdit? '编辑' : '添加'"
          :visible.sync="showDialog"
          :close-on-click-modal="false"
          :close-on-press-escape="true"
        >
          <AddorEdit v-if="showDialog" :id="curId" :origin-list="originList" :is-edit="isEdit" @hCancel="cancel" />
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import { delDepartment } from '@/api/departments'
import AddorEdit from './componentes/deptDialog'
export default {
  components: {
    AddorEdit
  },
  data() {
    return {
      // 依赖一份树形数据
      list: [{
        name: '财务部',
        manager: '刘备',
        children: [
          {
            name: '财务核算部',
            manager: '张飞'
          },
          {
            name: '税务核算部',
            manager: '关羽'
          }
        ]
      }],
      showDialog: false,
      curId: '',
      // 来判断点击是不是编辑或者添加状态
      isEdit: false,
      originList: []
    }
  },
  created() {
    // 获取初始数据
    this.loadDepartments()
  },

  methods: {
    // 获取树形数据
    async loadDepartments() {
      try {
        const res = await getDepartments()
        res.data.depts.shift()
        // this.list = res.data.depts
        this.originList = res.data.depts.map(({ id, pid, code, name }) => { return { id, pid, code, name } })
        this.list = tranListToTreeData(res.data.depts)
      } catch (e) {
        console.log(e)
      }
    },
    // 添加子部门
    hAdd(id) {
      this.showDialog = true
      this.curId = id
      this.isEdit = false
    },
    // 编辑子部门
    hEdit(id) {
      this.showDialog = true
      this.curId = id
      this.isEdit = true
    },
    // 子组件通知父组件关闭的弹层
    cancel(id) {
      this.showDialog = false
      this.curId = id
      this.loadDepartments()
    },
    // 删除数据
    async remove(id) {
      try {
        await this.$confirm('确定取消?', '提示', { type: 'warning' })
        const res = await delDepartment(id)
        this.$message.success(res.message)
        this.loadDepartments()
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

