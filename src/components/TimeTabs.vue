<template>
  <div id="TimeTabs">
    <ul class="tab-component">
      <li v-for="(time) in selectableTimes" @click="showSelectedTime(time)" :class="{'active' : selectedTime == time }" :key="time">
        {{time}}
      </li>

    </ul>
  </div>
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

ul
  list-style-type none
  border: 1px solid black
  padding 0
  margin: 0 auto 
  max-width: 500px
  display: inline-flex

li
  padding: 10px
  text-align: left
  border: 1px solid gray
  box-sizing: border-box
  cursor: pointer
  &:hover
  &.active
    background: #ced3e1
a
  color #42b983
</style>
