<template>
    <div class="col-md-3 col-sm-4 col-xs-12 rightView">
        <div v-if="!isCompChanged">
            <menuview></menuview>  
        </div>
        <div v-if="isCompChanged">
            <component v-bind:is="comp.compName"></component>
        </div>
        <div class="delete">
            <button class="btn btn-danger" v-on:click="deleteElement">Delete</button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {bus} from '../../../main.js';
import menuview from './menuview/menuView';
import buttonview from './buttonView/buttonVue';
import imageview from './imageView/imageVue';
export default {
    name: "rightView",
    components:{'menuview':menuview,'buttonview':buttonview,'imageview':imageview},
    data: function() {
        return{
          isCompChanged:false,
          comp:{},
          elementSelected:''
        }
    },
    created() {
        bus.$on('sample',(data) => {
            console.log('1');
            this.isCompChanged = true;
            this.comp = data;
        });
        bus.$on('backButtonClicked',(data) => {
            this.isCompChanged = data.isCompChanged;
        });
        bus.$on('elementClicked',(data) => {
            console.log(data);
            this.elementSelected = data.id;
        });
    },
    methods:{
       deleteElement:function(){
           if(this.elementSelected !== 'editor'){
               document.getElementById(this.elementSelected).remove();
           }
       }
    }
}
</script>
<style scoped>
.rightView{
    background-color: rgb(244, 245, 249);
    min-height: 100vh;
}
.delete{
    position: absolute;
    bottom: 100px;
}
</style>
