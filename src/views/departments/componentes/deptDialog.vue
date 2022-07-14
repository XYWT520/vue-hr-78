<template>
  <div>
    <el-form ref="deptForm" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in employess" :key="item.id" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small" @click="$emit('hCancel')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getEmployeeSimple } from '@/api/employees'
export default {
  data() {
    return {
      employess: [],
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    }
  },
  created() {
    this.loadgetEmployeeSimple()
  },
  methods: {
    async loadgetEmployeeSimple() {
      const res = await getEmployeeSimple()
      // console.log(res)
      this.employess = res.data
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
