/**
 * Created by salah on 17/02/2018.
 */
define(['jquery', 'underscore', 'backbone',
        'modules/baseview/baseview',
        'text!modules/puzzleSingle/index.html',
        'PuzzleSingleModel',
        'draggablebackground',
        'colorpicker'
    ],
    function ($, _, Backbone, BaseView, template, PuzzleSingleModel) {

        var View = BaseView.extend({
            title: "Puzzle",

            secondaryevent: {
                "click #addBackground": "addBackground",
                "click #size_background": "sizeBackground",
                "click #size_zone": "choosSize",
                "click .chooseSize": "chooseSizeBt",
                "click #submitForm": "submitFormUpload",
                "click #submitFormText": "submitFormText",
                "click #add_text_zone": "add_text",
                "change #percentBg": "setPercentBg"
            },
            template: _.template(template),
            submitFormUpload: function () {
                $('#UploadFile').submit();
            },
            viewAppended: function () {
                var thisView = this;
                thisView.model = new PuzzleSingleModel;
                thisView.choosSize();
            },
            sizeBackground: function () {
                var thisView = this;
                thisView.model.calculatePercentBg();
                $('#percentBg').attr("max",thisView.model.get('percentBg'));
                $('#percentBg').val(thisView.model.get('percentBg'));
                $('#bs-range-percent').modal();
            },
            add_text: function () {
                var thisView = this;
                $("#bs-textBox").modal();
                $('#color').ColorPicker({
                    color: '#0000ff',
                    onSubmit: function(hsb, hex, rgb, el) {
                        $(el).val(hex);
                        $(el).ColorPickerHide();
                    },
                    onBeforeShow: function () {
                        $(this).ColorPickerSetColor(this.value);
                    }
                });
            },
            submitFormText: function () {
                var text = $('#text').val();
                var size = $('#size').val();
                var police = $('#police').val();
                var color = $('#color').val();
                var $div = $('.text_block');
                $div.html(text);
                $div.removeClass("hidden");
                /*$div.css({
                    'color' : color,
                    'width': 'fit-content',
                    'font-size': size+"px"

                });*/
                $div.attr('style',"color : #"+color+"; width:fit-content; font-size: "+size+"px");
                $('#bs-textBox').modal('hide');
                if($('.text_block').hasClass("ui-draggable")) {
                    $(".text_block").draggable("destroy");
                }
                $( ".text_block" ).draggable({ containment: ".zonePuzzle", scroll: false });
                return false;
            },
            setPercentBg : function (event) {
                var thisView = this;
                var val = $(event.currentTarget).val();
                thisView.model.set('percentBg',val);
                $('.zonePuzzle').css({
                    'background-size' : thisView.model.get('percentBg') + "%"
                });
            },
            chooseSizeBt: function (event) {
                var thisView = this;
                thisView.model.set('ratio', $(event.currentTarget).attr('data-value'));
                $('#bs-chooseSize').modal('hide');
                thisView.model.set("width",  $('.zonePuzzle').closest('.pmd-card-body').width() - 20 );
                thisView.model.set('height', thisView.model.get('width') * parseFloat(thisView.model.get('ratio')));
                $('.zonePuzzle').height(thisView.model.get('height'));
                // todo : get size image
                thisView.model.calculatePercentBg();
            },
            choosSize : function () {
                $('#bs-chooseSize').modal();
            },
            //
            addBackground:function (event) {
                var thisView = this;
                $('#bs-uploadFile').modal();
                $('#UploadFile').ajaxForm({
                    dataType : "json",
                    success: function(result) {
                        var image = result[0];
                        thisView.model.set('bg', ASSETS_URL+image["file"]);
                        thisView.model.set('widthbg', image["width"]);
                        thisView.model.set('heightbg', image["height"]);
                        $('.zonePuzzle').css({
                            'background':'url(' +thisView.model.get('bg') + ')',
                            'background-position' : 'center',
                            'background-size' : thisView.model.get('percentBg') + "%",
                            'background-repeat' : "no-repeat"
                        });
                        $('#size_background').removeClass("hidden");
                        $('.zonePuzzle').backgroundDraggable({
                            done: function() {
                                backgroundPosition = $('div').css('background-position');
                                console.log(backgroundPosition);
                            }
                        });
                    },
                    complete: function(xhr) {
                        $('#bs-uploadFile').modal('hide');
                    }
                });

            },
            render: function () {
                this.el.innerHTML = this.contentTemplate();
                return this;
            }
        });
        return View;
    });


