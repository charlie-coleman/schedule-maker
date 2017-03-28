// ALL HOURS IN THE CODE MUST BE IN 24 HOUR FORMAT, IT'S JUST EASIER

//CHANGE DEPENDING ON IF YOU WANT FINAL DISPLAY NUMBERS TO BE IN 24 OR 12 HOUR FORMAT
var twentyfourhour = false;

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
            var loc = $($('.hour')[i]).position().top - $(window).height()*0.015;
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
$(document).ready(function() {
    generate_hourmarks(7,18);
});

$(window).resize(function() {
    generate_hourmarks(7,18);
})