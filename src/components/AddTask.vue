<template>
    <div id="addTaskModal" v-if="addTaskModalVisible">
      <div><input type="text" v-model="newTask" placeholder="My New Task" /></div>
      <div><input type="number" v-model="newTaskPoints" placeholder="3"/> Points </div>
      <select v-model="newTaskCategory">
        <option value="Work" selected>Work</option>
        <option value="Home">Home</option>
        <option value="Fitness">Fitness</option>
        <option value="Finance">Finance</option>
        <option value="Family">Family</option>
        <option value="Code">Code</option>
      </select>
      <div><input type="radio" v-model="pickedTime" value="Today"/> Today</div>
      <div><input type="radio" v-model="pickedTime" value="This Week" /> This Week (sun-sat)</div>
      <div><input type="radio" v-model="pickedTime" value="Dailies"/> Daily</div>
      <div><input type="radio" v-model="pickedTime" value="Weeklies"/> Weekly</div>



      <button @click="confirmTask">Add +</button>
      <button @click="cancel">Cancel</button>
      </div>
</template>

<script lang="js">

export default {
  data(){
    return{
      newTask: '',
      newTaskPoints: 2,
      newTaskCategory: 'Work',
      pickedTime: 'today'
    }
  },
  computed: {
      newTodo(){
          return this.$store.getters.newTodo
      },
      addTaskModalVisible(){
          return this.$store.getters.addTaskModalVisible
      }
  },
  methods: {
    clearTask(){
      this.newTask = '';
      this.newTaskPoints = 2;
      this.newTaskCategory = 'Work';
      this.todayTask = false;
      this.thisWeekTask = false;
      this.dailyTask = false;
      this.weeklyTask = false;
    },
    confirmTask(){
      let newTaskObj = {
        status: "not started",
        task: this.newTask,
        points: this.newTaskPoints,
        category: this.newTaskCategory,
        pickedTime: this.pickedTime
      }
      this.$store.dispatch('getTodo', newTaskObj);
      this.$store.dispatch('confirmTodo');
      this.$store.dispatch('clearTodo');
      
      this.clearTask()
    },
    cancel(){
      this.$store.dispatch('clearTodo');
      this.clearTask();
    }, 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

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
