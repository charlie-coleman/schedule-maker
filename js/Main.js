// ALL HOURS IN THE CODE MUST BE IN 24 HOUR FORMAT, IT'S JUST EASIER

//CHANGE DEPENDING ON IF YOU WANT FINAL DISPLAY NUMBERS TO BE IN 24 OR 12 HOUR FORMAT
var twentyfourhour = false;

// Start and end of hour marks
var start_hour_marks = 7;
var end_hour_marks = 18;

// Array to hold the classes in list
var classes = [];
// String: e0NpcmN1aXRzIDI6ezEyMzQsMTMwMDEzNTAsNDJ9IXsxMjM0NSwwOTMwMTA0NSwyMH19fHx7TGluZWFyIEFsZ2VicmE6ezMxNDE1LDA4MDAwOTE1LDQwfSF7OTI2NTM1LDE0MzAxNTQ1LDIwfX0=

// classes[0] = new Class('Circuits 2', ['1234', '12345'], [['13:00', '13:50'], ['09:30', '10:45']], [[0,1,0,1,0,1,0], [0,0,1,0,1,0,0]]);
// classes[1] = new Class('Linear Algebra', ['31415', '926535'], [['08:00', '09:15'], ['14:30', '15:45']], [[0,1,0,1,0,0,0], [0,0,1,0,1,0,0]]);

// FUNCTION TO GENERATE THE LINES TO DEMARCATE HOURS AND ADD THE NUMBERS TO HOUR-MARKS
// PROBABLY MORE COMPLICATED THAN IT NEEDS TO BE, BUT FLEXIBLE
var generate_hourmarks = function(begin, end) {
    var num_marks = end - begin;
    var num_days = $('.day').length;
    for(var i = 0; i < num_days; i++) {
        $($('.day')[i]).find('.hour').remove();
        for(var j = 0; j < num_marks; j++) {
            $($('.day')[i]).append('<div class="hour" id="hourdiv'+(begin+j)+'"></div>');
        }
    }
    var hour_width = Math.floor(($($('.day')[0]).height()*0.9)/num_marks);
    $('.hour').css({
        'height':hour_width.toString(),
        'width':'100%',
        'border-bottom': '1px solid #888'
    });
    $('.hour-marks').empty();
    for(var i = 0; i < num_marks+1; i++) {
        var label = (begin + i);
        if (!twentyfourhour){
            labelnew = label % 12;
            (labelnew == 0) ? labelnew = begin+i : labelnew = labelnew;
            (labelnew == 24 || labelnew == 0) ? labelnew = 12 : labelnew = labelnew;
            if(label < 12 || label == 24) {
                label = labelnew.toString();
            }
            else {
                label = labelnew.toString();
            }
        }
        label = label.toString();
        $('.hour-marks').append('<div class="hour-mark" id="hm'+i+'">'+label+'</div>');
        if(i != num_marks) {
            var loc = $($('.hour')[i]).position().top - parseFloat($("#hms").css('font-size'));
            $('#hm'+i).css({
                'position': 'absolute',
                'top' : loc.toString(),
                'left' : $('.hour-marks').position().left.toString()
            });
        }
        else {
            var loc = $($('.hour')[i-1]).position().top + $($('.hour')[i]).height()-parseFloat($("#hms").css('font-size'))/2;
            $('#hm'+i).css({
                'position': 'absolute',
                'top' : loc.toString(),
                'left' : $('.hour-marks').position().left.toString()
            });
        }
    }
    $('.hour-mark').css({
        'width' : $($(".hour-marks")[0]).width(),
        'text-align' : 'right'
    })
}

var reset_class_list = function() {
    var curr_selected = []
    for(var i = 0; i < classes.length; i ++) {
        curr_selected = classes[i].selected;
    }
    $('#classes-list').empty();
    for (var i = 0; i < classes.length; i++) {
        classes[i].add_to_list($('#classes-list'), twentyfourhour, curr_selected[i]);
        classes[i].add_to_calendar();
    }
    if(classes.length > 0) {
        window.history.replaceState(null, null, "?string="+createString());
    }
    else {
        window.history.replaceState(null, null, '?');
    }
}

function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}

