<template>
    <div class="col-md-12">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                <a class="navbar-brand" href="#">WebSiteName</a>
                </div>
                <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#">Page 1</a></li>
                <li><a href="#">Page 2</a></li>
                <li><a href="#">Page 3</a></li>
                </ul>
            </div>
        </nav> 
    </div>
</template>

<script>
import bus from '../../main';
export default {
    name : 'myHeader',
    props:name,
    data: function() {
        return{
        }
    },
    methods :{
    }
}
</script>

<style scoped>

</style>


