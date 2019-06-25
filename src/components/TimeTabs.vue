<template>
    <md-tabs class="md-primary" md-alignment="centered">
      <md-tab :md-label="time" v-for="(time) in selectableTimes" @click="showSelectedTime(time)" :class="{'md-active' : selectedTime == time }" :key="time">
      </md-tab>
    </md-tabs>
</template>

<script lang="js">

export default  {
  data(){
    return {
      selectableTimes: ['All', 'Today', 'This Week', 'Dailies', 'Weeklies'],
      selectedTime: 'Today'
    }
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

</style>
