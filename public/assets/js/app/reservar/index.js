$.LoadingOverlaySetup({
    background: "rgba(0, 0, 0, 0.5)",
});

$(document).ready(function(){
	

	// let num = ["anticipo","valor_menu","total_s_propina","total_c_propina","pax","pasajeros"];
	let num = ["pax","pasajeros"];

	num.forEach(function(id) {
		$("#"+id).on('input', function (evt) {
			$(this).val($(this).val().replace(/[^0-9]/g, ''));
		});
	})
	$("#panel_eventos").css("visibility", "hidden");
	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	$("#tipo").append('<option selected>Seleccione</option>');
	fetch(base+'/reservar/tipos',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			if(vector.id!=4){
				$("#tipo").append('<option value = '+vector.id+'>'+vector.estado+'</option>');
			}
		})
	});

	actualizar();

	$("#sucursal").append('<option selected disabled>Seleccione</option>');
	fetch(base+'/reservas/reservassucursales',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			let seleccionado = '';
			if ((vector.id) == 2)
				seleccionado = ' selected '
			$("#sucursal").append('<option value = '+vector.id+seleccionado +'>'+vector.sucursal+'</option>');
		})
	});
	$("#sucursal").on("change",function() {
		sucursal(1);
	});
	$("#extra").on("change",function() {
		if ($(this).val() ==1) {
			$("#dvextras").show();
			$("#detalle_restriccion").height(25);
		} else {
			$("#dvextras").hide();
			$("#detalle_restriccion").height(150);
		}
	});

	$("#ccategoria").empty();
	$("#ccategoria").append('<option selected disabled>Seleccione</option>');
	
	fetch(base+'/clientes/clientescategorias',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			$('#ccategoria').append('<option value="' + vector.id + '">'+vector.categoria+'</option>')
		})
	});

	$("#ctipo").empty();
	$("#ctipo").append('<option selected disabled>Seleccione</option>');
	fetch(base+'/clientes/clientestipos',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			$("#ctipo").append('<option value = '+vector.id+'>'+vector.tipo+'</option>');
		})
	});

	$("#ccomuna").empty();
	$("#ccomuna").append('<option selected disabled>Seleccione</option>');
	fetch(base+'/clientes/clientescomunas',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			$("#ccomuna").append('<option value = '+vector.id+'>'+vector.comuna+'</option>');
		})
	});

	sucursal(0)
	// inicio_telefono('telefono');
	inicio_telefono('telefono_contacto');
	inicio_telefono('ctelefono');
	    // let campoInput = $('#telefono');
    // // Agrega el prefijo al valor inicial del campo de entrada
    // campoInput.val('+569' + campoInput.val());

    // // Escucha el evento de cambio en el campo de entrada
    // campoInput.on('input', function() {
    //     // Elimina cualquier espacio en blanco al principio o al final del valor
    //     let valor = campoInput.val().trim();

    //     // Verifica si el valor comienza con el prefijo
    //     if (!valor.startsWith('+569')) {
    //         // Si no comienza con el prefijo, agrega el prefijo al valor
    //         campoInput.val('+569' + valor);
    //     }
    // });
    // campoInput = $('#telefono_contacto');
    // // Agrega el prefijo al valor inicial del campo de entrada
    // campoInput.val('+569' + campoInput.val());

    // // Escucha el evento de cambio en el campo de entrada
    // campoInput.on('input', function() {
    //     // Elimina cualquier espacio en blanco al principio o al final del valor
    //     let valor = campoInput.val().trim();

    //     // Verifica si el valor comienza con el prefijo
    //     if (!valor.startsWith('+569')) {
    //         // Si no comienza con el prefijo, agrega el prefijo al valor
    //         campoInput.val('+569' + valor);
    //     }
    // });

    // campoInput = $('#ctelefono');
    // // Agrega el prefijo al valor inicial del campo de entrada
    // campoInput.val('+569' + campoInput.val());

    // // Escucha el evento de cambio en el campo de entrada
    // campoInput.on('input', function() {
    //     // Elimina cualquier espacio en blanco al principio o al final del valor
    //     let valor = campoInput.val().trim();

    //     // Verifica si el valor comienza con el prefijo
    //     if (!valor.startsWith('+569')) {
    //         // Si no comienza con el prefijo, agrega el prefijo al valor
    //         campoInput.val('+569' + valor);
    //     }
    // });


});




