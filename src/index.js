import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router'
import store from './store';
import { Field,Button,Cell,CellGroup,PasswordInput, NumberKeyboard,NavBar,Image,Toast,Tab,Tabs,Panel,Uploader,Picker,Popup,ActionSheet,Icon } from 'vant';

Vue.use(Field).use(Button).use(Cell).use(CellGroup).use(PasswordInput).use(NumberKeyboard).use(NavBar).use(Image).use(Toast).use(Tab).use(Tabs).use(Panel).use(Uploader).use(Picker).use(Popup).use(ActionSheet).use(Icon);;


Vue.prototype.$http = axios.create({
  baseURL:'http://47.111.115.126/api'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
