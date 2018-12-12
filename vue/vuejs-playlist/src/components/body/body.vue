<template>
    <div class="row"> 
      <div class="col-md-9 col-sm-8 leftBar" id="targetId" v-on:drop="drop" v-on:dragover="allowDrop">
        
        <div id="editor" >
          
        </div>
        <button id="submit" v-if="isSubmit"  v-on:click="handleSubmit" class="btn btn-danger">submit</button>
        <div v-if="isClicked" class="drop display-inline align-center" @dragover.prevent @drop="onDrop">
          <div class="hidden display-inline align-center" v-if="image" v-bind:class="{ 'image': true }">
                  <img :src="image" alt="" class="img" />
                  <br>
                  <button class="btn" @click="removeFile">REMOVE</button>
          </div> 
          <p v-if="!image" style="line-height:20;">Drag Image</p>  
        </div><br>
        <button v-if="isClicked" v-on:click="isClick" class="btn btn-danger">Delete</button>
        <button v-if="isClicked" v-on:click="uploadPic" class="btn btn-success">Upload</button>
        
      </div>
      <div class="col-md-3 col-sm-4 rightBar">
          <div class="sampleButtons">
            <button class="btn btn-danger" id="sampleImage" draggable="true" @dragstart="drag">Image</button>
            <button class="btn btn-primary" id="sampleText" draggable="true" @dragstart="drag">Text</button>
            <button class="btn btn-success" id="sampleButton" draggable="true" @dragstart="drag">Button</button>
          </div>
          <div v-if="isClicked" class="sampleButtons">
            <div class="helper"></div>
            <label v-if="!image" class="btn btn-danger display-inline">
                Choose File
                <input type="file" name="image" @change="onChange">
            </label>
            <div v-if="!image" class="goBack" @click="isClick">Go back</div>  
        </div>
      </div> 
    </div>  
</template>

<script>
import Font from '@ckeditor/ckeditor5-font/src/font';

