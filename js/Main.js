// ALL HOURS IN THE CODE MUST BE IN 24 HOUR FORMAT, IT'S JUST EASIER

//CHANGE DEPENDING ON IF YOU WANT FINAL DISPLAY NUMBERS TO BE IN 24 OR 12 HOUR FORMAT
var twentyfourhour = true;

// FUNCTION TO GENERATE THE LINES TO DEMARCATE HOURS AND ADD THE NUMBERS TO HOUR-MARKS
// PROBABLY MORE COMPLICATED THAN IT NEEDS TO BE, BUT FLEXIBLE
var generate_hourmarks = function(begin, end) {
    var num_marks = end - begin;
    var num_days = $('.day').length;
    for(var i = 0; i < num_days; i++) {
        $($('.day')[i]).find('.hour').remove();
        for(var j = 0; j < num_marks; j++) {
            $($('.day')[i]).append('<div class="hour"></div>');
        }
    }
    var hour_width = Math.floor(($($('.day')[0]).height()-50)/num_marks);
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
            var loc = $($('.hour')[i]).position().top - $(window).height()*0.012;
            $('#hm'+i).css({
                'position': 'absolute',
                'top' : loc.toString(),
                'left' : $('.hour-marks').position().left.toString()
            });
        }
        else {
            var loc = $($('.hour')[i-1]).position().top + $($('.hour')[i]).height()-$(window).height()*0.015;
            $('#hm'+i).css({
                'position': 'absolute',
                'top' : loc.toString(),
                'left' : $('.hour-marks').position().left.toString()
            });
        }
    }
    $('.hour-mark').css({
        'width' : 'inherit',
        'text-align' : 'right'
    })
}
var classes = [];
$(document).ready(function() {
    generate_hourmarks(7,18);
    reset_class_list();
});

var reset_class_list = function() {
    $('#classes-list').empty();
    for (var i = 0; i < classes.length; i++) {
        classes[i].add_to_list($('#classes-list'), twentyfourhour);
    }
}

$(window).resize(function() {
    generate_hourmarks(7,18);
})
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
    }
    classes[classes.length] = new Class(class_name, reg_num, times_arr, days_arr);
    for(var i = $('.add-class-option').length-1; i > 0; i--) {
        $($('.add-class-option'))[i].remove();
    }
    $('#add-class-form')[0].reset();
    $('.modal').css('display', 'none');
    reset_class_list();
}

function cancel_class_edit() {
    $('.modal').css('display', 'none');
    for(var i = $('.add-class-option').length-1; i > 0; i--) {
        $($('.add-class-option'))[i].remove();
    }
    $('#add-class-form')[0].reset();
}
function open_add_class() {
    $('.modal').css('display', 'block');
}