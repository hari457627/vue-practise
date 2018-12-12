<template>
  <div id="sidebar" v-bind:class="['col-2','template_sidebar']">
    <ul class="list-unstyled components">
      <li v-on:click="newComponent(1,'dashboard')" :class="{ active : active_el == 1 }">
        <a>Dashboard</a>
      </li>
      <li v-on:click="newComponent(2,'about')" :class="{ active : active_el == 2 }">
          <a>About</a>
      </li>
      <li>
          <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
          <ul class="collapse list-unstyled" id="pageSubmenu">
              <li>
                  <a href="#">Page 1</a>
              </li>
              <li>
                  <a href="#">Page 2</a>
              </li>
              <li>
                  <a href="#">Page 3</a>
              </li>
          </ul>
      </li>
      <li v-on:click="newComponent(3,'portfolio')" :class="{ active : active_el == 3 }">
        <a>Portfolio</a>
      </li>
      <li v-on:click="newComponent(4,'contact')" :class="{ active : active_el == 4 }">
        <a>Contact</a>
      </li>
      <li v-on:click="newComponent(5,'theme')" :class="{ active : active_el == 5 }">
        <a>Themes</a>
      </li>

    </ul>
  </div>
</template>
<script>
export default {
    name: 'Sidebar',
    data: function () {
      return {
        active_el:1,
        isLeftSidebar:true,
        isRightbar:false
      }
    },
    methods:{
      newComponent:function(el,type){
        switch(type){
          case 'dashboard':
          this.$router.push({ name: 'dashboard' });
          this.active_el = el;
          break;
          case 'about':
          this.$router.push({ name: 'about' });
          this.active_el = el;
          break;
          case 'portfolio':
          this.$router.push({ name: 'portfolio' });
          this.active_el = el;
          break;
          case 'contact':
          this.$router.push({ name: 'contact' });
          this.active_el = el;
          break;
          case 'theme':
          this.$router.push({ name: 'themes' });
          this.active_el = el;
          break;
        }
      }
    },
    mounted(){
    this.$root.$on('isRightSidebar', data => {
      this.isLeftSidebar = data;
      this.isRightbar = !data;
    });
  }
  }
</script>
<style>
  .template_sidebar{
    padding: 0;
    border: 1px solid black;
  }
  #sidebar{
    background: #7386D5;
    color: #fff;
    transition: all 0.3s;
  }

  #sidebar ul p {
      color: #fff;
      padding: 10px;
  }

  #sidebar ul li a {
      padding: 10px;
      font-size: 1.1em;
      display: block;
      color:#fff;
  }

  #sidebar ul li:hover {
    cursor: pointer;
  }

  #sidebar ul li a:hover {
      color: #7386D5;
      background: #fff;
      text-decoration:none;
  }

  #sidebar ul li.active>a,
  a[aria-expanded="true"] {
      color: #7386D5;
      background: #fff;
  }

  a[data-toggle="collapse"] {
      position: relative;
  }

  .dropdown-toggle::after {
      display: block;
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
  }

  ul ul a {
      font-size: 0.9em !important;
      padding-left: 30px !important;
      background: #6d7fcc;
  }

  ul.CTAs {
      padding: 20px;
  }

  ul.CTAs a {
      text-align: center;
      font-size: 0.9em !important;
      display: block;
      border-radius: 5px;
      margin-bottom: 5px;
  }

  a.download {
      background: #fff;
      color: #7386D5;
  }

  a.article,
  a.article:hover {
      background: #6d7fcc !important;
      color: #fff !important;
  }

  #sidebar.active {
    margin-left: -240px;
  }

  #sidebar.active_right {
    margin-right: -240px;
  }

  @media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
  }
</style>
