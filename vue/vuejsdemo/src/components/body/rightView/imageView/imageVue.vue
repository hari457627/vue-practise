<template>
    <div class="imageView">
        <input type="file" value="choosefile"/>
        <div class="imageURL">
            <label for="fileURL">Enter image URL(optional)</label>
            <input type="text" class="imageURLField" value="" name="fileURL" placeholder="http://"/>
        </div>
    </div>
</template>
<script>
import {bus} from '../../../../main.js';
export default {
    name: "imageView",
    data(){
        return {

        }
    },
    methods:{
        
    }
}
</script>
<style scoped>
.imageView{
    margin-top: 30px;
}
.imageURL{
    margin-top: 30px;
}
.imageURLField{
    border:none;
    border-bottom: 1px solid black;
    background-color: rgb(244, 245, 249);
}
.imageURLField:focus{
    outline: none;
}
</style>