function add_class_option() {
    var id = $('.add-class-option').length.toString();
    $('#add-class-form').append("<div id='option"+id+"' class='add-class-option'>"+
                        "Registration Number: <input type='text' id='reg-num"+id+"'>"+
                        "<button id='remove-option0' onclick='javascript:remove_option("+id+");' style='float:right;'><i class='fa fa-minus' aria-hidden='true'></i></button>"+
                        "<div id='days-of-week'>"+
                            "<div class='title'>What days?</div>"+
                            "<div class='weekDays-selector'>"+
                                "<input type='checkbox' id='weekday-sun"+id+"' class='weekday' />"+
                                "<label for='weekday-sun"+id+"'>S</label>"+
                                "<input type='checkbox' id='weekday-mon"+id+"' class='weekday' />"+
                                "<label for='weekday-mon"+id+"'>M</label>"+
                                "<input type='checkbox' id='weekday-tue"+id+"' class='weekday' />"+
                                "<label for='weekday-tue"+id+"'>T</label>"+
                                "<input type='checkbox' id='weekday-wed"+id+"' class='weekday' />"+
                                "<label for='weekday-wed"+id+"'>W</label>"+
                                "<input type='checkbox' id='weekday-thu"+id+"' class='weekday' />"+
                                "<label for='weekday-thu"+id+"'>R</label>"+
                                "<input type='checkbox' id='weekday-fri"+id+"' class='weekday' />"+
                                "<label for='weekday-fri"+id+"'>F</label>"+
                                "<input type='checkbox' id='weekday-sat"+id+"' class='weekday' />"+
                                "<label for='weekday-sat"+id+"'>S</label></div></div>"+
                        "Start time: <input type='time' id='start-time"+id+"'> End time: <input type='time' id='end-time"+id+"'><br></div>");
}

function remove_option(id) {
    var num_options = $('.add-class-option').length;
    for (var i = id; i < num_options; i++) {
        $('#reg-num'+i).val($('#reg-num'+(i+1)).val());
        $('#weekday-sun'+i).prop('checked', $('#weekday-sun'+(i+1)).prop('checked'));
        $('#weekday-mon'+i).prop('checked', $('#weekday-mon'+(i+1)).prop('checked'));
        $('#weekday-tue'+i).prop('checked', $('#weekday-tue'+(i+1)).prop('checked'));
        $('#weekday-wed'+i).prop('checked', $('#weekday-wed'+(i+1)).prop('checked'));
        $('#weekday-thu'+i).prop('checked', $('#weekday-thu'+(i+1)).prop('checked'));
        $('#weekday-fri'+i).prop('checked', $('#weekday-fri'+(i+1)).prop('checked'));
        $('#weekday-sat'+i).prop('checked', $('#weekday-sat'+(i+1)).prop('checked'));
        $('#start-time'+i).val($('#start-time'+(i+1)).val());
        $('#end-time'+i).val($('#end-time'+(i+1)).val());
    }
    $($('.add-class-option')[num_options-1]).remove()
}

function add_class() {
    generate_hourmarks(start_hour_marks, end_hour_marks);
    var class_name = $('#add-class-name').val();
    var class_color = '#' + $('#add-class-color').val().slice(-6);
    var reg_num = [];
    var days_arr = [];
    var times_arr = [];
    for(var i = 0; i < $('.add-class-option').length; i++) {
        reg_num[i] = $('#reg-num'+i).val();
        days_arr[i] = [$('#weekday-sun'+i).prop('checked'),$('#weekday-mon'+i).prop('checked'),$('#weekday-tue'+i).prop('checked'),
                           $('#weekday-wed'+i).prop('checked'),$('#weekday-thu'+i).prop('checked'),$('#weekday-fri'+i).prop('checked'),
                           $('#weekday-sat'+i).prop('checked')];
        times_arr[i] = [$('#start-time'+i).val(),$('#end-time'+i).val()]
    }
    if(validate_data(class_name, class_color, reg_num, days_arr, times_arr)) {
        classes[classes.length] = new Class(class_name, reg_num, times_arr, days_arr, class_color);
        for(var i = $('.add-class-option').length-1; i > 0; i--) {
            $($('.add-class-option'))[i].remove();
        }
        $('#add-class-form')[0].reset();
        $('.modal').css('display', 'none');
        reset_class_list();
        for(var i = 0; i < times_arr.length; i++) {
            start_hour_marks = Math.min(start_hour_marks, parseInt(times_arr[i][0].substr(0,2)));
            end_hour_marks = Math.max(end_hour_marks, parseInt(times_arr[i][1].substr(0,2))+1)
            
        }
        generate_hourmarks(start_hour_marks, end_hour_marks);
    }
}

