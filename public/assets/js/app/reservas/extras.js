function dateFormat(value, row, index) {
   return moment(value).format('DD/MM/YYYY');
}
function formatearFecha(value, row, index) {
	return moment(value).format('DD/MM/YYYY  HH:mm:ss');
}
function horaFormatter(value,row,index){
    return  value.slice(0, -3);
}
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
