// ALL HOURS IN THE CODE MUST BE IN 24 HOUR FORMAT, IT'S JUST EASIER

//CHANGE DEPENDING ON IF YOU WANT FINAL DISPLAY NUMBERS TO BE IN 24 OR 12 HOUR FORMAT
var twentyfourhour = false;

// Start and end of hour marks
var start_hour_marks = 7;
var end_hour_marks = 18;

// Array to hold the classes in list
var classes = [];

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
    console.log($($('.day')[0]).height());
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
                label = labelnew.toString() + 'am';
            }
            else {
                label = labelnew.toString() + 'pm';
            }
        }
        label = label.toString();
        $('.hour-marks').append('<div class="hour-mark" id="hm'+i+'">'+label+'</div>');
        if(i != num_marks) {
            var loc = $($('.hour')[i]).position().top - 10;
            $('#hm'+i).css({
                'position': 'absolute',
                'top' : loc.toString(),
                'left' : $('.hour-marks').position().left.toString()
            });
        }
        else {
            var loc = $($('.hour')[i-1]).position().top + $($('.hour')[i]).height()-10;
            $('#hm'+i).css({
                'position': 'absolute',
                'top' : loc.toString(),
                'left' : $('.hour-marks').position().left.toString()
            });
        }
    }
    $('.hour-mark').css({
        'width' : $($(".hourmarks")[0]).width(),
        'text-align' : 'right'
    })
}

function eval_window() {
    if($(window).width() <= $(window).height()) {
        $("#size-stylesheet").attr('href', './css/mobile-style.css');
    }
    else {
        $("#size-stylesheet").attr('href', './css/desktop-style.css');
    }
}

var reset_class_list = function() {
    var curr_selected = []
    for(var i = 0; i < classes.length; i ++) {
        curr_selected[i] = $('input[type=radio][name=classlist'+classes[i].id+']').index($('input[type=radio][name=classlist'+classes[i].id+']:checked'));
        if (curr_selected[i] == -1) {
            curr_selected[i] == 'none';
        }
    }
    $('#classes-list').empty();
    for (var i = 0; i < classes.length; i++) {
        classes[i].add_to_list($('#classes-list'), twentyfourhour, curr_selected[i]);
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
    var class_name = $('#add-class-name').val();
    var reg_num = [];
    var days_arr = [];
    var times_arr = [];
    for(var i = 0; i < $('.add-class-option').length; i++) {
        reg_num[i] = $('#reg-num'+i).val();
        days_arr[i] = [$('#weekday-sun'+i).prop('checked'),$('#weekday-mon'+i).prop('checked'),$('#weekday-tue'+i).prop('checked'),
                           $('#weekday-wed'+i).prop('checked'),$('#weekday-thu'+i).prop('checked'),$('#weekday-fri'+i).prop('checked'),
                           $('#weekday-sat'+i).prop('checked')];
        times_arr[i] = [$('#start-time'+i).val(),$('#end-time'+i).val()]
        var needgen = false;
        if (times_arr[i][0].substr(0,2) < start_hour_marks) {
            start_hour_marks = parseInt(times_arr[i][0].substr(0,2));
            needgen = true;
        }
        if (times_arr[i][1].substr(0,2) >= end_hour_marks) {
            end_hour_marks = parseInt(times_arr[i][1].substr(0,2));
            needgen = true;
        }
    }
    if(validate_data(class_name, reg_num, days_arr, times_arr)) {
        classes[classes.length] = new Class(class_name, reg_num, times_arr, days_arr);
        for(var i = $('.add-class-option').length-1; i > 0; i--) {
            $($('.add-class-option'))[i].remove();
        }
        $('#add-class-form')[0].reset();
        $('.modal').css('display', 'none');
        reset_class_list();
        if (needgen) {
            generate_hourmarks(start_hour_marks, end_hour_marks+1);
        }
    }
    generate_hourmarks(start_hour_marks,end_hour_marks);
}

function edit_class(id) {
    $('.modal').css('display', 'block');
    for(var i = 0; i < classes[id].crns.length-1; i++) {
        add_class_option();
    }
    $('#add-class-name').val(classes[id].name);
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

function validate_data(class_name, reg_num, days_arr, times_arr) {
    if(class_name == '' || class_name == null || class_name == undefined) {
        alert('Your class needs a name!');
        return false;
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
        if(parseInt(times_arr[i][0].substr(0,2)) >= parseInt(times_arr[i][1].substr(0,2))) {
            if(parseInt(times_arr[i][0].substr(0,2)) == parseInt(times_arr[i][1].substr(0,2))) {
                if (parseInt(times_arr[i][0].substr(3,5)) >= parseInt(times_arr[i][1].substr(3,5))) {
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
    eval_window();
    for(var i = 0; i < classes.length; i++) {
        classes[i].add_to_calendar();
    }
    generate_hourmarks(start_hour_marks,end_hour_marks);
});
$(document).ready(function() {
    eval_window();
    reset_class_list();
    generate_hourmarks(start_hour_marks, end_hour_marks);
});