

import Vue from "vue";
import Vuex from "vuex";
import { db } from './main'
import 'firebase/firestore'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userID: null,
    status: null,
    error: null,
    taskCategoryData: [],
    addTaskModalVisible: false,
    totalPoints: 0,
    categories: [],
    todos: [],
    newTodo: "",
    loggedIn: false,
    // chartColors: [],
    cats: []
  },
  mutations: {
    SET_USER(state, payload){
      state.user = payload
    },
    SET_USER_ID(state, payload){
      state.userID = payload
    },
    SET_STATUS(state, payload){
      state.status = payload
    },
    SET_ERROR(state, payload){
      state.error = payload
    },
    GET_TODO(state, todo) {
      state.newTodo = todo;
    },
    SET_TODO_LIST(state){
      state.todos.filter(todo => {
        return todo
      })
    },
    ADD_TODO(state) {
      state.addTaskModalVisible = true;
    },
    EDIT_TODO_STATUS(state, payload){
      // console.log(payload)
      for( var i = 0; i < state.todos.length; i++){ 
        if ( state.todos[i] === payload) {
          let task = db.collection('users').doc(state.userID).collection('tasks').doc(payload.taskId)
          return task.update({
            completed: payload.completed
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        
        }
     }
    },  
    CONFIRM_TODO(state) {
      let task = db.collection('users').doc(state.userID).collection('tasks').doc()
      task.set({...state.newTodo, completed: false, taskId: task.id  })
      state.todos.push({
        ...state.newTodo,
        completed: false,
        taskId: task.id
      });
    },
    DELETE_TODO(state, payload) {

      for( var i = 0; i < state.todos.length; i++){ 
        if ( state.todos[i] === payload) {
          state.todos.splice(i, 1); 
        }
     }
    },
    
    SAVE_CATEGORY_DATA(state, payload) {
      state.taskCategoryData = payload;

    },
    SAVE_TASK(state, payload){
      for( var i = 0; i < state.todos.length; i++){ 
        if ( state.todos[i] === payload) {
          let task = db.collection('users').doc(state.userID).collection('tasks').doc(payload.taskId)
          return task.update({
            ...payload
        })
        // .then(function() {
        //     console.log("Document successfully updated!");
        // })
        // .catch(function(error) {
        //     // The document probably doesn't exist.
        //     console.error("Error updating document: ", error);
        // });
        
        }
     }
    },
    ADD_CATEGORY(state, payload) {
      db.collection('users').doc(state.userID).collection('categories').add({
        ...payload
      })
    // .then(function(docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     // The document probably doesn't exist.
    //     console.error("Error updating document: ", error);
    // });
    },
    DELETE_CATEGORY(state, payload) {
      // db.collection('users').doc(state.userID).collection('categories').doc()
      console.log(payload)
    // .then(function(docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     // The document probably doesn't exist.
    //     console.error("Error updating document: ", error);
    // });
    },
    GET_USER_TODOS(state, payload) {
      state.todos = payload;
    },
    GET_USER_CATEGORIES(state, payload) {
      state.cats = payload;
    },
    // SAVE_GENERATED_COLORS(state, payload){
    //   state.chartColors = payload;
    // },
    CLEAR_TODO(state) {
      state.newTodo = {};
      state.addTaskModalVisible = false;
    },
    SET_AUTH(state, payload){
      state.loggedIn = payload;
    }
  },
  actions: {
    setAuth({ commit }, payload) {
      commit("SET_AUTH", payload);
    },
    getTodo({ commit }, todo) {
      commit("GET_TODO", todo);
    },
    addTodo({ commit }) {
      commit("ADD_TODO");
    },
    confirmTodo({ commit }) {
      commit("CONFIRM_TODO");
    },
    saveCategoryData({ commit }, payload) {
      commit("SAVE_CATEGORY_DATA", payload);
    },
    saveTask({ commit }, payload) {
      commit("SAVE_TASK", payload);
    },
    getTodoList({ commit }, payload) {
      commit("GET_USER_TODOS", payload);
    },
    getCategories({ commit }, payload) {
      commit("GET_USER_CATEGORIES", payload);
    },
    editStatus({commit}, payload){
      commit("EDIT_TODO_STATUS", payload);

    },
    // saveColors({commit}, payload){
    //     commit("SAVE_GENERATED_COLORS", payload);
    // },
    addNewCategory({ commit }, payload) {
      commit("ADD_CATEGORY", payload);
    },
    deleteCategory({ commit }, payload) {
      commit("DELETE_CATEGORY", payload);
    },
    setUser({ commit }, payload) {
      commit("SET_USER", payload);
    },
    setUserId({ commit }, payload) {
      commit("SET_USER_ID", payload);
    },
    deleteTodo({ commit, state }, payload) {
      db.collection('users').doc(state.userID).collection('tasks').doc(payload.taskId).delete().then(() =>{
        commit("DELETE_TODO", payload);
      })
    },
    clearTodo({ commit }) {
      commit("CLEAR_TODO");
    }
  },
  getters: {
    user: state => state.user,
    status: state => state.status,
    error: state => state.error,
    cats: state => state.cats,
    newTodo: state => state.newTodo,
    addTaskModalVisible: state => state.addTaskModalVisible,
    todos: state =>
      state.todos.filter(todo => {
        return todo;
      }),
      // cats: state =>
      // state.cats.filter(cat => {
      //   return cat;
      // }),
    completedTodos: state => state.todos.filter(todo => todo.completed == true),
    taskCategoryData: state => state.taskCategoryData,
    categories: (state) => {
      let categoryList = []
      // console.log("state cat" + state.categories)

      state.todos.forEach(todo => {
        if(!state.categories.includes(todo.category)){
          categoryList.push(todo.category)
        }
        // console.log(todo, categoryList)
      });
      return categoryList.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
    })
    
    }
  }
});
