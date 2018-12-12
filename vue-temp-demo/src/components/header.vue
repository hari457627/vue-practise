<template>
  <div v-bind:class="['template_header']" v-bind:style= "[defaultPadding ? {'padding-left':'300px'} : {'padding-left':'0px'}]">
    <button class="menu_icon" v-on:click="toggleSidebar" v-if="isPermanent">
      <i class="fas fa-bars"></i>
    </button>
    <div class="app_header">
      <p>Application</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'TemplateHeader',
    data () {
      return {
        isPermanent:true,
        isDefault:true,
        defaultPadding:true,
      }
    },
    methods:{
      toggleSidebar: function(){
        console.log('toogling');
        this.defaultPadding = !this.defaultPadding;
        $('#sidebar').toggleClass('floating_active');
        $('#main_body').toggleClass('floating_body_active');
      }
    },
    mounted(){
      this.$root.$on('defaultViewTemplate', data => {
          this.isDefault = !data;
      });
      this.$root.$on('permanentViewTemplate', data => {
          this.isPermanent = data;
      });
      this.$root.$on('temporaryViewTemplate', data => {
          this.defaultPadding = data;
      });
    }
  }
</script>

<style>
  .template_header{
    height: 70px;
    border: 1px solid black;
    position: fixed;
    width: 100%;
    z-index: 3;
    background-color: #fff;
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
