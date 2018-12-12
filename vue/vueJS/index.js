// var sampletemplate = Vue.component('sampleTemplate',{
//   template: '<p>this is from re usuable component and my name is {{names}}</p>',
//   data: function(){
//     return {
//       names : 'harish'
//     }
//   }
// })


// var app4 = new Vue({
//   el : "#app-id",
//   data : {
//     message : "hi this is my first vuejs app " +  new Date().toLocaleString(),
//     name : "hari",
//     age : 25,
//     job : "Trainee Software Engineer",
//     link : "http://www.google.com",
//     sampleTag : "<h4>This is my sample html tag</h4>",
//     x : 0,
//     y : 0,
//     seen: false,
//     todos: [
//       { text: 'List item 1' },
//       { text: 'list item 2' },
//       { text: 'List item 3' }
//     ],
//     available:true,
//     seen:false
//   },
//   components: {sampletemplate: sampletemplate},
//   methods : {
//     greet : function(time){
//       return "Good " +  time + " " + this.name;
//     },
//     add : function(inc){
//       this.age = this.age + inc;
//     },
//     subtract : function(dec){
//       this.age = this.age - dec;
//     },
//     updateXY : function(event){
//       this.x = event.offsetX;
//       this.y = event.offsetY;
//     },
//     reverseMessage: function () {
//       this.message = this.message.split('').reverse().join('')
//     }
//   },
//   computed : {
//     dynamicClass : function(){
//       return {
//         sampleClass : this.available
//       }
//     }
//   }
// });
// app4.todos.push({ text: 'list item 4' })
