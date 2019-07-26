<template>
    <md-tabs class="md-primary" md-alignment="centered">
      <!-- {{completedTodos}} -->
        <template slot="md-tab" slot-scope="{ tab }">
        {{ tab.label }} <i class="badge" v-if="tab.data.badge">{{ tab.data.badge }}</i>
      </template>
      <md-tab :md-label="time" v-for="(time) in selectableTimes" @click="showSelectedTime(time)" :class="{'md-active' : selectedTime == time }" :key="time" :md-template-data="{ badge: incompleteTasks }">
      </md-tab>
    </md-tabs>
</template>

<script lang="js">
import { mapGetters, mapState } from 'vuex'


export default  {
  data(){
    return {
      selectableTimes: ['All', 'Today', 'This Week', 'Dailies', 'Weeklies'],
      selectedTime: 'Today',
      incompleteTasks: 12
    }
  },
  computed: {
   ...mapGetters([
            'todos',
            'completedTodos',
            // 'taskCategoryData',
            // 'categories'
            // ...
        ]),
  },
  mounted(){
    // console.log(this.todos, this.completedTodos);
//     this.$store.watch(
//     (state, getters) => state.completedTodos,
//     (newValue, oldValue) => {
//         console.log("completedTodos")
//         console.log(state.completedTodos)
//         console.log("completedTodos")
        
//     },
// );
  },
  methods: {
      showSelectedTime(timeChosen){
      this.selectedTime = timeChosen
      this.$emit('showSelectedTime', timeChosen)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.badge {
    width: 19px;
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 2px;
    right: 2px;
    background: red;
    border-radius: 100%;
    color: #fff;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -.05em;
    font-family: 'Roboto Mono', monospace;
  }
</style>
