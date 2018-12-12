<template>
    <div class="col-md-9 col-sm-8 col-xs-12 leftView" v-on:click="backButtonClicked">
        <div v-on:drop="drop" v-on:dragover="allowDrop" class="editorSection" id="editor" v-on:click="elementClicked">
            <textarea name="content" id="editor">This is some sample content.</textarea>
            <!-- <button v-if="isNewComps"  class="btn btn-primary" v-on:click="backButtonClicked">Back</button> -->
        </div>  
    </div>
</template>
<script>
import Vue from 'vue';
import {bus} from '../../../main.js';
import rightview from '../rightView/rightVue';
import menuview from '../rightView/menuview/menuView';
import buttonview from '../rightView/buttonView/buttonVue';
import imageview from '../rightView/imageView/imageVue';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
export default {
    name: "leftView",
    components:{'rightview':rightview,'menuview':menuview,'buttonview':buttonview,'imageview':imageview},
    data:function(){
        return {
            isNewComps:false,
            inc:0,
            elementCount:0,
            newElement:''
        }
    },
    created(){
        bus.$on('btnText',(data) => {
            console.log(data);
            document.getElementById(this.newElement).setAttribute('value',data.btntext);
            
        })
    },

    mounted(){
        ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Heading],
        toolbar: [ 'heading']
    } )
    .then( editor => {
        console.log( 'Editor was initialized', editor );
    } )
    .catch( error => {
        console.error( error );
    } );
    },

    methods:{
        allowDrop:function(ev) {
            ev.preventDefault();
        },
        drop:function(ev) { 
         if(ev.dataTransfer.getData("text")==='text'){
             this.isNewComps = true;
             this.inc = this.inc+1;
             this.elementCount = this.elementCount+1;
             var div = document.createElement("div");
             var input = document.createElement("input");
             input.setAttribute('class','input'+this.inc);
             input.setAttribute('id','input'+this.inc);
             input.classList.add('form-control');
             div.appendChild(input)
             document.getElementById('editor').appendChild(div);
         }
         else if(ev.dataTransfer.getData("text")==='picture'){
             this.isNewComps = true;
             this.elementCount = this.elementCount+1;
             var data = {};
             data.compName = "imageview";
             data.isNewComp = true;
             console.log(data);
             bus.$emit('sample',data);
         }
         else if(ev.dataTransfer.getData("text")==='button'){
             this.isNewComps = true;
             this.inc = this.inc+1;
             this.elementCount = this.elementCount+1;
             var div = document.createElement("div");
             var input = document.createElement("input");
             input.setAttribute('class','btn btn-default');
             input.setAttribute('id','button'+this.inc);
             this.newElement = 'button'+this.inc;
             input.classList.add('button'+this.inc);
             input.setAttribute('value','button'+this.inc);
             input.setAttribute('type','button');
             div.appendChild(input);
             document.getElementById('editor').appendChild(div);
             var data = {};
             data.compName = "buttonview";
             data.isNewComp = true;
             bus.$emit('sample',data);
         }
        },
        backButtonClicked : function(){
            this.isNewComps = false;
            var data = {};
            data.isCompChanged = false;
            this.elementCount = this.elementCount-1;
            bus.$emit('backButtonClicked',data);
            // if(document.getElementsByTagName('input').length > 0){
            //     for(var i=0; i < document.getElementsByTagName('input').length; i++){
            //         var clasName = 'input'+this.inc;
            //         if(document.getElementsByTagName('input')[i].className === clasName){
            //             document.getElementsByTagName('input')[i].remove();
            //         }
            //     }
            // }
        },
        elementClicked:function(ev){
            this.newElement = ev.target.id;
            var data = {};
            data.id = ev.target.id;
            bus.$emit('elementClicked',data);
            if(ev.target.type === 'button'){
             console.log('exec');
             var data = {};
             data.compName = "buttonview";
             data.isNewComp = true;
             bus.$emit('sample',data);
            }
        }
    }
}
</script>
<style scoped>
.leftView{
    background-color: rgb(215, 226, 236);
    min-height: 100vh;
}
.editorSection{
    min-height: 100vh;
    margin-top: 30px;
}
</style>