function edit_class(id) {
    $('.modal').css('display', 'block');
    for(var i = 0; i < classes[id].crns.length-1; i++) {
        add_class_option();
    }
    $('#add-class-name').val(classes[id].name);
    $('#add-class-color').val(classes[id].color);
    for(var i = 0; i < classes[id].crns.length; i++) {
        $('#reg-num'+i).val(classes[id].crns[i]);
        $('#weekday-sun'+i).prop('checked', classes[id].days[i][0]);
        $('#weekday-mon'+i).prop('checked', classes[id].days[i][1]);
        $('#weekday-tue'+i).prop('checked', classes[id].days[i][2]);
        $('#weekday-wed'+i).prop('checked', classes[id].days[i][3]);
        $('#weekday-thu'+i).prop('checked', classes[id].days[i][4]);
        $('#weekday-fri'+i).prop('checked', classes[id].days[i][5]);
        $('#weekday-sat'+i).prop('checked', classes[id].days[i][6]);
        $('#start-time'+i).val(classes[id].times[i][0]);
        $('#end-time'+i).val(classes[id].times[i][1]);
    }
    classes.splice(id, 1);
}

function remove_class(id) {
    classes.splice(id, 1);
    reset_class_list();
}

function cancel_class_edit() {
    $('.modal').css('display', 'none');
    for(var i = $('.add-class-option').length-1; i > 0; i--) {
        $($('.add-class-option'))[i].remove();
    }
    $('#add-class-form')[0].reset();
    generate_hourmarks(start_hour_marks,end_hour_marks);
}

function open_add_class() {
    $('.modal').css('display', 'block');
}

function validate_data(class_name, class_color, reg_num, days_arr, times_arr) {
    if(class_name == '' || class_name == null || class_name == undefined) {
        alert('Your class needs a name!');
        return false;
    }
    if(class_color == '#FFFFFF') {
        var confirm_color = confirm('The color for this class is still plain white. Is this ok?');
        if (!confirm_color) {return false;}
    }
    for(var i = 0; i < reg_num.length; i++) {
        for(var j = i+1; j < reg_num.length; j++) {
            if (reg_num[i] == reg_num[j]) {
                alert('Option #' + (i+1) + ' and option #' + (j+1) + ' have the same registration number!');
                return false;
            }
        }
        if(reg_num[i] == '' || reg_num[i] == null || reg_num[i] == undefined) {
            alert('Option #'+(i+1)+' is missing a class registration number!');
            return false;
        }
        if(days_arr[i] == [0,0,0,0,0,0,0]) {
            alert('Must select at least one day in option #' + (i+1));
            return false;
        }
        times_arr[i][0] = interpTime(times_arr[i][0]);
        times_arr[i][1] = interpTime(times_arr[i][1]);
        if (times_arr[0] == false || times_arr[1] == false) {
            alert("Option #"+(i+1)+" does not fit any time format must be one of: HH:MM am/pm, HH:MM (24hr), or HHMM (24hr)");
            return false;
        }
        if(parseInt(times_arr[i][0].substr(0,2)) >= parseInt(times_arr[i][1].substr(0,2))) {
            if(parseInt(times_arr[i][0].substr(0,2)) == parseInt(times_arr[i][1].substr(0,2))) {
                if (parseInt(times_arr[i][0].substr(3, 5)) >= parseInt(times_arr[i][1].substr(3, 5))) {
                    alert("Option #" + (i+1) + " ends before it begins!");
                    return false;
                }
            }
            else {
                alert("Option #" + (i+1) + " ends before it begins!");
                return false;
            }
        }
    }
    return true;
}


$(window).resize(function() {
    generate_hourmarks(start_hour_marks,end_hour_marks);
    for(var i = 0; i < classes.length; i++) {
        classes[i].add_to_calendar();
    }
});

