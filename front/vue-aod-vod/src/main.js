// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// 页面顶部进度条
import NProgress from 'nprogress';
import '@/plugins/nprogress.scss';

import App from './App';
import router from './router';
import utils from './utils/utils';


Vue.config.productionTip = false;


Vue.prototype.$runtime = utils.runtime();

// 路由拦截 用于验证登录等
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth !== false)) {
    // 检查登录状态
    const userInfo = localStorage.getItem('Xtoken');
    if (!userInfo) {
      NProgress.start();
      next({
        path: '/newlogin',
        query: { redirect: to.fullPath },
      });
      return;
    }
  }

  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
