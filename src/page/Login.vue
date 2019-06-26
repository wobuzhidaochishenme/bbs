<template>
  <div>
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <van-cell-group>
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
    <van-button type="primary" size="large" @click="login">登录</van-button>

  </div>
</template>

<script>
export default {
  data(){
    return{
      phone: '',
      password: '',
      message:'',
    }
  },
  methods: {
    back(){
      this.$router.go('-1')
      this.$store.commit('appear')
    },
    login(){
      this.$http.post('tokens',{
        phone:this.phone,
        password:this.password,
      })
      .then(resp => {
        let Token = resp.data.token;
        this.$http.defaults.headers.common['Authorization'] = `Bearer ${ Token }`;
        this.$router.push('/');
        this.$store.commit('appear');
        this.$store.commit('setLogin');
        this.$http.get('users/me')
        .then(resp => {
          let username = resp.data.username
           this.$store.commit('setUserName',username);
      })
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
