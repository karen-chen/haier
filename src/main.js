//rem
require('lib-flexible');

//移动端300ms延迟
import FastClick from 'fastclick'
document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})

window.store = store;

