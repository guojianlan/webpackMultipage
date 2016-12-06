import Vue from 'vue';
import App from './components/index.vue'
new Vue(Vue.util.extend({
  created(){
  	console.log(1234);
  }
},App)).$mount('app');