export default {
    name : 'myBody',
    data: function() {
        return{
          image: '',
          isClicked:false,
          isImageSelected:true,
          inc:0,
          editor:null,
          editorData:[],
          isSubmit:false,
          imageSelected:''
        }
    },
    created(){
      // InlineEditor.create( document.querySelector( '#editor') )
      // .then( editor => {
      //   console.log( editor );
        
      // })
      // .catch( error => {
      //     console.error( error );
      // } );
    },
    methods :{
        isClick: function(ev){
          return this.isClicked =!this.isClicked;
        },
        onDrop: function(e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files;
        this.createFile(files[0]);
      },

      onChange(e) {
        var files = e.target.files;
        this.createFile(files[0]);
        this.isImageSelected = false;
      },
      createFile(file) {
        if (!file.type.match('image.*')) {
          alert('Select an image');
          return;
        }
        var img = new Image();
        var reader = new FileReader();
        var vm = this;
        this.isImageSelected = false;
        reader.onload = function(e) {
          vm.image = e.target.result;
          this.imageSelected = ''+vm.image;
          console.log(this.imageSelected );
        }
        console.log(reader);
        reader.readAsDataURL(file);
      },
      removeFile() {
        this.image = '';
      },
      allowDrop:function(ev) {
        ev.preventDefault();
      },
      drag:function(ev) {
          if(ev.target.id === 'sampleText'){
            ev.dataTransfer.setData("text", ev.target.id);
          }
          else if(ev.target.id === 'sampleButton'){
            ev.dataTransfer.setData("text", ev.target.id);
          }
          else{
            console.log(this.isClicked);
            
          }
      },
      drop:function(ev) {
          if(ev.dataTransfer.getData("text") === 'sampleText'){
            console.log(this.inc);
            this.inc = this.inc+1;
          var div = document.createElement("div");
          var button = document.createElement("p");
          var text = document.createTextNode("This just got added");
          button.append(text);
          div.setAttribute('id','id'+this.inc);
          div.appendChild(button);
          document.getElementById('editor').appendChild(div);
          ev.preventDefault();
          // this.callEditor(); 
          }
          else if(ev.dataTransfer.getData("text") === 'sampleButton'){
            this.inc = this.inc+1;
          var div = document.createElement("div");
          var button = document.createElement("input");
          button.type = "button";
          button.value = "Button";
          button.setAttribute('class', 'btn btn-primary');
          div.setAttribute('id','id'+this.inc);
          div.appendChild(button);
          document.getElementById('editor').appendChild(div);
          ev.preventDefault();
          this.callEditor(); 
          }
          else{
            this.isClicked = !this.isClicked;
          }
      },
      goback:function(){
        this.image = !this.image;
      },
      callEditor:function(){
        InlineEditor.create( document.querySelector( '#id'+this.inc),
        
        {
        // plugins: [ Font ],
        // fontSize: {
        //   options: [
        //     { class: 'text-tiny', title: 'Tiny' },
        //     { class: 'text-small', title: 'Small' },
        //     { class: '', title: 'normal' }, // or maybe own setting? below
        //     { class: 'text-big', title: 'Big' },
        //     { class: 'font-big', title: 'Huge' }
        //   ]
        // },
        fontFamily: {
            options: [
                'default',
                'Ubuntu, Arial, sans-serif',
                'Ubuntu Mono, Courier New, Courier, monospace'
            ]
        },
        toolbar: ["undo", "redo", "bold", "italic", "blockQuote", "imageTextAlternative", "imageUpload", "heading", "imageStyle:full", "imageStyle:side", "link", "numberedList", "bulletedList","fontFamily"],
        }
      )
      .then( editor => {
        console.log( editor );
        console.log(Array.from( editor.ui.componentFactory.names() ));
        // editor.addCommand("mySimpleCommand", { // create named command
        //   exec: function(edt) {
        //       alert(edt.getData());
        //   }
        // });
        // editor.ui.addButton('SuperButton', { // add new button and bind our command
        //   label: "Click me",
        //   command: 'mySimpleCommand',
        //   toolbar: 'insert',
        //   icon: 'https://avatars1.githubusercontent.com/u/5500999?v=2&s=16'
        // });
        document.getElementById('id'+this.inc).focus();
      })
      .catch( error => {
          console.error( error );
      } );
      },
      uploadPic:function(){
        this.inc = this.inc+1;
        var div = document.createElement("div");
        div.setAttribute('id', 'id'+this.inc);
        var fig = document.createElement("figure");
        fig.setAttribute('class', 'image');
        var img = document.createElement("img");
        img.setAttribute('src', ''+this.image);
        img.setAttribute('style', 'height:300px;width:300px');
        var figCap = document.createElement("figcaption");
        //figCap.setAttribute('class', 'ck-editor__editable ck-editor__nested-editable ck-hidden ck-placeholder');
        fig.appendChild(img);
        fig.appendChild(figCap);
        div.appendChild(fig);
        document.getElementById('editor').appendChild(div);
        this.isClicked = !this.isClicked;
        this.callEditor();
      },
      textAreaCall:function(){
        
        
        ClassicEditor.create( document.querySelector( '#editor'+this.inc),
        {
          
        },
        {
        image: {
            // You need to configure the image toolbar, too, so it uses the new style buttons.
            toolbar: ["undo", "redo", "bold", "italic", "blockQuote", "imageTextAlternative", "imageUpload", "heading", "imageStyle:full", "imageStyle:side", "link", "numberedList", "bulletedList" ],

            styles: [
                // This option is equal to a situation where no style is applied.
                'full',

                // This represents an image aligned to the left.
                'alignLeft',

                // This represents an image aligned to the right.
                'alignRight'
            ]
        }
      } ).then( editor => {
        window.myEditor = editor;
        this.editor = editor;
      })
      // BalloonEditor.create( document.querySelector( '#editor'+this.inc)).catch( error => {
      //   console.error( error );
      //   window.myEditor = editor;
      //   this.editor = editor;
      // });
      // InlineEditor.create( document.querySelector( '#editor'+this.inc ) )
      // .then( editor => {
      //   console.log( editor );
      //   this.editor = editor;
      // })
      // .catch( error => {
      //     console.error( error );
      // } );
      },
      handleSubmit:function(){
        var editor = this.editor;
        console.log(this.editor);
        document.querySelector( '#submit' ).addEventListener( 'click', () => {
        const editorData = editor.getData();
        console.log(editorData);
        this.editorData.push(editorData);
        this.isSubmit = false;
        document.getElementsByClassName('ck-editor')[0].remove();
        this.image = '';
      });
        
        //   var div = document.createElement("div");
        // var fig = document.createElement("figure");
        // fig.setAttribute('class', 'image ck-widget');
        // var img = document.createElement("img");
        // console.log(this.image);
        // img.setAttribute('src', ''+this.image);
        // img.setAttribute('style', 'height:300px;width:300px');
        // var figCap = document.createElement("figcaption");
        // figCap.setAttribute('class', 'ck-editor__editable ck-editor__nested-editable ck-hidden ck-placeholder');
        // fig.appendChild(img);
        // fig.appendChild(figCap);
        // div.appendChild(fig);
        // document.getElementById('editor').appendChild(div);
        // this.isClicked = !this.isClicked;
      },
      submitForm:function(ev){
        console.log(ev);
      },
      clicked:function(){ 
      console.log(event.target);
      // BalloonEditor.create( document.querySelector( '#editor')).catch( error => {
      //   console.error( error );
      // });
      // DecoupledEditor
      //       .create( document.querySelector( '#editor' ) )
      //       .then( editor => {
      //           const toolbarContainer = document.querySelector( '#toolbar-container' );
      //           toolbarContainer.appendChild( editor.ui.view.toolbar.element );
      //       } )
      //       .catch( error => {
      //           console.error( error );
      //       } );
      // ClassicEditor.create( document.querySelector( '#editor'),{
      //   image: {
      //       // You need to configure the image toolbar, too, so it uses the new style buttons.
      //       toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],

      //       styles: [
      //           // This option is equal to a situation where no style is applied.
      //           'full',

      //           // This represents an image aligned to the left.
      //           'alignLeft',

      //           // This represents an image aligned to the right.
      //           'alignRight'
      //       ]
      //   }
      // } ).then( editor => {
      //   window.myEditor = editor;
      // })
      
      }
    },
//     mounted () {
//     CKEDITOR.replace( 'content', {
//       extraPlugins: 'mathjax',
      
//     } );
//  }
}
</script>

