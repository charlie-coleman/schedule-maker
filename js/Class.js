function Class(name, crns, times, days, color, selected) {
    this.name = name;
    this.crns  = crns; // Array of registration numbers for the class
    this.times = times; // 2D Array of times, [start time, end time]
    this.days = days; // 2D array of days, each option is formatted as a binary array with 0 if it's not on that day and 1 if it is
    this.id = 0;
    this.color = color;
    this.selected = selected || this.crns.length;
    var _this = this;
    this.tConvert = function(time) {
        // Check correct time format and split into components
        time = time.toString().match (/^([01]?\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice (1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'am' : 'pm'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
    } 
    this.add_to_calendar = function() {
        $('div.class'+this.id+'display').remove();
        var weekday_ids = ['#sunday', '#monday', '#tuesday', '#wednesday', '#thursday', '#friday', '#saturday']
        var selected_crn = $("input:radio[name='classlist"+this.id+"']:checked").val();
        if (selected_crn != 'none' && selected_crn != null) {
            this.selected = this.crns.indexOf(selected_crn);
            for(var j = 0; j < this.days[this.selected].length; j++) {
                if (this.days[this.selected][j]) {
                    var c1 = this.times[this.selected][0].indexOf(':');
                    var c2 = this.times[this.selected][1].indexOf(':');
                    var start_time_hour = parseInt(this.times[this.selected][0].substr(0,c1));
                    var start_time_min = parseInt(this.times[this.selected][0].substr(c1+1));
                    var end_time_hour = this.times[this.selected][1].substr(0,c2);
                    var end_time_min = this.times[this.selected][1].substr(c2+1);
                    var start_percent = parseFloat(start_time_min) / 60.0;
                    var end_percent = parseFloat(end_time_min) / 60.0;
                    var length = (parseFloat(end_time_hour)-parseFloat(start_time_hour)) - (start_percent - end_percent);
                    $(weekday_ids[j]).append("<div class='class"+this.id+"display' id='class"+this.id+"-"+j+"'>"+this.name+"</div>");
                    $('#class'+this.id+'-'+j).css({
                        'width' : $($('.hour')[0]).width(),
                        'height' : $($('.hour')[0]).height() * length,
                        'border-radius' : $($('.hour')[0]).width() * 0.01,
                        'position' : 'absolute',
                        'top' : $('#hourdiv'+start_time_hour).position().top + $($('.hour')[0]).height()*start_percent,
                        'left' : $(weekday_ids[j]).position().left,
                        'background' : this.color
                    })
                }
            }
        }
        if(classes.length > 0) {
            window.history.replaceState(null, null, "?string="+createString());
        }
        else {
            window.history.replaceState(null, null, '');
        }
    }
    this.add_to_list = function(container, twentyfourhour) {
        this.id = $('.class').length.toString();
        var day_strings = [];
        var time_strings = [];
        var day_array = ['Su','M','T','W','R','F','Sa']
        for (var j = 0; j < this.days.length; j++) {
            day_strings[j] = ''
            for (var i = 0; i < 7; i++) {
                if (this.days[j][i] == 1) {
                    day_strings[j] = day_strings[j] + day_array[i];
                }
            }
        }
        for(var j = 0; j < this.times.length; j++) {
            time_strings[j] = '';
            var start_time = this.times[j][0];
            var end_time = this.times[j][1];
            if (twentyfourhour) {
                time_strings[j] = start_time.toString() + '-' + end_time.toString();
            }
            else {
                start_time = this.tConvert(start_time);
                end_time = this.tConvert(end_time);
                time_strings[j] = start_time.toString() + '-' + end_time.toString();
            }
        }
        container.append("<div class='class' id='classlist"+this.id+"'></div>");
        $('#classlist'+this.id).append("<div class='name'>"+$('<div/>').text(this.name).html()+"</div>");
        $('#classlist'+this.id).append("<button class='removeclass' onclick='javascript:remove_class("+this.id+");'><i class='fa fa-minus' aria-hidden='true'></i></button>")
        $('#classlist'+this.id).append("<button class='edit' onclick='javascript:edit_class("+this.id+");'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button>");
        $('#classlist'+this.id).append("<form id='class"+this.id+"form"+"'></form>");
        for (var i = 0; i < crns.length; i++) {
            $('#class'+this.id+'form').append("<input type='radio' name='classlist"+this.id+"' value="+$('<div/>').text(this.crns[i]).html()+" class='option'>");
            $('#class'+this.id+'form').append("<div class='days'>"+$('<div/>').text(day_strings[i]).html()+"</div>");
            $('#class'+this.id+'form').append("<div class='time'>"+$('<div/>').text(time_strings[i]).html()+"</div><br>");
        }
        $('#class'+this.id+'form').append("<input type='radio' name='classlist"+this.id+"' value='none' class='option'>");
        $('#class'+this.id+'form').append("<div class='days'>None</div>");
        $('#classlist'+this.id).append("<div class='crn-label'>Selected CRN:&nbsp;</div><div class='crn-label' id='class"+this.id+"crn'>none</div");
        $('input[type=radio][name=classlist'+this.id+']').change(function() {
            $('#class'+_this.id+'crn').text($('input[type=radio][name=classlist'+_this.id+']:checked').val());
            _this.add_to_calendar();
        });
        $('input[type=radio][name=classlist'+this.id+'][value='+this.crns[this.selected]+']').prop('checked', 'true');
        $('#class'+_this.id+'crn').text($('input[type=radio][name=classlist'+_this.id+']:checked').val());
        _this.add_to_calendar();
    }
}