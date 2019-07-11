<template>
<div>
        <h2>{{chartData.category}} - {{chartData.completedPercentage}}%</h2>
   
     <GChart
    :settings="{packages: ['corechart']}"    
    :data="filteredData"
    type="PieChart"
    :options="chartOptions.chart"
    :createChart="(el, google) => new google.visualization.PieChart(el)"
    align="center"
    
  />
  </div>
</template>

<script lang="js">
import {
  GChart
} from 'vue-google-charts';

export default {
  props: [
    'chartData',
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
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          // title: 'Company Performance',
          // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          pieHole: 0.5,
          // is3D: true,
          width: 150,
          height: 150,
          legend: 'none',
          backgroundColor: 'transparent',
          colors: ['#42b883', '#282828'],



        },
      },
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
