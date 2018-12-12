<template>
  <div>

  <app-header></app-header>

  <app-mainbody></app-mainbody>
  
  </div>
</template>

<script>
import Header from './components/Header';
import Mainbody from './components/mainbody';
import Footer from './components/Footer';
export default {
 components:{
   'app-header':Header,
   'app-mainbody':Mainbody,
   'app-Footer':Footer
 },
  data () {
    return {
     
    }
  }
}
</script>

<style>

</style>
