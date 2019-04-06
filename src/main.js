import Vue from 'vue';
import App from './App.vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';

import utils from './mixins/utils';

Vue.config.productionTip = false;

Vue.mixin(utils);

new Vue({
  render: h => h(App),
}).$mount('#app');
