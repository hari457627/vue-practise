<template>
    <div class="row">
        <div class="col-md-12">
            <div class="sampleFooter">
                <h2>copy rights reserved {{title}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'myFooter',
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
    }
}
</script>

<style scoped>
    .sampleFooter{
        width: 100%;
        border: 1px solid black;
        background-color: red;
        text-align: center;
        height: 100px;
        line-height: 50px;
    }
</style>


