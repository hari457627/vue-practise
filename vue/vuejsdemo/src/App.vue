<template>
  <div id="app" class="container-fluid">
    <!-- <h1>hi:{{dbkey}}</h1> -->
    <app-header></app-header>
    <app-body></app-body>
    
  </div>
</template>

<script>
import Header from './components/header/header';
import Body from './components/body/body';
import bus from './main.js';
export default {
  name: 'app',
  components:{'app-header':Header,'app-body':Body},
  props:['dbkey'],
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