<style scoped>
    .leftBar {
      background-color: rgb(221, 230, 240);
      min-height: 100vh;
    }

    .sampleButtons{
      margin-top: 20px;
    }
    *{
      font-family: 'Arial';
      font-size: 12px;
    }
    *,*:after,*:before {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-touch-callout: none;
    }
    .btn {
      border: 0;
      color: #000;
      cursor: pointer;
      display: inline-block;
      font-weight: bold;
      padding: 8px 15px;
      position: relative;
    }

    input[type="file"] {
      position: absolute;
      opacity: 0;
      z-index: -1;
    }

    .align-center {
      text-align: center;
    }

    .helper {
      height: 100%;
      display: inline-block;
      vertical-align: middle;
      width: 0;
    }

    .hidden {
      display: none !important;
    }

    .hidden.image {
      display: inline-block !important;
    }

    .display-inline {
      display: inline-block;
      vertical-align: middle;
    }

    .img {
      border: 1px solid #f6f6f6;
      display: inline-block;
      max-width: 60%;
      width: auto;
    }

    .drop {
      margin-top: 30px;
      background-color: #f2f2f2;
      border: 4px dashed #ccc;
      background-color: #f6f6f6;
      border-radius: 1px;
      height: 70%;
      width: 70%;
    }

    .goBack{
      margin-top: 30px;
    }
    .goBack > a{
      font-size: 16px;
    }
    .sampleInput{
      width: 100px !important;
    }
    .dataSet{
      margin-top: 20px;
    }
    .imageUpload{
      margin: 20px;
      height: 200px !important;
      width: 200px !important;
    }

</style>


