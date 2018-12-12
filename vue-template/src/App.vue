<template>
  <div id="app" class="container-fluid d-flex flex-column h-100">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function () {
    return {
    }
  },
}
</script>

<style>
html,body {
    height:100%;
}
.flex-grow {
    flex: 1 0 auto;
}
.container-fluid{
  padding: 0;
}
.row{
  margin: 0;
}
</style>
