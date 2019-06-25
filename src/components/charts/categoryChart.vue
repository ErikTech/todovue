<template>
<div>
   <md-toolbar :md-elevation="1">
        <span class="md-title">{{chartData.category}} - {{chartData.completedPercentage}}%</span>
      </md-toolbar>
     <GChart
    :settings="{packages: ['corechart']}"    
    :data="filteredData"
    type="PieChart"
    :options="chartOptions.chart"
    :createChart="(el, google) => new google.visualization.PieChart(el)"

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
          pieHole: 0.8,
          legend: 'none',
          backgroundColor: '#424242',


        },
      },
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
