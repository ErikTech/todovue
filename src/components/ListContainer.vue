<template>
  <div id="ListContainer">
    <md-button @click="addTask" class="md-primary md-raised">Create new Task</md-button>
    <md-toolbar class="md-transparent" md-elevation="1">
      <span class="md-title">{{arrayList[0].category}} Tasks</span>
    </md-toolbar>
    <md-list class="md-double-line">
      <md-list-item v-for="(todo, index) in arrayList" class="list-item-component" :key="index" @click="test">
        <div class="md-list-item-text">
          <h3>{{todo.task}}</h3>
          <div>{{todo.status}}</div>
          <div>{{todo.points }} Points <span>category: {{todo.category}}</span></div>
        </div>
      </md-list-item>
      

    </md-list>
    <add-task-modal />
  </div>
</template>

<script lang="js">
import addTaskModal from './AddTask.vue'

export default {
  props: [
    'arrayList',
    'category'
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
    test(){
      console.log("test");
    }
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
h3
  margin 20px 0 0
// .list-item-component
//   &:hover
//     background: red;
</style>
