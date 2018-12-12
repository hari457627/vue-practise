
export default {
    name: 'app',
    
    mounted() {
        InlineEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
                console.log(editor);
            })
            .catch(error => {
                console.error(error);
            });
    },

    data() {
        return {
            back: false,
            button:false,
            settings:false,
            actionSendEmail: false,
            Preview: true,
            inc: 0,
            editordata:[],
            sectionLayout:[],
            buttonfontsize:['11','12','13','14','15'],
            buttonfontstyle:['11','12','13','14','15'],
            buttonborderradius:['1','2','3','4','5'],
            section1:false,
            section2:false,
            section3:false,
            section4:false,
            section5:false,
        }
    },
    methods: {
        allowDrop: function(ev) {
            ev.preventDefault();
        },
        drag: function(ev) {
            if (ev.target.id === 'sampleText') {
                console.log(ev);
                ev.dataTransfer.setData("text", ev.target.id);
            } else if (ev.target.id === 'sampleButton') {
                ev.dataTransfer.setData("text", ev.target.id);
            } else {
                console.log(this.isClicked);
            }
        },
        drop: function(ev) {
            if (ev.dataTransfer.getData("text") === 'sampleText') {
                this.inc = this.inc + 1;
                console.log(document.getElementById(ev.dataTransfer.getData("text")));
                var div = document.createElement('div');
                var para = document.createElement('p');
                var text = document.createTextNode("This just got added");
                para.setAttribute('draggable', true);
                para.setAttribute('id', 'para1' + this.inc);
                para.addEventListener('dragstart', this.draggable);
                para.append(text);
                div.appendChild(para);
                console.log(div);
                document.getElementById('editorSection').appendChild(div);
                ev.preventDefault();
            } else if (ev.dataTransfer.getData("text") === 'sampleImage') {

                ev.preventDefault();
            } else {
                this.isClicked = !this.isClicked;
            }
        },
        draggable: function() {
            $('#para1' + this.inc).draggable({
                containment: "#editorSection",
                grid: [10, 10],
                snap: true,
                stop: function() {
                    var offset = $(this).offset();
                    console.log("Top: " + offset.top + " Left: " + offset.left);
                }
            });
        },
        popoverClick: function() {
            $('[data-toggle="popover"]').popover({
                container: 'body',
                html: true,
                content: function() {
                    return $('#myPopover').html();
                }
            }).click(function(e) {
                e.preventDefault();
            });

        },
        sectionSelected: function(ev) {
            $('[data-toggle=popover]').each(function (e) {
                // hide any open popovers when the anywhere else in the body is clicked
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $(this).popover('hide');
                }
            });
            if (ev === 'section1') {
                
                var originalSection = document.getElementById('panelsection1');
                this.appendsection(originalSection);
            } else if (ev === 'section2') {
                var originalSection = document.getElementById('panelsection2');
                this.appendsection(originalSection);
            } else if (ev === 'section3') {
                var originalSection = document.getElementById('panelsection3');
                this.appendsection(originalSection);
            } else if (ev === 'section4') {
                var originalSection = document.getElementById('panelsection4');
                this.appendsection(originalSection);
            } else {
                var originalSection = document.getElementById('panelsection5');
                this.appendsection(originalSection);
            }
        },
        appendsection:function(originalSection){
            this.inc = this.inc+1;
            var section = originalSection.cloneNode(true);
                section.style.display = 'block';
                section.style.marginLeft = '-32px';
                section.style.height = 'auto';
                section.setAttribute('id','section'+this.inc);
                var parent = document.getElementById('sortable');
                // this.editordata.push(section);
                // console.log(this.editordata);
                parent.appendChild(section);
                this.addjsondata(section);
        },
        addjsondata:function(section){
            
            var cols = section.getElementsByClassName('panel-body')[0].id;
            console.log(cols);
            if(cols === 'col1'){
                var section = [];
                var sectionInfo = {};
                sectionInfo.name  = cols;
                sectionInfo.columns = [];
                var column = {name:"text",value:"hello world"};
                sectionInfo.columns.push(column);
                section.push(sectionInfo);
                this.sectionLayout.push(section);
            }
            else if(cols === 'col2'){
                var section = [];
                var sectionInfo = {};
                sectionInfo.name  = cols;
                sectionInfo.columns = [];
                for(var i=0; i < 2; i++){
                    var column = {name:"text",value:"hello world"};
                    sectionInfo.columns.push(column); 
                }
                section.push(sectionInfo);
                this.sectionLayout.push(section);
            }
            else if(cols === 'col3'){
                var section = [];
                var sectionInfo = {};
                sectionInfo.name  = cols;
                sectionInfo.columns = [];
                for(var i=0; i < 3; i++){
                    var column = {name:"text",value:"hello world"};
                    sectionInfo.columns.push(column); 
                }
                section.push(sectionInfo);
                this.sectionLayout.push(section);
            }
            else {
                var section = [];
                var sectionInfo = {};
                sectionInfo.name  = cols;
                sectionInfo.columns = [];
                for(var i=0; i < 2; i++){
                    var column = {name:"text",value:"hello world"};
                    sectionInfo.columns.push(column); 
                }
                section.push(sectionInfo);
                this.sectionLayout.push(section);
            }
            console.log(this.sectionLayout);
        },
        deleteSection: function() {
            console.log('delete');
        },
        draggable: function(ev) {
            console.log(ev.currentTarget.id);
            $('#' + ev.currentTarget.id).draggable({
                containment: "#editorSection",
                grid: [5, 5],
                snap: true,
                stop: function() {
                    var offset = $(this).offset();
                    console.log("Top: " + offset.top + " Left: " + offset.left);
                }
            });
        },
        sendEmail() {
            console.log("email")
            this.Preview = false;
            this.actionSendEmail = true;
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
        }
    }
}

window.onload = function () {
       
}

$(document).ready(function() {

    $('[data-toggle="popover"]').popover({
        html: true,
        content: $('#popper-content')
    }).on('show.bs.popover', function() {
        $('#popper-content').addClass('show')
    }).on('hide.bs.popover', function() {
        $('#popper-content').addClass('hide')
    });


    $(".draggable").draggable();
    $(".draggable #sampleId").on('mousedown', function(e) {
        console.log(e);
        $("#sortable").sortable();
        $("#sortable").disableSelection();
        var mdown = document.createEvent("MouseEvents");
        mdown.initMouseEvent("mousedown", false, true, window, 0, e.screenX, e.screenY, e.clientX, e.clientY, true, false, false, true, 0, null);
        $(this).closest('.draggable')[0].dispatchEvent(mdown);
    });

    $( function() {
        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();
      } );

    $('body').click(function(e){
        $('[data-toggle=popover]').each(function () {
            // hide any open popovers when the anywhere else in the body is clicked
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    })

    $(document).click(function(event) {
        var text = $(event.target);
        if($('#popper-content').find('.'+text[0].className).length !== 0){
            console.log('present');
        }
        else{
            var panelremove = $('#sortable').find(".panelLayout");
            // hide all panelheadings
            if(panelremove.length > 0){
                panelremove.each(function (index,element) {
                    $(element).find(".panel").css('border','none');
                    $(element).find(".panel-heading").css('display','none');   
                });   
            } 
        }
        
       
    });
    
});