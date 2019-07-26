<template>
    <div id="mainChart" >
    <!-- {{taskCategoryData}} -->
    <!-- {{mainChartData}} -->
    <!-- chartColors: {{chartColorsUsed}} -->
    <!-- {{cats}} -->
    <!-- allColors: {{allColors}} -->
        <div class="chart-legend">
            <ul>
                <li v-for="(category, index) in mainChartData" :key="index + '_chartKey'">
                    <div><span class="chartColorBox" :style="{ background: chartColorsUsed[index - 1] }"></span> {{category[0]}} <span class="percentage-done">- {{category[1]}}</span></div>
                </li>
                <!-- <li>    {{chartColors[0]}}</li> -->
            </ul>
        </div>
    
        <div class="chartContainer" v-if="taskCategoryData.length">
            <h1> {{taskCategoryData[0].category}} Tasks - {{taskCategoryData[0].completedPercentage}}% - {{taskCategoryData[0].completedPoints}}/{{taskCategoryData[0].totalPoints}}</h1>
            <GChart :settings="{packages: ['corechart']}" :data="mainChartData" type="PieChart" :options="mainOptions.chart" :createChart="(el, google) => new google.visualization.PieChart(el)" align="center" style="width: 100%" :resizeDebounce="500" />
        </div>
        <!-- <div v-for="(color, index) in cats" :key="index">
            {{color.color}}
        </div> -->
    </div>
</template>

<script lang="js">
import { GChart } from 'vue-google-charts';
import { mapGetters } from 'vuex'


export default {
    props: [
        // 'chartData',
        // 'chartColors'
    ],
    components: {
        GChart
    },
    computed: {
        ...mapGetters([
            // 'todos',
            // 'completedTodos',
            'taskCategoryData',
            'cats'
            // 'categories'
        ]),
        chartColorsUsed() {
            let currentTaskData = this.taskCategoryData;
            let objColors = []

             let catArray = this.cats.map(function(obj) {
                let objColor          

                 currentTaskData.forEach(element => {
                     if (element.category == obj.category){
                        console.log(obj.category, element.category)
                        console.log(obj.color)
                        //  console.log("EQUAL")
                        //  console.log(obj.color)
                        objColor = obj.color
                     }

                 });
                return objColor


                //  return obj.color
                });
                objColors.push(...catArray)
                // console.log(objColors)
                return objColors
        }
    },
    mounted() {
        if (this.taskCategoryData.length > 1) {
            this.getAllData()
            
            this.mainOptions.chart.colors = [...this.chartColorsUsed, '#282828']
            this.ready = true
        } else {
            this.ready = false
        }
        this.$store.watch(
            (state, getters) => state.cats,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    this.getAllData()
                    // this.ready = true
                    this.mainOptions.chart.colors = [...this.chartColorsUsed, '#282828']

                }
            },
        );
           this.$store.watch(
            (state, getters) => state.taskCategoryData,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    this.getAllData()
                    this.mainOptions.chart.colors = [...this.chartColorsUsed, '#282828']

                    // this.ready = true
                }
            },
        );
            this.$store.watch(
            (state, getters) => state.todos,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    this.getAllData()
                    this.mainOptions.chart.colors = [...this.chartColorsUsed, '#282828']

                    // this.ready = true
                }
            },
        );
    },
    methods: {
        getAllData() {
            // console.log(this.taskCategoryData)
            this.mainChartData = [
                ['Task', 'Hours per Day'],
            ];
            this.cats.forEach(element => {
                // console.log(element)
                if (element.category != "All") {
                    this.taskCategoryData.forEach(cat => {
                        console.log(cat.category, element.category)
                        if (cat.category == element.category){
                            this.mainChartData.push([element.category, cat.completedPoints])
                            console.log(this.mainChartData)
                        }
                    });
                }
            });
            let leftovers = this.taskCategoryData[0].totalPoints - this.taskCategoryData[0].completedPoints;
            this.mainChartData.push(['Incomplete', leftovers])
        }
    },
    data() {
        return {
            ready: false,
            mainChartData: [],
            // allColors: this.chartColorsUsed,
            mainOptions: {
                chart: {
                    pieHole: 0.4,
                    backgroundColor: 'transparent',
                    color: '#fff',
                    width: 500,
                    height: 400,
                    sliceVisibilityThreshold: 0,
                    // colors: [...this.chartColorsUsed, '#282828'],
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
      // &:last-child
      //   .percentage-done
      //     display: none
      .chartColorBox
        height: 15px
        width: 15px
        background: #282828
        display: inline-block
#mainChart
  margin: 0 auto
  width: 100%
  display: block

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
