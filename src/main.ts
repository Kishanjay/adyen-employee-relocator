import Vue from 'vue';
import { dateToDateString } from '@/libraries/date';
import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';

Vue.config.productionTip = false;

Vue.filter('humanizedDate', (dateString: string) => {
  const date = new Date(dateString);
  return dateToDateString(date);
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
