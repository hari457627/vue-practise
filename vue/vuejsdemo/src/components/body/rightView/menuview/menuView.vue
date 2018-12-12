<template>
    <div class="menuView">
        <button class="btn btn-defualt glyphicon glyphicon-align-center" id="text" draggable="true" @dragstart="drag"></button>
        <button class="btn btn-defualt glyphicon glyphicon-picture" id="picture" draggable="true" @dragstart="drag"></button>
        <button class="btn btn-defualt glyphicon glyphicon-plus" id="button" draggable="true" @dragstart="drag"></button>
    </div>
</template>
<script>
import {bus} from '../../../../main.js';
export default {
    name: "menuView",
    data: function() {
        return{
          
        }
    },
    methods:{
        drag:function(ev) {
          ev.dataTransfer.setData("text", ev.target.id);
      }
    }
}
</script>
<style scoped>
.menuView{
    margin-top: 30px;
}
.iconButtons{
    margin-top: 30px;
}
.glyphicon{
    padding: 20px;
    margin-left: 5px;
    border-radius: 15%;
    font-size: 20px;
}
button:focus{
    outline: none;
}
</style>
