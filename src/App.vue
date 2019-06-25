<template>
<div class="pageContainer">
  <!-- <md-app > -->
    <div id="app">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <md-tabs id="nav" md-sync-route md-alignment="fixed" class="md-primary">
      <md-tab md-label="Home" to="/home"></md-tab> 
      <md-tab md-label="Left To Do" to="/about"></md-tab> 
      <md-tab md-label="Settings" to="/settings"></md-tab>
      <md-tab md-label="Login" to="/login"></md-tab> 
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
// import { MdApp } from 'vue-material/dist/components/MdApp/index.js'

// Vue.use(MdApp)


export default {
  name: 'App',
  components: {
    // MdApp
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
  