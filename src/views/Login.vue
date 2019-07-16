<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <md-button class="md-primary md-raised" @click="login">Connect</md-button>
    <!-- <md-button class="md-primary md-raised" @click="iterate">ITERATOR TEST</md-button> -->

    <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        data: []
      }
    },
    // firebase: {
    //   todos: tasks
    // },
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            const userUid = user.user.uid; // The UID of the user.
            // console.log(firebase.auth().currentUser)
          // console.log(userUid)
              firebase.firestore().collection('users').doc(userUid).collection('tasks').get().then(collections => {
          collections.forEach(collection => {
                // console.log(collection.data());
                this.data.push(collection.data())  
                this.$store.dispatch('getTodoList', this.data);
                this.$store.dispatch('setUserId', userUid)
                this.$store.dispatch('setAuth', true);


            })
        }).catch(console.log);
            // console.log(this.get('tasks'))


            this.$store.dispatch('setUser', this.email);
            this.$router.replace('home');
            // this.$store.dispatch('setUser', this.email);


          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      },
      iterate: function() {
        console.log("run iterator")
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 40px;
    color: #fff
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>