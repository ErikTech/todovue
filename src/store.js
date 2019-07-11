

import Vue from "vue";
import Vuex from "vuex";
// import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from './main'
// import firebase from 'firebase/app'
import 'firebase/firestore'
// import createPersistedState from 'vuex-persistedstate'

// import * as Cookies from 'js-cookie'



Vue.use(Vuex);

// var db = firebase.initializeApp({
//   databaseURL: 'https://vuefiredemo.firebaseio.com'
// }).database()



export default new Vuex.Store({
  // plugins: [
  //   createPersistedState({
  //     getState: (key) => Cookies.getJSON(key),
  //     setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
  //   })
  // ],
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
    newTodo: ""
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
    CONFIRM_TODO(state) {
      let task = db.collection('users').doc(state.userID).collection('tasks').doc()

      // db.collection('users').doc(state.userID).collection('tasks').doc()
      // .add({...state.newTodo})
      task.set({...state.newTodo, completed: false, taskId: task.id  })

      
      state.todos.push({
        ...state.newTodo,
        completed: false,
        taskId: task.id
      });

      // firestoreAction(({ state }) => {

      //     .then(() => {
      //       console.log('user updated!')
      //     }).catch(function(error) {
      //       console.error("Error adding document: ", error);
      //   });
      // })

    },
    DELETE_TODO(state, payload) {
      // console.log(payload)
      // state.todos.filter(todo => {
      //   return todo.taskId !== payload.taskId;
      // })
      for( var i = 0; i < state.todos.length; i++){ 
        if ( state.todos[i] === payload) {
          state.todos.splice(i, 1); 
        }
     }
      // state.todos.splice(payload, 1)
      // Vue.set(state.todos, payload)
      // console.log(state.todos)
    },
    
    SAVE_CATEGORY_DATA(state, payload) {
      state.taskCategoryData = payload;

    },
    GET_USER_TODOS(state, payload) {
      state.todos = payload;
      // console.log(state.todos);
      // console.log("VUEX" + state.taskCategoryData);
    },

    // ...vuexfireMutations,
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
    // bindTodos: firestoreAction((state, { bindFirestoreRef }) => {
    //   // return the promise returned by `bindFirestoreRef`
    //   return bindFirestoreRef('todos', db.collection('users').doc(state.userID).collection('tasks'))
    // }),
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
    getTodoList({ commit }, payload) {
      commit("GET_USER_TODOS", payload);
    },
    // fetchTodoItems({commit, state}){
    //   const todoItems = []
    //   .collection('users').doc(state.userID).collection('tasks').onSnapshot(snapshot => {
    //       snapshot.forEach(doc => {
    //         let item = doc.data()
    //         item.id = doc.id;
    //         todoItems.push(item)
    //       })
    //       commit('SET_TODO_LIST', todoItems)
    //     })
    //     .catch(err => console.log(err))
    // },
    setUser({ commit }, payload) {
      commit("SET_USER", payload);
    },
    setUserId({ commit }, payload) {
      commit("SET_USER_ID", payload);
    },
    // editTodo({ commit }, todo) {
    //   commit("EDIT_TODO", todo);
    // },
    deleteTodo({ commit, state }, payload) {
      db.collection('users').doc(state.userID).collection('tasks').doc(payload.taskId).delete().then(() =>{
        commit("DELETE_TODO", payload);
      })
    },
    // completeTodo({ commit }, todo) {
    //   commit("COMPLETE_TODO", todo);
    // },
    clearTodo({ commit }) {
      commit("CLEAR_TODO");
    }
  },
  getters: {
    user: state => state.user,
    status: state => state.status,
    error: state => state.error,



    newTodo: state => state.newTodo,
    addTaskModalVisible: state => state.addTaskModalVisible,
    todos: state =>
      state.todos.filter(todo => {
        return todo;
      }),
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
