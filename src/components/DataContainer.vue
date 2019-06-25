<template>
  <div id="DataContainer">
    <div v-for="(category, index) in taskCategoryData" :key="index" @click="showCategoryTask(category.category)" v-if="category.category == 'All'" :class="{'active' : selectedCategory == 'All'}">
   <MainChart  
    :chartData="taskCategoryData"
  />
  </div>
    <div class="category-data-component viewport">
          <md-list  v-for="(category, index) in taskCategoryData" :key="index" @click="showCategoryTask(category.category)" v-if="category.category != 'All'" :class="{'active' : category.category == selectedCategory}">
        <CategoryChart  
    :chartData="category"
  /></md-list>
    </div>
  </div>
</template>

<script lang="js">
import { GChart } from 'vue-google-charts';
import CategoryChart from './charts/categoryChart.vue'
import MainChart from './charts/mainChart.vue'



export default {
  // @Prop() private msg!: string;
  components: {
    GChart,
    MainChart,
    CategoryChart 
  },
  computed: {
      taskCategoryData(){
        return this.$store.getters.taskCategoryData

      }
  },
  props: [
    'categoryData'
  ],
  mounted(){
    // console.log(this.taskCategoryData)
  },
   data() {
    return {
      selectedCategory: 'Work'
      // taskCategoryData: []
      // Array will be automatically processed with visualization.arrayToDataTable function
    
 
      // mainChartData: [
      //     ['Task', 'Hours per Day'],
      //     ['Incomplete', 22],
      //     ['Work',     11],
      //     ['Finances',      2],
      //     ['Home',  2],
      //     ['Fitness', 2],
      //     ['Family',    7],
      //   ],
      // mainOptions: {
      //   chart: {
      //     // title: 'Point Allocation this week',
      //     // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      //     pieHole: 0.4,
      //   },
      // },
    }
  },

  methods: {
    showCategoryTask(category){
      this.$emit('showCategoryTasks', category)
      this.selectedCategory = category;
      console.log(this.selectedCategory)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
div
  &.active
    background: #ced3e1
h3
  margin 40px 0 0

ul
  list-style-type none
  // border: 1px solid black
  padding 0
  margin: 0 auto 
  max-width: 500px
  display: inline-flex

li
  text-align: center
  box-sizing: border-box
  > div
    padding: 5px
a
  color #42b983

.category-data-component > div
  display: flex
.category-data-component li
  box-sizing: border-box
  border: 1px solid black
  cursor: pointer
  &:hover
  &.active
    background: #ced3e1
</style>
