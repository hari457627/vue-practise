<template>
<div>
 <button @click="goBack">Back</button>
<p>video</p>
</div>
</template>


<script>
import {bus} from '../main.js'
export default {
 
  data () {
    return {
    
    }
  },
   methods:{
       goBack() {
          bus.$emit('go',false);   
        }
   }
}
</script>


<style scoped>

</style>