$(document).keypress(function(event) {
	if (event.which === 13) {
	  	// Aquí puedes ejecutar el código que deseas cuando se presiona la tecla Enter
	  	guardar_reserva();	
	}
});

$("#anticipo").on("keyup", function () {    
    $(this).val(formatDineroEs($(this).val()));
});


$("#valor_menu").on("keyup", function () {    
    $(this).val(formatDineroEs($(this).val()));
});

$("#total_s_propina").on("keyup", function () {
    $(this).val(formatDineroEs($(this).val()));
});

$("#total_c_propina").on("keyup", function () {
    $(this).val(formatDineroEs($(this).val()));
});



function sucursal(valor) {
	let suc = 2;
	if (valor ==1)
		suc=$("#sucursal option:selected").val();
	if ($("#sucursal").val()===null)
		suc = 2
	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	fetch(base+'/reservas/salonessucursales/'+suc,opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
	$("#salon").empty();
	$("#salon").append('<option selected value="">Seleccione</option>');
	$("#mesa").empty();
    $("#mesa").append('<option selected value="">Seleccione</option>');
		response.forEach(function(vector) {
			$("#salon").append('<option value = '+vector.id+'>'+vector.salon+'</option>');
		})
	});
	$("#salon").on("change", function() {
		let sal=$("#salon option:selected").val();
		fetch(base+'/reservas/salonesmesas/'+sal,opcionesFetch)
		.then(response => response.json())
		.then(function(response) {
			$("#mesa").empty();
			$("#mesa").append('<option selected value="">Seleccione</option>');
			if (response && response.length > 0) {
				response.forEach(function(vector) {
					$("#mesa").append('<option value = '+vector.mesa_id+'>'+vector.mesa+'</option>');
				})
			}
		});
	});
}
$("#crut").on("change blur keyup",function() {
	if ($(this).val().trim().length > 0 ) {
		if (validarRut($(this).val())) {
			$("#error_formato_rut").html('');
		} else {
			$("#error_formato_rut").html('Formato del RUT no válido');
		}
	} else {
		$("#error_formato_rut").html('');
	}
})

$("#correo").on("change blur keyup click",function() {
	if ($(this).val().trim().length >0) {

		if (validarCorreo($(this).val())) {
			$("#err_correo").html('');
		} else {
			$("#err_correo").html('Formato del correo no válido');
		}
	}
})
$("#cemail").on("change blur keyup",function() {
	if ($(this).val().trim().length >0) {

		if (validarCorreo($(this).val())) {
			$("#error_correo").html('');
		} else {
			$("#error_correo").html('Formato del correo no válido o correo vacio');
		}
	}
})



// $("#telefono").on("change blur keyup click",function(e) {
// 	if (validarTelefono($(this))) {
// 		$("#err_telefono").html('');
// 	} else {
// 		$("#err_telefono").html('Formato del teléfono no válido (debe comenzar con +, no contener sino números después del + y tener una longitud de 12 caracteres) o teléfono vacio');
// 	}
// })
$("#ctelefono").on("change blur keyup click",function(e) {
	if (validarTelefono($(this))) {
		$("#error_ctelefono").html('');
	} else {
		$("#error_ctelefono").html('Formato del teléfono no válido (debe comenzar con +, no contener sino números después del + y tener una longitud de 12 caracteres) o teléfono vacio');
	}
})

$("#fecha_reserva").on('blur',function() {
	check_reserva();
})
$("#hora_reserva").on('blur',function() {
	check_reserva();
})
$("#tipo").on("change",function() {
	if ($("#tipo option:selected").text()=='EVENTO' || $("#tipo option:selected").text()=='PRERESERVA') {
		$("#pax").val($("#pasajeros").val());
		$("#panel_eventos").css("visibility", "visible");

	} else {
		$("#panel_eventos").css("visibility", "hidden");
	}
});

