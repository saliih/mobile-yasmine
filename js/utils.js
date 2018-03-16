window.bootstrapdialoghide = false;

function addZero(n) {
    return n < 10 ? '0' + n : '' + n;
}

function ucwords(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}

function ucfirst(str) {
    return (str + '').replace(/^\s*([a-z])/, function ($1) {
        return $1.toUpperCase();
    });
}

function clickHandler() {
    $(".clickhandler").tap(function (e) {
        var _function = $(this).attr("clickhandler");
        eval(_function);
        e.preventDefault();
        return false;
    });
}

function checkInternetConnection() {
    if (typeof(navigator.connection) == "undefined")
        return true;
    var networkState = navigator.connection.type;

    if (networkState == Connection.NONE) {
        return false;
    } else {
        return true;
    }
}

function unset(array, valueOrIndex) {
    var output = [];
    for (var i in array) {
        if (i != valueOrIndex)
            output[i] = array[i];
    }
    return output;
}

function checkLogin(logindata) {


    if ((logindata == null
        || typeof(logindata) == "undefined"
        || logindata.result == false)
        && Backbone.history.getFragment() != 'login'
    ) {
        $(location).attr('href', "#login");
    }
}

function setAppData(key, val) {
    localStorage.setItem(key, typeof (val) == 'object' ? JSON.stringify(val) : val);
}

function getAppData(key, subkey, defaultValue) {
    var data = localStorage.getItem(key);
    if ((data != null) && (data.length != 0) && ((data[0] == "{") || (data[0] == "["))) {
        data = JSON.parse(data);
        if (typeof (subkey) != "undefined") {
            data = data[subkey];
        }
    }
    if ((data == null) && ( typeof (defaultValue) != 'undefined')) {
        return defaultValue;
    } else {
        return data;
    }
}

function ConnectionFailed() {
    if ($('.modal-open').length == 0)
        errorDialog('Erreur de connexion', "Vous devez vous re-connecter");
    setTimeout(function () {
        $(location).attr('href', "#login");
    }, 3000);
}

function webservice(service, _data, success_function, parameters, check) {
    parameters = parameters || {};
    check = check || "";
    if (typeof(parameters.showLoader) == "undefined") {
        parameters.showLoader = true;
    }
    if (parameters.showLoader) {
        showLoader();
    }
    var loginData = getAppData('loginData');
    $.ajax({
        type: typeof (parameters.type) == "undefined" ? "POST" : parameters.type,
        url: GV_URL + "/" + service,//+ "?access_token=" + loginData.token,
        data: _data,
        success: function (data) {
            if (typeof (success_function) == "function") {
                success_function(data);
            }
        },
        error: function (request, status, error) {
            if (error == "Unauthorized") {
                ConnectionFailed();
            }
        },
        complete: function () {
            if (parameters.showLoader) {
                hideLoader();
            }
        },
        async: typeof (parameters.async) == "undefined" ? true : parameters.async,
        cache: typeof (parameters.cache) == "undefined" ? true : parameters.cache
    });
}

function displ() {
    jQuery(".submenu").width(jQuery(window).width());
    jQuery(".sidebar").height(jQuery(document).height() - 168);
    jQuery(".sidebar_right").height(jQuery(document).height() - 120);

}

function showMessage(msg, title, callback, cancel, cancel_callback) {

    title = typeof (title) == "undefined" ? window.appTitle : title;
    errorDialog(title, msg)

}

function doResize() {
    var winhigh = $("body").height();
    //Get available screen height, not including any browser chrome
    var headhigh = $('header').first().outerHeight();
    var foothigh = $('footer').first().outerHeight();
    //Get height of first page's header
    //var foothigh = $('[data-role="footer"]').first().outerHeight(); //Get height of first page's header
    var $content = $('.contentDiv');
    //Get height of themes content containers padding
    winhigh = winhigh - headhigh - foothigh;
    //Calculate out new height (-2 if you have a 1px border on content container)
    $content.css('height', winhigh + 'px');
    $(".submenu").width(jQuery(window).width());

}

function showLoader() {
    $("#loading").show();
    window.loadingCount++;
}

function hideLoader() {
    window.loadingCount--;
    if (window.loadingCount <= 0) {
        window.loadingCount = 0;
        $("#loading").hide();
    }
}

function getTransMessage(key) {
    return key;
    key = key.toUpperCase();
    return ( typeof trans[key] != "undefined" ) ? trans[key] : key;
}


