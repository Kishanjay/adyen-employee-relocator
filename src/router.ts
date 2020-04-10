import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import WeatherPage from '@/views/WeatherPage.vue';
import FlightsPage from '@/views/FlightsPage.vue';
import ImagesPage from '@/views/ImagesPage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'weather',
    component: WeatherPage,
  },
  {
    path: '/flights',
    name: 'flights',
    component: FlightsPage,
  },
  {
    path: '/images',
    name: 'images',
    component: ImagesPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
