import Vue from "vue";
import {firestorePlugin} from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/theme/default-dark.css' // This line here



Vue.config.productionTip = false;

let app = '';
const config = {
  apiKey: "AIzaSyAydk7m3KPoHlSu2ppduYQxr0ddazMT_GU",
    authDomain: "to-do-vue-daf19.firebaseapp.com",
    databaseURL: "https://to-do-vue-daf19.firebaseio.com",
    projectId: "to-do-vue-daf19",
    storageBucket: "to-do-vue-daf19.appspot.com",
    messagingSenderId: "519618438830",
    appId: "1:519618438830:web:f78a1d92b6dfd04a"
};

Vue.use(firestorePlugin)
Vue.use(VueMaterial)

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      el: '#app',
      render: h => h(App)
    }).$mount('#app');
  }
});

export const db = firebase.firestore()
