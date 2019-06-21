import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskCategoryData: [],
    addTaskModalVisible: false,
    totalPoints: 0,
    todos: [
      {
        task: "Finish Todo Vue App",
        points: 20,
        category: "Work",
        completed: true,
        pickedTime: "Dailies"
      },
      {
        task: "Finish Todo Vue App 2",
        points: 20,
        category: "Family",
        completed: false,
        pickedTime: "Dailies"

      },
      {
        task: "FitnessTest",
        points: 20,
        category: "Fitness",
        completed: true,
        pickedTime: "Dailies"

      },
      {
        task: "FitnessTest2",
        points: 20,
        category: "Fitness",
        completed: false,
        pickedTime: "Today"

      },
      {
        task: "FitnessTest3",
        points: 20,
        category: "Fitness",
        completed: false,
        pickedTime: "Weeklies"

      },
      {
        task: "Finish Todo Vue App 22",
        points: 20,
        category: "Family",
        completed: false,
        pickedTime: "This Week"

      },
      {
        task: "Finish Todo Vue App 2",
        points: 20,
        category: "Finance",
        completed: true,
        pickedTime: "Dailies"

      },
      {
        task: "Finish Todo Vue App 2",
        points: 20,
        category: "Home",
        completed: false,
        pickedTime: "This Week"

      },
      {
        task: "Finish Todo Vue App 2",
        points: 20,
        category: "Work",
        completed: false,
        pickedTime: "Weeklies"

      }
    ],
    newTodo: ""
  },
  mutations: {
    GET_TODO(state, todo) {
      state.newTodo = todo;
    },
    ADD_TODO(state) {
      state.addTaskModalVisible = true;
    },
    CONFIRM_TODO(state) {
      state.todos.push({
        ...state.newTodo,
        completed: false
      });
      console.log(state.todos);
    },
    SAVE_CATEGORY_DATA(state, catData) {
      state.taskCategoryData = catData;
      console.log("VUEX" + state.taskCategoryData);
    },
    // EDIT_TODO(state, todo) {
    //   var todos = state.todos;
    //   todos.splice(todos.indexOf(todo), 1);
    //   state.todos = todos;
    //   state.newTodo = todo.body;
    // },
    // REMOVE_TODO(state, todo) {
    //   var todos = state.todos;
    //   todos.splice(todos.indexOf(todo), 1);
    // },
    // COMPLETE_TODO(state, todo) {
    //   todo.completed = !todo.completed;
    // },
    CLEAR_TODO(state) {
      state.newTodo = {};
      state.addTaskModalVisible = false;
    }
  },
  actions: {
    getTodo({ commit }, todo) {
      commit("GET_TODO", todo);
    },
    addTodo({ commit }) {
      commit("ADD_TODO");
    },
    confirmTodo({ commit }) {
      commit("CONFIRM_TODO");
    },
    saveCategoryData({ commit }, catData) {
      commit("SAVE_CATEGORY_DATA", catData);
    },
    // editTodo({ commit }, todo) {
    //   commit("EDIT_TODO", todo);
    // },
    // removeTodo({ commit }, todo) {
    //   commit("REMOVE_TODO", todo);
    // },
    // completeTodo({ commit }, todo) {
    //   commit("COMPLETE_TODO", todo);
    // },
    clearTodo({ commit }) {
      commit("CLEAR_TODO");
    }
  },
  getters: {
    newTodo: state => state.newTodo,
    addTaskModalVisible: state => state.addTaskModalVisible,
    todos: state =>
      state.todos.filter(todo => {
        return todo;
      }),
    completedTodos: state => state.todos.filter(todo => todo.completed == true),
    taskCategoryData: state => state.taskCategoryData
  }
});
