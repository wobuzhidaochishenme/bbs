<template>
<div>
    <div >
      <van-nav-bar
        title="中午吃什么"
        @click-left="uesr"
        @click-right="newPost"
      >
      <van-image src="/assets/personal.png" fit="contain"  width="25" height="25" slot="left" class="image" />
      <van-image src="/assets/newPost.png" fit="contain"  width="25" height="25" slot="right" class="image" />
      </van-nav-bar>
    </div>
  <div>
    <van-tabs  @click="toAdd" v-model="nodeIndex">
      <van-tab v-for="(project,index) in projects" :key="index" :title="project.name">
        <div v-for="post in posts" :key="post.id" class="post">
          <router-link :to="'/post/'+post.id">
             {{post.title}}
          </router-link><br>
          <small>{{post.user.username}}</small><br>


        </div>
          <router-view></router-view>
      </van-tab>
    </van-tabs>
  </div>

</div>
</template>

<script>
export default {
  data(){
    return{
      projects:[],
      posts:[],
      title: '',
      nodeIndex:0
    }
  },
  methods:{
    toAdd(index,title){
      let id = this.projects[index].id
      this.getThreads(index + 1);
    },
    getThreads(nodeId) {
      this.$http.get(`threads?node_id=${nodeId}`)
      .then(resp =>{
        this.posts= resp.data.data
      })
    },
    uesr(){
      this.$router.push('/user')
    },
    newPost(){
      this.$router.push('/newpost')
    },
    getProjects(){
      this.$http.get('nodes')
      .then(resp => {
        this.projects =resp.data.data
      })
    },
  },
  created(){
    this.getThreads(this.nodeIndex + 1);
    this.getProjects();
    // this.toPost();
  }
}
</script>

<style>
.post{
  height: 60px;
  /* background: #daeeda; */
  padding: 10px 0 0 10px;
  border-bottom: 2px solid #888;
}
</style>
