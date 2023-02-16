import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    url: 'http://localhost:8000/api/',
    user:null,
    token:null
  },
  getters: {
    gettoken : state => state.token,
    getUserData : state => state.user,
  },
  mutations: {

  },
  actions: {
    setToken : ({state},value) => {state.token = value
      sessionStorage.setItem('token', value);
      
    },
    setUserData : ({state},value) => {state.user = value
      sessionStorage.setItem('role', value.role);
      sessionStorage.setItem('name', value.name);
      sessionStorage.setItem('user_id', value.user_id);
    },
    
  },
  modules: {
  }
})
