<template>
    <div id="ListContainer">
        <md-button @click="addTask" class="md-primary md-raised">Create new Task</md-button>
        <h2 v-if="category">{{category}} Tasks</h2>
        <div class="toggle-completed-checkbox">
            <md-checkbox v-model="showCompleted">Show Completed</md-checkbox>
        </div>
        <!-- {{arrayList}} -->
        <md-list class="md-double-line">
            <md-list-item v-for="(todo, index) in todoList" class="list-item-component" :class="{'completed': todo.completed}" :key="index" v-show="((todo.completed || !todo.completed) && showCompleted) || (!showCompleted && (!todo.completed)) ">
                <div class="md-list-item-text">
                    <div><md-checkbox v-model="todo.completed" v-on:change="editStatus(todo)"></md-checkbox></div>
                    <h3>{{todo.task}}</h3>
                    <div v-if="todo.completed">Completed!</div>
                    <div v-else>Incomplete</div>
                    <!-- {{todo.taskId}} -->
    
                    <div>
                        {{todo.points }} Points -
                        <span>category: {{todo.category}}</span>
                    </div>
                    <div class="editbtn" @click="editTask(todo)">edit</div>
                    <!-- <div class="editTask" @click="editTask">edit</div> -->
                </div>
            </md-list-item>
            <div v-if="showModal" md-elevation="1">
                <modalComponent>
                    <!-- <div class="modal-header">
                                                    <h4 class="modal-title">{{edittingTodo.task}}</h4>
                                                    <button type="button" @click="closeEditTask" class="md-button md-simple md-just-icon md-round modal-default-button md-theme-default">
                                                              <div class="md-ripple">
                                                                <div class="md-button-content">
                                                                  <i class="md-icon md-icon-font md-theme-default">clear</i>
                                                                </div>
                                                              </div>
                                                            </button>
                                                </div> -->
                    <div class="modal-body text-center">
                        <edit-task-modal :todo="edittingTodo" v-on:delete="deleteTask(edittingTodo)" v-on:close="closeEditTask" v-on:refresh="refresh"></edit-task-modal>
                    </div>
                    <!-- <div class="modal-footer">
                                                    <button type="button" class="danger" @click="deleteTask(edittingTodo)">DELETE TASK</button>
                                                    <button type="button" class="md-button md-danger md-simple md-theme-default" @click="closeEditTask">
                                                              <div class="md-ripple">
                                                                <div class="md-button-content">Save</div>
                                                              </div>
                                                            </button>
                                                </div> -->
                </modalComponent>
            </div>
        </md-list>
        <!-- <md-drawer :md-active.sync="showNavigation" md-swipeable> -->
        <add-task-modal></add-task-modal>
        <!-- </md-drawer> -->
    </div>
</template>

<script lang="js">
import addTaskModal from './AddTask.vue'
import editTaskModal from './EditTask.vue'

import modalComponent from './general/modal-component.vue'
import { mapGetters, mapState } from 'vuex'



export default {
    data() {
        return {
            showNavigation: true,
            showCompleted: false,
            showModal: false,
            edittingTodo: {}

        }
    },
    computed: {
        ...mapGetters([
            'todos',
            // 'completedTodos',
            // 'taskCategoryData',
            // 'categories'
            // ...
        ]),
        todoList() {
            return this.getList(this.category, this.timeChosen)
        },

    },
    props: {
        // arrayList: {
        //     default: [{ "category": "All" }]
        // },
        category: {
            default: 'All'
        },
        timeChosen: {
            default: 'All'
        },
    },
    components: {
        addTaskModal,
        modalComponent,
        editTaskModal
    },
    mounted() {
        // console.log(this.$store.getters.todos)

    },
    // computed: {
    //       ...mapState([
    //   'todos',
    //   'completedTodos',
    //   'taskCategoryData',
    //   'categories'
    //   // ...
    // ]),
    // },

    // data(){
    //   return{
    //     addTaskModalVisible: false,
    //   }
    // },
    methods: {
        deleteTask(task) {
            this.$store.dispatch('deleteTodo', task);
            this.getList(this.category, this.timeChosen)
            this.showModal = false
            this.refresh()
        },
        addTask() {
            this.$store.dispatch('addTodo');
            this.showNavigation = false
            this.refresh()

        },
        refresh() {
            this.$emit('refresh')
        },
        editTask(todo) {
            this.showModal = true
            this.edittingTodo = todo
            // console.log("list item clicked");
        },
        editStatus(todo) {
            this.$store.dispatch('editStatus', todo);
            this.refresh()

        },
        closeEditTask() {
            this.showModal = false
        },
        getList(categoryToShow, timeList) {
            // console.log(this.timeChosen)
            if (categoryToShow == "All") {
                if (timeList == 'All') {
                    return this.todos
                } else {
                    return this.todos.filter(task => task.pickedTime == timeList)

                }
            } else {
                if (timeList == 'All') {
                    return this.todos.filter(task => task.category == categoryToShow)
                } else {
                    return this.todos.filter(task => task.category == categoryToShow).filter(task => task.pickedTime == timeList)

                }
            }

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
<style lang="stylus">
button
  padding: 10px 15px
  position: relative
  color: #fff
  cursor: pointer
  &.danger 
    background: #d11a2a
  
h2
  color: #fff
  text-transform: uppercase

.md-checkbox
  &.md-checked
    .md-ripple
      color: #42b883!important
    .md-checkbox-container
      background-color: #42b883!important
      background-color: var(#fff, #42b883)!important
      border-color: #fff!important
      border-color: var(#282828, #42b883)!important
      &:after
        border-color: #fff!important



.toggle-completed-checkbox
  color: #fff
// .list-item-component
// &:hover
// background: red;
#ListContainer {
  .editbtn{
    text-decoration: underline;
    cursor: pointer;
    &:hover{
      color: red
    }
  }
  .md-list-item-text {
    position: relative;
    width: 100%;

    .removeTask {
      position: absolute;
      cursor: pointer;
      top: 0;
      right: 0;
      width: 15px;
      height: 15px;

      &:hover {
        color: red;
      }
    }
  }

  .list-item-component {
    &.completed {
      border: 1px solid #42b883;
    }

    .md-list-item-content {
      padding: 10px;
    }
  }

  h3 {
    margin: 0px 0 0;
  }
}
</style>
