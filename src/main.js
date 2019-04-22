import Vue from 'vue';
import App from './App.vue';

import 'bootstrap';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUi from 'element-ui';

import utils from './mixins/utils';

Vue.config.productionTip = false;

Vue.mixin(utils);
Vue.use(ElementUi);

new Vue({
  render: h => h(App),
}).$mount('#app');
