<template>

    <div class="col-md-9 leftStyle"  id="left" v-on:drop="drop" v-on:dragover="allowDrop">

    </div>

  
</template>

<script>

import {bus} from '../main.js';
import Right from './Right';
export default{
    components:{
   'imageview':Image,
   'app-Right':Right,
 },
    data(){
        return{
        'imageview':''    
    }
        },
        methods:{
        allowDrop(ev) {
            ev.preventDefault();
        },

        drop:function(ev) { 
            var data={}
             data.value=true;
                 data.type=ev.dataTransfer.getData('text')
            bus.$emit('display',data);     
              ev.preventDefault();
        } 
    }   
}
</script>
<style scoped>
.leftStyle{
    height :100vh !important;
    background-color:#DCDCDC;
}
</style>