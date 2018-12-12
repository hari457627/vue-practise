<template>
  <div class="themes">
    <h1>
      hi theme
    </h1>
    <div>
      <p>Default</p>
    </div>
    <div>
      <label class="switch">
        <input type="checkbox" v-model="defaultView" v-on:input="defaultViewTemplate">
        <span class="slider round"></span>
      </label>
    </div>
    <div>
      <p>Permanent</p>
    </div>
    <div>
      <label class="switch">
        <input type="checkbox" v-model="permanentView" v-on:input="permanentViewTemplate">
        <span class="slider round"></span>
      </label>
    </div>
    <div>
      <p>Temporary</p>
    </div>
    <div>
      <label class="switch">
        <input type="checkbox" v-model="temporaryView" v-on:input="temporaryViewTemplate">
        <span class="slider round"></span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Themes',
  components: {
  },
  data: function(){
    return {
      defaultView:true,
      permanentView:false,
      temporaryView:false
    }
  },
  methods:{
    defaultViewTemplate:function(){
      this.permanentView  = false;
      this.temporaryView = false;
      this.$root.$emit('defaultViewTemplate',this.defaultView);
    },
    permanentViewTemplate:function(){
      this.temporaryView = false;
      this.defaultView = false;
      this.$root.$emit('permanentViewTemplate',this.permanentView);
    },
    temporaryViewTemplate:function(){
      this.permanentView  = false;
      this.defaultView = false;
      this.$root.$emit('temporaryViewTemplate',this.temporaryView);
    },
  },

}
</script>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.themes{
  padding: 20px;
}
</style>
