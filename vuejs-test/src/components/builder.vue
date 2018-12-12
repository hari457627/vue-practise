<style src="./siteStyles.css"></style>
<style src="./builder.css"></style>
<template>
   <div class="row row-eq-height">
      <div class="campaign builder_body ">
         <div class="header_section">
            <div class="top_links" style="margin-left:23px;">
               <p>Learn IT marketing from TRIdigital</p>
            </div>
            <div class="top_links" style="float:right;margin-right:27px;">
               <p>Can't see images? <a href="#">Click Here</a></p>
            </div>
         </div>
         <div class="clearFloat"></div>
         <!-- Main Builder View -->
         <div class="builder_body" id="">
             <!-- logo -->
                
            <!-- sections  -->
            <div class="editorSection" id="sortable">
               <div v-for="(section, index) in sectiondata.sections">

                   <div class="panel_layout ui-state-default" v-bind:id="section.id">
                        <div class="panel panel_section">
                            <div class="panel-heading">
                                <button class="btn btn-default panel_buttons">Drag</button>
                                <button class="btn btn-default panel_buttons duplicate_button deleteButton" v-on:click="deletesection(index)">Delete</button>
                                <button class="btn btn-default panel_buttons duplicate_button">Duplicate</button>
                            </div>
                            <div class="panel-body panel_content" v-bind:id="section.colId" v-on:dragover="$event.preventDefault()" v-on:drop="drop(section)">                                
                                <div class="section_layout_boxes" v-bind:class="layout.class" v-for="layout in section.layouts">
                                    <div class="drag_content" v-if="section.data.length == 0">
                                        <span class="glyphicon glyphicon-save"></span>
                                        <p>Drag Here</p>
                                    </div>
                                    <div class="drag_content" v-for="component in section.data">
                                        <div v-if="component.type =='text'" >
                                            Text
                                        </div>
                                        <div v-if="component.type =='image'">
                                            Image
                                        </div>
                                    </div>
                                </div>                                    
                            </div>
                        </div>
                    </div>
               </div>
            </div>
         </div>
         <div class="add_section">
            <button type="button" class="btn btn-default add_section_button" data-toggle="popover" data-content="" data-placement="bottom">
            Add Section +
            </button>
         </div>
         <!-- Add section layout popover -->
         <div id="popper-content" class="hide popper-content addsection_popover">

             <!-- adding layouts to popover -->
             <div class="add_section_layouts" v-for="(layout, index) in layouts" v-bind:id="layout.id" v-on:click="sectionSelected(layout.id)">
               <div class="layouts_innerborder">
                  <div v-for="(col, index) in layout.cols" v-bind:class="col.class">
                  </div>
               </div>
            </div>
            
            <!-- <div class="add_section_layouts" id="addsectionlayoutcolumn1" v-on:click="sectionSelected('addsectionlayoutcolumn1')">
               <div class="layouts_innerborder">
                  <div class="layouts_column1">
                  </div>
               </div>
            </div>
            <div class="add_section_layouts" id="addsectionlayoutcolumn2" v-on:click="sectionSelected('addsectionlayoutcolumn2')">
               <div class="layouts_innerborder">
                  <div class="layouts_column2">
                  </div>
                  <div class="layouts_column2">
                  </div>
               </div>
            </div>
            <div class="add_section_layouts" id="addsectionlayoutcolumn3" v-on:click="sectionSelected('addsectionlayoutcolumn3')">
               <div class="layouts_innerborder">
                  <div class="layouts_column3">
                  </div>
                  <div class="layouts_column3">
                  </div>
                  <div class="layouts_column3">
                  </div>
               </div>
            </div>
            <div class="add_section_layouts" id="addsectionlayoutcolumn2model1" v-on:click="sectionSelected('addsectionlayoutcolumn2model1')">
               <div class="layouts_innerborder">
                  <div class="layouts_column3">
                  </div>
                  <div class="layouts_column2_model1">
                  </div>
               </div>
            </div>
            <div class="add_section_layouts" id="addsectionlayoutcolumn2model2" v-on:click="sectionSelected('addsectionlayoutcolumn2model2')">
               <div class="layouts_innerborder">
                  <div class="layouts_column2_model1">
                  </div>
                  <div class="layouts_column3">
                  </div>
               </div>
            </div> -->
         </div>
      </div>
      <!-- All builder actions display here -->
      <div class="editor action_body">
         <div class="action_section">
            <!-- action buttons will come here -->
            <div class="topsection">
               <button class="btn topsection_buttons" v-on:click="sendEmail"  v-bind:class="{actionButton: !actionSendEmail,selectedActionButton:actionSendEmail}"><span v-bind:class="{actionButtonText: !actionSendEmail,selectedActionButtonText:actionSendEmail}">send a test email</span></button>
               <button class="btn topsection_buttons" v-on:click="actionPreview" v-bind:class="{selectedActionButton: Preview,actionButton:!Preview}"><span v-bind:class="{actionButtonText: ! Preview,selectedActionButtonText: Preview}">Preview</span><i class="fa fa-bars fa-style"></i></button>
            </div>
            <div class="secondary_section">
               <div class="secondary_section_heading" v-show="!back">
                  <p>Build</p>
               </div>
               <div class="secondary_section_heading" v-show="settings">
                  <p>Settings</p>
               </div>
               <div class="secondary_section_heading" v-show="button">
                  <p>Button</p>
               </div>
               <div class="secondary_section_glyphicon" v-show="!back"><span class="glyphicon glyphicon-cog" v-on:click="settingsClicked"></span></div>
               <div class="secondary_section_glyphicon" v-show="back"><span class="glyphicon glyphicon-arrow-right" v-on:click="goBack"></span></div>
               <div class="clearFloat"></div>
            </div>
         </div>
         <!-- action body -->
         <div class="action_body_primary">
            <!-- action body draggable buttons -->
            <div class="primary_section" v-show="!back">
               <div class="draggable_buttons" draggable="true" v-on:dragstart="drag">
                  <div>
                     <span class="glyphicon glyphicon-align-left"></span>
                  </div>
                  <div>
                     <p>Text</p>
                  </div>
               </div>
               <div class="draggable_buttons">
                  <div>
                     <span class="glyphicon glyphicon-picture"></span>
                  </div>
                  <div>
                     <p>Image</p>
                  </div>
               </div>
               <div class="draggable_buttons">
                  <div>
                     <span class="glyphicon glyphicon-facetime-video"></span>
                  </div>
                  <div>
                     <p>Video</p>
                  </div>
               </div>
               <div class="draggable_buttons" v-on:click="buttonSelected">
                  <div>
                     <span class="glyphicon glyphicon-hdd"></span>
                  </div>
                  <div>
                     <p>Button</p>
                  </div>
               </div>
               <div class="draggable_buttons">
                  <div>
                     <span class="glyphicon glyphicon-resize-horizontal"></span>
                  </div>
                  <div>
                     <p>Divider</p>
                  </div>
               </div>
               <div class="draggable_buttons">
                  <div>
                     <span class="glyphicon glyphicon-text-height"></span>
                  </div>
                  <div>
                     <p>Spacer</p>
                  </div>
               </div>
               <div class="draggable_buttons">
                  <div>
                     <span class="glyphicon glyphicon-align-left"></span>
                  </div>
                  <div>
                     <p>Media</p>
                  </div>
               </div>
            </div>
            <!-- logo settings -->
            
            <!-- button settings -->
            <!-- <div class="logoSettings" v-show="button">
               <div class="logoDescription">
                  <div class="buttonStyleSection">
                     <p class="">Button Text</p>
                     <input type="text" class="buttonFields" placeholder="READ STEP 1" v-on:click="openColorPicker(color, $event)">
                  </div>
                  <div class="buttonStyleSection">
                     <p class="">Button link</p>
                     <input type="text" class="buttonFields">
                  </div>
                  <div class="buttonStyleSection">
                     <p class="inputPadding">Alignment</p>
                     <div class="buttonAlign">
                        <div class="buttonAlignInnerBox">
                           <div class="buttonAlignInnerBoxBorder">   
                           </div>
                        </div>
                     </div>
                     <div class="buttonAlign">
                        <div class="buttonAlignInnerBox">
                           <div class="buttonAlignInnerBoxBorder buttonAlignCenter">   
                           </div>
                        </div>
                     </div>
                     <div class="buttonAlign">
                        <div class="buttonAlignInnerBox">
                           <div class="buttonAlignInnerBoxBorder buttonAlignRight">   
                           </div>
                        </div>
                     </div>
                     <div class="buttonAlign">
                        <div class="buttonAlignInnerBox">
                           <div class="buttonAlignInnerFullBoxBorder">   
                           </div>
                        </div>
                     </div>
                     <div class="clearFloat"></div>
                  </div>
                  <div class="buttonStyleSection">
                     <p class="inputPadding">Button Style</p>
                     <div class="buttonAlign">
                        <div class="buttonAlignStyleBoxBorder buttonAlignStyleBoxBorderFill">   
                        </div>
                     </div>
                     <div class="buttonAlign">
                        <div class="buttonAlignStyleBoxBorder">   
                        </div>
                     </div>
                     <div class="clearFloat"></div>
                  </div>
                  <div class="buttonStyleSection">
                     <div class="buttonStyle">
                        <p class="inputPadding">Font Size</p>
                        <span class="button-select">
                           <select class="inp"  name="test">
                              <option v-for="fontsize in buttonfontsize">{{fontsize}}</option>
                           </select>
                        </span>
                     </div>
                     <div class="buttonStyle">
                        <p class="inputPadding">Font Style</p>
                        <span class="button-select">
                            <div class="secondary_color_display">
                            </div>
                            <div class="inp" >
                                <select name="test">
                                    <option v-for="fontstyle in buttonfontstyle">{{fontstyle}}</option>
                                </select>
                            </div>
                        </span>
                     </div>
                     <div class="buttonStyle">
                        <p class="inputPadding">Border Radius</p>
                        <span class="button-select">
                           <select class="inp"  name="test">
                              <option v-for="borderradius in buttonborderradius">{{borderradius}}</option>
                           </select>
                        </span>
                     </div>
                     <div class="buttonStyle">
                        <p class="inputPadding">Button Color</p>
                        <span class="button-select">
                           <select class="form-control buttonDropdowns" id="sel1">
                              <option>1</option>
                           </select>
                        </span>
                     </div>
                     <div class="clearFloat"></div>
                  </div>
               </div>
            </div> -->
         </div>
         <!-- action footer -->
         <div class="action_footer_primary">
            <div class="controls">
               <div class="action_footer_section">
                  <button class="btn action_body_topsection_buttons" v-on:click="sendEmail"  v-bind:class="{actionButton: !actionSendEmail,selectedActionButton:actionSendEmail}"><span v-bind:class="{actionButtonText: !actionSendEmail,selectedActionButtonText:actionSendEmail}">Back</span></button>
                  <button class="btn action_body_topsection_buttons" v-on:click="actionPreview" v-bind:class="{selectedActionButton: Preview,actionButton:!Preview}"><span v-bind:class="{actionButtonText: ! Preview,selectedActionButtonText: Preview}" v-on:click="savedata">Save and Continue</span></button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script src="./builder.js"></script>