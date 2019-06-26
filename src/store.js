import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    hid:false,
    username:'',
    login:false,
  },
  mutations:{
    hidden(state){
      state.hid=true;
    },
    appear(state){
      state.hid=false;
    },
    setUserName(state,username){
      state.username = username
    },
    setLogin(state){
      state.login= true
    }
  }
})
