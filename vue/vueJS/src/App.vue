<template>
  <div id="app">
    <div class="container-fluid">
      <app-header></app-header>
      <app-content></app-content>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import header from './components/header/header' ;
import content from './components/content/content';
import footer from './components/footer/footer';
export default {
  name: 'app',
  components : {
    'app-header' : header,
    'app-content' : content,
    'app-footer':footer
  },
  data () {
    return {
      
    }
  }
}
</script>

<style >

</style>
