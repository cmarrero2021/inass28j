

var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	var calendarEl = document.getElementById('calendar');
	let num = ["anticipo","valor_menu","total_s_propina","total_c_propina","pax","pasajeros"];
	num.forEach(function(id) {
		$("#"+id).on('input', function (evt) {
			$(this).val($(this).val().replace(/[^0-9]/g, ''));
		});
	})
    
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'UTC',
        initialView: 'dayGridMonth',
        height: '100%',
        events: {
            url: base+'/calendario/evento_calendario?tipo=1',
            type: 'get',
            headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
        },
    });
  
    calendar.render();
});