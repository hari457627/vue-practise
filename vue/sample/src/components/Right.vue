<template>

 
 <div  class="col-md-3 backgroundStyle" id="right">
 <div v-if="!displatContent" class="row">
    <div class="col-md-4">
    <button draggable="true" id="Text" @dragstart="drag" class="btn">
    <i class="fa fa-bars"></i>
    </button>
    </div>

    <div class="col-md-4">
   <button draggable="true" id="Image" @dragstart="drag" @click="viewchange" class="btn">
   <i class="fa fa-picture-o" aria-hidden="true"></i></button>
    </div>

    <div class="col-md-4">
   <button draggable="true" id="Video" @dragstart="drag" class="btn">
   <i class="fa fa-video-camera" aria-hidden="true"></i>

   </button>
    </div>
</div>

<div v-if="displatContent">
<component v-bind:is="component"></component>
</div>

 </div>
</template>

<script>
import Image from './imagecomponent';
import Video from './videocomponent';

import {bus} from '../main.js'
export default{
    components:{
   'imageview':Image,
   'videoview':Video
 },
    data(){
        return{
            component:'',
             isShowing:true,
             imageview:Image,
                videoview:Video,
             displatContent:false,
           isVideo:false

    }
        },
        created(){
bus.$on('display',(data)=>{
    this.displatContent = data.value
    if(this.displatContent === true && data.type === 'Image'){
       console.log("Image")
        this.component = this.imageview
    }
     if(this.displatContent === true && data.type === 'Text'){
       this.displatContent = false
    }
     if(this.displatContent === true && data.type === 'Video'){
      console.log("video")
        this.component = this.videoview
    }
}),
bus.$on('go',(data)=>{
    console.log(data)
    this.displatContent=data
})


        },
        methods:{
        viewchange:function(){
            this.isVideo = true;
        },
        drag:function(ev) {
           
                ev.dataTransfer.setData('text',ev.target.id);
                
        }
},


}
</script>
<style scoped>
.leftStyle{
    height :100vh !important;
}
.btn {
    background-color: white;
    border: none;
    color: black;
    padding: 12px 16px;
    font-size: 16px;
    cursor: pointer;
}
.backgroundStyle{
    background-color:#F5F5F5;
     height :100vh !important;
}

</style>