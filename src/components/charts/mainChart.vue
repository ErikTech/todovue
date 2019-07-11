<template>
<div id="mainChart">
    <h1> {{taskCategoryData[0].category}} Tasks - {{taskCategoryData[0].completedPercentage}}%</h1>
    <!-- {{mainChartData}}
    {{chartData[0]}} -->
     <GChart
    :settings="{packages: ['corechart']}"    
    :data="mainChartData"
    type="PieChart"
    :options="mainOptions.chart"
    :createChart="(el, google) => new google.visualization.PieChart(el)"
    align="center"
    style="width: 100%"

  />
  </div>
</template>

<script lang="js">
import { GChart } from 'vue-google-charts';
import { mapGetters } from 'vuex'


export default {
  props: [
    'chartData',
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
  },
  mounted(){
    if(this.taskCategoryData[1]){
      this.getAllData()
    }
    this.$store.watch(
      (state, getters) => getters.taskCategoryData,
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          this.getAllData()
        }
      },
    );
 

  },
  methods: {
    getAllData(){
      console.log(this.taskCategoryData)
      this.mainChartData = [
          ['Task', 'Hours per Day'],
        ];
        this.taskCategoryData.forEach(element => {
        // console.log(element)
        if(element.category != "All"){
          // console.log("element")
          // console.log(element)

          this.mainChartData.push( [element.category,  element.completedPercentage])
        }
      });
    let leftovers = 100 - this.taskCategoryData[0].completedPercentage;
    this.mainChartData.push( ['Incomplete',  leftovers])
    // console.log(this.mainChartData)
    }
  },
  data(){
    return{
      mainChartData: [],
      mainOptions: {
        chart: {
          pieHole: 0.4,
          backgroundColor: 'transparent',
          color: '#fff',
          width: 500,
          sliceVisibilityThreshold:0,
          // title: 'All tasks - ' + chartData[0].completedPercentage.toString() + '%',
          // is3D: true,
          colors: ['#0c0032', '#190061', '#240090', '#3500D3', '#282828'],

          legend: {position: 'bottom', alignment: 'center', textStyle: {color: 'white', fontSize: 16}},
          chartArea:{left:0,top:0,width:'100%',height:'75%'}
        },
      },
      
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus">
#mainChart
  margin: 0 auto
  width: 100%

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
