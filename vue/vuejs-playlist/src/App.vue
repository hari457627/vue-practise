<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
          <app-header  name='title'>
          </app-header>
      </div>
      <app-body></app-body>
    </div>
  </div>
</template>

<script>
import header from './components/header/header' 
import bodyVue from './components/body/body';
import bus from './main';
export default {
  name: 'app',
  components : {
    'app-header' : header,
    'app-body' : bodyVue
  },
  data () {
    return {
      title:'vuejs'
    }
  },
  methods:{
  }
}
</script>

<style >

</style>
