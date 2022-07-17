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
        <el-button type="primary" size="small" @click="hSubmit">确定</el-button>
        <el-button size="small" @click="$emit('hCancel')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getEmployeeSimple } from '@/api/employees'
import { addDepartment, getDepartDetail, updateDepartments } from '@/api/departments'
export default {
  props: {
    id: { type: String, required: true },
    isEdit: { type: Boolean, required: true },
    originList: { type: Array, required: true }
  },
  data() {
    const valieCode = (rule, value, callback) => {
      // console.log(value)

      let newOriginList = null

      // console.log(newOriginList)
      if (this.isEdit) {
        // 编辑部门 // filter: 过滤出「除了」正在编辑的部门以外的所有部门
        newOriginList = this.originList.filter(item => item.id !== this.id).map(({ code }) => code)
      } else {
        // 添加部门
        newOriginList = this.originList.map(({ code }) => code)
      }

      // if (newOriginList.includes(value)) {
      //   callback(new Error(value + '已存在'))
      // } else {
      //   callback()
      // }
      // 三元表达式
      newOriginList.includes(value) ? callback(new Error(value + '已存在')) : callback()
    }

    const valieName = (rule, value, callback) => {
      // console.log(value)
      // 需求二:编辑时,通过 id 找扫兄弟部门.并判断是否在其中
      // this.is => 当前点击的部门
      let nameList = null
      if (this.isEdit) {
        // 进入编辑
        // 根据点击当前的部门 id 找到父部门 id
        const pid = this.originList.find(item => item.id === this.id).pid
        // 根据 pid 过滤出所有子部门
        nameList = this.originList.filter(item => item.pid === pid && item.id !== this.id).map(({ name }) => name)
      } else {
        // 进入添加
        nameList = this.originList.filter(item => item.pid === this.id).map(({ name }) => name)
      }
      // 编辑部门 // filter: 过滤出「除了」正在编辑的部门以外的所有部门
      nameList.includes(value) ? callback(new Error(value + '已存在')) : callback()
    }
    return {
      employess: [],
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: valieName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: valieCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadgetEmployeeSimple()
    this.loadDetail()
  },
  methods: {
    // 页面加载模块
    async loadgetEmployeeSimple() {
      const res = await getEmployeeSimple()
      // console.log(res)
      this.employess = res.data
    },
    // 确定按钮
    hSubmit() {
      this.$refs.deptForm.validate(valid => {
        if (!valid) return
        this.isEdit ? this.doEdit() : this.hAdd()
      })
    },
    // 添加模块
    async hAdd() {
      await addDepartment({ ...this.form, pid: this.id })
      // console.log(res)
      // 通知父组件关闭弹层
      this.$emit('hCancel')
      this.$message.success('添加成功')
    },
    // 编辑模块
    async doEdit() {
      await updateDepartments(this.form)
      this.$message.success('编辑成功')
      this.$emit('hCancel')
    },
    // 数据回填
    async loadDetail() {
      if (!this.isEdit) return
      const res = await getDepartDetail(this.id)
      // console.log('现在是编辑，要去获取详情', res)
      this.form = res.data
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