$("#btn-guardarc").on("click",function() {
	if($("#cnombre").val().length == 0 || $("#ctelefono").val().length == 0 ) {
		// $("#btn-guardarc").attr("disabled",true);
		Swal.fire({
			title: "¡No se pueden guardar los registros!",
			text: "Los campos NOMBRE y TELÉFONO son obligatorios y no pueden estar vacios",
			icon: "error",
			confirmButtonColor: "#f34e4e",
			confirmButtonText: "Advertencia",
		})
	} else {

		let rut = $("#crut").val();
		let nombre = $("#cnombre").val();
		let fecha_nacimiento = $("#cfecha_nacimiento").val();
		let telefono = $("#ctelefono").val();
		let email = $("#cemail").val();
		let comuna = $("#ccomuna").val();
		let direccion = $("#cdireccion").val();
		let categoria = $("#ccategoria").val();
		let tipo = $("#ctipo").val();
		let empresa = $("#cempresa").val();
		let hotel = $("#chotel").val();
		let club = $("#cclub").val();
		let vino1 = $("#cvino1").val();
		let vino2 = $("#cvino2").val();
		let vino3 = $("#cvino3").val();
		let referencia = $("#creferencia").val();
		let metodo = "";
		let url = "";
		let id = 0;
		valid="";
		metodo = 'PUT';
		id = parseInt($("#id_cli").html().replace("Editar Cliente ID: ","").trim());
		url = '/clientes/clientes/'+id;
		const opcionesFetch = {
			method: metodo,
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({
				id:id,
				rut:rut,
				nombre:nombre,
				fecha_nacimiento:fecha_nacimiento,
				telefono:telefono,
				email:email,
				comuna:comuna,
				direccion:direccion,
				categoria:categoria,
				tipo:tipo,
				empresa:empresa,
				hotel:hotel,
				// club:club,
				vino1:vino1,
				vino2:vino2,
				vino3:vino3,
				referencia:referencia,
			})
		};
		fetch(base+url,opcionesFetch)
		.then(response => response.json())
		.then(function(response) {
			$("#crut").val('');
			$("#cnombre").val('');
			$("#cfecha_nacimiento").val('');
			$("#ctelefono").val('');
			$("#cemail").val('');
			$("#ccomuna").val('');
			$("#cdireccion").val('');
			$("#ccategoria").val('');
			$("#ctipo").val('');
			$("#cempresa").val('');
			$("#chotel").val('');
			$("#cclub").val('');
			$("#cvino1").val('');
			$("#cvino2").val('');
			$("#cvino3").val('');
			$("#creferencia").val('');
			// $("#btn-guardarc").attr("disabled",true);
			$("#btn-cerrarc").trigger("click");
			toastr.success("El registro fué actualizado exitosamente");
			// $('#clientes_tbl').bootstrapTable('refresh');
		});
	}
});
function guardar() {
	// $("#rut").val('');
	// $("#nombre").val('');
	// $("#fecha_nacimiento").val('');
	// $("#telefono").val('');
	// $("#email").val('');
	// $("#comuna").val('');
	// $("#direccion").val('');
	// $("#categoria").val('');
	// $("#tipo").val('');
	// $("#empresa").val('');
	// $("#hotel").val('');
	// $("#club").val('');
	// $("#vino1").val('');
	// $("#vino2").val('');
	// $("#vino3").val('');
	// $("#referencia").val('');
	// $("#btn-guardarc").attr("disabled",true);
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
	$("#mdl-cliente").hide();
	toastr.success("El registro fué actualizado exitosamente");
	$('#clientes_tbl').bootstrapTable('refresh');
}


