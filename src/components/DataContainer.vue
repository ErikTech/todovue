<template>
  <div id="DataContainer">
    <md-list-item @click="showCategoryTask('All')" :class="{'active' : selectedCategory == 'All'}">
   <MainChart />
  </md-list-item>
    <div class="category-data-component viewport">
          <md-list>
            <!-- <span > -->
        <md-list-item  v-for="(category, index) in categoryData" :key="index"  v-show="category.category != 'All'" @click="showCategoryTask(category.category)"  :class="{'active' : category.category == selectedCategory}">
          <CategoryChart :chartData="category"/></md-list-item>
  <!-- </span> -->
  </md-list>
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
  // computed: {
  //     taskCategoryData(){
  //       return this.$store.getters.taskCategoryData
  //     }
  // },
  props: [
    'categoryData'
  ],
  mounted(){
    // console.log("categoryData");
    // console.log(this.categoryData);
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
      this.selectedCategory = category;
      console.log("show category clicked: " + this.selectedCategory)
      this.$emit('showCategoryTasks', this.selectedCategory)
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
*
  box-sizing: border-box
#DataContainer
  div
    &.active
      background: #ced3e1
  h3
    margin 40px 0 0
  .category-data-component
    .md-list
      list-style-type none
      // border: 1px solid black
      padding 0
      margin: 0 auto 
      display: flex
      flex-flow: wrap
      .md-list-item
        display: inline-block
        width: 50%
        .md-list-item-content
          padding: 10px
          div
            margin: 0 auto

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
      h2
        color: #000
</style>
