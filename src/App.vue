<template>
  <div>
    <!-- <div :hidden="$store.state.hid">
      <van-nav-bar
        title="中午吃什么"
        right-text="首页"
        @click-left="uesr"
        @click-right="home"
      >
      <van-image src="/assets/personal.png" fit="contain"  width="25" height="25" slot="left" class="image" @click="hidden" />
      </van-nav-bar>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    // hidden(){
    //   this.$store.commit('hidden')
    // },
    // uesr(){
    //   this.$router.push('/user')
    // },
    // home(){
    //   this.$router.push('/')
    // }
  }
}
</script>

<style>
.image{
  position: relative;
  top: 5px;
}
</style>
