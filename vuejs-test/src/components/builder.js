export default {
    data() {
        return {
            back: false,
            button:false,
            settings:false,
            actionSendEmail: false,
            Preview: true,
            inc: 0,
            buttonfontsize:['11','12','13','14','15'],
            buttonfontstyle:['11','12','13','14','15'],
            buttonborderradius:['1','2','3','4','5'],
            inc: 0,
            sectiondata: {
                sections: []
            },
            layouts:[
                {
                  "id":"addsectionlayoutcolumn1",
                  "count":1,
                  "cols":[{
                      "count":1,
                      "class":"layouts_column1"
                  }] 
                },
                {
                  "id":"addsectionlayoutcolumn2",
                  "count":2,
                  "cols":[
                      {
                      "class":"layouts_column2",
                      },
                      {
                        "class":"layouts_column2",
                      }
                    ] 
                },
                {
                    "id":"addsectionlayoutcolumn3",
                    "count":3,
                    "cols":[
                        {
                        "class":"layouts_column3",
                        },
                        {
                          "class":"layouts_column3",
                        },
                        {
                            "class":"layouts_column3",
                        }
                      ] 
                  },
                {
                    "id":"addsectionlayoutcolumn2model1",
                    "count":2,
                    "cols":[
                        {
                        "class":"layouts_column3",
                        },
                        {
                          "class":"layouts_column2_model1",
                        }
                      ] 
                },
                {
                    "id":"addsectionlayoutcolumn2model2",
                    "count":2,
                    "cols":[
                        {
                        "class":"layouts_column2_model1",
                        },
                        {
                          "class":"layouts_column3",
                        } 
                    ]
                }
            ]
        }
    },
    mounted() {
        
    },
    created() {
        
        $(document).ready(function() {

            $('[data-toggle="popover"]').popover({
                html: true,
                content: $('#popper-content')
            }).on('show.bs.popover', function() {
                $('#popper-content').addClass('show')
            }).on('hide.bs.popover', function() {
                $('#popper-content').addClass('hide')
            });

            $(function() {
                $("#sortable").sortable();
                $("#sortable").disableSelection();

            });

            $('body').click(function(e) {
                $('[data-toggle="popover"]').each(function() {
                    // hide any open popovers when the anywhere else in the body is clicked
                    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                        $(this).popover('hide');
                    }
                });
            })

            $(document).click(function(event) {
                var text = $(event.target);
                if ($('#popper-content').find('.' + text[0].className).length !== 0) {

                } else {
                    var panelremove = $('#sortable').find(".panel_layout");
                    // hide all panelheadings
                    if (panelremove.length > 0) {
                        panelremove.each(function(index, element) {
                            $(element).find(".panel").css('border', 'none');
                            $(element).find(".panel-heading").css('display', 'none');
                        });
                    }
                }

                if (text.closest('.panel_layout').length > 0) {
                    $('#' + text.closest('.panel_layout')[0].id).find(".panel").css('border', '1px solid #8274E8');
                    $('#' + text.closest('.panel_layout')[0].id).find(".panel-heading").css('display', 'block');
                }
            });
        });
    },

    methods: {
        sendEmail() {
            this.Preview = false
            this.actionSendEmail = true
        },
        actionPreview() {
            this.actionSendEmail = false
            this.Preview = true
        },
        goBack() {
            this.back = !this.back;
            this.settings = false;
            this.button = false;
        },
        settingsClicked:function(){
            this.back = !this.back;
            this.settings = true;
        },
        buttonSelected:function(){
            this.back = !this.back;
            this.button = true;
        },
        sectionSelected: function(ev) {
            $('[data-toggle=popover]').each(function(e) {
                // hide any open popovers when the anywhere else in the body is clicked
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $(this).popover('hide');
                }
            });

            if (ev === 'addsectionlayoutcolumn1') {
                this.addsection('addsectionlayoutcolumn1', "1");
            } else if (ev === 'addsectionlayoutcolumn2') {
                this.addsection('addsectionlayoutcolumn2', "2");
            } else if (ev === 'addsectionlayoutcolumn3') {
                this.addsection('addsectionlayoutcolumn3', "3");
            } else if (ev === 'addsectionlayoutcolumn2model1') {
                this.addsection('addsectionlayoutcolumn2model1', "2-1");
            } else {
                this.addsection('addsectionlayoutcolumn2model2', "2-2");
            }

        },
        addsection: function(sectionlayout,itemNo) {
            var section = {};
            section.type = sectionlayout;
            section.id = 'panelsection' + this.inc;
            section.colId = 'col' + itemNo;
            switch (sectionlayout) {
                case 'addsectionlayoutcolumn1':
                    section.layouts = [{
                        "class": "section_layout_column1"
                    }];
                    break;
                case 'addsectionlayoutcolumn2':
                    section.layouts = [{
                        "class": "section_layout_column2"
                    }, {
                        "class": "section_layout_column2 paddingSpace"
                    }];
                    break;
                case 'addsectionlayoutcolumn3':
                    section.layouts = [{
                        "class": "section_layout_column3"
                    }, {
                        "class": "section_layout_column3 paddingSpace"
                    }, {
                        "class": "section_layout_column3 paddingSpace"
                    }];
                    break;
                case 'addsectionlayoutcolumn2model1':
                    section.layouts = [{
                        "class": "section_layout_column2modelleftbox"
                    }, {
                        "class": "section_layout_column2modelrightbox paddingSpace"
                    }];
                    break;
                case 'addsectionlayoutcolumn2model2':
                    section.layouts = [{
                        "class": "section_layout_column2modelrightbox"
                    }, {
                        "class": "section_layout_column2modelleftbox paddingSpace"
                    }];
                    break;
            }
            section.data = [];
            this.sectiondata.sections.push(section);
            this.inc = this.inc + 1;
        },
        deletesection: function(index) {
            this.sectiondata.sections.splice(index, 1);
        },
        savedata: function() {
            var result = [];
            var id = $('#sortable').find('.panel_layout');
            if (id.length > 0) {
                var itemOrder = $('#sortable').find(".panel_layout");
                console.log(itemOrder);
                for (var i = 0; i < itemOrder.length; i++) {
                    for (var j = 0; j < this.sectiondata.sections.length; j++) {
                        if (itemOrder[i].id === this.sectiondata.sections[j].id) {
                            var temp = this.sectiondata.sections[j];
                            this.sectiondata.sections[j] = this.sectiondata.sections[i];
                            this.sectiondata.sections[i] = temp;
                        }
                    }
                }
                console.log(this.sectiondata.sections);
            }
        },
        openColorPicker: function(property, event) {
            var element = event.target;
            console.log(element);
            $(element).ColorPicker({
                onSubmit: function(hsb, hex, rgb, el) {
                    // module.vue.selectedObject.value[property] = '#' + hex;
                    $(el).ColorPickerHide();
                },
                onChange: function(hsb, hex, rgb) {
                    // module.vue.selectedObject.value[property] = '#' + hex;
                },
                onBeforeShow: function() {
                    // $(this).ColorPickerSetColor(module.vue.selectedObject.value[property]);
                }
            });

            $(element).click();
        },
        allowDrop(ev) {   
            console.log(ev);
        },
        
        drag(ev) {
            console.log(ev);   
        },
        
        drop(ev) {    
            console.log(ev);   
        }
    }
}