// $('#mdl-historial').on('show.bs.modal', function (e) {
// 	$('#modal-title-res_cliente').html('Historial de reservas del cliente '+$('#cliente').val().toUpperCase());
// })
$('#mdl-historial').on('hidden.bs.modal', function (e) {
	$('#modal-title-res_cliente').html('');
})
$("#cnombre,#ctelefono").on("blur",function() {
	if($("#cnombre").val().length == 0 || $("#ctelefono").val().length == 0 ) {
		$("#btn-guardarc").attr("disabled",true);
	} else {
		$("#btn-guardarc").attr("disabled",false);
	}
});
$("#cliente, #cons_res, #cons_cli").on("keyup blur change click",function(e) {
	if ($(this).val().trim()==='' && $(this).attr('id') === 'cliente') {
		$(".hist_cli").hide();
	} else {
		$(".hist_cli").show();
	}
	if (e.type === 'blur' || e.type==='change') {
		let cliente=$(this).val().trim();
		const opcionesFetch = {
			method: 'POST',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({  cliente:cliente })
		}
		fetch(base+'/reservas/cliente',opcionesFetch)
		.then(response => response.json())
		.then(function(response) {

			// console.log(response['cliente']);

			$('#cli_reservas_tbl').bootstrapTable('load', response['reservas_cliente']);
			$('#modal-title-res_cliente').html('Historial reservas '+$('#cliente').val().toUpperCase()+" - Cantidad de No Show últimos 6 meses: "+response['cliente_noshow']);
			$("#noshow_cliente").html(response['cliente_noshow']);
			$("#id_cli").html(response['cliente'][0].id);
			$("#crut").val(response['cliente'][0].rut);
			$("#cnombre").val(response['cliente'][0].nombre);
			$("#cfecha_nacimiento").val(response['cliente'][0].fecha_nacimiento);
			$("#ctelefono").val(response['cliente'][0].telefono);

			$("#telefono").val(response['cliente'][0].telefono);
			$("#correo").val(response['cliente'][0].email);
			
			$("#cemail").val(response['cliente'][0].email);
			$("#ccomuna").val(response['cliente'][0].comuna_id);
			$("#cdireccion").val(response['cliente'][0].direccion);
			$("#ccategoria").val(response['cliente'][0].categoria_id);
			$("#ctipo").val(response['cliente'][0].tipo_id);
			$("#cempresa").val(response['cliente'][0].empresa);
			$("#chotel").val(response['cliente'][0].hotel);
			$("#creferencia").val(response['cliente'][0].referencia);
			$("#cvino1").val(response['cliente'][0].vino_favorito1);
			$("#cvino2").val(response['cliente'][0].vino_favorito2);
			$("#cvino3").val(response['cliente'][0].vino_favorito3);
		});
	}
});

limpiarArchivos();

function limpiarArchivos(){

    $('.clear_menu1').on('click', function() {
        $('#menu1').val('');
    });

    $('.clear_menu2').on('click', function() {
        $('#menu2').val('');
    });

    $('.clear_precuenta').on('click', function() {
        $('#precuenta').val('');
    });

    $('.clear_factura').on('click', function() {
        $('#factura').val('');
    });

    $('.clear_logo').on('click', function() {
        $('#logo').val('');
    });

    $('.clear_otro').on('click', function() {
        $('#otro').val('');
    });

}



$("#btn_reerva").on("click",function() {
	guardar_reserva();	
});

