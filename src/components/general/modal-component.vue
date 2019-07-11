<template>
    <div class="modal-mask">
        <div class="modal-wrapper" transition="modal">
            <div class="modal-container">
               <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import { GChart } from 'vue-google-charts';
import { mapGetters } from 'vuex'


export default {
    // props: [
    //   'chartData',
    // ],
    // components: {
    //   GChart
    // },
    // computed: {
    //       ...mapGetters([
    //     // 'todos',
    //     // 'completedTodos',
    //     'taskCategoryData',
    //     // 'categories'
    //     // ...
    //   ]),
    // },
    // mounted(){
    //   if(this.taskCategoryData[1]){
    //     this.getAllData()
    //   }
    //   this.$store.watch(
    //     (state, getters) => getters.taskCategoryData,
    //     (newValue, oldValue) => {
    //       if (newValue !== oldValue) {
    //         this.getAllData()
    //       }
    //     },
    //   );


    // },
    methods: {
        close() {
            this.$emit('close');
        }
        // getAllData(){
        //   console.log(this.taskCategoryData)
        //   this.mainChartData = [
        //       ['Task', 'Hours per Day'],
        //     ];
        //     this.taskCategoryData.forEach(element => {
        //     // console.log(element)
        //     if(element.category != "All"){
        //       // console.log("element")
        //       // console.log(element)

        //       this.mainChartData.push( [element.category,  element.completedPercentage])
        //     }
        //   });
        // let leftovers = 100 - this.taskCategoryData[0].completedPercentage;
        // this.mainChartData.push( ['Incomplete',  leftovers])
        // // console.log(this.mainChartData)
        // }
    },
    data() {
        return {
            test: 'hi'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #282828;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