function successDialog(title, message, type, onshown, onclose) {
    BootstrapDialog.show({
        type: typeof(type) == "undefined" ? BootstrapDialog.TYPE_SUCCESS : type,
        title: title,
        message: message,
        buttons: [{
            label: 'Close',
            action: function (dialogRef) {
                dialogRef.close();
            }
        }],
        onhide: function (dialogRef) {
            window.bootstrapdialoghide = true;
            if (typeof(onclose) == "function") {
                onclose();
            }
        },
        onshown: onshown
    });
}

function errorDialog(title, message) {
    successDialog(title, message, BootstrapDialog.TYPE_DANGER);
}

function warningDialog(title, message) {
    successDialog(title, message, BootstrapDialog.TYPE_WARNING);
}

function confirmDialog(message, callback) {
    BootstrapDialog.show({
        title: "Confirmation",
        message: message,
        buttons: [{
            label: 'Yes',
            autospin: true,
            action: function (dialogRef) {
                callback();
                dialogRef.close();
            }
        }, {
            label: 'No',
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });
}

function promptDialog(message, callback) {
    BootstrapDialog.show({
        title: message,
        message: function (dialogItself) {
            var $titleDrop = $('<input class="form-control" placeholder="Name" type="text" />');
            dialogItself.setData('field-title-drop', $titleDrop);
            return $titleDrop;
        },
        buttons: [{
            label: 'OK',
            cssClass: 'btn-primary',
            hotkey: 13,
            action: function (dialogItself) {
                callback(dialogItself);
            }
        }]
    });
}

function openform(title) {
    if (!$(".sidebar_right").is(":visible"))
        $(".prop").trigger("click");
    if (typeof (title) != "undefined" && $('#titleform').length == 0) {
        $('form').prepend('<div class="form-group" id="titleform"><h1>' + title + '</h1></div>');
    } else {
        $('#titleform h1').html(title);
    }
}

function InitSidebar(type) {
    /**
     * type 1 : eleminate just   .suplementData
     */
    $('.suplementData').empty();
    if (type != 1) {
        $('#mainform .formulaire').empty();
    }
}

function addzero(str) {
    if (str.length == 1) {
        return "0" + str;
    }
    return str;
}

function webserviceCheckSession(service, _data, success_function, parameters) {
    var error;
    var loginData = getAppData('loginData');

    $.ajax({
        type: typeof (parameters.type) == "undefined" ? "POST" : parameters.type,
        url: GV_URL + "/" + service + "?access_token=" + loginData.token,
        data: _data,

        error: function (request, status, error) {
            //request = Object {readyState: 0, status: 0, statusText: "error"}, status = "error", error = ""
            clearInterval(window.login_check_interval);
            ConnectionFailed();
        },

        async: typeof (parameters.async) == "undefined" ? true : parameters.async,
        cache: typeof (parameters.cache) == "undefined" ? true : parameters.cache
    });
    return error;
}

function drawSelectTypeCost(collection, option, text) {
    text = text || "";
    $.each(collection, function (index, value) {
        var obj = {value: value.id, label: text + " > " + value.label};
        option.push(obj);
        if (value.childcost.length == 0) {

        } else {
            option = drawSelectTypeCost(value.childcost, option, text + " > " + value.label);

        }

    });
    return option;
}

function getchildJstree(collection) {
    var tab = [];
    $.each(collection, function (index, model) {
        var obj = {text: model.label, id: model.id};
        if (model.childcost.length > 0) {
            obj.children = getchildJstree(model.childcost, tab);
        }
        tab.push(obj);
    });
    return tab;
}
var getCollection = (function () {
    var coll = [];

    return function (collectionClass, callback, force) {
        if (!coll[collectionClass] || force) {
            coll[collectionClass] = new collectionClass();
            coll[collectionClass].fetch({
                success: function (collection) {
                    return callback(collection);
                }
            });
            return;
        }
        return callback(coll[collectionClass]);
    }
}());

function number_format(number, devise) {
    var thousands_sep = ' ';
    if (typeof(devise) == "undefined") {
        devise = true;
    } else {
        thousands_sep = ' ';
    }
    var decimals = 2;
    var dec_point = '.';
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k).toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
            .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }

    return s.join(dec) + (devise ? " €" : "");
}
function getPercentage(all, protion) {
    var percent = (protion * 100) / all;
    return number_format(percent, false)
}
function IsNumeric(input) {
    return (input - 0) == input && ('' + input).trim().length > 0;
}

