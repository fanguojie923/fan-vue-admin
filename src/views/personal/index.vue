<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="el-card__title">个人资料</span>
                    </div>
                  <div class="text item">
                    <Infomation
                            :ruleFormInfo="ruleFormInfo"
                            @infoSubmit="infoSubmit"
                    />
                  </div>
                </el-card>
            </el-col>

          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="el-card__title">修改密码</span>
              </div>
              <div class="text item">
                <Password
                        :ruleFormPwd="ruleFormPwd"
                        @infoSubmit="infoSubmit"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
    </div>
</template>

<script>
    import Infomation from "./component/Infomation";
    import Password from "./component/Password";
    import {mapGetters} from 'vuex'
    // import { infoDataSubmit, pwdDataSubmit } from '@/api/personal'
    export default {
        name: "personal",
        components: {
          Infomation,
          Password
        },
        data() {
            return {
                ruleFormInfo: {
                    auditUserId: '',
                    username: '',
                    chineseName: '',
                    phone: ''
                },
                ruleFormPwd: {
                    auditUserId: '',
                    username: '',
                    chineseName: '',
                    phone: ''
                }
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        created() {
            // this.ruleFormInfo = this.user
        },
        methods: {
            async infoSubmit(ruleFormInfo) {
                try {
                    let res = await infoDataSubmit(ruleFormInfo)
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                    setTimeout(function () {
                        that.$router.push('/user/personal')
                    }, 1200)
                } catch (error) {
                    console.log(error)
                }
            },
            async pwdSubmit(ruleFormInfo) {
                try {
                    let res = await pwdDataSubmit(ruleFormPwd)
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                    setTimeout(function () {
                        that.$router.push('/user/personal')
                    }, 1200)
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        padding: 20px;
        .text {
            font-size: 16px;
        }
        .item {
            margin-bottom: 18px;
        }
        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }
        .box-card {
            /*width: 500px;*/
          /*background-color: #EEF4F9;*/
        }
    }
</style>
