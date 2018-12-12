import Vue from 'vue'
import App from './App.vue'
import appFooter from './components/footer/footer'

export const bus = new Vue();

new Vue({
  el: '#app',
  template: '<App :dbkey="dbkey" />',
  components: { App },
  data:{dbkey:'hari'},
  render: h => h(App)
})