$(window).on('load', function() {
    var classString = getParameterByName('string');
    if (classString != null) {
        classes = interpString(classString);
    }
    generate_hourmarks(start_hour_marks, end_hour_marks);
    reset_class_list();
    generate_hourmarks(start_hour_marks, end_hour_marks);
    for(var i = 0; i < classes.length; i++) {
        classes[i].add_to_calendar();
    }
    $("#add-class-form").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            event.preventDefault();
            add_class();
            return false;
        } else {
            return true;
        }
    });
});

function interpTime(time) {
    var reg12 = /^(((0?[1-9])|(1[0-2])):([0-5]\d)\s?(A|P|a|p)(M|m))$/;
    var reg24 = /^([0-1]?\d|2[0-3]):?([0-5]\d)$/;
    if (reg12.test(time) == false && reg24.test(time) == false) {
        return false;
    }
    else if (reg12.test(time)) {
        var regHH = /^((0?[1-9])|(1[0-2])):/
        var pm = /(P|p)(M|m)$/.test(time);
        var hours = regHH.exec(time)[1];
        if(pm) {hours = (parseInt(hours)+12).toString();}
        var regMM = /:([0-5]\d)/
        var minutes = regMM.exec(time)[1];
        var time = hours + ':' + minutes;
        return time;
    }
    else if (reg24.test(time)) {
        twentyfourhour = true;
        var regMilt = /([0-1]?\d|2[0-4])[0-5]\d/
        if (regMilt.test(time)) {
            var minutes = time.substr(time.length-2);
            var hours = time.substr(0, time.length-2);
            if(/^\d$/.test(hours)) {hours = '0'+hours;}
            var time = hours + ':' + minutes;
            return time;
        }
        else {
            time = time;
            return time;
        }
    }
}

function createString() {
    var saveString = '{';
    for(var i = 0; i < classes.length; i++) {
        saveString += classes[i].name + ',' + classes[i].color + ',' + classes[i].selected + ':';
        for(var j = 0; j < classes[i].crns.length; j++) {
            saveString += '{' + classes[i].crns[j] + ',';
            saveString += classes[i].times[j].join('').replace(/:/g, '') + ',';
            var binString = '';
            for (var k = 0; k < classes[i].days[j].length; k++) {
                if(classes[i].days[j][k]) {
                    binString += '1';
                }
                else {
                    binString += '0';
                }
            }
            saveString += parseInt(binString, 2) + '}!';
        }
        saveString = saveString.substr(0,saveString.length-1) + '}||{';
    }
    saveString = saveString.substr(0, saveString.length-3);
    return Base64.encode(saveString);
}

function interpString(s) {
    var realString = Base64.decode(s);
    var class_strings = realString.split('||');
    var class_output = [];
    for (var i = 0; i < class_strings.length; i++) {
        var name = class_strings[i].substr(1, class_strings[i].indexOf(',')-1);
        var color = class_strings[i].substr(class_strings[i].indexOf(',')+1, 7);
        var selected = class_strings[i].substr(class_strings[i].indexOf(',')+9, class_strings[i].indexOf(':')-class_strings[i].indexOf(',')-9);
        var options = class_strings[i].substr(class_strings[i].indexOf(':')+1).replace(/[{}]/g, '').split('!');
        var crns = [];
        var times = [];
        var days = [];
        for (var j = 0; j < options.length; j++) {
            var infoarr = options[j].split(',');
            crns[j] = infoarr[0];
            times[j] = [];
            times[j][0] = infoarr[1].substr(0,2)+':'+infoarr[1].substr(2,2);
            times[j][1] = infoarr[1].substr(4,2)+':'+infoarr[1].substr(6,2);
            days[j] = String('0000000' + parseInt(infoarr[2]).toString(2)).slice(-7).split('');
            for (var k = 0; k < days[j].length; k++) {
                days[j][k] = parseInt(days[j][k]);
            }
        }
        class_output[i] = new Class(name, crns, times, days, color, selected);
    }
    return class_output;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function clear_class_list() {
    if(classes.length > 0 ) {
        if(confirm('This will clear all classes from your list. Ok?')) {
            for (var i = 0; i < classes.length; i ++) {
                $('div.class'+i+'display').remove();
            }
            classes = [];
            reset_class_list();
            window.history.replaceState(null, null, '?');
            generate_hourmarks(start_hour_marks, end_hour_marks);
        }
    }
}