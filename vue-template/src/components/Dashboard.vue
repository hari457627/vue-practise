<template>
  <div class="d-flex flex-column flex-grow h-100">
    <Templateheader></Templateheader>

    <!-- user after successful login -->
    <div v-bind:class="[isRightSidebar ? '' : 'flex-row-reverse','flex-grow','content_wrapper','d-flex','flex-row']">
        <Templatesidebar></Templatesidebar>
        <div id="template_body" v-bind:class="[withSidebar ? 'col-10' : 'col-12']">
          <router-view></router-view>
        </div>
    </div>
    <Templatefooter></Templatefooter>
  </div>
</template>

<script>
import Templateheader from './Header.vue'
import Templatesidebar from './Sidebar.vue'
import Templatemainbody from './Mainbody.vue'
import Templatefooter from './Footer.vue'

export default {
  name: 'Dashboard',
  components: {Templateheader, Templatesidebar, Templatemainbody, Templatefooter},
  data: function () {
    return {
      withSidebar:true,
      isRightSidebar:true
    }
  },
  mounted(){
    this.$root.$on('isSidebar', data => {
      this.withSidebar = data;
    });
    this.$root.$on('isRightSidebar', data => {
      this.isRightSidebar = data;
    });
  }
}
</script>

<style>
#template_body{
  border: 1px solid #000;
  width: 100%;
  transition: all 0.3s;
  padding:20px;
}
.content_wrapper{
  overflow-y: auto;
}
</style>
