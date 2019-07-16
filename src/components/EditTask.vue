<template>
    <div class="edit-task-container">
        <div>
            <md-field>
                <label>Task</label>
                <md-input v-model="todo.task" placeholder="My New Task"></md-input>
            </md-field>
            <!-- <input type="text"   /> -->
        </div>
        <div>
            <md-field>
                <label>Points</label>
                <md-input v-model="todo.points" placeholder="3" type="number"></md-input>
            </md-field>
            <!-- <input type="number" v-model="newTaskPoints" placeholder="3"/> Points -->
        </div>
        <md-field v-show="!enteringCustomInput">
            <md-select v-model="chooseTaskCategory">
                <md-option v-for="(category, index) in categories" :value="category" :key="index">{{category}}</md-option>
                <!-- <md-option value="Home">Home</md-option>
              <md-option value="Fitness">Fitness</md-option>
              <md-option value="Finance">Finance</md-option>
              <md-option value="Family">Family</md-option>
              <md-option value="Code">Code</md-option> -->
            </md-select>
        </md-field>

        <md-field v-show="enteringCustomInput">
            <label>Add Custom Category</label>
            <md-input v-model="newCategory" placeholder="Code"></md-input>
        </md-field>
        <span v-show="!enteringCustomInput" class="sublink" @click="customCatInput">Add New</span>
        <span v-show="enteringCustomInput" class="sublink" @click="customCatInput">Choose existing category</span>

        <div>
            <md-radio type="radio" v-model="todo.pickedTime" value="Today"> Today</md-radio>
        </div>
        <div>
            <md-radio type="radio" v-model="todo.pickedTime" value="This Week"> This Week (sun-sat)</md-radio>
        </div>
        <div>
            <md-radio type="radio" v-model="todo.pickedTime" value="Dailies"> Daily</md-radio>
        </div>
        <div>
            <md-radio type="radio" v-model="todo.pickedTime" value="Weeklies"> Weekly</md-radio>
        </div>
        
        <!-- <md-button class="md-primary md-raised" @click="confirmTask">Add +</md-button>
        <md-button class="md-accent md-raised" @click="cancel">Cancel</md-button> -->
        <div class="modal-footer">
                    <button type="button" class="danger" @click="deleteTask(todo)">DELETE TASK</button>
                    <button type="button" class="md-button md-danger md-simple md-theme-default" @click="saveTask(todo)">
                                <div class="md-ripple">
                                <div class="md-button-content">Save</div>
                                </div>
                            </button>
                                <button type="button" class="md-button md-danger md-simple md-theme-default" @click="closeEditTask">
                                <div class="md-ripple">
                                <div class="md-button-content">Close</div>
                                </div>
                            </button>
                </div>
    </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            newTask: '',
            newTaskPoints: 2,
            chooseTaskCategory: 'Work',
            pickedTime: 'today',
            newCategory: '',
            enteringCustomInput: false
        }
    },
    props: [
        'todo'
    ],
    computed: {

        ...mapGetters([
            // 'todos',
            // 'newTodo',
            'addTaskModalVisible',
            'categories'
            // ...
        ]),
    },
    mounted(){
        console.log(this.todo)
    },
    methods: {
        deleteTask(task) {
            this.$emit('delete', task);
           
        },
         closeEditTask() {
            this.$emit('close');
           
        },
        // clearTask() {
        //     this.newTask = '';
        //     this.newTaskPoints = 2;
        //     this.chooseTaskCategory = 'Work';
        //     this.newCategory = '';
        //     this.todayTask = false;
        //     this.thisWeekTask = false;
        //     this.dailyTask = false;
        //     this.weeklyTask = false;
        //     this.dropdownDisabled = false;
        // },
        customCatInput() {
            this.enteringCustomInput = !this.enteringCustomInput
          
        },
        saveTask(todo) {

            // let newTaskObj = {
            //     // status: "not started",
            //     task: this.newTask,
            //     points: this.newTaskPoints,
            //     category: this.dropdownDisabled ? this.chooseTaskCategory : this.newCategory,
            //     pickedTime: this.pickedTime
            // }
            // this.$store.dispatch('getTodo', newTaskObj);
            this.$store.dispatch('saveTask', todo);
            // this.closeEditTask()
            this.$emit('refresh');
            // this.$store.dispatch('clearTodo');

            // this.clearTask()
        },
        // cancel() {
        //     this.$store.dispatch('clearTodo');
        //     this.clearTask();
        // },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">


.edit-task-container
    text-align: left
.sublink
  text-decoration: underline
  cursor: pointer

</style>
