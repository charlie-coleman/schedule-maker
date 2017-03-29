function Class(name, crns, times, days) {
    this.name = name;
    this.crns  = crns; // Array of registration numbers for the class
    this.times = times; // 2D Array of times, [start time, end time]
    this.days = days; // 2D array of days, each option is formatted as a binary array with 0 if it's not on that day and 1 if it is
    this.add_to_list = function(container, twentyfourhour) {
        var id = $('.class').length.toString();
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
        container.append("<div class='class' id='classlist"+id+"'></div>");
        $('#classlist'+id).append("<div class='name'>"+name+"</div>");
        $('#classlist'+id).append("<button class='edit' onclick='javascript:edit_class("+id+");'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button>")
        $('#classlist'+id).append("<form id='class"+id+"form"+"'></form>");
        for (var i = 0; i < crns.length; i++) {
            $('#class'+id+'form').append("<input type='radio' name='classlist"+id+"' value="+this.crns[i]+" class='option'>");
            $('#class'+id+'form').append("<div class='days'>"+day_strings[i]+"</div>");
            $('#class'+id+'form').append("<div class='time'>"+time_strings[i]+"</div><br>")
        }
    }
    this.add_to_calendar = function(container) {
        
    }
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
}