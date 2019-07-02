<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="back"/>
    <div class="name">{{username}}</div>
    <van-tabs v-model="active">
      <van-tab title="帖子">
        <div v-for="post in posts" :key="post.id" class="user-post">
          <router-link :to="'/post/'+post.id">{{post.title}}</router-link><br>
          <small>{{post.created_at}}</small>
        </div>
      </van-tab>
      <van-tab title="评论">
        <div>
          <div v-if="comments.length>0">
            <!-- <div v-for="comment in comments" :key="comment.id"  class="user-comment">
              <span>{{comment.user.username}}</span>
              <p>
                <strong>{{comment.content}}</strong>
              </p>
              <small>{{comment.updated_at}}</small>
            </div>
          </div>
          <div v-else>
            <span class="no-comment">暂无评论</span>
          </div> -->
          <div v-for="(comment,index) in comments" :key="index" class="post-comment">
            <img src="/assets/user.jpg" class="post-avatar">
          <div class="comment-box">
            <router-link :to="'/user/'+comment.user.id" class="post-username">{{comment.user.username}}</router-link>
            <p class="post-comment-content">{{comment.content}}</p>
            <small>{{comment.updated_at | dateFmt}}</small>
          </div>
          <span v-if="!comment.liked">
            <img src="/assets/dianzan1.png" class="awesome" @click="numberplus(comment)">
          </span>
          <span v-else>
            <img src="/assets/dianzan2.png" class="awesome" @click="numberReduce(comment)">
          </span>
          {{number}}
        </div>
      </div>
      <div v-else  class="post-nocomment">
        暂无评论
      </div>
            <div>
        <van-pagination
          v-model = "currentPage"
          :total-items = "total"
          :items-per-page = "15"
          :show-page-size="3"
          force-ellipses
          @change="nextPage"
        />
      </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      active: 2,
      posts: [],
      comments: [],
      number: 0,
      awesome:true,
      total: 0,
      currentPage: 1
    };
  },
  methods: {
    getUser() {
      let id = this.$route.params.id;
      this.$http.get(`users/${id}`).then(resp => {
        this.username = resp.data.username;
      });
    },
    getPost() {
      let id = this.$route.params.id;
      this.$http.get(`threads?user_id=${id}`).then(resp => {
        this.posts = resp.data.data;
      });
    },
    getComment() {
      let id = this.$route.params.id;
      this.$http.get(`comments?user_id=${id}`).then(resp => {
        // console.log(resp)
        this.total = resp.data.total;
        this.comments = resp.data.data;
          for (let i = 0; i < this.comments.length; i++) {
          this.comments[i].liked = false;
        }
      });
    },
    numberplus(comment){
      comment.liked = true;
      this.number++;
    },
    numberReduce(comment){
      comment.liked = false;
      this.number--;
    },
    nextPage(){
      let page = this.currentPage;
      let id = this.$route.params.id;
      this.$http.get(`comments?user_id=${id}&page=${page}`)
      .then(resp=>{
        this.comments=resp.data.data
      })
    },
    back() {
      this.$router.go("-1");
    },
  },
  created() {
    this.getUser();
    this.getPost();
    this.getComment();
  }
};
</script>

<style>
.name{
  width: 100vw;
  height: 80px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffdd55
}
.user-post{
  width: 100vw;
  height: 50px;
  margin: 5px;
}
.user-comment{
  margin:10px 10px;
  word-break: break-all;
}
</style>
