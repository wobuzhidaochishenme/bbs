<template>
  <div>
    <div class="title">
      <van-nav-bar title="中午吃什么" left-text="返回" left-arrow @click-left="back"></van-nav-bar>
    </div>
    <div>
      <div>
        {{username}}
        <h3>{{title}}</h3>
        <p>{{content}}</p>
        <small>{{createdAt}}</small>
      </div>
      <div id="comments">全部评论</div>
      <div v-if="comments.length>0">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <span>{{comment.user.username}}</span>
          <div>{{comment.content}}</div>
          <small>{{comment.updated_at}}</small>
        </div>
      </div>
      <div v-else>
        <span class="no-comment">暂无评论</span>
      </div>

      <div>
        <span  class="goComment"  v-if="inText" >
          <input class="inComment" @click="toComment">
          <a href="#comments">
            <img src="/assets/comment.png" width="25" height="25">
          </a>
        </span>
        <span  class="goComment" v-else>
          <textarea class="inComment" v-model="commentText" autofocus></textarea>
          <button @click="sentComment">发送</button>
        </span>
      </div>
    </div>
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
      comments: [],
      inText: true,
      commentText: ""
    };
  },
  methods: {
    back() {
      this.$router.go("-1");
    },
    getPost() {
      let id = this.$route.params.id;
      this.$http.get(`threads/${id}`).then(resp => {
        this.title = resp.data.title;
        this.username = resp.data.user.username;
        this.content = resp.data.content;
        this.createdAt = resp.data.created_at;
      });
    },
    getComments() {
      let id = this.$route.params.id;
      this.$http.get(`comments?thread_id=${id}`).then(resp => {
        console.log(resp.data)
        this.comments = resp.data.data;
        if (resp.data.total / 15 > 1) {
          this.pages = Math.ceil(resp.data.total / 15);
        }
      });
    },
    toComment() {
      this.inText = false;
    },
    sentComment() {
      this.inText = true;
      this.$http
        .post("comments", {
          thread_id: this.$route.params.id,
          content: this.commentText
        })
        .then(resp => {
          this.commentText = "";
          this.getComments();
        });
    }
  },
  created() {
    this.getPost();
    this.getComments();
  }
};
</script>

<style>
.goComment {
  position: fixed;
  bottom: 0px;
  width: 100vw;
  display: flex;
}
.inComment {
  flex-grow: 1;
}
.comment {
  word-break: break-all;
  /* border: 2px solid #88ddff; */
  margin: 5px;
  background: #ddd
}
#comments{
  width: 100vw;
  padding: 5px 0;
  background: #ddd;
  text-align: center;
}
.no-comment{
  display: block;
  /* width: 100vw; */
  text-align: center;
  margin-top: 10px;
}

</style>