function guardar_reserva(){	

	let valido = validar();
	if (valido) {
		let clave = $("#clave").val()
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
				fecha = $("#fecha_reserva").val();
				hora = $("#hora_reserva").val();
				const opcionesFetch3 = {
					method: 'GET',
					headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
				}
				fetch(base+'/reservar/check_bloqueo/'+fecha+'/'+hora,opcionesFetch3)
				.then(response => response.json())
				.then(function(response) {
					if (response[0].bloqueos > 0) {					

						Swal.fire({
							title: "¡BLOQUEO DE FECHA!",
							text: "La fecha y hora seleccionadas presentan bloqueo; por favor seleccione otra fecha/hora",
							icon: "error",
							confirmButtonColor: "#f34e4e",
							confirmButtonText: "Continuar",
						});
					} else {
						/////////////
						let cli = $("#cliente").val().trim();
						let telefono = $("#telefono").val().trim();
						let email = $("#correo").val().trim();						

						const opcionesFetch0 = {
							method: 'POST',
							headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
							body: JSON.stringify({  cliente:cli, telefono:telefono, email:email })
						}
						fetch(base+'/clientes/buscarliente',opcionesFetch0)
						.then(response => response.json())
						.then(function(response) {
							if (response.respuesta == 0) {
								let data = [
									tipo = $("#tipo option:selected").val() != "Seleccione" ? $("#tipo option:selected").val():0,
									cliente = $("#cliente").val(),
									empresa = $("#empresa").val(),
									hotel = $("#hotel").val(),
									telefono = $("#telefono").val(),
									correo = $("#correo").val(),
								];
								const opcionesFetch1 = {
									method: 'POST',
									headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
									body: JSON.stringify({  data:data })
								}
								fetch(base+'/clientes/clientemin',opcionesFetch1)
								.then(response => response.json())
								.then(function(response) {
									if (response[0]['status']==1) {
										setTimeout(() => {
											toastr.clear();
											// actualizar();
											$('#btn_reerva').prop('disabled', true);
											crear_reserva();
										}, 500);
									} else {
										setTimeout(() => {
											toastr.clear();
											let error="";
											if (response[0]['error'].indexOf('clientes_tipo_id_foreign')>-1) {
												error = 'No se ha podido crear el cliente debido a que no indicó el tipo de cliente';
											} else if (response[0]['error'].indexOf('el valor null para la columna «telefono»')>-1){
												error = 'No se ha podido crear el cliente debido a que no indicó el número de teléfono';
											} else {
												error = 'No se ha podido crear el cliente debido a que ocurrió un error';
											}
											toastr.error(error);
										}, 500);
									}

								});
							} else {
								$('#btn_reerva').prop('disabled', true);
								crear_reserva();
							}
						});

					}

				});
			}

			// }
			/////////////////////
		});
	} else {
		
		Swal.fire({
			title: "¡Tiene campos obligatorios por completar!",
			text: "Todos los campos maracados con un * son obligatorios, debe proporcionar la información solicitada",
			icon: "error",
			confirmButtonColor: "#f34e4e",
			confirmButtonText: "Regresr",
		});
		
	}
}
$(".req").on("change",function() {
	let id = $(this).attr("id");
	let err = "err_"+id;
	if ($("#"+id)[0]["tagName"]=="INPUT" && $("#"+id).val().trim().length > 0) {
		$("#"+err).html('')
	} else if ($("#"+id)[0]["tagName"]=="SELECT" &&
	($("#"+id+" option:selected").val() !=="Seleccione" && $("#"+id+" option:selected").val() !==undefined)) {
		$("#"+err).html('')
	}
})
$("#restriccion").on("change",function() {
	if ($("#restriccion option:selected").val()==1) {
		$("#detalle_restriccion").attr("disabled",false);
	} else {
		$("#detalle_restriccion").val('');
		$("#detalle_restriccion").attr("disabled",true);
	}
})
function validar() {
	let valido = true;
	$(".req").each(function(){
		// console.log($(this)[0]["id"])
		let id=null;
		switch($(this)[0]["tagName"]) {
			case 'INPUT':
				id = $(this)[0]["id"];
				if ($("#"+id).val().length ==0 && $("#"+id).is(':visible')) {
					valido=false;
					$("#err_"+id).html("Campo obligatorio");
				}
			break;
			case 'SELECT':
				id = $(this)[0]["id"];
				if ($("#"+id+" option:selected").val()=="Seleccione" || $("#"+id+" option:selected").val()==undefined) {
					valido=false;
					$("#err_"+id).html("Campo obligatorio");
				}
			break;
		}
	});
	return valido;
}
function crear_reserva() {

	$('#btn_reerva').prop('disabled', true);

	$.LoadingOverlay("show");

	let dianoche=null;
	let horaInicio= moment($("#hora_reserva").val(),"h:mma");
	var horaFin = moment("4:00pm", "h:mma");
	if (horaInicio.isBefore(horaFin)) {
		dianoche=1;
	} else {
		dianoche=2;
	}
    const formData = new FormData();

    const archivo1 = $('input[name="menu1"]')[0].files[0];
    const archivo2 = $('input[name="menu2"]')[0].files[0];
    const archivo3 = $("#precuenta")[0].files[0];
    const archivo4 = $("#factura")[0].files[0];
    const archivo5 = $("#otro")[0].files[0];
    const evento_logo = $("#logo")[0].files[0];

    const fecha_reserva = $("#fecha_reserva").val();
	const hora_reserva = $("#hora_reserva").val();
    const evento_paga_en_local = $("#pago_local option:selected").val()=="Seleccione"?2:$("#pago_local option:selected").val();
    const evento_audio = $("#audio option:selected").val()=="Seleccione"?2:$("#audio option:selected").val();
    const evento_video = $("#video option:selected").val()=="Seleccione"?2:$("#video option:selected").val();
    const evento_video_audio = $("#video_audio option:selected").val()=="Seleccione"?2:$("#video_audio option:selected").val();
    const evento_mesa_soporte_adicional = $("#adicional option:selected").val()=="Seleccione"?2:$("#adicional option:selected").val();
    const evento_ubicacion = $("#ubicacion").val();
    const evento_menu_impreso = $("#menu_impreso option:selected").val()=="Seleccione"?2:$("#menu_impreso option:selected").val();
    const evento_table_tent = $("#table_tent option:selected").val()=="Seleccione"?2:$("#table_tent option:selected").val();
    const evento_restriccion_alimenticia = $("#restriccion option:selected").val()=="Seleccione"?2:$("#restriccion option:selected").val();
    const evento_extra_permitido = $("#extra option:selected").val()=="Seleccione"?2:$("#extra option:selected").val();
    const evento_detalle_restriccion = $("#detalle_restriccion").val();

    formData.append('fecha_reserva', fecha_reserva);
    formData.append('hora_reserva', hora_reserva);
    formData.append('pasajeros', $("#pasajeros").val());
    formData.append('tipo', $("#tipo option:selected").val());
    formData.append('cliente', $("#cliente").val().trim() );
    formData.append('empresa', $("#empresa").val().trim());
    formData.append('hotel', $("#hotel").val().trim());
    formData.append('telefono', $("#telefono").val().trim());
    formData.append('correo', $("#correo").val().trim());   ;
    formData.append('sucursal', $("#sucursal option:selected").val());
    formData.append('salon', $("#salon option:selected").val());
    // formData.append('mesa', $("#mesa option:selected").text());
    formData.append('mesa', $("#mesa option:selected").val());
	console.log($("#mesa option:selected").val())
    formData.append('observaciones', $("#observaciones").val().trim());

    formData.append('evento_nombre_adicional', $("#nombre_adicional").val().trim());
    formData.append('evento_pax', $("#pax").val());
    formData.append('evento_nombre_contacto', $("#nombre_contacto").val().trim());
    formData.append('evento_telefono_contacto', $("#telefono_contacto").val().trim());
    formData.append('evento_correo_contacto', $("#correo_contacto").val().trim());
    formData.append('evento_idioma', $("#idioma").val().trim());
    formData.append('evento_cristaleria', $("#cristaleria").val().trim());
    formData.append('evento_anticipo',$("#anticipo").val());
    formData.append('evento_valor_menu',$("#valor_menu").val());
    // formData.append('evento_valor_menu',$("#valor_menu").val());
    formData.append('evento_total_sin_propina',$("#total_s_propina").val());
    formData.append('evento_total_propina',$("#total_c_propina").val());
    formData.append('evento_paga_en_local',evento_paga_en_local);

    formData.append('evento_audio',evento_audio);
    formData.append('evento_video',evento_video);
    formData.append('evento_video_audio',evento_video_audio);
    formData.append('evento_mesa_soporte_adicional',evento_mesa_soporte_adicional);
    formData.append('evento_ubicacion',evento_ubicacion);

    formData.append('evento_menu_impreso',evento_menu_impreso);
    formData.append('evento_table_tent',evento_table_tent);
    formData.append('evento_restriccion_alimenticia',evento_restriccion_alimenticia);
    formData.append('evento_detalle_restriccion',evento_detalle_restriccion);
    formData.append('evento_extra_permitido',evento_extra_permitido);
    formData.append('autoriza',$("#autoriza").val());
    formData.append('telefono_autoriza',$("#telefono_autoriza").val());
    formData.append('monto_autorizado',$("#monto_autorizado").val());

    formData.append('evento_decoracion', $("#decoracion").val());
    formData.append('ambiente', $("#ubicacion").val());
    formData.append('evento_monta', $("#monta").val());
    formData.append('evento_comentarios',$("#comentarios").val());
    formData.append('dianoche', dianoche);

    formData.append('archivo_1', archivo1);
    formData.append('archivo_2',archivo2);
    formData.append('archivo_3', archivo3);
    formData.append('archivo_4',archivo4);
    formData.append('archivo_5',archivo5);
    formData.append('evento_logo',evento_logo);

	const opcionesFetch = {
		method: 'POST',
        headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content')},
		body: formData,
	}
	fetch(base+'/reservar/reservar',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		if (response[0].status ==0) {
			toastr.error(response[0].error);
		} else {
			$("#frm-general").trigger('reset');
			$("#frm-evento").trigger('reset');
			$("#clave").val(' ');
			$("#panel_eventos").css("visibility", "hidden");			

			Swal.fire({
				title: "La reserva ha sido creada exitosamente",
				text: "Registro exitoso",
				icon: "success",
				showConfirmButton: false,
				// confirmButtonColor: "#51d28c",
				// confirmButtonText: "Continuar",
				timer: 5000,
			})
			$.LoadingOverlay("hide");

			$('#btn_reerva').prop('disabled', false);
			
			setTimeout(() => {					
				// location.href="/";	
				window.close();				
			}, 5000);
			// .then(function (result) {			
				
			// });
		}
	});
 }
