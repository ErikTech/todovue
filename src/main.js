import Vue from "vue";
// import { firebaseMutations } from 'vuexfirestore'
import firebase from 'firebase/app'
import 'firebase/firestore'
// import VueRx from 'vue-rx'
// import { firebaseAction } from 'vuexfirestore'


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

// Vue.use(firebaseMutations)
Vue.use(VueMaterial)

// Vue.use(VueRx)

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    /* eslint-disable no-new */
    
    app = new Vue({
      router,
      store,
      el: '#app',
      created(){
        if(user){
          // console.log(user)
          const userUid = user.uid; // The UID of the user.
          // console.log(firebase.auth().currentUser)
        // console.log(userUid)
        const db =  firebase.firestore().collection('users').doc(userUid);
        db.collection('tasks').get().then(collections => {
                            let data = []

        collections.forEach(collection => {
              // console.log(collection.data());
              data.push(collection.data())  
              this.$store.dispatch('getTodoList', data);
              this.$store.dispatch('setUserId', userUid);
              this.$store.dispatch('setAuth', true);
          })
      }) 
       db.collection('categories').get().then(collections => {
        let cats = []
        
        collections.forEach(collection => {
        // console.log(collection.data());
          cats.push(collection.data())  
          this.$store.dispatch('getCategories', cats);
          })
        }) 
        }
        else{
          this.$router.replace('login');
          this.$store.dispatch('setAuth', false);
        }
      },
      render: h => h(App)
    }).$mount('#app');
  }
});

export const db = firebase.firestore()
