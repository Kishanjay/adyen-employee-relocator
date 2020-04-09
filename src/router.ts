import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import DashboardPage from '@/views/DashboardPage.vue';
import GraphPage from '@/views/GraphPage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardPage,
  },
  {
    path: '/graph',
    name: 'graph',
    component: GraphPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
