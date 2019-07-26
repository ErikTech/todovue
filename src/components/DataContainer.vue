<template>
    <div id="DataContainer" v-if="ready">
      <!-- {{cats}} -->
        <md-list-item @click="showCategoryTask('All')" :class="{'active' : selectedCategory == 'All'}">
            <MainChart/>
        </md-list-item>
        <!-- <h1>{{cats}}</h1> -->
        <div class="category-data-component viewport" v-if="taskCategoryData.length > 1">
            <md-list>
                <!-- <span > -->
                <md-list-item v-for="(category, index) in taskCategoryData" :key="index" v-show="(category.category != 'All')" @click="showCategoryTask(category.category)" :class="{'active' : category.category == selectedCategory}">
                    <CategoryChart :chartData="category" :chartColor="cats[index - 1]" />
                    <!-- {{cats[index - 1].color}} -->
                </md-list-item>
                <!-- </span> -->
            </md-list>
        </div>
    </div>
</template>

<script lang="js">
import { GChart } from 'vue-google-charts';
import CategoryChart from './charts/categoryChart.vue'
import MainChart from './charts/mainChart.vue'
import { mapGetters, mapState } from 'vuex'



export default {
    components: {
        GChart,
        MainChart,
        CategoryChart
    },
    props: [
        'categoryData'
    ],
    mounted(){
      this.ready = true
    },
    computed: {
        ...mapGetters([
            'taskCategoryData',
            // 'categories',
            // 'chartColors',
            'cats'
            // ...
        ]),

    },
    data() {
        return {
          ready: false,
          selectedCategory: 'Work',
        }
    },

    methods: {
        showCategoryTask(category) {
            this.selectedCategory = category;
            // console.log("show category clicked: " + this.selectedCategory)
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
        width: 33%
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
    // border: 1px solid black
    cursor: pointer
    &:hover
    &.active
      background: #ced3e1
      h2
        color: #000
</style>
