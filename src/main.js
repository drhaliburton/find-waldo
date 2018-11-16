import Vue from 'vue'
import App from './App.vue'

import {
  MdCard
} from 'vue-material/dist/components';

Vue.use(MdCard);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
