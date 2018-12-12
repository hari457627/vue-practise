<template>
        <div class="row bodyView">
            <Leftview></Leftview>
            <Rightview></Rightview>
        </div>
</template>
<script>
import Leftview from './leftView/leftVue';
import Rightview from './rightView/rightVue';
import bus from '../../main.js';
export default {
    components:{ 'Leftview':Leftview, 'Rightview':Rightview},
    name: "myBody",
    data(){
        return {

        }
    },
    methods:{

    }
}
</script>
<style scoped>
.bodyView{
    min-height: 100vh;
}
</style>
