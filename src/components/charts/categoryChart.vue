<template>
    <div v-show="ready">
        <!-- {{chartColor.color}} -->
        <h2>{{chartData.category}}</h2>
        <span>{{chartData.completedPoints}}/{{chartData.totalPoints}} - {{chartData.completedPercentage}}%</span>
        <GChart :settings="{packages: ['corechart']}" :data="filteredData" type="PieChart" :options="chartOptions.chart" :createChart="(el, google) => new google.visualization.PieChart(el)" align="center" />
    </div>
</template>

<script lang="js">
import {
    GChart
} from 'vue-google-charts';

export default {
    props: [
        'chartData',
        'chartColor',
    ],
    components: {
        GChart
    },
    computed: {
        filteredData() {
            let leftovers = 100 - this.chartData.completedPercentage;
            let theData = [
                ['Task', 'Percentage completed'],
                [this.chartData.category, this.chartData.completedPercentage],
                ['Other', leftovers],
            ]
            return theData
        },
    },
    mounted() {
        this.setColors(this.$store.getters.cats)
        this.ready = true
        this.$store.watch(
            (state, getters) => state.cats,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                 this.setColors(newValue)
                }
            },
        );

    },
    data() {
        return {
            ready: false,
            chartOptions: {
                chart: {
                    pieHole: 0.5,
                    // is3D: true,
                    width: 150,
                    height: 150,
                    legend: 'none',
                    backgroundColor: 'transparent',
                    colors: ['#fff', '#282828'],
                },
            },
        }

    },
    methods: {
        setColors(categoryArray){
             let tempColor = '#fef'
                    // this.getAllData()
                    // console.log(categoryArray)
                    categoryArray.forEach(element => {
                        // console.log(element.category, this.chartData.category)
                        if(element.category == this.chartData.category){
                            tempColor = element.color
                            return
                        }
                    });
                  
                    this.ready = true
                    this.chartOptions.chart.colors = [tempColor, '#282828']
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h2
  margin: 10px 0
  font-size: 20px


.md-list-item
  display: inline-block
  width: 20%
  .md-list-item-content
    padding: 10px

div[dir]
  margin: 0 auto
  display:block
</style>
