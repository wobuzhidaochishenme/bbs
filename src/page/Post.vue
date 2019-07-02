<template>
  <div>
      <van-nav-bar class="NavBar" title="中午吃什么" left-text="返回" left-arrow @click-left="back"></van-nav-bar>
    <div class="post">
      <div>
        <div class="post-content-title">
          <span class="post-title">{{title}}</span>
          <router-link :to="'/user/'+userId" class="post-username">{{username}}</router-link>
          <small>
            {{createdAt | dateFmt}}
          </small>
        </div>
        <div class="post-contents">

          <p class="post-content">{{content}}</p>
        </div>

      </div>
      <div class="post-allcomment">全部评论（ {{total}} ）</div>
      <div v-if="comments.length>0">
        <div v-for="(comment,index) in comments" :key="index" class="post-comment">
            <img src="/assets/user.jpg" class="post-avatar">
          <div class="comment-box">
            <router-link :to="'/user/'+comment.user.id" class="post-username">{{comment.user.username}}</router-link>
            <div class="floor">{{(currentPage-1)*15+index+1}}楼</div>
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
    <span class="post-input" v-if="inText">
      <input class="post-incomment" @click="toComment">
      <span class="post-input-go">
        <a href="#comments">
          <img src="/assets/comment.png" width="25" height="25">
        </a>
      </span>
    </span>
    <span class="post-input" v-else>
      <textarea class="post-incomment" v-model="commentText" autofocus></textarea>
      <span class="post-input-go">
        <button @click="sentComment">发送</button>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      username: "",
      content: "",
      createdAt: "",
      userId:"",
      comments: [],
      inText: true,
      commentText: "",
      number: 0,
      awesome:true,
      total: 0,
      currentPage: 1,
    };
  },
  methods: {
    back() {
      this.$router.go("-1");
    },
    getPost() {
      let id = this.$route.params.id;
      this.$http.get(`threads/${id}`).then(resp => {
        this.post=resp.data.data;
        this.title = resp.data.title;
        this.username = resp.data.user.username;
        this.content = resp.data.content;
        this.createdAt = resp.data.created_at;
        this.userId = resp.data.user.id
      });
    },
    getComments() {
      let id = this.$route.params.id;
      this.$http.get(`comments?thread_id=${id}`).then(resp => {
        this.total = resp.data.total;
        this.comments = resp.data.data;
        for (let i = 0; i < this.comments.length; i++) {
          this.comments[i].liked = false;
        }
      });
    },
    toComment() {
      this.inText = false;
    },
    sentComment() {
      this.inText = true;
      this.$http.post("comments", {
          thread_id: this.$route.params.id,
          content: this.commentText
        })
        .then(resp => {
          this.commentText = "";
          this.getComments();
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
      this.$http.get(`comments?thread_id=${id}&page=${page}`)
      .then(resp=>{
        this.comments=resp.data.data
      })
    }

  },
  created() {
    this.getPost();
    this.getComments();
  }
};
</script>

<style>
.NavBar{
  width: 100%;
  position: fixed;
  top: 0;
}
.post{
  margin: 50px 0;
}
.post-content-title{
  padding:5px;
}
.post-title{
  display: block;
  font: bold 22px/1 arial;
  color: #000;
}
.post-contents{
  /* margin: 5px; */
}
.post-username{
  color: #4998e7;
  font-weight: 500;
}
.post-content{
  font: 18px/1 arial;
  margin: 15px 5px;
}
.post-allcomment{
  /* width: 100vw; */
  height: 25px;
  font: 14px arial;
  background: #f0f0ec;
  padding: 0 5px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.post-nocomment{
  text-align: center;
  margin: 10px;
}
.post-comment{
  margin: 15px 10px 0 10px;
  word-break: break-all;
  display: flex;
}
.post-comment-content{
  margin: 3px 0;
}
.post-avatar{
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin: 0 5px;
  flex-shrink: 0;
}
.floor{
  color: #666;
  font: 12px arial;
  /* font-weight: 500; */
}
.awesome{
  width: 20px;
  height: 20px;
  margin:3px 5px;
  flex-shrink: 0;
  position: relative;
  float: right;
}
.comment-box{
  flex-grow: 1;
}
.post-input{
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 0.3px solid #9b9a9a;
}
.post-incomment{
  flex-grow: 0.8;
  background: #f0f0ec;
  border: 0.5px solid #666;
  border-radius: 15px;
  padding: 2px 10px;
  color: #000;
}
.post-input-go{
  margin: 0 10px;
}
</style>
