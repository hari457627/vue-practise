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
            buttonfontsize:['11','12','13','14','15'],
            buttonfontstyle:['11','12','13','14','15'],
            buttonborderradius:['1','2','3','4','5'],
            isInitializing: true,
            isSaving: false,
            clientId: null,
            templateId: null,
            campaignId: null,
            baseContactCountUrl: 'https://api.honeycrm.com/service/Contacts?$count=true&$top=0&$filter=ClientId eq ' + this.clientId + 'and ListContacts/any',
            acceptedFileTypes: {
                png: 'image/png',
                jpeg: 'image/jpeg',
                jpg: 'image/jpg'
            },
            byteSizeLimit: 2097152,
            editorHeight: 0,
            section1: false,
            section2: false,
            section3: false,
            section4: false,
            section5: false,
            steps: [{
                index: 0,
                slug: 'Type',
                name: 'Campaign Type',
                isComplete: false,
                isValid: true,
                validate: function() {
                    var isValidRegularSetting = !module.vue.campaign.isAbTest;
                    var isValidAbSetting = module.vue.campaign.isAbTest && module.vue.campaign.testType;

                    return isValidRegularSetting || isValidAbSetting;
                }
            }, {
                index: 1,
                slug: 'Settings',
                name: 'Campaign Settings',
                isComplete: false,
                isValid: true,
                validate: function() {
                    var isValid = module.vue.campaign.name &&
                        module.vue.campaign.subjectA &&
                        module.vue.campaign.fromName &&
                        module.vue.campaign.fromEmail;

                    if (module.vue.campaign.isAbTest && module.vue.campaign.testType === 'Subject') {
                        isValid = isValid && module.vue.campaign.subjectB;
                    }

                    return isValid;
                }
            }, {
                index: 2,
                slug: 'Content',
                name: 'Campaign Content',
                isComplete: false,
                isValid: true,
                validate: function() {
                    return true;
                }
            }, {
                index: 3,
                slug: 'Lists',
                name: 'Lists',
                isComplete: false,
                isValid: true,
                validate: function() {
                    return module.vue.selectedLists.length > 0;
                }
            }, {
                index: 4,
                slug: 'Review',
                name: 'Review',
                isComplete: false,
                isValid: true,
                validate: function() {
                    return true;
                }
            }, {
                index: 5,
                slug: 'Schedule',
                name: 'Schedule',
                isComplete: false,
                isValid: true,
                validate: function() {
                    if (!module.vue.sendNow) {
                        return module.vue.validateScheduledTime();
                    } else {
                        return true;
                    }
                }
            }],

            currentStep: {
                index: -1,
                slug: '',
                name: '',
                isComplete: false,
                isActive: false,
                isValid: false,
                validate: function() {
                    return true;
                }
            },

            isImageLoading: false,

            selectedObject: {
                type: null,
                value: null
            },

            uniqueContactCount: 0,
            testedContacts: 0,
            splitTestedContacts: 0,
            oddSplitCorrection: 0,

            isCalculatingUniqueContactCount: false,
            areDurationOptionsVisible: false,
            timePeriod: 'AM',
            hour: 10,
            minute: 10,
            areTimePeriodsOptionsOpen: false,
            isCalendarOpen: false,
            sendNow: true,
            isConfirmationWindowOpen: false,
            timeFromNow: '',
            timezones: [],
            areTimezonesOptionsOpen: false,
            isSavingCampaign: false,
            isVersionAComplete: false,
            campaign: {
                id: this.campaignId,
                sendDate: null,
                name: null,
                isAbTest: false,
                testType: null,
                subjectA: null,
                subjectB: null,
                fromName: null,
                fromEmail: null,
                currentConfiguration: {
                    background: "#c0c0c0",
                    logo: {
                        url: '',
                        align: 'center'
                    },
                    preheader: {
                        color: "#000000",
                        value: "",
                        isHovered: false
                    },
                    content: {
                        sections: []
                    },
                    footer: {
                        isHovered: false,
                        value: 'Your Company Name and Address Here',
                        align: 'left'
                    },
                    isHovered: false
                },
                configurationA: null,
                configurationB: null,
                duration: 0,
                durationUnit: 'hours',
                isScheduled: false,
                testMetric: null,
                testedContactsPercentage: 0,
                resultRecipients: '',
                timezone: 'Timezone',
                lists: []
            },
            template: {
                backgroundColor: '',
                backgroundFontColor: '',
                canvasColor: '',
                canvasFontColor: '',
                primaryColor: '',
                primaryFontColor: '',
                secondaryColor: '',
                secondaryFontColor: '',
                buttonColor: '',
                buttonFontColor: '',
                logoImageUrl: '',
                footer: ''
            }
        }
    },
    methods: {
        openColorPicker: function(property, event) {
            var element = event.target;

            $(element).ColorPicker({
                onSubmit: function(hsb, hex, rgb, el) {
                    module.vue.selectedObject.value[property] = '#' + hex;
                    $(el).ColorPickerHide();
                },
                onChange: function(hsb, hex, rgb) {
                    module.vue.selectedObject.value[property] = '#' + hex;
                },
                onBeforeShow: function() {
                    $(this).ColorPickerSetColor(module.vue.selectedObject.value[property]);
                }
            });

            $(element).click();
        },

        setAlignment: function(alignment) {
            this.selectedObject.value.align = alignment;
        },

        openImageDialog: function() {
            $('.editor .image-preview-input').click();
        },

        previewImageFile: function(event) {
            this.isImageLoading = true;

            var file = event.target.files[0];
            if (file) {
                var reader = new FileReader();

                reader.onloadend = function() {
                    if (file.size <= module.vue.byteSizeLimit && module.vue.checkFileType(file)) {
                        var result = reader.result;

                        var fileRequest = {
                            name: file.name,
                            url: result
                        };

                        module.vue.postImageFile(fileRequest);
                    } else {
                        if (file.size > module.vue.byteSizeLimit) {
                            bootbox.alert('File size exceeds the maximum amount of 2Mbs');
                        } else {
                            bootbox.alert('File needs to be of type png, jpg, or jpeg');
                        }
                    }
                };

                reader.readAsDataURL(file);
            }
        },

        postImageFile: function(request) {
            module.model.files.post(
                request,
                function(response) {
                    module.vue.selectedObject.value.url = response.Url;
                    module.vue.isImageLoading = false;
                },

                function(response) {
                    module.vue.isImageLoading = false;
                    bootbox.alert({
                        className: 'error-bootbox',
                        title: '<img class="error-bootbox-image" src="/Content/Images/warning.png"/>',
                        message: 'An error occurred while attempting to upload your image.'
                    });
                }
            );
        },

        checkFileType: function(file) {
            if (file.type == module.vue.acceptedFileTypes.png ||
                file.type == module.vue.acceptedFileTypes.jpeg ||
                file.type == module.vue.acceptedFileTypes.jpg) {
                return true;
            } else {
                return false;
            }
        },

        selectEditableObject: function(object, type) {
            if (!object.hasOwnProperty('isLocked') || !object.isLocked) {
                this.selectedObject.type = type;
                this.selectedObject.value = object;

                if (type === 'Element' && object.type === 'text') {
                    Vue.nextTick(function() {
                        module.vue.addElementTrixEditor();
                    });
                } else if (type === 'Footer') {
                    Vue.nextTick(function() {
                        module.vue.addFooterTrixEditor();
                    });
                }
            }
        },

        updateTrixContent: function() {
            if (module.vue.selectedObject.type === 'Element') {
                module.vue.selectedObject.value.value = $('#text-input').val();
            } else if (module.vue.selectedObject.type === 'Footer') {
                module.vue.selectedObject.value.value = $('#footer-input').val();
            }
        },

        addFooterTrixEditor: function() {
            $("#footer-input-form-group trix-toolbar").remove();
            $('#footer-input-form-group trix-editor').remove();
            $('#footer-input').val(module.vue.selectedObject.value.value);
            $('#footer-input-form-group').append('<trix-editor input="footer-input"></trix-editor>');
        },

        addElementTrixEditor: function() {
            $("#text-input-form-group trix-toolbar").remove();
            $('#text-input-form-group trix-editor').remove();
            $('#text-input').val(module.vue.selectedObject.value.value);
            $('#text-input-form-group').append('<trix-editor input="text-input"></trix-editor>');
        },

        togglePreheaderHover: function() {
            if (!this.campaign.currentConfiguration.preheader.hasOwnProperty('isLocked') || !this.campaign.currentConfiguration.preheader.isLocked) {
                this.campaign.currentConfiguration.preheader.isHovered = !this.campaign.currentConfiguration.preheader.isHovered;
            }
        },

        toggleFooterHover: function() {
            if (!this.campaign.currentConfiguration.footer.hasOwnProperty('isLocked') || !this.campaign.currentConfiguration.footer.isLocked) {
                this.campaign.currentConfiguration.footer.isHovered = !this.campaign.currentConfiguration.footer.isHovered;
            }
        },

        toggleElementHover: function(element) {
            if (!element.hasOwnProperty('isLocked') || !element.isLocked) {
                element.isHovered = !element.isHovered;
            }
        },

        toggleSectionHover: function(section) {
            if (!section.hasOwnProperty('isLocked') || !section.isLocked) {
                section.isHovered = !section.isHovered;
            }
        },

        toggleCampaignHover: function() {
            if (!this.campaign.currentConfiguration.hasOwnProperty('isLocked') || !this.campaign.currentConfiguration.isLocked) {
                this.campaign.currentConfiguration.isHovered = !this.campaign.currentConfiguration.isHovered;
            }
        },

        setAbTest: function(isAbTest) {
            this.campaign.isAbTest = isAbTest;

            if (!this.campaign.isAbTest) {
                this.campaign.testType = null;
            }

            if (this.campaign.isAbTest && this.steps.length == 6) {
                this.addAbStep();
            } else if (!this.campaign.isAbTest && this.steps.length == 7) {
                this.removeAbStep();
            }
        },

        addAbStep: function() {
            var step = {
                index: 4,
                slug: 'Split',
                name: 'A/B Split',
                isComplete: false,
                isValid: true,
                validate: function() {
                    return module.vue.uniqueContactCount > 0 &&
                        module.vue.campaign.testMetric &&
                        module.vue.campaign.duration > 0;
                }
            };

            this.steps.splice(4, 0, step);
            this.steps[5].index = 5;
            this.steps[6].index = 6;
        },

        removeAbStep: function() {
            this.steps.splice(4, 1);
            this.steps[4].index = 4;
            this.steps[5].index = 5;
        },

        setAbTestType: function(type) {
            if (type === 'Subject') {
                this.campaign.testType = 'Subject';
            } else {
                this.campaign.testType = 'Content';
            }
        },

        setTestMetric: function(type) {
            this.campaign.testMetric = type;
        },

        setDurationUnit: function(unit) {
            this.campaign.durationUnit = unit;
            this.areDurationOptionsVisible = false;
        },

        showDurationUnits: function() {
            this.areDurationOptionsVisible = true;
        },

        closeDurationOptions: function() {
            this.areDurationOptionsVisible = false;
        },

        goToPreviousStep: function() {
            if (this.currentStep.index <= 0) {
                window.location.href = '/';
            } else {
                this.currentStep = this.steps[this.currentStep.index - 1];
            }
        },

        shouldSendNow: function(bool) {
            this.sendNow = bool;
        },

        validateScheduledTime: function() {
            this.campaign.sendDate = $('#schedule-date').val();

            var areScheduleOptionsValid = this.checkIfScheduleOptionsAreValid();
            var isSendDateInTheFuture = this.checkIfSendDateIsInFuture();

            return areScheduleOptionsValid && isSendDateInTheFuture;
        },

        checkIfScheduleOptionsAreValid: function() {
            return this.campaign.sendDate &&
                (parseInt(this.hour) > 0 && parseInt(this.hour) < 13) &&
                (parseInt(this.minute) >= 0 && parseInt(this.hour) <= 60) &&
                (this.campaign.timezone != 'Timezone');
        },

        checkIfSendDateIsInFuture: function() {
            var date = this.getDateFromSendDate();
            var rightNow = moment.utc();

            var dateDifferenceInMilliseconds = date - rightNow;

            return dateDifferenceInMilliseconds > 0 ? true : false;
        },

        getDateFromSendDate: function() {
            var monthDayYear = td.helpers.getMonthDayYear(this.campaign.sendDate);
            return moment([monthDayYear[2], monthDayYear[0] - 1, monthDayYear[1], this.getMilitaryHour(), this.minute, '00', '00']);
        },

        setTimeFromNow: function() {
            var sendDate = this.getDateFromSendDate();
            var rightNow = moment.utc();

            this.timeFromNow = sendDate.from(rightNow);
        },

        getMilitaryHour: function() {
            if (this.timePeriod == 'AM') {
                if (this.hour == 12) {
                    return 0;
                } else {
                    return this.hour;
                }
            } else {
                if (this.hour != 12) {
                    return parseInt(this.hour) + 12;
                } else {
                    return this.hour;
                }
            }
        },

        goToNextStep: function() {
            this.currentStep.isValid = this.currentStep.validate();

            if (this.currentStep.isValid) {
                this.currentStep.isComplete = true;
                var isLastStep = this.currentStep.index >= this.steps.length - 1;

                if (this.currentStep.slug === 'Settings') {
                    this.campaign.configurationB = this.campaign.configurationB || this.campaign.configurationA;
                } else if (this.currentStep.slug == 'Lists') {
                    this.getUniqueContactCount();
                }

                if (this.campaign.id) {
                    if (!isLastStep) {
                        this.currentStep = this.steps[this.currentStep.index + 1];
                    } else {
                        this.campaign.isScheduled = true;
                        this.openConfirmationWindow();
                    }

                    this.saveCampaignCreationProgress();
                } else {
                    this.insertNewCampaign();
                }
            }
        },

        openConfirmationWindow: function() {
            if (this.campaign.sendDate) {
                this.setTimeFromNow();
            }

            this.isConfirmationWindowOpen = true;
        },

        closeConfirmationWindow: function() {
            this.isConfirmationWindowOpen = false;
        },

        goToStep: function(step) {
            if (step.isComplete || step == this.nextStep) {
                this.currentStep = step;

                if (this.currentStep.name == 'A/B Split' || this.currentStep.name == 'Schedule') {
                    this.getUniqueContactCount();
                }
            }
        },

        openCalendar: function() {
            if (this.campaign.sendDate) {
                this.isCalendarOpen = true;
                $('#schedule-date').datepicker('show');
            }
        },

        setScheduleDateOnCalendar: function() {
            Vue.nextTick(function() {
                $('#schedule-date').datepicker('setDate', new Date(module.vue.campaign.sendDate));
            })
        },

        closeCalendar: function() {
            this.isCalendarOpen = false;
        },

        setTimePeriod: function(timePeriod) {
            this.timePeriod = timePeriod;
        },

        showTimePeriodsOptions: function() {
            this.areTimePeriodsOptionsOpen = true;
            this.closeTimezonesOptions();
        },

        closeTimePeriodsOptions: function() {
            this.areTimePeriodsOptionsOpen = false;
        },

        setTimezone: function(timezone) {
            this.campaign.timezone = timezone;
        },

        showTimezonesOptions: function() {
            this.areTimezonesOptionsOpen = true;
            this.closeTimePeriodsOptions();
        },

        closeTimezonesOptions: function() {
            this.areTimezonesOptionsOpen = false;
        },

        addTimezones: function() {
            this.timezones = moment.tz.names();
        },

        initializeRangeSlider: function() {
            var $range = $('input[type="range"]');
            $range.rangeslider({
                polyfill: false,
                onInit: function() {
                    $rangeEl = this.$range;
                    $rangeEl.append('<div class="rangeslider__labels"></div>');
                },
                onSlide: function(position, value) {
                    var fraction = value / 100;
                    module.vue.campaign.testedContactsPercentage = value;
                    module.vue.testedContacts = Math.floor(module.vue.uniqueContactCount * fraction);
                    module.vue.splitTestedContacts = Math.floor(module.vue.testedContacts / 2);
                    module.vue.oddSplitCorrection = (module.vue.testedContacts % 2 == 1) ? 1 : 0;

                }
            });
            $range.val(module.vue.campaign.testedContactsPercentage || 0).change();
        },

        sortListByName: function() {
            module.vue.campaign.lists = module.vue.campaign.lists.sort(function(a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }

                return 0;
            });
        },

        getUniqueContactCount: function() {
            var restUrl = this.getFullContactCountUrl();

            this.isCalculatingUniqueContactCount = true;
            if (restUrl) {
                module.model.ajax.get(restUrl,
                    null,
                    function(response) {
                        module.vue.uniqueContactCount = response["@odata.count"];

                        var fraction = module.vue.campaign.testedContactsPercentage / 100;
                        module.vue.testedContacts = Math.floor(module.vue.uniqueContactCount * fraction);
                        module.vue.splitTestedContacts = Math.floor(module.vue.testedContacts / 2);
                        module.vue.oddSplitCorrection = (module.vue.testedContacts % 2 == 1) ? 1 : 0;

                        module.vue.isCalculatingUniqueContactCount = false;
                    },
                    function(response) {
                        module.vue.isCalculatingUniqueContactCount = false;
                        bootbox.alert({
                            className: 'error-bootbox',
                            title: '<img class="error-bootbox-image" src="/Content/Images/warning.png"/>',
                            message: 'An error occured while calculating your total unique contacts.'
                        });
                    }
                );
            }
        },

        getFullContactCountUrl: function() {
            if (this.selectedLists.length == 0) {
                return '';
            }
            if (this.selectedLists.length == 1) {
                return this.baseContactCountUrl + '(l: l/ListId eq ' + this.selectedLists[0].id + ')';
            } else {
                var parameters = '(l: l/ListId eq ' + this.selectedLists[0].id;
                for (var i = 1; i < this.selectedLists.length; i++) {
                    if ((this.selectedLists.length) == (i + 1)) {
                        parameters += ' or l/ListId eq ' + this.selectedLists[i].id + ')';
                    } else {
                        parameters += ' or l/ListId eq ' + this.selectedLists[i].id;
                    }
                }

                return this.baseContactCountUrl + parameters;
            }
        },

        saveCampaignCreationProgress: function() {
            this.isSavingCampaign = true;
            var listIds = [];
            var sendUtcDateFormat = null;

            if (this.selectedLists.length > 0) {
                listIds = this.getListsIdsFromSelectedLists();
            }

            if (this.campaign.sendDate) {
                var scheduledSendDate = this.getDateFromSendDate();
                sendUtcDateFormat = moment.utc(scheduledSendDate).tz(this.campaign.timezone).format();
            }

            var request = {
                Id: this.campaign.id,
                ClientId: clientId,
                ScheduledSendDate: sendUtcDateFormat,
                Name: this.campaign.name,
                TotalRecipients: this.contactCount,
                HasAbTest: this.campaign.isAbTest,
                TestType: this.campaign.testType,
                SubjectA: this.campaign.subjectA,
                SubjectB: this.campaign.subjectB,
                FromName: this.campaign.fromName,
                FromEmail: this.campaign.fromEmail,
                ConfigurationA: JSON.stringify(this.campaign.configurationA),
                ConfigurationB: JSON.stringify(this.campaign.configurationB),
                TestDurationAmount: this.campaign.duration,
                TestDurationType: this.campaign.durationUnit,
                IsScheduled: this.campaign.isScheduled,
                TestMetric: this.campaign.testMetric,
                TestPercent: this.campaign.testedContactsPercentage,
                ResultsRecipients: this.campaign.resultRecipients,
                Timezone: this.campaign.timezone,
                ListIds: listIds
            };

            module.model.ajax.put('/api/v1/Campaigns/',
                this.campaign.id,
                request,
                function(response) {
                    module.vue.isSavingCampaign = false;
                },
                function(response) {
                    module.vue.isSavingCampaign = false;
                    bootbox.alert({
                        className: 'error-bootbox',
                        title: '<img class="error-bootbox-image" src="/Content/Images/warning.png"/>',
                        message: 'An error occurred while updating your campaign options.'
                    });
                }
            );
        },

        getListsIdsFromSelectedLists: function() {
            var listOfIds = [];
            for (var i = 0; i < this.selectedLists.length; i++) {
                listOfIds.push(this.selectedLists[i].id);
            }

            return listOfIds;
        },

        insertNewCampaign: function() {
            this.isSavingCampaign = true;

            var request = {
                ClientId: clientId,
                ScheduledSendDate: this.campaign.sendDate,
                Name: this.campaign.name,
                TotalRecipients: this.contactCount,
                HasAbTest: this.campaign.isAbTest,
                TestType: this.campaign.testType,
                SubjectA: this.campaign.subjectA,
                SubjectB: this.campaign.subjectB,
                FromName: this.campaign.fromName,
                FromEmail: this.campaign.fromEmail,
                ConfigurationA: JSON.stringify(this.campaign.configurationA),
                ConfigurationB: JSON.stringify(this.campaign.configurationB),
                TestDurationAmount: this.campaign.duration,
                TestDurationType: this.campaign.durationUnit,
                IsScheduled: this.campaign.isScheduled,
                TestMetic: this.campaign.testMetric,
                TestPercent: this.campaign.testedContactsPercentage,
                ResultsRecipients: this.campaign.resultRecipients,
                Timezone: this.campaign.timezone,
                ListIds: this.campaign.lists
            };

            module.model.ajax.post('/api/v1/Campaigns/',
                request,
                function(response) {
                    module.vue.campaign.id = response.Id;
                    this.isSavingCampaign = false;
                },
                function(response) {
                    module.vue.isSavingCampaign = false;
                    bootbox.alert({
                        className: 'error-bootbox',
                        title: '<img class="error-bootbox-image" src="/Content/Images/warning.png"/>',
                        message: 'An error occurred while creating your campaign.'
                    });
                }
            );
        },

        getData: function() {
            module.vue.getListsAndCampaign();

            if (!this.campaign.id) {
                this.getAccountCustomizationColors();
            }
        },

        getListsAndCampaign: function() {
            module.model.ajax.get(
                'https://api.honeycrm.com/service/Lists?$expand=ListContacts($count=true;$top=0)&$filter=ClientId eq ' + this.clientId,
                null,
                function(response) {
                    for (var i = 0; i < response.value.length; i++) {
                        var list = {
                            id: response.value[i].Id,
                            name: (response.value[i].Name).trim(),
                            isSelected: false,
                            isMarketable: response.value[i].IsMarketable,
                            count: response.value[i]['ListContacts@odata.count']
                        };

                        module.vue.campaign.lists.push(list);
                    }

                    module.vue.sortListByName();

                    if (module.vue.campaign.id) {
                        module.vue.getCampaignData();
                    } else {
                        module.vue.initializeRangeSlider();
                        module.vue.isInitializing = false;
                    }
                },
                function(response) {
                    bootbox.alert({
                        className: 'error-bootbox',
                        title: '<img class="error-bootbox-image" src="/Content/Images/warning.png"/>',
                        message: 'An error occured during setup.'
                    });
                }
            );
        },

        getCampaignData: function() {
            if (this.campaign.id) {
                module.model.ajax.get('https://api.honeycrm.com/service/Campaigns/?$filter=Id eq ' + this.campaign.id + '&$expand=CampaignLists',
                    null,
                    function(response) {
                        var formattedScheduledSendDate = null;

                        if (response.value[0].ScheduledSendDate) {
                            var scheduledSendDate = moment.utc(response.value[0].ScheduledSendDate);
                            formattedScheduledSendDate = scheduledSendDate.format('MM/DD/YYYY');
                            module.vue.hour = scheduledSendDate.format('h');
                            module.vue.minute = scheduledSendDate.format('mm');
                            module.vue.timePeriod = scheduledSendDate.format('A');
                        }

                        module.vue.campaign.sendDate = formattedScheduledSendDate;
                        module.vue.campaign.name = response.value[0].Name;
                        module.vue.setAbTest(response.value[0].HasAbTest);

                        module.vue.campaign.testType = response.value[0].TestType;
                        module.vue.campaign.subjectA = response.value[0].SubjectA;
                        module.vue.campaign.subjectB = response.value[0].SubjectB;
                        module.vue.campaign.fromName = response.value[0].FromName;
                        module.vue.campaign.fromEmail = response.value[0].FromEmail;
                        module.vue.campaign.configurationA = JSON.parse(response.value[0].ConfigurationA);
                        module.vue.campaign.configurationB = JSON.parse(response.value[0].ConfigurationB);
                        module.vue.campaign.currentConfiguration = module.vue.campaign.configurationA;
                        module.vue.campaign.duration = response.value[0].TestDurationAmount;
                        module.vue.campaign.durationUnit = response.value[0].TestDurationType;
                        module.vue.campaign.isScheduled = response.value[0].IsScheduled;
                        module.vue.campaign.testMetric = response.value[0].TestMetric;
                        module.vue.campaign.testedContactsPercentage = response.value[0].TestPercent || 0;
                        module.vue.campaign.resultRecipients = response.value[0].ResultsRecipients;
                        module.vue.campaign.timezone = response.value[0].Timezone;

                        if (response.value[0].CampaignLists) {
                            module.vue.setSelectedLists(response.value[0].CampaignLists);
                        }

                        if (module.vue.campaign.sendDate) {
                            module.vue.setScheduleDateOnCalendar();
                        }

                        module.vue.initializeRangeSlider();
                        module.vue.isInitializing = false;
                    },
                    function(response) {

                    }
                );
            }
        },

        setSelectedLists: function(campaignLists) {
            for (var i = 0; i < campaignLists.length; i++) {
                for (var j = 0; j < module.vue.campaign.lists.length; j++) {
                    if (module.vue.campaign.lists[j].id == campaignLists[i].ListId) {
                        module.vue.campaign.lists[j].isSelected = true;
                    }
                }
            }
        },

        getAccountCustomizationColors: function() {
            module.model.ajax.get('/api/v1/Clients/',
                clientId,
                function(response) {
                    if (response.length === 0) {
                        module.vue.isInitializing = false;
                    } else {
                        module.vue.template.logoImageUrl = response.TemplateLogoImageUrl || '';
                        module.vue.template.backgroundColor = response.TemplateBackgroundColor || '#d8e2ee';
                        module.vue.template.backgroundFontColor = response.TemplateBackgroundFontColor || '#141414';
                        module.vue.template.primaryColor = response.TemplatePrimaryColor || '#000fb9';
                        module.vue.template.primaryFontColor = response.TemplatePrimaryFontColor || '#ffffff';
                        module.vue.template.secondaryColor = response.TemplateSecondaryColor || '#d5d5d5';
                        module.vue.template.secondaryFontColor = response.TemplateSecondaryFontColor || '#212529';
                        module.vue.template.canvasColor = response.TemplateCanvasColor || '#ffffff';
                        module.vue.template.canvasFontColor = response.TemplateCanvasFontColor || '#000000';
                        module.vue.template.buttonColor = response.TemplateButtonColor || '#ed7e33';
                        module.vue.template.buttonFontColor = response.TemplateButtonFontColor || '#ffffff';
                        module.vue.template.footer = response.TemplateFooter;

                        if (module.vue.templateId) {
                            module.vue.getTemplateConfiguration();
                        }

                        module.vue.isInitializing = false;
                    }
                },
                function(response) {
                    module.vue.isInitializing = false;
                    bootbox.alert({
                        className: 'error-bootbox',
                        title: '<img class="error-bootbox-image" src="/Content/Images/warning.png"/>',
                        message: 'There was an error while attempting to retrieve your email customization settings.'
                    })
                }
            );
        },

        getTemplateConfiguration: function() {
            module.model.ajax.get(
                'https://api.honeycrm.com/service/Templates?$filter=Id eq ' + this.templateId,
                null,
                function(response) {
                    var templateConfiguration = JSON.parse(response.value[0].Configuration);

                    var sections = templateConfiguration.content.sections;
                    templateConfiguration.background = module.vue.getTemplateConfigurationColor(templateConfiguration.background);
                    templateConfiguration.preheader.color = module.vue.getTemplateConfigurationColor(templateConfiguration.preheader.color);
                    templateConfiguration.logo.url = module.vue.template.logoImageUrl;
                    templateConfiguration.footer = {
                        value: module.vue.template.footer || 'Your Company Name and Address Here',
                        isHovered: false,
                        align: 'left'
                    };

                    if (sections) {
                        for (i = 0; i < sections.length; i++) {
                            var section = sections[i];
                            section.background = module.vue.getTemplateConfigurationColor(section.background);
                            if (section.columns) {
                                for (j = 0; j < section.columns.length; j++) {
                                    var column = section.columns[j];
                                    if (column.elements) {
                                        for (e = 0; e < column.elements.length; e++) {
                                            var element = column.elements[e];
                                            if (element.color) {
                                                element.color = module.vue.getTemplateConfigurationColor(element.color);
                                            }
                                            if (element.background) {
                                                element.background = module.vue.getTemplateConfigurationColor(element.background);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    module.vue.campaign.configurationA = templateConfiguration;
                    module.vue.campaign.configurationB = templateConfiguration;
                    module.vue.campaign.currentConfiguration = module.vue.campaign.configurationA;
                    module.vue.isInitializing = false;
                },
                function(response) {
                    module.vue.isInitializing = false;
                    bootbox.alert({
                        className: 'error-bootbox',
                        title: '<img class="error-bootbox-image" src="/Content/Images/warning.png"/>',
                        message: 'An error occured while fetching the template information.'
                    });
                }
            );
        },

        getTemplateConfigurationColor: function(color) {
            switch (color) {
                case '[BackgroundColor]':
                    return module.vue.template.backgroundColor
                    break;
                case '[BackgroundFontColor]':
                    return module.vue.template.backgroundFontColor;
                    break;
                case '[PrimaryColor]':
                    return module.vue.template.primaryColor;
                    break;
                case '[PrimaryFontColor]':
                    return module.vue.template.primaryFontColor;
                    break;
                case '[SecondaryColor]':
                    return module.vue.template.secondaryColor;
                    break;
                case '[SecondaryFontColor]':
                    return module.vue.template.secondaryFontColor;
                    break;
                case '[CanvasColor]':
                    return module.vue.template.canvasColor;
                    break;
                case '[CanvasFontColor]':
                    return module.vue.template.canvasFontColor;
                    break;
                case '[ButtonColor]':
                    return module.vue.template.buttonColor;
                    break;
                case '[ButtonFontColor]':
                    return module.vue.template.buttonFontColor;
                    break;
                default:
                    return color;
                    break;
            }
        },

        goToVersionB: function() {
            this.campaign.currentConfiguration = this.campaign.configurationB;
            this.selectedObject = {
                type: null,
                value: null
            };
            this.isVersionAComplete = true;
            this.saveCampaignCreationProgress();
        },

        goToVersionA: function() {
            this.campaign.currentConfiguration = this.campaign.configurationA;
            this.selectedObject = {
                type: null,
                value: null
            };
            this.isVersionAComplete = false;
            this.saveCampaignCreationProgress();
        },

        goToContentVersionA: function() {
            var step = this.getStepBySlug('Content');
            this.campaign.currentConfiguration = this.campaign.configurationA;
            this.isVersionAComplete = false;
            this.currentStep = step;
        },

        goToContentVersionB: function() {
            var step = this.getStepBySlug('Content');
            this.campaign.currentConfiguration = this.campaign.configurationB;
            this.isVersionAComplete = true;
            this.currentStep = step;
        },

        goToLists: function() {
            var step = this.getStepBySlug('Lists');
            this.currentStep = step;
        },

        getStepBySlug: function(slug) {
            for (var i = 0; i < module.vue.steps.length; i++) {
                var step = module.vue.steps[i];
                if (step.slug === slug) {
                    return step;
                }
            }

            return null;
        },

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
            if (ev === 'section1') {
                this.section1 = true;
                var section = document.getElementById('panelsection1');
                console.log(section);
                var parent = document.getElementById('editorSection');
                console.log(parent);
                parent.appendChild(section);
            } else if (ev === 'section2') {
                this.section2 = true;
                var section = document.getElementById('panelsection2');
                console.log(section);
                var parent = document.getElementById('editorSection');
                console.log(parent);
                parent.appendChild(section);
            } else if (ev === 'section3') {
                this.section3 = true;
                var section = document.getElementById('panelsection3');
                console.log(section);
                var parent = document.getElementById('editorSection');
                console.log(parent);
                parent.appendChild(section);
            } else if (ev === 'section4') {
                this.section4 = true;
                var section = document.getElementById('panelsection4');
                console.log(section);
                var parent = document.getElementById('editorSection');
                console.log(parent);
                parent.appendChild(section);
            } else {
                this.section5 = true;
                var section = document.getElementById('panelsection5');
                console.log(section);
                var parent = document.getElementById('editorSection');
                console.log(parent);
                parent.appendChild(section);
            }
        },
        deleteSection: function(ev) {
            if (ev === 'panelsection1') {

                this.section1 = false;
            } else if (ev === 'panelsection2') {
                this.section2 = false;

            } else if (ev === 'panelsection3') {
                this.section3 = false;

            } else if (ev === 'panelsection4') {
                this.section4 = false;

            } else {
                this.section5 = false;

            }
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
        uisort: function(ev) {

            $('#sampleId').draggable({
                cancel: false,
                drag: function(e, ui) {
                    //$('.panelLayout1').draggable();
                    $("#sortable").sortable();
                    $("#sortable").disableSelection();
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

$(document).ready(function() {

    $('[data-toggle="popover"]').popover({
        html: true,
        content: $('#popper-content')
    }).on('show.bs.popover', function() {
        $('#popper-content').addClass('show')
    }).on('hide.bs.popover', function() {
        $('#popper-content').addClass('hide')
    });


    // $(".draggable").draggable();
    // $(".draggable #sampleId").on('mousedown', function(e) {
    //     console.log(e);
    //     $("#sortable").sortable();
    //     $("#sortable").disableSelection();
    //     var mdown = document.createEvent("MouseEvents");
    //     mdown.initMouseEvent("mousedown", false, true, window, 0, e.screenX, e.screenY, e.clientX, e.clientY, true, false, false, true, 0, null);
    //     $(this).closest('.draggable')[0].dispatchEvent(mdown);
    // });
});