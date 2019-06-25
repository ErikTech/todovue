<template>
  <div class="about">
    <h1>TO DO STILL FOR V1 COMPLETION</h1>
    <h2>App functionality</h2>
    <h3>Front-end Functionality</h3>
    <ul>
      <li><input type="checkbox" checked />&nbsp;Set on click for category chart to show only ToDos in that category
      <ul>
        <li><input type="checkbox" checked />&nbsp;All (big chart)</li>
        <li><input type="checkbox" checked />&nbsp;sub-charts (dynamically)</li>

      </ul>
      </li>
      <li>Set click on duration tab to show only Todos in that timeperiod</li>
      <li>Create toggle to view completed on each page/category</li>
      <li><input type="checkbox" checked />&nbsp;Create 'add new to do' functionality with Vuex</li>
      <li><input type="checkbox" checked />&nbsp;add task to store on creation Vuex</li>
      <li>Create 'edit to do' with Vuex</li>
      <li>Create remove task functionality vuex</li>
      <li><input type="checkbox" checked />&nbsp;Build percentage calculation algorithms to display actual chart data</li>
      </ul>
      <h3>Back end Functionality</h3>
      <ul>
        <li>Set up firebase to let user log in/out</li>
        <li>Set up task saving in firebase</li>
      </ul>
      <h3>App styling</h3>
      <ul>
        <li>Choose colors/theme</li>
        <li>Design Desktop</li>
        <li>Design Mobile</li>
      </ul>
    <h2>
      Development Process
    </h2>
    <h3>Component Development</h3>
    <ul>
      <li>Storybook integration</li>
    </ul>
    <h3>Testing Development</h3>
    <ul>
      <li>Unit test each component with Jest</li>
      <li>End to end test with cypress</li>
    </ul>
       <h3>Deployment</h3>
    <ul>
      <li>Now.sh config</li>
      <li>buy domain name?</li>
    </ul>
    <h2>Future Development</h2>
    <ul>
      <li>Settings
      <ul>
        <li>Dark mode</li>

      </ul>
      </li>
      <li>Build as native app</li>
      <li>Custom categories</li>
      <li>Line charts showing improvements over time</li>


    </ul>
  </div>
</template>

<style lang="stylus" scoped>

.about
  text-align: left
  max-width: 1070px
  margin: 0 auto
  color: #fff
  

// h2
  // color: navy

h3
  text-decoration underline
</style>
