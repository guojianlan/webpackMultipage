import Vue from 'vue';
import App from './components/index.vue'
new Vue(Vue.util.extend({
  created(){
  	console.log(123);
  }
},App)).$mount('app');