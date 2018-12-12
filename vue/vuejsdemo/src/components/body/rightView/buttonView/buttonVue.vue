<template>
    <div>
        <div class="buttonURL">
            <label for="buttonText">Enter Button Text</label><br>
            <input type="text" class="buttonURLField" id="btnText" value="" name="buttonText" placeholder="http://"/>
        </div>
        <div class="buttonURL">
            <label for="buttonURL">Enter Button URL(optional)</label><br>
            <input type="text" class="buttonURLField" id="btnUrl" value="" name="buttonURL" placeholder="http://"/>
        </div>
        <div class="buttonURL">
            <button class="btn btn-primary" v-on:click="buttonText">submit</button>
        </div>
        <div class="buttonURL">
            Alignment
        </div>
    </div>
</template>
<script>
import {bus} from '../../../../main.js';
export default {
    name: "buttonView",
    data:function(){
        return {

        }
    },
    methods:{
        buttonText:function(){
            console.log(document.getElementById('btnText').value);
            var data = {};
            data.btntext = document.getElementById('btnText').value;
            data.btnUrl = '';
            bus.$emit('btnText',data);
        }
    }
}
</script>
<style scoped>
.buttonURL{
    margin-top: 30px;
}
.buttonURLField{
    border:none;
    border-bottom: 1px solid black;
    background-color: rgb(244, 245, 249);
}
.buttonURLField:focus{
    outline: none;
}
</style>
