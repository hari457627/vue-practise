<template>
  <div class="main_container">
    <Templateheader></Templateheader>
    <Templatesidebar></Templatesidebar>
    <div id="main_body" v-bind:class="['main_wrapper', isTemporaryView ? 'floating_body_active' : '']">
      <router-view></router-view>
    </div>
    <Templatefooter></Templatefooter>
  </div>
</template>

<script>
import Templateheader from './header.vue'
import Templatesidebar from './sidebar.vue'
import Templatemainbody from './body.vue'
import Templatefooter from './footer.vue'

export default {
  name: 'Dashboard',
  components: {Templateheader, Templatesidebar, Templatemainbody, Templatefooter},
  data: function () {
    return {
      isTemporaryView:false
    }
  },
  mounted(){
    this.$root.$on('defaultViewTemplate', data => {
      console.log(data);
    });
    this.$root.$on('temporaryViewTemplate', data => {
      this.isTemporaryView = !data;
    });
  }
}
</script>

<style>
.main_wrapper{
  display: flex;
  max-width: 100%;
  position: relative;
  padding-left: 300px;
  padding-top: 70px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
}
.floating_body_active{
  padding-left: 0 !important;
}
.mini_sidebar_active{
  padding-left: 80px !important;
}
.main_container{
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
}
</style>
