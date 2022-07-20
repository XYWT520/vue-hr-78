<template>
  <div>
    <el-row type="flex" class="row-bg" justify="flex-start">
      <el-col :span="6"><div class="grid-content" style="margin-left:  20px">实物名称</div></el-col>
      <el-col :span="6"><div class="grid-content">退货数量</div></el-col>
      <el-col :span="6"><div class="grid-content">操作</div></el-col>
    </el-row>
    <!-- form -->
    <el-row type="flex" class="row-bgc" justify="flex-start">
      <el-col :span="6">
        <div class="grid-content" style="margin-left: 20px;margin-bottom:3px;">
          <el-input v-model="form.name" class="width-form" prefix-icon="el-icon-search" />
        </div>
        <div class="grid-content" border-bottom style="margin-left: 20px">
          <el-input v-model="form.name" class="width-form" prefix-icon="el-icon-search" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content " style="margin-bottom:3px">
          <el-input v-model="form.num" class="width-form" />
        </div>
        <div class="grid-content">
          <el-input v-model="form.num" class="width-form" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content border-bottom">
          <el-link style="color:#E86452">删除</el-link>
        </div>
        <div class="grid-content">
          <el-link style="color:#E86452">删除</el-link>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-white" justify="space-between">
      <el-col :span="6">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item>
            <div>
              <el-form ref="form" style="margin-top:10px" :model="form" label-width="80px">
                <el-form-item label="备注:" style="margin-left: 20px">
                  <el-input v-model="form.instructions" style="width:1490px" placeholder="请输入备注内容" />
                  <div class="grid-color">
                    <el-button plain class="btn-bottom">+ 新增一条</el-button>
                  </div>
                </el-form-item>

              </el-form>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 提交 -->
    <el-row>
      <el-col :span="24"><div class="row-white">
        <el-button class="row-blue row-size" @click="add">提交</el-button>
      </div></el-col>
    </el-row>

  </div>
</template>

<script>
// import request from '@/utils/request'
import {
  Aside,
  Container,
  Main,
  Header,
  Footer,
  Row,
  Col,
  Button,
  Input,
  Progress,
  Pagination,
  TableColumn,
  Table,
  DatePicker,
  Select,
  Form,
  Icon,
  FormItem,
  Option
} from 'element-ui'
import { get1 } from '@/api/departments'
export default {
  name: 'ApplyApp',
  components: {
    [Aside.name]: Aside,
    [Container.name]: Container,
    [Main.name]: Main,
    [Header.name]: Header,
    [Footer.name]: Footer,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Input.name]: Input,
    [Progress.name]: Progress,
    [Pagination.name]: Pagination,
    [TableColumn.name]: TableColumn,
    [Table.name]: Table,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Form.name]: Form,
    [Icon.name]: Icon,
    [FormItem.name]: FormItem,
    [Option.name]: Option
  },
  data() {
    return {
      form: {
        name: 'SIM卡',
        num: 20,
        instructions: ''
      },
      formInline: {
        user: '',
        region: ''
      }
    }
  },

  // created() {
  //   const res = get1(this.form)
  //   // const res = request.post('http://127.0.0.1:8080/csf/hallCommon_IResAdminCSV_resReturn', { form: {
  //   //   name: 'SIM卡',
  //   //   num: 20,
  //   //   instructions: ''
  //   // }})
  //   console.log(res)
  // },
  mounted() {},

  methods: {
    add() {
      const res = get1(this.form)
      console.log(res)
    }
  }
}
</script>

<style scoped lang='scss'>
.el-form-item {
  margin-left: -118px;
}
.el-row {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 1px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 1px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 0px;
  height: 40px;
  line-height: 40px;
}

.el-icon-search:before {
  margin-left: 148px;
}
.grid-color {
  position: relative;
  border-radius: 4px;
  min-height: 40px;
  text-align: center;
  line-height: 40px;
  color: red;
}
.grid-color .btn-bottom {
  position: absolute;
  top: -39px;
  left: 1521px;
  color: #0085d0;
  border: #0085d0 1px solid;
}
.border-btn {
  border-bottom: 1px dashed #dedede;
}
.el-width1 {
  width: 80px;
  height: 32px;
}
.el-width {
  width: 800px;
  padding-left: 0px;
}

.row-bg {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 1px;
}
.row-bgc {
  background-color: #fff;
  margin-top: 4px;
  margin-bottom: 3px;
  border-bottom: 1px dashed #dedede;
}
.row-white {
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  line-height: 36px;
}
.row-from {
  width: 180px;
  height: 32px;
}
.row-blue {
  width: 88px;
  height: 35px;
  background: #0085d0;
  border-radius: 4px;
}
.row-white .row-size {
  position: absolute;
  top: -41px;
}
.row-size {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.row-flex {
  flex-direction: row;
  justify-content: flex-start;
}
.width-form {
  width: 180px !important;
}
</style>
