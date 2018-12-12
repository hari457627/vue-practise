<template>
    <div class="row">
        <div class="col-md-12">
            <div class="sampleHeader">
            <h2 v-on:click="changeTitle">{{title}}</h2></div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'myHeader',
    props : {
        title :{
            type: String
        }
    },
    data: function() {
        return{

        }
    },
    methods :{
        changeTitle : function(){
            this.$emit('changeTitle','VueJS practise');
        }
    }
}
</script>

<style scoped>
    .sampleHeader{
        width: 100%;
        border: 1px solid black;
        background-color: green;
        text-align: center;
        height: 100px;
        line-height: 50px;
    }
</style>


