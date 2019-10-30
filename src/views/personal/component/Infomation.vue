<template>
  <div>
    <el-col
            :lg="20"
            :md="24"
            :sm="24"
            :xs="24"
            :span="12"
            class="form-col"
    >
      <el-form
        ref="ruleFormInfo"
        :model="ruleFormInfo"
        :rules="rules"
        status-icon
        label-width="120px"
        @submit.native.prevent
      >
        <el-form-item label="用户名：" prop="username">
          <el-input
            v-model="ruleFormInfo.username"
            class="span10"
            size="medium"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="姓名：" prop="chineseName">
          <el-input
            v-model="ruleFormInfo.chineseName"
            class="span10"
            size="medium"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input
            v-model="ruleFormInfo.phone"
            class="span10"
            size="medium"
            type='number'
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" size="medium" @click="submitForm('ruleFormInfo')">保 存</el-button>
          <el-button @click="resetForm('ruleFormInfo')">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Infomation",
  props: {
    ruleFormInfo: {
      type: Object,
      default: true
    }
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1\d{10}$/
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    return {
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        chineseName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' },
        ]
      }
    }
  },
  created() {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("infoSubmit", this.ruleFormInfo)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      var username =  this.ruleFormInfo.username
      this.$refs[formName].resetFields()
      this.ruleFormInfo.username = username
    },
  }
}
</script>