function actualizar() {
	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	fetch(base+'/clientes/clienteslista',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		$("#listaClientes").empty();
		response.forEach(function(vector) {
			$("#listaClientes").append('<option value="'+vector.nombre+'">');
		})
	});

	// fetch(base+'/clientes/clientesempresas',opcionesFetch)
	// .then(response => response.json())
	// .then(function(response) {
	// 	$("#listaEmpresas").empty();
	// 	response.forEach(function(vector) {
	// 		$("#listaEmpresas").append('<option value="'+vector.empresa+'">');
	// 	})
	// });

	// fetch(base+'/clientes/clienteshoteles',opcionesFetch)
	// .then(response => response.json())
	// .then(function(response) {
	// 	$("#listaHoteles").empty();
	// 	response.forEach(function(vector) {
	// 		$("#listaHoteles").append('<option value="'+vector.hotel+'">');
	// 	})
	// });

	// fetch(base+'/clientes/clientestelefonos')
	// .then(response => response.json())
	// .then(function(response) {
	// 	$("#listaTelefonos").empty();
	// 	response.forEach(function(vector) {
	// 		$("#listaTelefonos").append('<option value="'+vector.telefono+'">');
	// 	})
	// });

	// fetch(base+'/clientes/clientescorreos',opcionesFetch)
	// .then(response => response.json())
	// .then(function(response) {
	// 	$("#listaCorreos").empty();
	// 	response.forEach(function(vector) {
	// 		$("#listaCorreos").append('<option value="'+vector.email+'">');
	// 	})
	// });
}
function check_reserva() {
	let fecha = $("#fecha_reserva").val();
	let hora = $("#hora_reserva").val();
	if (fecha.length > 0 && hora.length > 0) {
		const opcionesFetch3 = {
			method: 'GET',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		}
		fetch(base+'/reservar/check_bloqueo/'+fecha+'/'+hora,opcionesFetch3)
		.then(response => response.json())
		.then(function(response) {
			if (response[0].bloqueos > 0) {
				Swal.fire({
					title: "¡BLOQUEO DE FECHA!",
					text: "La fecha y hora seleccionadas presentan bloqueo; por favor seleccione otra fecha/hora",
					icon: "error",
					confirmButtonColor: "#f34e4e",
					confirmButtonText: "Continuar",
				});

			}
		});
	}
}
