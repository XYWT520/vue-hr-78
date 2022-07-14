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
                    <el-dropdown-item>添加子部门</el-dropdown-item>
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
                        <el-dropdown-item>编辑部门</el-dropdown-item>
                        <el-dropdown-item>删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>

        <!-- 子组件弹层 -->
        <el-dialog title="添加或编辑" :visible.sync="showDialog" :close-on-click-modal="false" :close-on-press-escape="false">
          <AddorEdit @hCancel="cancel" />
          <!-- <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary">确定</el-button> -->
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
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
      showDialog: false
    }
  },
  created() {
    this.loadDepartments()
  },

  methods: {
    // 获取树形数据
    async loadDepartments() {
      try {
        const res = await getDepartments()
        // console.log(res)
        res.data.depts.shift()
        // console.log(company)
        // this.list = res.data.depts
        this.list = tranListToTreeData(res.data.depts)
      } catch (e) {
        console.log(e)
      }
    },
    // 添加子部门
    hAdd() {
      this.showDialog = true
    },
    cancel() {
      this.showDialog = false
    }
  }

}
</script>
