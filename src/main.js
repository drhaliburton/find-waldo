import Vue from 'vue'
import App from './App.vue'
import 'vue-material/dist/vue-material.min.css';

import {
  MdCard,
  MdIcon,
  MdButton,
  MdChips
} from 'vue-material/dist/components';

Vue.use(MdCard);
Vue.use(MdIcon);
Vue.use(MdButton);
Vue.use(MdChips)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
