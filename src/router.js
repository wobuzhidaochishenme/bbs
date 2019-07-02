import Vue from 'vue';
import Router from 'vue-router';

import Home from './page/Home.vue';
import Login from './page/Login.vue';
import Register from './page/Register.vue';
import Me from './page/Me.vue';
import NewPost from './page/NewPost.vue';
import Post from './page/Post.vue';
import User from './page/User.vue';

Vue.use(Router);

export default new Router({
  mode:'history',
  routes:[
    // { path: '/', redirect: '/technology' },
    { path: '/', component: Home},
    { path: '/me', component: Me,
      children:[
        { path: '/login', component: Login },
        { path: '/register', component: Register },
      ]
    },
    { path:'/newpost', component: NewPost },
    { path:'/post/:id', component: Post },
    { path:'/user/:id', component: User },
  ]
})
