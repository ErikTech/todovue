<template>
    <div id="DataContainer" v-if="ready">
        <md-list-item @click="showCategoryTask('All')" :class="{'active' : selectedCategory == 'All'}">
            <MainChart :chartColors="chartColors" />
        </md-list-item>
        
        <div class="category-data-component viewport">
            <md-list>
                <!-- <span > -->
                <md-list-item v-for="(category, index) in taskCategoryData" :key="index" v-show="category.category != 'All'" @click="showCategoryTask(category.category)" :class="{'active' : category.category == selectedCategory}">
                    <CategoryChart :chartData="category" :chartColor="chartColors[index-1]" />
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
    // @Prop() private msg!: string;
    components: {
        GChart,
        MainChart,
        CategoryChart
    },
    props: [
        'categoryData'
    ],
    created: function() {
            // let letters = "0123456789ABCDEF";
            // let hexArray = []
            // // console.log("RUNS");
            // // html color code starts with # 

            // // generating 6 times as HTML color code consist 
            // // of 6 letter or digits
            // for (let i = 0; i < this.taskCategoryData.length - 1; i++) {
            //     let color = '#';
            //     for (let i = 0; i < 6; i++) {
            //         color += letters[(Math.floor(Math.random() * 16))];
            //     }
            //     hexArray.push(color)
            // }
            // this.chartColors = hexArray

    },
    mounted(){
      if(this.taskCategoryData.length)
        this.chartColorsGenerate(this.taskCategoryData.length)
      // console.log(this.chartColors)
      // this.ready = true
        //  let letters = "0123456789ABCDEF";
        //   let hexArray = []
        //   console.log("RUNS");
        //   // html color code starts with # 

        //   // generating 6 times as HTML color code consist 
        //   // of 6 letter or digits
        //   for (let i = 0; i < this.taskCategoryData.length - 1; i++) {
        //       let color = '#';
        //       for (let i = 0; i < 6; i++) {
        //           color += letters[(Math.floor(Math.random() * 16))];
        //       }
        //       hexArray.push(color)
        //   }
        //   this.chartColors = hexArray

      // this.chartColors = this.colorArray
        // this.chartColorsGenerate()
        // this.chartColorsGenerate()
        this.$store.watch(
            (state, getters) => getters.taskCategoryData,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    this.chartColorsGenerate(this.taskCategoryData.length);
                }
            },
        );
        // this.chartColorsUsed()
        // console.log("categoryData");
        // console.log(this.categoryData);
    },
    computed: {
        ...mapGetters([
            // 'todos',
            // 'completedTodos',
            'taskCategoryData',
            // 'categories'
            // ...
        ]),
        // colorArray() {
        //     let letters = "0123456789ABCDEF";
        //     let hexArray = []
        //     console.log("RUNS");
        //     // html color code starts with # 

        //     // generating 6 times as HTML color code consist 
        //     // of 6 letter or digits
        //     for (let i = 0; i < this.taskCategoryData.length - 1; i++) {
        //         let color = '#';
        //         for (let i = 0; i < 6; i++) {
        //             color += letters[(Math.floor(Math.random() * 16))];
        //         }
        //         hexArray.push(color)
        //     }
        //     return hexArray
        // }
        // chartColors(){
        //   return this.chartColorsGenerate
        // }
    },
    data() {
      
        return {
          ready: false,
            selectedCategory: 'Work',
            chartColors: '',
            // chartColors:  []
        }
    },

    methods: {
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
            this.chartColors = hexArray
            // console.log(this.chartColors)
            this.ready = true
            // return hexArray
        },
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
