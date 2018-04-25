import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const HelloWorld = () => import('@/components/HelloWorld');
const Index2 = () => import('@/components/Index2');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/index2',
      name: 'index2',
      component: Index2,
      meta: {
        requireAuth: false,
      },
    },
  ],
});
