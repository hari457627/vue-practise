<template>
<div class="template_header">
    <button class="menu_icon" v-on:click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>
    <div class="app_header">
      <p>Application</p>
    </div>
</div>
</template>

<script>
  import Dashboard from './Dashboard'
  export default {
    name: 'TemplateHeader',
    components: {Dashboard},
    data () {
      return {
        withSidebar: true,
        isRightSidebar:null
      }
    },
    methods:{
      toggleSidebar: function(){

        this.withSidebar = !this.withSidebar;
        this.$root.$emit('isSidebar', this.withSidebar);
        this.$root.$on('isRightSidebar', data => {
          this.isRightSidebar = data;
        });
        console.log(this.isRightSidebar);
        if(this.isRightSidebar === null || this.isRightSidebar === true){
          $('#sidebar').toggleClass('active');
        }
        else{
          $('#sidebar').toggleClass('active_right');
        }
      }
    }
  }
</script>

<style>
  .template_header{
    width: 100%;
    height: 70px;
    border: 1px solid black;
  }
  .menu_icon{
    height: 30px;
    width: 30px;
    margin-left: 20px;
    margin-top: 22px;
    float: left;
    background: transparent;
    border: none;
  }
  .menu_icon .fa-bars{
    font-size: 20px;
  }
  .app_header{
    font-size: 20px;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
  }
</style>
