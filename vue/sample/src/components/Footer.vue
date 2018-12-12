<template>
<footer>
<p>{{title}}</p>

</footer>
</template>


<script>
export default {
 
  data () {
    return {
     title:'@Copyright'
    }
  }
}
</script>


<style scoped>
p{
color:lightgreen;
text-align:center;
}
footer{
 position:absolute;
   bottom:0;
   width:100%;
    background :black;
padding:10px;
}
</style>