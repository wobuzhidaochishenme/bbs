<template>
  <div>
    <van-nav-bar
    title="发布帖子"
    left-text="返回"
    right-text="发布"
    left-arrow
    @click-left="back"
    @click-right="post"
    />
    <div>
      <input placeholder="标题" v-model="title" class="newpost-title"><br>
      <textarea placeholder="内容" v-model="content" class="newpost-content"></textarea>
    </div>
    <van-field
      readonly
      clickable
      label="标签"
      :value="value"
      placeholder="选择标签"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      >
      </van-picker>
    </van-popup>

    <div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        fileList: [],
        nodeId: '',
        title: '',
        content: '',
        value: '',
        showPicker: false,
        label:[],
        columns: [],
      }
    },
  methods:{
    back(){
      this.$router.go('-1')
    },
    post(){
      let value = this.value;
      let label =this.label;
        for(let i=0;i<label.length;i++){
          if( value == label[i].name ){
            this.nodeId = label[i].id
          }
      };
      this.$http.post('threads',{
        node_id:this.nodeId,
        title:this.title,
        content:this.content,
      })
      .then(resp =>{
        this.$router.push('/')
      })
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    getLabel(){
      this.$http.get('nodes')
      .then(resp =>{
        this.label=resp.data.data
        this.getColumns()
      })
    },
    getColumns(){
      let label =this.label;
      for(let i=0;i<label.length;i++){
        let name= label[i].name;
        this.columns.push(name)
      }
    }
  },
  created(){
    this.getLabel();
  }
}
</script>

<style>
.newpost-title{
  box-sizing: border-box;
  width: 100%;
  padding: 10px 15px;
  border: none;
  border-bottom: 1px solid #aaa;
}
.newpost-content{
  box-sizing: border-box;
  width: 100%;
  height: 350px;
  padding: 15px;
  border: none;
  border-bottom: 1px solid #aaa;
}
</style>
