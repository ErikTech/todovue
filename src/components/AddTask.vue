<template>
    <div id="addTaskModal" v-if="addTaskModalVisible">
        <div>
            <md-field v-bind:class="{'md-invalid': newTaskError}">
                <label>Task</label>
                <md-input v-model="newTask" placeholder="My New Task"></md-input>
                <span class="md-error">Enter a name for your task</span>
    
            </md-field>
            <!-- <input type="text"   /> -->
        </div>
        <div>
            <md-field v-bind:class="{'md-invalid': newTaskPointsError}">
                <label>Points</label>
                <md-input v-model="newTaskPoints" placeholder="3" type="number"></md-input>
                <span class="md-error">There is an error</span>
    
            </md-field>
            <!-- <input type="number" v-model="newTaskPoints" placeholder="3"/> Points -->
        </div>
        <md-field v-show="!enteringCustomInput" v-bind:class="{'md-invalid': chooseCategoryError}">
            <md-select v-model="chooseTaskCategory">
                <md-option v-for="(category, index) in categories" :value="category" :key="index">{{category}}</md-option>
                <!-- <md-option value="Home">Home</md-option>
                          <md-option value="Fitness">Fitness</md-option>
                          <md-option value="Finance">Finance</md-option>
                          <md-option value="Family">Family</md-option>
                          <md-option value="Code">Code</md-option> -->
            </md-select>
            <span class="md-error">Please select an existing category or enter a new one</span>
    
        </md-field>
    
        <md-field v-show="enteringCustomInput" v-bind:class="{'md-invalid': chooseCategoryError}">
            <label>Add Custom Category</label>
            <md-input v-model="newCategory" placeholder="Code"></md-input>
         
            <span class="md-error">Please select an existing category or enter a new one</span>
    
        </md-field>
           <color-picker v-show="enteringCustomInput" :change="updateColor"></color-picker>
           {{chosenColor}}

           <!-- <div v-show="enteringCustomInput" class="colorChoose">
                <div v-for="(color, index) in colorsArray" class="colorBlock" :class="{ 'active': activeIndex === index }" :key="color" :style="{ background: color }" @click="setActiveColor(color, index)"></div>
                {{chosenColor}}
            </div> -->
        <span v-show="!enteringCustomInput" class="sublink" @click="customCatInput">Add New</span>
        <span v-show="enteringCustomInput" class="sublink" @click="customCatInput">Choose existing category</span>
    
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
import ColorPicker from './vendor/vue-color-picker'


export default {

    components: {
        ColorPicker
    },
    data() {
        return {
            newTask: '',
            newTaskError: false,
            newTaskPoints: 2,
            newTaskPointsError: false,
            chooseTaskCategory: 'Work',
            chooseCategoryError: false,
            pickedTime: 'Today',
            newCategory: '',
            dropdownDisabled: false,
            enteringCustomInput: false,
            chosenColor: undefined,
         
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
     updateColor(event) {
      this.chosenColor = event.color;
      console.log(this.chosenColor);
    },
    //   setActiveColor(color, index){
    //     this.activeIndex = index;
    //     this.chosenColor = color;

    //   },
        clearTask() {
            this.newTask = '';
            this.newTaskError = false;
            this.newTaskPoints = 2;
            this.newTaskPointsError = false;
            this.chooseTaskCategory = 'Work';
            this.chooseCategoryError = false;
            this.newCategory = '';
            this.todayTask = false;
            this.thisWeekTask = false;
            this.dailyTask = false;
            this.weeklyTask = false;
            this.dropdownDisabled = false;
        },
        customCatInput() {
            this.enteringCustomInput = !this.enteringCustomInput

        },
        validateAll() {
            if (this.newTask == '') {
                this.newTaskError = true
            } else {
                this.newTaskError = false

            }
            if (this.newTaskPoints <= 0) {
                this.newTaskPointsError = true
            } else {
                this.newTaskPointsError = false

            }
            if (this.enteringCustomInput) {
                if (this.newCategory == '' || this.chosenColor == undefined) {
                    this.chooseCategoryError = true
                } else {
                    this.chooseCategoryError = false
                }
            } else {
                if (this.chooseTaskCategory == null || this.chooseTaskCategory == '') {
                    this.chooseCategoryError = true
                } else {
                    this.chooseCategoryError = false
                }
            }
            if (this.newTaskError == true || this.newTaskPointsError == true || this.chooseCategoryError == true) {
                return false
            } else {
                return true
            }

        },
        confirmTask() {
            if (this.validateAll()) {
                let newTaskObj = {
                    // status: "not started",
                    task: this.newTask,
                    points: this.newTaskPoints,
                    category: !this.enteringCustomInput ? this.chooseTaskCategory : this.newCategory,
                    pickedTime: this.pickedTime
                }
                if(this.enteringCustomInput){
                  let catObj = {
                    category: this.newCategory,
                    color: this.chosenColor
                  }
                  this.$store.dispatch('addNewCategory', catObj);

                }
                this.$store.dispatch('getTodo', newTaskObj);
                this.$store.dispatch('confirmTodo');
                this.$store.dispatch('clearTodo');

                this.clearTask()
            }

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
.colorChoose
  display: block
  width: 100%
  .colorBlock
    height: 20px
    width: 20px
    margin: 2px
    display: inline-block
    position: relative
    cursor: pointer
    &.active
      border: 1px solid #fff

.sublink
  text-decoration: underline
  cursor: pointer

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
