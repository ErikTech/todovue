<template>
  <div class="md-layout">
  <div class="md-layout-item md-size-30 right-sidebar">
        <ListContainer :arrayList="getList(listCategories, timeChosen)" :category="taskCategoryData"/>

  </div>
  <div class="md-layout-item md-size-70 main-content">
  <md-button class="md-primary md-raised" @click="logout">Logout</md-button>
  <article v-for="(location, idx) in locations" :key="idx">
    <!-- <img :src="location.image"> -->
    <h1 class="md-display-1">Welcome {{location.email}}</h1>
    <!-- <span class="md-headline">{{location}}</span> -->
  </article>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <!-- <div v-for="(category, index) in taskCategoryData" :key="index" >{{category.category}} : {{category.completedPercentage}}%</div> -->
    <DataContainer v-on:showCategoryTasks="showTaskList" :categoryData="taskCategoryData"/>
    <TimeTabs v-on:showSelectedTime="showTimeList" />
     <md-drawer :md-active.sync="showNavigation" md-swipeable>


    <!-- <ListContainer :arrayList="getList(listCategories, timeChosen)" :category="taskCategoryData"/> -->
TEST
    </md-drawer>


  </div>
</div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase';
import ListContainer from '@/components/ListContainer.vue';
import TimeTabs from '@/components/TimeTabs.vue';
import DataContainer from '@/components/DataContainer.vue';
import { db } from '../main'

// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    ListContainer,
    TimeTabs,
    DataContainer,
  },
    computed: {
      todos(){
        return this.$store.getters.todos
      },
      completedTodos(){
        return this.$store.getters.completedTodos
      },
      taskCategoryData(){
        return this.$store.getters.taskCategoryData

      }
  }, 
  mounted(){
    // console.log(db.collection('users').orderBy('name'))
    this.getAllData()
    this.$store.watch(
      (state, getters) => getters.todos,
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          this.getAllData()
        }
      },
    );
   
  },
  data(){
    return {
      locations: [],
      listCategories: "All",
      showNavigation: false,
      // taskCategoryData: [],
      timeChosen: 'today',
      categories: [
        'All',
        'Work',
        'Home',
        'Fitness',
        'Family',
        'Finance'
      ],
      totalPercentage: 0,

       
    }
  },
   firestore () {
    return {
      locations: db.collection('users')
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    getAllData(){
       let allCategoryData = [];
    this.categories.forEach(element => {
        allCategoryData.push(this.getCategoryPercentage(element))
        // console.log(element)
      });
      this.$store.dispatch('saveCategoryData', allCategoryData);
      // console.log(allCategoryData)
    },
    showTaskList(category){
      this.listCategories = category;
      this.showNavigation = true;
      // console.log(category)
    },
    showTimeList(timeChosen){
      this.timeChosen = timeChosen;
      // console.log(category)
    },
    getCategoryPercentage(category){
      let taskArray;
      let completedTaskArray;

      if(category=="All"){
        taskArray = this.todos;
        completedTaskArray =  this.completedTodos;

      }
      else{
        taskArray = this.todos.filter(task => task.category == category)
        completedTaskArray =  this.completedTodos.filter(task => task.category == category)
      }
      let totalPoints = 0;
      let completedPoints = 0;

      taskArray.forEach(element => {
        // console.log(element.points);
        totalPoints = totalPoints + element.points;
      });
      
      completedTaskArray.forEach(element => {
        completedPoints = completedPoints + element.points;
      });
      // console.log(totalPoints, completedTaskArray)
      let completedPercentage = (completedPoints/totalPoints).toFixed(2)*100;
      let categoryObject = {
        'category': category,
        'totalPoints': totalPoints,
        'completedPoints': completedPoints,
        'completedPercentage' : completedPercentage

      }
      // console.log(categoryObject)
      return categoryObject
    },
    getList(categoryToShow, timeList){
      // console.log(this.timeChosen)
      if(categoryToShow=="All"){
        if(timeList=='All'){
          return this.todos
        }
        else{
          return this.todos.filter(task => task.pickedTime == timeList)

        }
      }
      else{
        if(timeList=='All'){
          return this.todos.filter(task => task.category == categoryToShow)
        }
        else{
          return this.todos.filter(task => task.category == categoryToShow).filter(task => task.pickedTime == timeList)

        }
      }
      
    }
  }
};
</script>
<style lang="stylus" scoped>
.right-sidebar
  max-width: 200px
.main-content
  max-width: 1070px
  margin: 0 auto
  // display: flex
</style>
