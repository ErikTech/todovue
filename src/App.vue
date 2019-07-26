<template>
    <div class="pageContainer">
        <!-- <md-app > -->
        <div id="app">
            <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
            <md-tabs id="nav" md-sync-route md-alignment="fixed" class="md-primary">
                <md-tab md-label="Home" to="/home"></md-tab>
                <!-- <md-tab md-label="Left To Do" to="/about"></md-tab> -->
                <!-- <md-tab md-label="Settings" to="/settings"></md-tab> -->
                <!-- <md-tab v-if="!loggedIn" md-label="Login" to="/login"></md-tab> -->
                <md-tab v-if="loggedIn" md-label="Logout" to="/login"  @click.prevent.stop="logout"></md-tab>
                <md-tab md-label="Sign Up" to="/sign-up"></md-tab>
    
            </md-tabs>
            <router-view />
            <md-app>
            </md-app>
        </div>
        <!-- </md-app> -->
    </div>
</template>

<script>
import Vue from 'vue'
import { db } from './main'
import { mapState } from 'vuex'
import firebase from 'firebase/app'

// import { MdApp } from 'vue-material/dist/components/MdApp/index.js'

// Vue.use(MdApp)


export default {
    name: 'App',
    components: {
        // MdApp
    },
      computed: {
      ...mapState([
     'loggedIn'
      // ...
    ]),
      },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$store.dispatch('setAuth', false);
                this.$router.replace('login')
            })
        },
    }
    // data() {
    //   return {
    //     email: '',
    //     password: ''
    //   }
    // },
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50



</style>
  