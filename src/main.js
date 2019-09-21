import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './styles/index.less'
// import { ValidationProvider, extend } from 'vee-validate/dist/vee-validate.full'

import {
  ValidationProvider,
  extend,
  ValidationObserver
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zhCN from 'vee-validate/dist/locale/zh_CN'

import {
  Button,
  Cell,
  CellGroup,
  NavBar,
  Field,
  Toast,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  List,
  PullRefresh,
  Grid,
  GridItem,
  Image
} from 'vant'
Vue
  .use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Field)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(Grid)
  .use(GridItem)
  .use(Image)

for (let rule in rules) {
  extend(rule, {
    ...rules[rule],
    message: zhCN.messages[rule]
  })
}

extend('phone', {
  validate (value) {
    return /^1\d{10}$/.test(value)
  },
  message: '手机号码格式不正确'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
