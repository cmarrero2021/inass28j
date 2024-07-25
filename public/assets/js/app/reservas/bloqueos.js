var txtOriginal = "";
var fechaIniOriginal = "";
var act = 'bloqueos';
var titulo = 'Crear Bloqueos'
var url = ''
var table = 'bloqueos_tbl';
$(document).ready(function(){
	tabla(table);
	$("#btn-bl").on("click",function() { //guardar bloqueo
		verificar_clave()
	})
	$("#btn-an").on("click",function() {
		let clave = $("#clave_usuario_bl").val()
		const opcionesFetch0 = {
			method: 'POST',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({  clave:clave })
		}
		fetch(base+'/reservar/verificarclave',opcionesFetch0)
		.then(response => response.json())
		.then(function(response) {
			if (response[0].respuesta == 0) {
				Swal.fire({
					title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
					text: "Verifíquela y vuelva a intentar",
					icon: "error",
					confirmButtonColor: "#f34e4e",
					confirmButtonText: "Continuar",
				});
			} else {
				if ($("#fechainicio").val().trim().length ==0 || $("#horainicio").val().trim().length ==0 || $("#fechafin").val().trim().length ==0 || $("#horafin").val().trim().length ==0 || $("#nombrebloqueo").val().trim().length ==0 ) {
					Swal.fire({
						title: "TODOS LOS CAMPOS SON OBLIGATORIOS",
						text: "Debe proporcionar toda la información solicitada",
						icon: "error",
						confirmButtonColor: "#f34e4e",
						confirmButtonText: "Continuar",
					});
				} else {
					///////////////////////////
					let id = parseInt($("#blq_res").html().substr($("#blq_res").html().indexOf("ID: ")+4).trim());
					const opcionesFetch = {
						method: 'GET',
						headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
					};
					fetch(base+'/reservar/unset_bloqueo/'+id,opcionesFetch)
					.then(response => response.json())
					.then(function(response) {
						Swal.fire({
							title: "EL BLOQUEO HA SIDO ANULADO EXITOSAMENTE",
							text: "",
							icon: "success",
							confirmButtonColor: "#f34e4e",
							confirmButtonText: "Continuar",
						});
						$("#clave_usuario").val('');
						$("#btn-cerrar_bloquear").trigger("click");
						location.reload();
					});
					////////////////////////////
				}
			}
		})
	});

	function verificar_clave() {
		let clave = $("#clave_usuario_bl").val()
		const opcionesFetch0 = {
			method: 'POST',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({  clave:clave })
		}
		fetch(base+'/reservar/verificarclave',opcionesFetch0)
		.then(response => response.json())
		.then(function(response) {
			if (response[0].respuesta == 0) {
				Swal.fire({
					title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
					text: "Verifíquela y vuelva a intentar",
					icon: "error",
					confirmButtonColor: "#f34e4e",
					confirmButtonText: "Continuar",
				});
			} else {
				verificar_campos()
			 }
		})
	}
	function verificar_campos() {
		if ($("#fechainicio").val().trim().length ==0 || $("#horainicio").val().trim().length ==0 || $("#fechafin").val().trim().length ==0 || $("#horafin").val().trim().length ==0 || $("#nombrebloqueo").val().trim().length ==0 ) {
			Swal.fire({
				title: "TODOS LOS CAMPOS SON OBLIGATORIOS",
				text: "Debe proporcionar toda la información solicitada",
				icon: "error",
				confirmButtonColor: "#f34e4e",
				confirmButtonText: "Continuar",
			});
		} else {
			verificar_fecha_hora()
		}
	}
	function verificar_fecha_hora() {
		if (moment($("#fechainicio").val()).isAfter(moment($("#fechafin").val())) || moment($("#horainicio").val(),'HH:mm:ss').isAfter(moment($("#horafin").val(),'HH:mm:ss'))) {
			Swal.fire({
				title: "¡LA FECHA/HORA DE INICIO ES MAYOR QUE LA DE FINALIZACIÓN!",
				text: "Tanto la fecha como la hora de finalización del bloqueo deben ser mayores a las de inicio; corrija e intente de nuevo",
				icon: "error",
				confirmButtonColor: "#f34e4e",
				confirmButtonText: "Continuar",
			});
		} else {
			verificar_bloqueo()
		}
	}
	function verificar_bloqueo() {
		let datos = [
				fecha_inicio = $("#fechainicio").val(),
				hora_inicio = $("#horainicio").val(),
				fecha_fin = $("#fechafin").val(),
				hora_fin = $("#horafin").val(),
				id = $.isNumeric(parseInt($("#blq_res").html().substring($("#blq_res").html().indexOf('ID: ')+4).trim()))?parseInt($("#blq_res").html().substring($("#blq_res").html().indexOf('ID: ')+4).trim()):0,
			];
		const opcionesFetch3 = {
			method: 'POST',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({ data:datos })
		}
		fetch(base+'/reservar/check_bloq',opcionesFetch3)
		.then(response => response.json())
		.then(function(response) {
			if (response[0].bloqueos > 0) {
				Swal.fire({
					title: "¡YA EXISTE EL BLOQUEO PARA ESA FECHA!",
				text: "La fecha y hora seleccionadas ya presentan bloqueo",
					icon: "error",
					confirmButtonColor: "#f34e4e",
					confirmButtonText: "Continuar",
				});
			} else {
				id = $.isNumeric(parseInt($("#blq_res").html().substr($("#blq_res").html().indexOf("ID: ")+4).trim()))?parseInt($("#blq_res").html().substr($("#blq_res").html().indexOf("ID: ")+4).trim()):0;
				let datos = [
					id = id,
					fecha_inicio = $("#fechainicio").val(),
					hora_inicio = $("#horainicio").val(),
					fecha_fin = $("#fechafin").val(),
					hora_fin = $("#horafin").val(),
					nombre_bloqueo = $("#nombrebloqueo").val(),
				];
				const opcionesFetch1 = {
					method: 'POST',
					headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
					body: JSON.stringify({ data:datos })
				}
				fetch(base+'/reservar/set_bloqueo',opcionesFetch1)
				.then(response => response.json())
				.then(function(response) {
					if (response[0].resultado==204) {
						toastr.error("Ha ocurrido un error y no se ha podido bloquear la fecha");
					} else {
						$("#clave_usuario").val('');
						$("#fechainicio").val('');
						$("#fechafin").val('');
						$("#horainicio").val('');
						$("#horafin").val('');
						$("#nombrebloqueo").val('');
						$("#btn-cerrar_bloquear").trigger("click");
						Swal.fire({
							title: "EL BLOQUEO FUE EDITADO EXITOSAMENTE",
							text: "",
							icon: "success",
							confirmButtonColor: "#33cc33",
							confirmButtonText: "Continuar",
						});
						$("#bloqueos_tbl").bootstrapTable('refresh', {
							url: "/reservar/listabloqueos"
						})
					}
				})
			}
		})
	}
});



