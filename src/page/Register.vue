<template>
  <div>
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="phone"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
      <van-button type="primary" size="large" @click="register">注册</van-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username: '',
      password: '',
      phone: '',
    }
  },
  methods:{
    back(){
      this.$router.go('-1')
      this.$store.commit('appear')
    },
    register(){
      this.$http.post('users',{
        username:this.username,
        phone:this.phone,
        password:this.password,
      })
      .then(resp => {
          this.$router.push('/login')
      })
      .catch(error =>{
        let message= error.response.data.message
        this.$toast(message)
      })

    },
  }
}
</script>

<style>

</style>
