<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 导航栏 -->

    <!-- 登录表单 -->
      <ValidationObserver tag="from" ref="loginFrom">
        <ValidationProvider tag="div" rules="required|phone" name="手机号" v-slot="{ errors }">
          <van-field
            required
            clearable
            label="手机号"
            v-model="user.mobile"
            placeholder="请输入手机号"
            :error-message="errors[0]"
          ></van-field>
        </ValidationProvider>

        <ValidationProvider tag="div" rules="required" name="验证码" v-slot="{ errors }">
          <van-field
            type="password"
            label="验证码"
            v-model="user.code"
            placeholder="请输入验证码"
            :error-message="errors[0]"
            required
          ></van-field>
        </ValidationProvider>
      </ValidationObserver>
    <!-- 登录表单 -->

    <!-- 登录按钮 -->
    <div class="login-wrap">
      <van-button :loading="isLoginLoading" type="info" @click="onLogin">登录</van-button>
    </div>
    <!-- 登录按钮 -->
  </div>
</template>

<script>
import { login } from '@/api/user'
// import { mapMutation } from 'vuex'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '15201230123',
        code: '246810'
      },
      isLoginLoading: false
    }
  },
  methods: {
    // ...mapMutation('store', ['setUser']),
    async onLogin () {
      try {
        let isValid = await this.$refs.loginFrom.validate()
        if (!isValid) {
          return
        }
        this.isLoginLoading = true
        let res = await login(this.user)
        this.$toast.success('登陆成功')
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail('登录失败')
        }
      }
      this.isLoginLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    .login-wrap {
      padding: 20px;
      .van-button {
        width: 100%;
      }
    }
  }
</style>
