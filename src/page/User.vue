<template>
  <div>
    <div :hidden="$store.state.hid"  class="user">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="back"
      />
      <van-cell class="userDiy" is-link to="index" v-if="$store.state.login">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="avatar">
        <div class="userName">
            {{$store.state.username}}
        </div>
        <template slot="right-icon">
          <span class="gg"><van-icon name="arrow" /></span>
        </template>
      </van-cell>
      <div v-else class="login">
            <span @click="toRegister">注册</span>/
            <span @click="toLogin">登录</span>
      </div>

      <div class="userMessage">
        <van-cell  value="个人主页" is-link to="/" />
        <van-cell  value="我的帖子" is-link to="/" />
        <van-cell  value="我的评论" is-link to="/" />
      </div>
      <div class="userMessage">
        <van-cell  value="系统通知" is-link to="/" />
        <van-cell  value="评论" is-link to="/" />
        <van-cell  value="私信" is-link to="/" />
      </div>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
methods:{
    toRegister(){
      this.$router.push('/register');
      this.$store.commit('hidden');
    },
    toLogin(){
      this.$router.push('/login');
      this.$store.commit('hidden')
    },
    back(){
      this.$router.go('-1')
    },
}
}
</script>

<style>
.user{
  text-align: center
}
.avatar{
  width: 80px;
  height: 80px;
  margin: 5px 20px 0 0;
  border-radius: 50px;
  float: left;
}
.userName{
  margin: 10px 0;
  /* float: left; */
  display: flex;
  align-items: center;
}
.userMessage{
  border-top:10px solid #ddd
}
.login{
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background:		#00BFFF; */
}
.gg {
  position: relative;
  top: 30px;
  /* justify-content: center; */
  /* align-items: center; */
}
</style>
