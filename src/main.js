import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import dateFilter from './filter/date.filter'
import currencyFilter from './filter/currency.filter'
import localizeFilter from './filter/localize.filter'
import tooltipDirective from './directives/tooltip.directive'
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import Loader from './components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyAcn_VxV7Py9jiXH-poakhjAGbyOruYiwg',
  authDomain: 'vue-crm-d2051.firebaseapp.com',
  databaseURL: 'https://vue-crm-d2051.firebaseio.com',
  projectId: 'vue-crm-d2051',
  storageBucket: 'vue-crm-d2051.appspot.com',
  messagingSenderId: '610225803834',
  appId: '1:610225803834:web:e0d06bfd24963ddc835b03'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