$("#nuevo_monto").on('input', function (evt) {
	$(this).val($(this).val().replace(/[^0-9]/g, ''));
});
function dateFormat(value, row, index) {
   return moment(value).format('DD/MM/YYYY');
}
function formatearFecha(valor) {
	return moment(valor,'DD/MM/YYYY').format('YYYY-MM-DD');
}

function horaFormatter(value,row,index){
    return value.slice(0, -3);
}

function listarReservasFormatter(value, row, index) {

    var bEditar = "";

    if(editar_bloqueo){
        bEditar = //html
        `
        <btn class="btn btn-primary" title="Editar bloqueo" data-bs-target="#mdl-bloquear" data-bs-toggle="modal" id="editar_${row.id}" onclick="editarBloqueo('${row.id}');"><i class="fas fa-edit"></i></btn>
        `
    }
	// console.log(row);
	// let fecha = row.fecha_inicio.split('-');
	// let hora = row.hora_inicio.split(':');
	// console.log(hora)
	// let data = [
	// 	id=row.id,
	// 	fecha_inicio=row.fecha_inicio,
	// 	hora_inicio=row.hora_inicio,
	// 	fecha_fin=row.fecha_fin,
	// 	hora_fin=row.hora_fin
	// ];
	// console.log(data);
	// console.log(`
	// 	<btn class="btn btn-primary" title="Editar bloqueo" data-bs-target="#mdl-bloquear" data-bs-toggle="modal" id="editar_`+row.id+`" onclick="editarBloqueo(`+fecha[0]+`,`+fecha[1]+`,`+fecha[2]+`,`+row.hora_inicio+`,`+hora[0]+`,`+hora[1]+`,`+hora[2]+`);"><i class="fas fa-edit"></i></btn>
	// 	`)
	// console.log(JSON.stringify(row))
	return [
		bEditar
		// `
		// <btn class="btn btn-primary" title="Editar bloqueo" data-bs-target="#mdl-bloquear" data-bs-toggle="modal" id="editar_`+row.id+`" onclick="editarBloqueo(`+fecha[0]+`,`+fecha[1]+`,`+fecha[2]+`,`+hora[0]+`,`+hora[1]+`,`+hora[2]+`);"><i class="fas fa-edit"></i></btn>
		// `
		// `
		// <div class="dropdown">
		// 	<a class="btn btn-link text-body shadow-none dropdown-toggle" href="#"
		// 		role="button" data-bs-toggle="dropdown" aria-expanded="false">
		// 		<i class="bx bx-dots-horizontal-rounded"></i>
		// 	</a>
		// 	<ul class="dropdown-menu dropdown-menu-end">
		// 		<li><a class="dropdown-item cancelar-reserva" data-bs-target="#mdl-cancelar" data-bs-toggle="modal" onclick='cancelar(this);'>Cancelar Reserva</a></li>
		// 		<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-noshow" data-bs-toggle="modal" onclick='noshow(this);'>No Show</a></li>
		// 		<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-estado" data-bs-toggle="modal" onclick='estado(this);'>Cambiar Estado</a></li>
		// 		<hr/>
		// 		<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-historial" data-bs-toggle="modal" onclick='historial(this);'>Historial de cambios</a></li>
		// 	</ul>
		// </div>`
	]
}
iconos();
btnAgregar();
function editarBloqueo(id) {
	// console.log(id);
	// let dt = data.split(',');
// function editarBloqueo(anio,mes,dia,hora,minuto,segundo) {
	// let fecha = anio.toString()+'-'+mes.toString().padStart(2,'0')+'-'+dia.toString().padStart(2,'0');
	// let hora = hora.toString()+':'+minuto.toString().padStart(2,'0')+':'+segundo.toString().padStart(2,'0');
		const opcionesFetch1 = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	fetch(base+'/reservar/get_bloq/'+id,opcionesFetch1)
	.then(response => response.json())
	.then(function(response) {
		$("#fechainicio").val(response[0].fecha_inicio);
		$("#horainicio").val(response[0].hora_inicio);
		$("#fechafin").val(response[0].fecha_fin);
		$("#horafin").val(response[0].hora_fin);
		$("#nombrebloqueo").val(response[0].nombre_bloqueo);
		$("#blq_res").html('Anular Bloqueo / Editar Bloqueo ID: '+response[0].id);
		$("#btn-an").show();
		$("#btn-bl").html('Editar');
		$('#mdl-bloquear').modal('show');
	});
}
// $("#btn-bl").on("click",function() {
// 	// console.log($("#btn-bl").html());
// 	// throw new error("Something went badly wrong!");
// 	// P = 10/0;
// 	let clave = $("#clave_usuario_bl").val()
// 	const opcionesFetch0 = {
// 		method: 'POST',
// 		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
// 		body: JSON.stringify({  clave:clave })
// 	}
// 	fetch(base+'/reservar/verificarclave',opcionesFetch0)
// 	.then(response => response.json())
// 	.then(function(response) {
// 		if (response[0].respuesta == 0) {
// 			Swal.fire({
// 				title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
// 				text: "Verifíquela y vuelva a intentar",
// 				icon: "error",
// 				confirmButtonColor: "#f34e4e",
// 				confirmButtonText: "Continuar",
// 			});
// 		} else {
// 			if ($("#fechainicio").val().trim().length ==0 || $("#horainicio").val().trim().length ==0 || $("#fechafin").val().trim().length ==0 || $("#horafin").val().trim().length ==0 || $("#nombrebloqueo").val().trim().length ==0 ) {
// 				Swal.fire({
// 					title: "TODOS LOS CAMPOS SON OBLIGATORIOS",
// 					text: "Debe proporcionar toda la información solicitada",
// 					icon: "error",
// 					confirmButtonColor: "#f34e4e",
// 					confirmButtonText: "Continuar",
// 				});
// 			} else {
// 				///////////////////
// 				if (moment($("#fechainicio").val()).isAfter(moment($("#fechafin").val())) || moment($("#horainicio").val(),'HH:mm:ss').isAfter(moment($("#horafin").val(),'HH:mm:ss'))) {
// 					Swal.fire({
// 						title: "¡LA FECHA/HORA DE INICIO ES MAYOR QUE LA DE FINALIZACIÓN!",
// 						text: "Tanto la fecha como la hora de finalización del bloqueo deben ser mayores a las de inicio; corrija e intente de nuevo",
// 						icon: "error",
// 						confirmButtonColor: "#f34e4e",
// 						confirmButtonText: "Continuar",
// 					});
// 				} else if ($("#btn-bl").html()=='Bloquear'){
// 					let datos = [
// 						id = 0,
// 						fecha_inicio = $("#fechainicio").val(),
// 						hora_inicio = $("#horainicio").val(),
// 						fecha_fin = $("#fechafin").val(),
// 						hora_fin = $("#horafin").val(),
// 						nombre_bloqueo = $("#nombrebloqueo").val(),
// 					];
// 					const opcionesFetch1 = {
// 						method: 'POST',
// 						headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
// 						body: JSON.stringify({ data:datos })
// 					}
// 					fetch(base+'/reservar/set_bloqueo',opcionesFetch1)
// 					.then(response => response.json())
// 					.then(function(response) {
// 						if (response[0].resultado==204) {
// 							toastr.error("Ha ocurrido un error y no se ha podido bloquear la fecha");
// 						} else {
// 							$("#clave_usuario").val('');
// 							$("#btn-cerrar_bloquear").trigger("click");
// 							// bloquear($("#fechainicio").val());
// 							Swal.fire({
// 								title: "LA FECHA HA SIDO BLOQUEADA EXITOSAMENTE",
// 								text: "",
// 								icon: "success",
// 								confirmButtonColor: "#f34e4e",
// 								confirmButtonText: "Continuar",
// 							});
// 						}
// 					});
// 				} else if($("#btn-bl").html()=='Editar') {
// 					console.log(1)
// 					///////////////////////////////
// 					let datos = [
// 						id = parseInt($("#blq_res").html().substr($("#blq_res").html().indexOf("ID: ")+4).trim()),
// 						fecha_inicio = $("#fechainicio").val(),
// 						hora_inicio = $("#horainicio").val(),
// 						fecha_fin = $("#fechafin").val(),
// 						hora_fin = $("#horafin").val(),
// 						nombre_bloqueo = $("#nombrebloqueo").val(),
// 					];
// 					const opcionesFetch1 = {
// 						method: 'POST',
// 						headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
// 						body: JSON.stringify({ data:datos })
// 					}
// 					fetch(base+'/reservar/set_bloqueo',opcionesFetch1)
// 					.then(response => response.json())
// 					.then(function(response) {
// 						if (response[0].resultado==204) {
// 							toastr.error("Ha ocurrido un error y no se ha podido bloquear la fecha");
// 						} else {
// 							$("#clave_usuario").val('');
// 							$("#btn-cerrar_bloquear").trigger("click");
// 							// bloquear($("#fechainicio").val());
// 							Swal.fire({
// 								title: "LA FECHA HA SIDO BLOQUEADA EXITOSAMENTE",
// 								text: "",
// 								icon: "success",
// 								confirmButtonColor: "#f34e4e",
// 								confirmButtonText: "Continuar",
// 							});
// 							console.log("pepe");
// 							location.reload();
// 						}
// 					});
// 					///////////////////////////////
// 				}
// 			}
// 		}
// 	});
// })
// function bloquear(fecha) {
// 	if (calendar.view.type=='dayGridMonth') {
// 		let mes = moment(fecha).format('MM');
// 		let anio = moment(fecha).format('YYYY');
// 		$.ajax({
// 			url: base+'/reservar/get_bloqueos/'+fecha,
// 			type: 'get',
// 			dataType: 'json',
// 			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
// 			success: function (response) {
// 				if(response.length > 0) {
// 					response.forEach(function(fechabloqueo) {
// 						let anterior = $("*[data-date='"+fechabloqueo.fecha_inicio+"']").html();
// 						if (anterior.indexOf('BLOQUEADA') == -1) {
// 							let bloqueo = "<div id='blq-"+fechabloqueo.fecha_inicio+"'><i class='fas fa-exclamation-triangle' style='color:yellow;'></i>"+'<label style="font-weight:bold;color:white;">BLOQUEADA</label></div>';
// 							$("*[data-date='"+fechabloqueo.fecha_inicio+"']").css("background-color","red");
// 							$("*[data-date='"+fechabloqueo.fecha_inicio+"']").prepend(bloqueo);
// 						}
// 					})
// 				}
// 			}
// 		});
// 	} else if (calendar.view.type=='timeGridWeek') {
// 	} else if (calendar.view.type=='timeGridDay') {
// 	} else if (calendar.view.type=='listMonth') {
// 	}
// }
// $("#btn-an").on("click",function() {
// 	let clave = $("#clave_usuario_bl").val()
// 	const opcionesFetch0 = {
// 		method: 'POST',
// 		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
// 		body: JSON.stringify({  clave:clave })
// 	}
// 	fetch(base+'/reservar/verificarclave',opcionesFetch0)
// 	.then(response => response.json())
// 	.then(function(response) {
// 		if (response[0].respuesta == 0) {
// 			Swal.fire({
// 				title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
// 				text: "Verifíquela y vuelva a intentar",
// 				icon: "error",
// 				confirmButtonColor: "#f34e4e",
// 				confirmButtonText: "Continuar",
// 			});
// 		} else {
// 			if ($("#fechainicio").val().trim().length ==0 || $("#horainicio").val().trim().length ==0 || $("#fechafin").val().trim().length ==0 || $("#horafin").val().trim().length ==0 || $("#nombrebloqueo").val().trim().length ==0 ) {
// 				Swal.fire({
// 					title: "TODOS LOS CAMPOS SON OBLIGATORIOS",
// 					text: "Debe proporcionar toda la información solicitada",
// 					icon: "error",
// 					confirmButtonColor: "#f34e4e",
// 					confirmButtonText: "Continuar",
// 				});
// 			} else {
// 				///////////////////////////
// 				let id = parseInt($("#blq_res").html().substr($("#blq_res").html().indexOf("ID: ")+4).trim());
// 				const opcionesFetch = {
// 					method: 'GET',
// 					headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
// 				};
// 				fetch(base+'/reservar/unset_bloqueo/'+id,opcionesFetch)
// 				.then(response => response.json())
// 				.then(function(response) {
// 					Swal.fire({
// 						title: "EL BLOQUEO HA SIDO ANULADO EXITOSAMENTE",
// 						text: "",
// 						icon: "success",
// 						confirmButtonColor: "#f34e4e",
// 						confirmButtonText: "Continuar",
// 					});
// 					$("#clave_usuario").val('');
// 					$("#btn-cerrar_bloquear").trigger("click");
// 					location.reload();
// 				});
// 				////////////////////////////
// 			}
// 		}
// 	})
// });
