<template>
  <div>
    <div>
      <van-nav-bar title="中午吃什么" @click-left="toMe" @click-right="newPost">
        <van-image
          src="/assets/personal.png"
          fit="contain"
          width="25"
          height="25"
          slot="left"
          class="image"
        />
        <van-image
          src="/assets/newPost.png"
          fit="contain"
          width="25"
          height="25"
          slot="right"
          class="image"
        />
      </van-nav-bar>
    </div>
    <div>
      <van-tabs @click="toAdd" v-model="nodeIndex">
        <van-tab v-for="(project,index) in projects" :key="index" :title="project.name">
          <div v-for="post in posts" :key="post.id" class="home-post">
            <div class="home-user">
              <img src="/assets/user.jpg" class="home-user-image">
              <span>
                <router-link :to="'/user/'+post.user.id" class="post-username">
                  {{post.user.username}}
                </router-link>
                <div class="home-post-title">
                  <router-link :to="'/post/'+post.id" class="home-post-title-content">
                    {{post.title}}
                  </router-link>
                </div>
              </span>
            </div>
            <div class="home-post-foot">
              <span>{{post.created_at | dateFmt}}</span>
              <span class="home-comment-number">
                <img src="/assets/comment.png" class="home-comment-logo">
                <span>{{post.comments_count}}</span>
              </span>
            </div>
          </div>
          我是有底线的
          <!-- <router-view></router-view> -->
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
      posts: [],
      title: "",
      nodeIndex: 0
    };
  },
  methods: {
    toAdd(index, title) {
      let id = this.projects[index].id;
      this.getThreads(index + 1);
    },
    getThreads(nodeId) {
      this.$http.get(`threads?node_id=${nodeId}`).then(resp => {
        this.posts = resp.data.data;
      });
    },
    toMe() {
      this.$router.push("/me");
    },
    newPost() {
      this.$router.push("/newpost");
    },
    getProjects() {
      this.$http.get("nodes").then(resp => {
        this.projects = resp.data.data;
      });
    }
  },
  created() {
    this.getThreads(this.nodeIndex + 1);
    this.getProjects();
    // this.toPost();
  }
};
</script>

<style>
.home-post {
  padding: 10px 10px 5px 10px;
  border-bottom: 0.1px solid #aaa;
}
.home-user {
  display: flex;
}
.home-user-image {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin: 0 5px;
}
.home-comment-logo {
  width: 15px;
  height: 15px;
  margin: 0 5px;
}
.home-post-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #aaa;
  font: 100 14px arial;
  margin: 0 10px;
}
.home-post-title {
  margin: 10px 0;
}
.home-comment-number {
  display: flex;
  align-items: center；;
}
.home-post-title-content {
  color: black;
  font: 500 20px arial;
}
</style>
