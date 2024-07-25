function iconos() {
	alert("PEPE");
	window.icons = {
		refresh: 'fa-refresh',
		toggleOn: 'fa-toggle-on',
		toggleOff: 'fa-toggle-on',
		columns: 'fa-th-list',
		paginationSwitch:'fa-toggle-on',
		refresh:'fa-sync',
		fullscreen:'fa-arrows-alt',
		export:'fa-download',
	}
}
function fechaFormatter(value, row) {

	let date = "-";	
    if(value){
        date = moment(value, 'YYYY-MM-DD ').format('DD-MM-YYYY')
    }
	return date;
}

function fechaFormatterHora(value, row) {

	let hora="-";
	if(value){
		hora = moment(value, 'HH:mm:ss').format('HH:mm')
	}
	return hora;
}


function fechaFormatter2(value, row) {

	let date = "-";	
    if(value){
        date = moment(value, 'YYYY-MM-DD H:m:s').format('DD/MM/YYYY H:m')
    }
	return date;

}
function filaEvento(row, index) {
    var color_disabled ="";
    if( row.testado === 'Cancelada' || row.testado === 'No Show' || row.testado === 'Rechazada'){
        color_disabled = "text-black-30";
    }
	if (row.tipo) {
		var valor = row.tipo.trim();
		if (valor == 'EVENTO') {
			return { classes: 'cls-evento '+color_disabled};
		}  else {
			if ((index %2)==0) {
				return {classes: 'row_back0 '+color_disabled};
			} else {
				return {classes: 'row_back1 '+ color_disabled};
			}
		}
	} else {
		return { classes: color_disabled };
	}
}
