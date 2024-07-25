

function iconos() {
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
function btnCrearGiftcard() {
	if (giftcard_crear) {
		return {
			btnAdd: {
				class: 'success',
				text: 'Generar Giftcard',
				icon: 'fas fa-plus-circle',
				event: function () {
					// $(".modal-title").html("Generar Giftcard");
					$('#mdl-giftcard-crear').modal({backdrop: 'static', keyboard: false});
					$('#mdl-giftcard-crear').modal('show');
                    $('#err_ccredito').html('');
                    $('#err_cestado_pago').html('');
                    $('#err_cforma_pago').html('');
                    $('#err_cfecha_vencimiento').html('');
                    $('#err_dias').html('');
                    $('#err_ctipo_beneficio').html('');
                    $('#err_cbeneficio').html('');
                    $('#err_horario_desde').html('');
                    $('#err_horario_hasta').html('');
                    $('#err_cnum_factura').html('');
                    $('#err_cfecha_factura').html('');
                    $('#cmonto_factura').html('');
                    $('#err_crazon_social').html('');
                    $('#err_cgiro').html('');
                    $('#err_cdireccion').html('');
                    $('#err_cmonto_factura').html('');

				},
				attributes: {
					title: 'Crear Giftcard'
				}
			}
		}
	}
}
function fechaFormatter(value, row) {

    let date ="-";
    if(value){
        date = moment(value, 'YYYY-MM-DD').format('DD-MM-YYYY')
    }
	return date;
}
function fechaHoraFormatter(value, row){
	let date = "-";	
    if(value){
        date = moment(value, 'YYYY-MM-DD H:m:s').format('DD/MM/YYYY H:m')
    }
	return date;
}

function horaFormatter(value, row) {
    let hora ="-";
    if(value){
        hora = moment(value, 'H:m:s').format('H:m')
    }
	return hora;
}

function validarRut(rut) {
  // Eliminar puntos y guiones del rut
	rut = rut.replace(/\./g, '').replace(/\-/g, '');

  // Obtener número y dígito verificador
	var numero = rut.slice(0, -1);
	var dv = rut.slice(-1).toUpperCase();

  // Convertir K en 10
	if (dv == 'K') {
		dv = 10;
	}

  // Calcular dígito verificador esperado
	var suma = 0;
	var factor = 2;
	for (var i = numero.length - 1; i >= 0; i--) {
		suma += factor * parseInt(numero.charAt(i));
		factor = factor == 7 ? 2 : factor + 1;
	}
	var dvEsperado = 11 - (suma % 11);

  // Comparar dígito verificador esperado con dígito verificador ingresado
	if (dvEsperado == dv) {
		return true;
	} else {
		return false;
	}
}
