<template>
  <div>
    <div class="login-contant">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card :body-style="{ padding: '0px' }" shadow="always" class="login-card">
            <img src="../../assets/login_img/po.gif" width="100%" class="image">
            <div class="user-login-form">
              <el-form label-position="right" label-width="120px" ref="loginForm" :model="loginForm" :rules="loginRules"
                :show-message=false>
                <el-form-item label="你的账号:" prop="username">
                  <el-input @keyup.enter.native="handleLogin" clearable v-model="loginForm.username" auto-complete="off"
                    placeholder="gkdgkdgkdgkd"></el-input>
                </el-form-item>
                <el-form-item label="你的密码:" prop="password">
                  <el-input @keyup.enter.native="handleLogin" clearable :type="pwdType" v-model="loginForm.password"
                    auto-complete="off" placeholder="gkdgkdgkdgkd"></el-input>
                </el-form-item>
                <el-row type="flex" justify="center">
                  <el-button @click="handleLogin()" :loading="loading" type="info" icon="el-icon-check">打开新世界
                  </el-button>
                </el-row>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <background></background>
  </div>
</template>

<script>
  import Background from '@/components/Background/index'

  const ipc = require('electron').ipcRenderer
  export default {
    name: 'login',
    components: {
      Background
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value.length < 4) {
          callback(new Error('密码不能小于4位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'change'
          }],
          password: [{
            required: true,
            trigger: 'change',
            validator: validatePass
          }]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      // 关闭app
      closeApp() {
        ipc.send('close-app')
      },
      // 最小化app
      minApp() {
        ipc.send('min-app')
      },
      // 最大化app
      maxApp() {
        ipc.send('max-app')
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('Login', this.loginForm)
              .then(() => {
                this.loading = false
                this.$router.push({
                  path: '/'
                })
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .login-contant {
    .el-input__inner {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      font-size: 20px;
    }

    .el-form-item__label {
      font-size: 20px;
    }

    .el-button {
      background-color: rgb(127, 99, 96);
      border: none;
      color: #fff;
      position: relative;
      transition: 800ms ease all;
      outline: none;

      &:hover {
        background: #fff;
        color: rgb(127, 99, 96);
      }
    }

    .el-button:before,
    .el-button:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 2px;
      width: 0;
      background: rgb(127, 99, 96);
      ;
      transition: 400ms ease all;
    }

    .el-button:after {
      right: inherit;
      top: inherit;
      left: 0;
      bottom: 0;
    }

    .el-button:hover:before,
    .el-button:hover:after {
      width: 100%;
      transition: 800ms ease all;
    }
  }
</style>

<style lang="scss" scoped>
  .login-contant {
    position: fixed;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  .login-card {
    border-radius: 15px;
  }

  .user-login-form {
    padding: 30px 100px 15px 100px;
  }
</style>