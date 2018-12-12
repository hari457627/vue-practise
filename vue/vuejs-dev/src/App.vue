<style src="./styles.css"></style>
<template>
   <div id="app" class="module step-module create-campaign-module">
      <div class="container-fluid">
         <div class="row row-eq-height">
            <div class="campaign builder_body" id="campaign_builder">
               <div class="headings">
                  <div class="headerLinks" style="margin-left:23px;">
                     <p>Learn IT marketing from TRIdigital</p>
                  </div>
                  <div class="headerLinks" style="float:right;margin-right:27px;">
                     <p>Can't see images? <a href="#">Click Here</a></p>
                  </div>
               </div>
               <div class="editorSection" id="sortable">
                  
               </div>
               <div id="panel-show">

               </div>
               <div class="addSection">
                  <button type="button" class="btn btn-default addSectionButton" data-toggle="popover" data-content="" data-placement="bottom">
                  Add Section +
                  </button>
               </div>
            
               <!-- bootstrap popover -->
               <div id="popper-content" class="hide popper-content">
                  <div class="fullSection newSection" id="section1" v-on:click="sectionSelected('section1')">
                     <div class="innerSection">
                        <div class="innerRectangle">
                        </div>
                     </div>
                  </div>
                  <div class="twoSection newSection" id="section2" v-on:click="sectionSelected('section2')">
                     <div class="innerSection">
                        <div class="innerTwoRectangle">
                        </div>
                        <div class="innerTwoRectangle">
                        </div>
                     </div>
                  </div>
                  <div class="threeSection newSection" id="section3" v-on:click="sectionSelected('section3')">
                     <div class="innerSection">
                        <div class="innerThreeRectangle">
                        </div>
                        <div class="innerThreeRectangle">
                        </div>
                        <div class="innerThreeRectangle">
                        </div>
                     </div>
                  </div>
                  <div class="fourthSection newSection" id="section4" v-on:click="sectionSelected('section4')">
                     <div class="innerSection">
                        <div class="innerThreeRectangle">
                        </div>
                        <div class="innerFourRectangle">
                        </div>
                     </div>
                  </div>
                  <div class="fifthSection newSection" id="section5" v-on:click="sectionSelected('section5')">
                     <div class="innerSection">
                        <div class="innerFourRectangle">
                        </div>
                        <div class="innerThreeRectangle">
                        </div>
                     </div>
                  </div>
               </div>
               <!-- bootstrap panel layout sections -->
               <div class="panelLayouts" id="sortable" v-if="true">
                  <div class="ui-state-default draggable panelLayout" id="panelsection5" v-show="section5">
                     <div class="panel">
                        <div class="panel-heading">
                           <button class="btn btn-default panelButtons sampleClass" id="sampleId">Drag</button>
                           <button class="btn btn-default panelButtons duplicateButton deleteButton" v-on:click="deleteSection">Delete</button>
                           <button class="btn btn-default panelButtons duplicateButton">Duplicate</button>
                        </div>
                        <div class="panel-body" id="col2-1">
                           <div class="contentBoxes leftContent">
                              <div class="dragContent">
                                 <span class="glyphicon glyphicon-save"></span>
                                 <p>Drag content here</p>
                              </div>
                           </div>
                           <div class="contentBoxes rightContent paddingSpace">
                              <div class="dragContent">
                                 <span class="glyphicon glyphicon-save"></span>
                                 <p>Drag content here</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="ui-state-default panelLayout" id="panelsection4" v-show="section4">
                     <div class="panel">
                        <div class="panel-heading">
                           <button class="btn btn-default panelButtons">Drag</button>
                           <button class="btn btn-default panelButtons duplicateButton deleteButton" v-on:click="deleteSection">Delete</button>
                           <button class="btn btn-default panelButtons duplicateButton">Duplicate</button>
                        </div>
                        <div class="panel-body" id="col2-2">
                           <div class="contentBoxes rightContent">
                              <div class="dragContent">
                                 <span class="glyphicon glyphicon-save"></span>
                                 <p>Drag content here</p>
                              </div>
                           </div>
                           <div class="contentBoxes leftContent paddingSpace">
                              <div class="dragContent">
                                 <span class="glyphicon glyphicon-save"></span>
                                 <p>Drag content here</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="panelLayout ui-state-default" id="panelsection1" v-show="section1">
                     <div class="panel">
                        <div class="panel-heading">
                           <button class="btn btn-default panelButtons">Drag</button>
                           <button class="btn btn-default panelButtons duplicateButton deleteButton" v-on:click="deleteSection">Delete</button>
                           <button class="btn btn-default panelButtons duplicateButton">Duplicate</button>
                        </div>
                        <div class="panel-body" id="col1">
                           <div class="contentBoxes fullContentBox">
                              <div class="dragContent">
                                 <span class="glyphicon glyphicon-save"></span>
                                 <p>Drag content here</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="panelLayout ui-state-default" id="panelsection2" v-show="section2">
                     <div class="panel">
                        <div class="panel-heading">
                           <button class="btn btn-default panelButtons">Drag</button>
                           <button class="btn btn-default panelButtons duplicateButton deleteButton" v-on:click="deleteSection">Delete</button>
                           <button class="btn btn-default panelButtons duplicateButton">Duplicate</button>
                        </div>
                        <div class="panel-body" id="col2">
                           <div class="contentBoxes equalTwoBoxes">
                              <div class="dragContent">
                                 <span class="glyphicon glyphicon-save"></span>
                                 <p>Drag content here</p>
                              </div>
                           </div>
                           <div class="contentBoxes equalTwoBoxes paddingSpace">
                              <div class="dragContent">
                                 <span class="glyphicon glyphicon-save"></span>
                                 <p>Drag content here</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="panelLayout ui-state-default" id="panelsection3" v-show="section3">
                     <div class="panel">
                        <div class="panel-heading">
                           <button class="btn btn-default panelButtons">Drag</button>
                           <button class="btn btn-default panelButtons duplicateButton deleteButton" v-on:click="deleteSection">Delete</button>
                           <button class="btn btn-default panelButtons duplicateButton">Duplicate</button>
                        </div>
                        <div class="panel-body" id="col3">
                           <div class="contentBoxes equalThreeBoxes">
                              <div class="dragContent">
                                 <span class="glyphicon glyphicon-save"></span>
                                 <p>Drag content here</p>
                              </div>
                           </div>
                           <div class="contentBoxes equalThreeBoxes paddingSpace">
                              <div class="dragContent">
                                 <span class="glyphicon glyphicon-save"></span>
                                 <p>Drag content here</p>
                              </div>
                           </div>
                           <div class="contentBoxes equalThreeBoxes paddingSpace">
                              <div class="dragContent">
                                 <span class="glyphicon glyphicon-save"></span>
                                 <p>Drag content here</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="editor rightSection action_body">
               <div class="action_section">
                  <!-- action buttons will come here -->
                  <div class="rightTopSection">
                     <button class="btn rightTopSectionButtons" v-on:click="sendEmail"  v-bind:class="{actionButton: !actionSendEmail,selectedActionButton:actionSendEmail}"><span v-bind:class="{actionButtonText: !actionSendEmail,selectedActionButtonText:actionSendEmail}">send a test email</span></button>
                     <button class="btn rightTopSectionButtons" v-on:click="actionPreview" v-bind:class="{selectedActionButton: Preview,actionButton:!Preview}"><span v-bind:class="{actionButtonText: ! Preview,selectedActionButtonText: Preview}">Preview</span><i class="fa fa-bars fa-style"></i></button>
                  </div>
                  <div class="rightSecondarySection">
                     <div class="rightSecondarySectionHeading" v-show="!back">
                        <p>Build</p>
                     </div>
                     <div class="rightSecondarySectionHeading" v-show="settings">
                        <p>Settings</p>
                     </div>
                     <div class="rightSecondarySectionHeading" v-show="button">
                        <p>Button</p>
                     </div>
                     <div class="rightSecondarySectionGlyphicon" v-show="!back"><span class="glyphicon glyphicon-cog" v-on:click="settingsClicked()"></span></div>
                     <div class="rightSecondarySectionGlyphicon" v-show="back"><span class="glyphicon glyphicon-arrow-right" v-on:click="goBack()"></span></div>
                  </div>
               </div>
               <!-- action body -->
               <div class="action_body_primary">
                  <div class="rightThirdSection" v-show="!back">
                     <div class="draggableButtons">
                        <div>
                           <span class="glyphicon glyphicon-align-left"></span>
                        </div>
                        <div>
                           <p>Text</p>
                        </div>
                     </div>
                     <div class="draggableButtons">
                        <div>
                           <span class="glyphicon glyphicon-picture"></span>
                        </div>
                        <div>
                           <p>Image</p>
                        </div>
                     </div>
                     <div class="draggableButtons">
                        <div>
                           <span class="glyphicon glyphicon-facetime-video"></span>
                        </div>
                        <div>
                           <p>Video</p>
                        </div>
                     </div>
                     <div class="draggableButtons" v-on:click="buttonSelected">
                        <div>
                           <span class="glyphicon glyphicon-hdd"></span>
                        </div>
                        <div>
                           <p>Button</p>
                        </div>
                     </div>
                     <div class="draggableButtons">
                        <div>
                           <span class="glyphicon glyphicon-resize-horizontal"></span>
                        </div>
                        <div>
                           <p>Divider</p>
                        </div>
                     </div>
                     <div class="draggableButtons">
                        <div>
                           <span class="glyphicon glyphicon-text-height"></span>
                        </div>
                        <div>
                           <p>Spacer</p>
                        </div>
                     </div>
                     <div class="draggableButtons">
                        <div>
                           <span class="glyphicon glyphicon-align-left"></span>
                        </div>
                        <div>
                           <p>Media</p>
                        </div>
                     </div>
                     <div class="clearFloat">

                     </div>
                  </div>
                  <div class="logoSettings" v-show="settings">
                     <div class="logoHeader">
                        <p>Logo</p>
                     </div>
                     <div class="logoNavbar">
                        <section id="tabs">
                           <ul class="nav nav-tabs" role="tablist">
                              <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Image</a></li>
                              <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Text</a></li>
                              <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">None</a></li>
                           </ul>
                           <!-- Tab panes -->
                           <div class="tab-content">
                              <div role="tabpanel" class="tab-pane active" id="home">
                                 image
                              </div>
                              <div role="tabpanel" class="tab-pane" id="profile">
                                 text
                              </div>
                              <div role="tabpanel" class="tab-pane" id="messages">
                                 none
                              </div>
                           </div>
                        </section>
                     </div>
                  </div>
                  <div class="logoSettings" v-show="button">
                      <div class="logoDescription">
                        <div class="buttonStyleSection">
                            <p class="">Button Text</p>
                            <input type="text" class="buttonFields" placeholder="READ STEP 1">
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
                                        <select class="inp"  name="test">
                                            <option v-for="fontstyle in buttonfontstyle">{{fontstyle}}</option>
                                        </select>
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
                  </div>
               </div>
               <!-- action footer -->
               <div class="action_footer_primary">
                  <div class="controls">
                     <div class="footerSection">
                        <button class="btn rightTopSectionButtons" v-on:click="sendEmail"  v-bind:class="{actionButton: !actionSendEmail,selectedActionButton:actionSendEmail}"><span class="glyphicon glyphicon-arrow-left"></span><span v-bind:class="{actionButtonText: !actionSendEmail,selectedActionButtonText:actionSendEmail}">Back</span></button>
                        <button class="btn rightTopSectionButtons" v-on:click="actionPreview" v-bind:class="{selectedActionButton: Preview,actionButton:!Preview}"><span v-bind:class="{actionButtonText: ! Preview,selectedActionButtonText: Preview}">Save and Continue</span></button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script src="./app.js"></script>