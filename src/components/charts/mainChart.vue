<template>
<div>
    <div> {{chartData[0].category}} - {{chartData[0].completedPercentage}}%</div>
     <GChart
    :settings="{packages: ['corechart']}"    
    :data="mainChartData"
    type="PieChart"
    :options="mainOptions.chart"
    :createChart="(el, google) => new google.visualization.PieChart(el)"

  />
  </div>
</template>

<script lang="js">
import { GChart } from 'vue-google-charts';

export default {
  props: [
    'chartData',
  ],
  components: {
    GChart
  },
  computed: {
    
  },
  mounted(){
              this.getAllData()

    this.$store.watch(
      (state, getters) => getters.todos,
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          this.getAllData()
        }
      },
    );
 

  },
  methods: {
    getAllData(){
      this.mainChartData = [
          ['Task', 'Hours per Day'],
        ];
         this.chartData.forEach(element => {
      if(element.category != "All")
        this.mainChartData.push( [element.category,  element.completedPercentage])
    });
    let leftovers = 100 - this.chartData[0].completedPercentage;
    this.mainChartData.push( ['Incomplete',  leftovers])
    }
  },
  data(){
    return{
    mainChartData: [],
      mainOptions: {
        chart: {
          pieHole: 0.4,
        },
      },
    
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
