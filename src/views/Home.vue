<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-30 right-sidebar">
            <ListContainer :category="listCategories" :timeChosen="timeChosen" v-on:refresh="getAllData" />
    
        </div>
        <div class="md-layout-item md-size-70 main-content">
            <!-- <div class="cats">{{cats}}</div> -->
            <!-- <md-button class="md-primary md-raised" @click="logout">Logout</md-button> -->
            <article v-for="(location, idx) in locations" :key="idx">
                <!-- <img :src="location.image"> -->
                <!-- <h1 class="md-display-1">Welcome {{location.email}}</h1> -->
                <!-- <span class="md-headline">{{location}}</span> -->
            </article>
            <TimeTabs v-on:showSelectedTime="showTimeList" />
    
            <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
            <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
            <!-- <div v-for="(category, index) in taskCategoryData" :key="index" >{{category.category}} : {{category.completedPercentage}}%</div> -->
            <DataContainer v-on:showCategoryTasks="showTaskList" />
    
    
    
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
import { mapGetters, mapState } from 'vuex'


// import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    components: {
        ListContainer,
        TimeTabs,
        DataContainer,
    },
    computed: {
        ...mapGetters([
            'todos',
            'completedTodos',
            'taskCategoryData',
            'categories',
            'chartColors',
            'cats'
            // ...
        ]),
        //  ...mapState([
        //   'todos',
        //   // 'completedTodos',
        //   // 'taskCategoryData',
        //   // 'categories'
        //   // ...
        // ]),
        //   categories: () => {
        //     let categoryList = []
        //     this.todos.forEach(todo => {
        //       categoryList.push(todo.category)
        //     // console.log(todo, categoryList)
        //   });
        //   console.log("categoryList" + categoryList)
        //   return categoryList
        // },
    },
    mounted() {

        // console.log(this.$store.getters.todos)
        this.showTaskList('All')
        this.showTimeList('All')

        // console.log("x")
        // console.log(this.taskCategoryData)
        // console.log("x")


        this.getAllData()
        this.$store.watch(
            (state, getters) => getters.todos,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    this.getAllData()
                }
            },
        );
        this.$store.watch(

            (state, getters) => state.cats,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    this.getAllData()

                }
            },
        );

        // console.log(this.categories())

    },
    data() {
        return {
            locations: [],
            listCategories: "All",
            showNavigation: false,
            // taskCategoryData: [],
            catColors: [],
            timeChosen: 'Today',
            // categories: [
            //   'All',
            // ],
            // totalPercentage: 0,


        }
    },
    //  firestore () {
    //   return {
    //     locations: db.collection('users')
    //   }
    // },
    methods: {
        // taskCategoryData(){
        //   return this.$store.getters.taskCategoryData;
        // },
        // logout: function() {
        //   firebase.auth().signOut().then(() => {
        //     this.$router.replace('login')
        //   })
        // },
        chartColorsGenerate(catLength) {
            let letters = "0123456789ABCDEF";
            let hexArray = []
            // console.log("RUNS");
            // html color code starts with # 

            // generating 6 times as HTML color code consist 
            // of 6 letter or digits
            // console.log(this.taskCategoryData.length)
            for (let i = 0; i < catLength - 1; i++) {
                let color = '#';
                for (let i = 0; i < 6; i++) {
                    color += letters[(Math.floor(Math.random() * 16))];
                }
                hexArray.push(color)
            }
            // this.chartColors a= hexArray
            // console.log(this.chartColors)
            return hexArray
        },
        getAllData() {
            let allCategoryData = [];
            allCategoryData.push(this.createCategoryObject('All'));
            this.categories.forEach(element => {
                allCategoryData.push(this.createCategoryObject(element))
            });

            this.$store.dispatch('saveCategoryData', allCategoryData);
            // console.log("All category data: ")
            // console.log(allCategoryData)
            // if (!this.chartColors.length || (this.chartColors.length <=  this.taskCategoryData.length)) {
            //     let colorArray = this.chartColorsGenerate(this.taskCategoryData.length)
            //     this.$store.dispatch('saveColors', colorArray)
            // }
            // this.cats.forEach(catA => {
            //     let catColorsTemp = []
            //     // console.log(catColors)
            //     allCategoryData.forEach(element => {
            //     //   console.log(catA.category, element.category)
            //       if(catA.category == element.category){
            //           catColorsTemp.push(catA.color)
            //       }
            //     });
            //     this.catColors = catColorsTemp
            // });
            // console.log(this.catColors)
        },
        showTaskList(category) {
            this.listCategories = category;
            // this.showNavigation = true;
            // console.log(category)
        },
        showTimeList(timeChosen) {
            this.timeChosen = timeChosen;
            // console.log(category)
        },
        createCategoryObject(category) {
            let taskArray;
            let completedTaskArray;
            // console.log("category")
            // console.log(category)
            if (category == "All") {
                taskArray = this.todos;
                completedTaskArray = this.completedTodos;
            } else {
                taskArray = this.todos.filter(task => task.category == category)
                completedTaskArray = this.completedTodos.filter(task => task.category == category)
            }
            // console.log(this.todos, this.completedTodos)
            let totalPoints = 0;
            let completedPoints = 0;
            let taskId

            taskArray.forEach(element => {
                // console.log("pts: " + element.points);
                // console.log(parseInt(totalPoints, 10) + parseInt(element.points, 10))
                totalPoints = parseInt(totalPoints, 10) + parseInt(element.points, 10);
                taskId = element.taskId
            });

            completedTaskArray.forEach(element => {
                // console.log(completedPoints + element.points);
                completedPoints = parseInt(completedPoints, 10) + parseInt(element.points, 10);
            });
            // console.log(totalPoints, completedTaskArray)
            let completedPercentage = (completedPoints / totalPoints).toFixed(2) * 100;
            let categoryObject = {
                'category': category,
                'totalPoints': totalPoints,
                'completedPoints': completedPoints,
                'completedPercentage': completedPercentage,
                'taskId': taskId

            }
            // console.log(categoryObject)
            return categoryObject
        },

    }
};
</script>

<style lang="stylus" scoped>
.cats
    color: #fff
    padding: 15px
.right-sidebar
  max-width: 200px
  border-right: 1px solid black
  height: calc(100vh - 50px)
.main-content
  max-width: 1070px
  margin: 0 auto
  // display: flex
</style>
