import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import 'normalize.css';
import 'lib-flexible';
import './vant/index';

// import './mock/index';

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
