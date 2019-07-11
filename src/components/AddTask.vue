<template>
    <div id="addTaskModal" v-if="addTaskModalVisible">
        <div>
            <md-field>
                <label>Task</label>
                <md-input v-model="newTask" placeholder="My New Task"></md-input>
            </md-field>
            <!-- <input type="text"   /> -->
        </div>
        <div>
            <md-field>
                <label>Points</label>
                <md-input v-model="newTaskPoints" placeholder="3" type="number"></md-input>
            </md-field>
            <!-- <input type="number" v-model="newTaskPoints" placeholder="3"/> Points -->
        </div>
        <md-field>
            <md-select v-show="dropdownDisabled" v-model="newTaskCategory" @change="customCatInput" :disabled="dropdownDisabled">
                <md-option v-for="(category, index) in categories" :value="category" :key="index">{{category}}</md-option>
                <!-- <md-option value="Home">Home</md-option>
              <md-option value="Fitness">Fitness</md-option>
              <md-option value="Finance">Finance</md-option>
              <md-option value="Family">Family</md-option>
              <md-option value="Code">Code</md-option> -->
            </md-select>
        </md-field>
        <md-field>
            <label>Add Custom Category</label>
            <md-input v-model="newCategory" placeholder="Code"></md-input>
        </md-field>
        <div>
            <md-radio type="radio" v-model="pickedTime" value="Today"> Today</md-radio>
        </div>
        <div>
            <md-radio type="radio" v-model="pickedTime" value="This Week"> This Week (sun-sat)</md-radio>
        </div>
        <div>
            <md-radio type="radio" v-model="pickedTime" value="Dailies"> Daily</md-radio>
        </div>
        <div>
            <md-radio type="radio" v-model="pickedTime" value="Weeklies"> Weekly</md-radio>
        </div>
        <md-button class="md-primary md-raised" @click="confirmTask">Add +</md-button>
        <md-button class="md-accent md-raised" @click="cancel">Cancel</md-button>
    </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            newTask: '',
            newTaskPoints: 2,
            newTaskCategory: 'Work',
            pickedTime: 'today',
            newCategory: '',
            dropdownDisabled: false
        }
    },
    computed: {

        ...mapGetters([
            // 'todos',
            // 'newTodo',
            'addTaskModalVisible',
            'categories'
            // ...
        ]),
    },
    methods: {
        clearTask() {
            this.newTask = '';
            this.newTaskPoints = 2;
            this.newTaskCategory = 'Work';
            this.newCategory = '';
            this.todayTask = false;
            this.thisWeekTask = false;
            this.dailyTask = false;
            this.weeklyTask = false;
            this.dropdownDisabled = false;
        },
        customCatInput() {
            if (this.newCategory == '' || !this.newCategory || this.newCategory === null) {
                this.dropdownDisabled = false;
            } else {
                this.dropdownDisabled = true;
            }
        },
        confirmTask() {

            let newTaskObj = {
                // status: "not started",
                task: this.newTask,
                points: this.newTaskPoints,
                category: this.dropdownDisabled ? this.newTaskCategory : this.newCategory,
                pickedTime: this.pickedTime
            }
            this.$store.dispatch('getTodo', newTaskObj);
            this.$store.dispatch('confirmTodo');
            this.$store.dispatch('clearTodo');

            this.clearTask()
        },
        cancel() {
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
  color: #fff
  background: #333
  border-right: 1px solid #666
  // width: 100%;
  height: 100%;
  z-index: 10;
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