function in_array(needle, array) {
    if ($.inArray(needle, array) != -1) {
        return true;
    }
    else {
        return false;
    }
}
function XmlCharts(id, value) {
    var data = {
        "faceAlpha": 9,
        "faceBorderAlpha": 4,
        "faceBorderColor": "#292F41",
        "faceBorderWidth": 5,
        "faceColor": "#42486B",
        "fontSize": 12,
        "color": "#fff",
        "fontSize": 8,

        "numberFormatter": {"precision": -1, "decimalSeparator": ",", "thousandsSeparator": " "},
        "type": "gauge",
        "arrows": [{
            "axis": "GaugeAxis-1",
            "color": "#07FFE5",
            "id": "GaugeArrow-1",
            "nailBorderThickness": 0,
            "nailRadius": 11,
            "radius": "100%",
            "startWidth": 16,
            "value": value
        }],
        "axes": [{
            "axisColor": "#292F41",
            "axisThickness": 5,
            "bandOutlineAlpha": 1,
            "bottomText": "",
            "bottomTextFontSize": 0,
            "bottomTextYOffset": 28,
            "endAngle": 116,
            "endValue": 100,
            "gridCount": 1,
            "id": "GaugeAxis-1",
            "labelFrequency": 2,
            "labelOffset": -30,
            "minorTickInterval": 5,
            "minorTickLength": 11,
            "radius": "75%",
            "tickColor": "#292F41",
            "tickLength": 11,
            "tickThickness": -1,
            "valueInterval": 10,
            "bands": [
                {
                    "color": "#00CC00",
                    "endValue": 35,
                    "id": "GaugeBand-1",
                    "startValue": 0
                },
                {
                    "color": "#ffac29",
                    "endValue": 65,
                    "id": "GaugeBand-2",
                    "startValue": 35
                },
                {
                    "color": "#ea3838",
                    "endValue": 100,
                    "id": "GaugeBand-3",
                    "startValue": 65
                }
            ]
        }],
        "extra": {"top": "0", "alerts": ""},
        "id": id,
        "allLabels": [],
        "balloon": {}
    }
    return data;
}
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
var horiz_widget_margin = 120;
function generateGridster(columnscount) {
    var device_width = $('body').width();
    var widgets = [];
    /* if (typeof(window.gridster) != "undefined") {
     if(typeof (window.gridster.serialize())!="undefined"){
     var s = window.gridster.serialize();
     }else{
     var s=[];
     }
     window.gridster.destroy();
     var i = 0;
     $(".gridster > ul > li").each(function () {
     if (typeof(s[i]) != "undefined") {
     var $li = $(this);
     var paramwidget = s[i];

     var $item = $($li);


     widgets.push({
     html: $item.html(),
     row: paramwidget.row,
     col: paramwidget.col,
     size_x: paramwidget.size_x,
     size_y: paramwidget.size_y
     });
     i++;
     }
     });

     $(".gridster > ul").html("");

     }*/

    window.gridster = $(".gridster > ul").gridster({
        widget_base_dimensions: [(Number(device_width - 20 * columnscount) / Number(columnscount) ), parseFloat(150)],
        widget_margins: [5, 5],
        helper: "clone",
        min_cols: 4,
        resize: false /*{
         enabled: true,
         stop: function (e, ui, $widget) {

         updateKpis();
         var $li_id = $widget.find(".collection-item");

         //resize chart
         var id = $li_id.attr('id');

         var chart = charts[id];
         chart.calcBodyHeight();
         chart.resize();
         }
         }*/,
        draggable: false/*{
         handle: ".kpiview-move",
         stop: function (event, ui) {
         updateKpis();
         }
         }*/
    }).data('gridster').disable();
    $.each(widgets, function (key, widget) {
        window.gridster.add_widget("<li>" + widget.html + "</li>", widget.size_x, widget.size_y, widget.col, widget.row);
        updateKpis();
    });
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/******* generate serial charts *******/
function generateSerial(event, origin) {
    var name = event.name;
    origin = origin || 0;
    var allTab = [];
    $.each(window.AllLevelData, function (index, financialyear) {
        var obj = {
            'financial': index,
            'data': recursiveLevel(name, financialyear.kpi)
        };
        allTab.push(obj);
    });

    var objcharts = {
        "legend": {
            "rollOverGraphAlpha": 0.5,
            "switchType": "h",
            "align": "center",
            "valueAlign": "right",
            "verticalGap": 5,
            "valueWidth": 150
        },

        "numberFormatter": {"precision": -1, "decimalSeparator": ",", "thousandsSeparator": " "},
        "type": "serial",
        "chartCursor": [],
        "categoryAxis": {
            "labelColorField": "axisLabelColor",
            "startOnAxis": true,
            "labelRotation": 15
        },
        "lineAlpha": 2,
        "categoryField": "name",
        "extra": {
            "nameparent": name,
            "clickHandler": "showDetails",
            "firstProjectionCategory": "2013 AT",
            "defaultZoome": 1,
            "simulation": 1,
            "currentConfigTrend": "linear",
            "top": TOPSERIAL,
            "dataCount": 0,
            "alerts": ""

        },
        "chartScrollbar": {"scrollbarHeight": 19, "autoGridCount": false},
        "titles": [{"text": "", "color": "#000", "size": 14, "id": "chart-title", "alpha": 1}],
        "graphs": [], // graph
        "dataProvider": [], // dataprovider
        "valueAxes": [{"title": "Cost","minimum": 0}],
        "message": {"code": 0, "message": ""},
        "id": 2,
        "alarms": null
    };
    // todo : generate kpi
    var graphs = [];
    var graphs2 = [];
    var dataprovider = [];
    var dataCount = 0;
    //$.each(event._children, function (key, val) {


    $.each(allTab, function (index, element) {
        $.each(element.data.children, function (key, val) {

            graphs = graphsCollect(graphs, val);
        });
    });

    /*graphs.sort(function (a, b) {
        if (typeof (b.valeur) == "undefined")b.valeur = 0;
        if (typeof (a.valeur) == "undefined")a.valeur = 0;
        return b.valeur - a.valeur;
    });*/
   //console.log(graphs);
    dataCount = graphs.length;
    var i = 0;
    var maxi = origin + TOPSERIAL;
    $.each(graphs, function (key, val) {
        if (i >= origin && i < maxi) {
            graphs2.push(val);
        }
        i++;
    });

    if (origin == 0) {
        $(".acc-title>div", ".kpi-charts2").remove();
    }
    if ($('#current_charts2').length > 0) {
        if (maxi >= dataCount) maxi = dataCount;
        $('#current_charts2').html((origin ) + "-" + maxi);
        var next = origin + TOPSERIAL;
        var prev = origin - TOPSERIAL;

        if (prev >= 0)
            $(".acc-title>div", ".kpi-charts2").find('button').eq(0).attr('onclick', 'generateSerial({"name":"' + name + '"}, ' + prev + ')');
        else
            $(".acc-title>div", ".kpi-charts2").find('button').eq(0).removeAttr('onclick');
        if (next <= dataCount)
            $(".acc-title>div", ".kpi-charts2").find('button').eq(2).attr('onclick', 'generateSerial({"name":"' + name + '"}, ' + next + ')');
        else
            $(".acc-title>div", ".kpi-charts2").find('button').eq(2).removeAttr('onclick');
    }

    $.each(allTab, function (index, value) {
            var temprovider = [];

            if (typeof (value.data) != "undefined" && value.data != null)
                $.each(value.data.children, function (key, val) {
                    var obj = {name: val.name.toUpperCase(), 'value': val.value};
                    temprovider.push(obj);
                });

            var objprovider = {};
            objprovider['name'] = value.financial;
            $.each(temprovider, function (ind, elem) {
                objprovider[elem.name] = elem.value;
            });
            dataprovider.push(objprovider);

        }
    );

    objcharts.graphs = graphs2;
    objcharts.extra.dataCount = dataCount;
    objcharts.dataProvider = dataprovider;
    instantiateChart('2', 'charts2', {}, objcharts);

    return false;
}
function graphsCollect(graphs, val) {
    var testexist = false;
    var valueField = val.name.toUpperCase();
    var financialyear = $("#financialyearChoice :selected").text();
    $.each(graphs, function (key, value) {
        if (valueField == value.valueField) {
            testexist = true;
            if (financialyear == val.financialyear) {
                graphs[key].lineColor = val.color;
                graphs[key].valeur = val.value;
            }

        }
    });
    if (!testexist) {
        var objgraph = {
            "valueField": valueField,
            "type": "line",
            "title": val.name,
            "lineThickness": 2,
            "lineColor": val.color,
            "dashLengthField": "dashLengthLine",
            "details": "",
            "bullet": "round",
            "bulletSize": 5,
            "balloonText": "[[value]] K€",
            // "valeur":val.value
        };
        graphs.push(objgraph);
    }
    return graphs;
}
function recursiveLevel(name, value) {
    var toselected = null;

    $.each(value, function (key, val) {
        toselected = null;
        if (val.name == name) {
            toselected = val;
            return false;
        }
        if (typeof (val.children) != "undefined") {
            toselected = recursiveLevel(name, val.children);
            if (toselected != null) return false;
        }

    });


    return toselected;
}

