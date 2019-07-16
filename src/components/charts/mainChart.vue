<template>
    <div id="mainChart" v-if="ready">
     
        <div class="chart-legend">
            <ul>
                <li v-for="(category, index) in mainChartData" :key="index + '_chartKey'">
                    <div><span class="chartColorBox" :style="{ background: chartColorsUsed[index - 1] }"></span> {{category[0]}} <span class="percentage-done">- {{category[1]}}</span></div>
                </li>
            </ul>
        </div>
        <!-- <h1>{{chartColorsUsed()}}</h1> -->
        <!-- <h2>{{taskCategoryData}}</h2> -->
        <div class="chartContainer" v-if="taskCategoryData.length">
            <h1> {{taskCategoryData[0].category}} Tasks - {{taskCategoryData[0].completedPercentage}}% - {{taskCategoryData[0].completedPoints}}/{{taskCategoryData[0].totalPoints}}</h1>
            <GChart :settings="{packages: ['corechart']}" :data="mainChartData" type="PieChart" :options="mainOptions.chart" :createChart="(el, google) => new google.visualization.PieChart(el)" align="center" style="width: 100%" :resizeDebounce="500" />
        </div>
    </div>
</template>

<script lang="js">
import { GChart } from 'vue-google-charts';
import { mapGetters } from 'vuex'


export default {
    props: [
        // 'chartData',
        'chartColors'
    ],
    components: {
        GChart
    },
    computed: {
        ...mapGetters([
            // 'todos',
            // 'completedTodos',
            'taskCategoryData',
            // 'categories'
            // ...
        ]),
        chartColorsUsed(){
          let allColors = JSON.parse(JSON.stringify(this.chartColors))
          allColors.push('#282828')
          console.log(allColors)
          return allColors
        }
    },
    mounted() {

        if (this.taskCategoryData.length > 1) {
            this.getAllData()
            // this.chartColorsUsed = JSON.parse(JSON.stringify(this.chartColors))
              this.mainOptions.chart.colors = this.chartColorsUsed

            this.ready = true
            

            // this.ready = true

            // this.chartColorsUsed()
            // this.chartColorsUsed = [...this.chartColors]
        }
        else{
          this.ready = false
        }
        this.$store.watch(
            (state, getters) => state.taskCategoryData,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    this.getAllData()
                    this.ready = true
              this.mainOptions.chart.colors = this.chartColorsUsed
                    console.log(this.allColors)

                }
            },
        );


    },
    methods: {
        getAllData() {
            console.log(this.taskCategoryData)
            this.mainChartData = [
                ['Task', 'Hours per Day'],
            ];
            this.taskCategoryData.forEach(element => {
                // console.log(element)
                // if(element.category){
                if (element.category != "All") {
                    // console.log("element")
                    // console.log(element)

                    this.mainChartData.push([element.category, element.completedPercentage])
                }
                // }
            });
            let leftovers = 100 - this.taskCategoryData[0].completedPercentage;
            this.mainChartData.push(['Incomplete', leftovers])
            // console.log(this.mainChartData)
            
        }
    },
    data() {
        return {
            ready: false,
            mainChartData: [],
            // chartColorsUsed: [],
            allColors:  [],
            mainOptions: {
                chart: {
                    pieHole: 0.4,
                    backgroundColor: 'transparent',
                    color: '#fff',
                    width: 500,
                    height: 400,
                    sliceVisibilityThreshold: 0,
                    colors: [...this.chartColors, '#282828'],
                    // colors: this.allColors,
                    legend: { position: 'none' },
                    chartArea: { left: 0, top: 0, width: '100%', height: '75%' }
                },
            },

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus">
.chart-container
  float: right
.chart-legend
  text-align: left
  float: left
  ul
    list-style: none
    margin: 0 
    padding: 0
    text-align: right
    li
      text-align: right!important
      &:first-child
        display: none
      &:last-child
        .percentage-done
          display: none
      .chartColorBox
        height: 15px
        width: 15px
        background: #282828
        display: inline-block
#mainChart
  margin: 0 auto
  width: 100%
  display: flex

  h1
    position: relative
    z-index: 1
    font-size: 20px
    color: #fff
    top: 0
    margin: 0 auto
    text-align:center
  .md-item-list-content
    padding: 0
    > div
      margin: 0 auto!important

</style>
