import Vue from 'vue';
//import TodoList from './components/TodoList.vue';
import StudyAdmin from './components/StudyAdmin.vue';
import './assets/app.css';
import ES6Promise from 'es6-promise';
import VueRouter from 'vue-router';
ES6Promise.polyfill();

Vue.config.productionTip = false;

Vue.use(VueRouter);
new Vue({
    render: h => h(StudyAdmin)
}).$mount('#app');