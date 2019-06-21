<template>
  <div id="ListContainer">
    <button @click="addTask">Create new Task</button>

    <ul class="list-compontent">
      <li v-for="(todo, index) in arrayList" class="list-item-component" :key="index" >
        <h3>{{todo.task}}</h3>
        <div>{{todo.status}}</div>
        <div>{{todo.points }} Points <span>category: {{todo.category}}</span></div>
      </li>

    </ul>
    <add-task-modal />
  </div>
</template>

<script lang="js">
import addTaskModal from './AddTask.vue'

export default {
  props: [
    'arrayList'
  ],
  components:{
    addTaskModal
  },
  mounted(){
    // console.log(this.$store.getters.todos)
  },

  // data(){
  //   return{
  //     addTaskModalVisible: false,
  //   }
  // },
  methods: {

    addTask(){
      this.$store.dispatch('addTodo');
    },
    // confirmTask(){
    //   // this.test.push(newTaskObj);
    //   this.closeModal()
    // },
    // closeModal(){
    //   this.addTaskModalVisible = false;
    // },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

button
  padding: 8px 15px
  margin: 15px
  text-transform: uppercase
  font-size: 15px

#addTaskModal
  position: fixed;
  top: 0;
  left: 0
  padding: 40px
  background: #fefefe
  width: 100%;
  height: 100%;
  box-sizing: border-box
  text-align: left;
h3
  margin 40px 0 0

ul
  list-style-type none
  border: 1px solid black
  padding 0
  margin: 0 auto 
  width: 100%

li
  display inline-block
  margin 0 10px
  text-align: left
  display: block

a
  color #42b983

#ListContainer
  max-width: 500px
  margin: 0 auto
</style>
