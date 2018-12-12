<template>
<div class="row">
    <app-Left></app-Left>
   <app-Right></app-Right>
 </div>
</template>

<script>
import Right from './Right';
import Left from './left';

 export default {
 components:{
   'app-Right':Right,
   'app-Left':Left,
   
},
  data () {
    return {
     
    }
  }
}  
</script>
<style scoped>

</style>