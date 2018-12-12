<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
          <app-header v-bind:title="title" v-on:changeTitle="updateTitle"></app-header>
          <app-content v-bind:users="users"></app-content>
          <app-footer v-bind:title="title"></app-footer>
      </div>
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
      users : [
                {name:'hari',age:'25',designation:'jobless',show:false},
                {name:'shankar',age:'26',designation:'student',show:false},
                {name:'Ram',age:'25',designation:'software',show:false},
                {name:'Hareram',age:'26',designation:'hardware',show:false}
            ],
      title : 'VueJS Learning'
    }
  },
  methods : {
    updateTitle : function(updateTitle){
      this.title = updateTitle;
    }
  }
}
</script>

<style >

</style>
