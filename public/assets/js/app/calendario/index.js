var propiedades=[];
var etq_pax;
var calendar;
var nfo;

$.LoadingOverlaySetup({
    background: "rgba(0, 0, 0, 0.5)",
});

$(document).ready(function() {
	var formValues = {
		selEstado: "",
		selTurno: "",
		bgSuccess: false,
		bgSecondary: false,
		bgDanger: false,
		bgDark: false,
		bgOcre1: false,
		bgOcre2: false,
		bgPrimary: false,
		bgGrey1: false
	};
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
	$.ajaxSetup({
		async:true,
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		type:'json'
	})
	const opcionesFetch1 = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	// $("#tipo").append('<option selected>Seleccione</option>');
	// fetch(base+'/reservar/tipos',opcionesFetch1)
	// .then(response => response.json())
	// .then(function(response) {
	// 	response.forEach(function(vector) {
	// 		$("#tipo").append('<option value = '+vector.id+'>'+vector.estado+'</option>');
	// 	})
	// });

	// actualizar();  // Todo: resvisar porque cargaba esta data

	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	// const selSucursal = new Choices('#selSucursal', {
	// 	type: 'select-one',
	// 	placeholder: true,
	// 	placeholderValue: 'Seleccione la sucursal'
	// });
	// var opciones = '';

	// selSucursal.setChoices(function() { 
	// 	return fetch(base+'/reservas/reservassucursales',opcionesFetch) 
	// 	.then(function(response) { 
	// 		return response.json(); 
	// 	}) 
	// 	.then(function(data) { 
	// 		return data.map(function(sucursal) { 
	// 			return { label: sucursal.sucursal, value: sucursal.id };
	// 		}); 
	// 	}); 
	// });
     $.ajax({
    	url: base+'/reservar/estados',
    	type: 'GET',
    	dataType: 'json',
		async:true,
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
    })
    .done(function(data) {
	    data.forEach(function(estado) {
			if(estado.id!=11){
				let option = '<option value="' + estado.id + '">' + estado.estado + '</option>';
				$('#selEstado').append(option);
			}
		});
		$('#selEstado').selectpicker({
			liveSearch: true,
			actionsBox: true,
			selectAllText: 'Seleccionar Todos',
			deselectAllText: 'Deseleccionar Todos'
		});
		$('#selEstado option').not('[value="4"]').not('[value="7"]').not('[value="8"]').prop('selected', true);
		$('#selEstado').selectpicker('refresh')		
    });
	// *************************************
	
	function addCustomTag(date) {
		let cell = $('.fc-day[data-date="' + date.format() + '"]');
		cell.append('<div class="custom-tag">Evento</div>');
	}
	function getInitialView() {
	}

	var tipo=[2,1]; //Todo: Esta es la clave; aqui cargara las reserva tipo EVENTO y REGULAR
	//Todo: Esta ralentizara la carga de los pax; 

	calendario_ini()

	function calendario_ini(){
		$.LoadingOverlay("show");


		var canCancelarReserva = $(".can-cancelar-reserva").length?"":'disabled';
		var canNoShowReserva = $(".can-no-show-reserva").length?"":'disabled';
		var canEditarReserva = $(".can-edit-reserva").length?"":'disabled';
		
		calendar = new FullCalendar.Calendar(calendarEl, {
			stickyFooterScrollbar: true,
			datesAboveResources: true,

			
			// aspectRatio: 2,
			headerToolbar: {
				left: 'prev,today,next',
				center: 'title',
				// right: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek'
				right: 'dayGridMonth,dayGridDay,listWeek'

			},
			moreLinkText: 'Ver más reservas',
			buttonText: {
				today: 'Actual',
				month: 'Mes',
				week: 'Semana',
				day: 'Dia',
				list: 'Lista',
	
			},
			initialView: getInitialView(),
			themeSystem: 'bootstrap',
			defaultDate: date,
			locale:'es',
			navLinks: true,
			editable: true,
			selectable: true,
			events: {
				url: base+'/calendario/evento_calendario?tipo='+tipo,
				type: 'get',
				headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			},
			eventTimeFormat: {
				hour: '2-digit',
				minute: '2-digit',
				meridiem: false
			},
			eventOrder: function(a, b) {
				let hora_reserva_a = moment(a.hora_reserva, "HH:mm:ss");
				let hora_reserva_b = moment(b.hora_reserva, "HH:mm:ss");
				if (hora_reserva_a.isBefore(hora_reserva_b)) {
					return -1;
				} else if (hora_reserva_b.isBefore(hora_reserva_a)) {
					return 1;
				} else {
					return 0;
				}
			},
			eventOrderStrict:true,
			success: function(response) {
				response.forEach(function(event) {
					event.extendedProps.customData = 'fecha_reserva';
					event.extendedProps.customData = 'hora_reserva';
					event.extendedProps.customData = 'id_reserva';
					event.extendedProps.customData = 'tipo_reserva';
					event.extendedProps.customData = 'tsucursal';
					// event.extendedProps.customData = 'tsalon';
					event.extendedProps.customData = 'testado';
					event.extendedProps.customData = 'pax';
					event.extendedProps.customData = 'dianoche';
					// event.extendedProps.customData = 'fecha_reserva';
					event.extendedProps.customData = 'total_pax';
					event.extendedProps.customData = 'classname';
				});
			},	
			dayMaxEvents: 4,
			eventDidMount: function(info) {		
				info.el.classList.add('evento');
				$(".fc-daygrid-day-top").html(info.event.extendedProps.total_pax);
				console.log(info.event.extendedProps.total_pax[0]);
				
				info.el.classList.add(info.event.extendedProps.fecha_reserva);
				info.el.classList.add(info.event.extendedProps.dianoche);
				info.el.classList.add(info.event.extendedProps.classname);
				info.el.classList.add(info.event.extendedProps.id_reserva);
				info.el.classList.add(info.event.extendedProps.tipo);
				info.el.classList.add(info.event.extendedProps.tsucursal.replace(/\s/g, ''));
				info.el.classList.add(info.event.extendedProps.testado.replace(/\s/g, ''));
				let reserva = info.event.extendedProps.id_reserva;
				let popover = new bootstrap.Popover(info.el, {
					container: 'body',
					html: true,	
					content: "<a href='#' class='btn btn-danger btn-sm ml-4 mr-4 mt-2 id-"+reserva+" cancelar "+ canCancelarReserva +"' id='can-"+reserva+"' tittle='Cancelar Reserva' data-toggle='modal' data-target='#mdl-vreserva' >C</a><a href='#'class='btn btn-primary btn-sm ml-4 mr-4 mt-2 mx-1 noshow "+ canNoShowReserva +"' tittle='No Show'>NS</a><a href='#'class='btn btn-success btn-sm ml-4 mr-4 mt-2 mostrar' id='most-"+reserva+"' tittle='Mostrar'>Mostrar</a><a href='#'class='btn btn-warning btn-sm ml-4 mr-4 mt-2 mx-1 editar "+canEditarReserva+"' id='edit-"+reserva+"' tittle='Editar Reserva'>Editar</a> "+"<br/>ID: " + reserva + '<br/>Turno: ' +info.event.extendedProps.dianoche + '<br/>Hora: ' +moment(info.event.extendedProps.hora_reserva,'HH:mm:ss').format('HH:mm') + '<br/>Sucursal: ' + info.event.extendedProps.tsucursal + '<br />' + 'Estado: ' + info.event.extendedProps.testado + '<br />' + 'PAX: ' + info.event.extendedProps.pax+'<br/>'+'Tipo Reserva: '+info.event.extendedProps.tipo,
					title: "<div class='d-flex justify-content-end'><a href='#' class='close text-right' data-dismiss='popover' aria-label= 'Close'><span aria-hidden='true'>&times;</span></a></div>"
				});
			},
			viewWillUnmount: function(view) {
			},
			viewDidMount: function(view) {
			},
			dayCellContent: function(info) {
			},
			eventMouseEnter: function(info) {
				let popoverEl = document.createElement('div');
				popoverEl.classList.add('popover');
				popoverEl.classList.add('titulo_evento');
				popoverEl.textContent = info.el.text;
				document.body.appendChild(popoverEl);
				let eventEl = info.el;
				let eventRect = eventEl.getBoundingClientRect();
				let popoverRect = popoverEl.getBoundingClientRect();
				let scrollTop = window.scrollY;
				popoverEl.style.top = eventRect.top - popoverRect.height + scrollTop + 'px';
				popoverEl.style.left = eventRect.left + (eventRect.width / 2) - (popoverRect.width / 2) + 'px';
				let hidePopover = function() {
					popoverEl.remove();
				};
				popoverEl.addEventListener('mouseleave', hidePopover);
				eventEl.addEventListener('mouseleave', hidePopover);			
			},  
			dateClick: function(info) {
				// nfo = info;
				// console.log(info)
				// console.log($(info.jsEvent.target))
				// console.log($(info.jsEvent.target).closest('.lblpopover').length)
	
				// if ($(info.event.target).closest('.lblpopover').length) {
				// 	info.jsEvent.stopPropagation();
				// } else {

				// Todo: se ha quitado por solicitud del cliente 26-01-24
				// if (!etq_pax) {

				// 	if ($(window).width() > 800) {

				// 		if (info.dayEl.style.backgroundColor.length==0) {
				// 			$("#clave_usuario_bl").val('');
				// 			$("#fechainicio").val(info.dateStr);
				// 			$("#horainicio").val('00:00');
				// 			$("#fechafin").val(info.dateStr);
				// 			$("#horafin").val('23:59');
				// 			$("#nombrebloqueo").val('');
				// 			$("#blq_res").html('Crear bloqueo de Fecha');
				// 			$("#btn-an").hide();
				// 			$("#btn-bl").html('Bloquear');						

				// 			if($(".can-crear-bloqueo").length){
				// 				$('#mdl-bloquear').modal('show');
				// 			}							

				// 		} else {
				// 			const opcionesFetch1 = {
				// 				method: 'GET',
				// 				headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
				// 			}
				// 			fetch(base+'/reservar/get_bloqueo/'+info.dateStr,opcionesFetch1)
				// 			.then(response => response.json())
				// 			.then(function(response) {
				// 				$("#fechainicio").val(response[0].fecha_inicio);
				// 				$("#horainicio").val(response[0].hora_inicio);
				// 				$("#fechafin").val(response[0].fecha_fin);
				// 				$("#horafin").val(response[0].hora_fin);
				// 				$("#nombrebloqueo").val(response[0].nombre_bloqueo);
				// 				$("#blq_res").html('Anular Bloqueo / Editar Bloqueo ID: '+response[0].id);
				// 				$("#btn-an").show();
				// 				$("#btn-bl").html('Editar');
								
				// 				if($(".can-crear-bloqueo").length){
				// 					$('#mdl-bloquear').modal('show');
				// 				}
							
				// 			});							
				// 		}
				// 	}
				// }
				


			},
	// 		eventClick: function(info) {
	// 			 if ($(info.el).hasClass('lblpopover')) {
	
	// // Aquí puedes agregar el código que deseas ejecutar cuando se hace clic en el anchor
	
	// console.log('pepe')
	// }
	// 		},
			slotLabelClassNames: function(arg) {
			},
			slotLabelFormat: {
				hour: 'numeric',
				minute: '2-digit',
				omitZeroMinute: false,
				meridiem: 'short'
			},		
			slotLabelContent: function(arg) {
			},
			
			eventContent: function(arg) {
				let tpax = arg.event.extendedProps.pax;
				// let total_pax = arg.event.extendedProps.total_pax;
				let time = moment(arg.event.start).format('HH:mm');
				let title = arg.event.title;

				if(title.length > 8){
					var subcadena = title.substring(0, 8);
					title = subcadena +" ...";
				}
				// return {
				// 	html: '<b>' + time + '</b><br>' +' PAX ' + tpax + ' ' + title
				//   };
				return time + ' ' + tpax +' ' +  title  ;
			},
			datesSet: function(info) {
				// onMonthChange();
				let fechaActual = calendar.getDate();
				fechaActual = moment(fechaActual).format('YYYY-MM-DD');
				// bloquear(fechaActual);
	
			},
		});
		
		$.LoadingOverlay("hide");
		calendar.render();
	}


	// calendar.gotoDate(new Date());
	calendar.render();
	function slotLabelContent(info) {
		return '<span style="requerido">' + date.toLocaleTimeString() + '</span>';
	}

	// Todo: para hacer prueba= primera prueba para evaluar; Parece funcionar 11-01-24

	$('#bg-success').on('click', function () {	
		
		if($('#bg-success').is(':checked')){
			tipo.push(1);
		}else{
			tipo = tipo.filter(element => element !== 1);
		}
		calendario_ini();		
	});

	$('#bg-secondary').on('click', function () {
		if($('#bg-secondary').is(':checked')){
			tipo.push(2);
		}else{

			tipo = tipo.filter(element => element !== 2);			
			// for (let i = 0; i < tipo.length; i++) {
			// 	if (tipo[i] === 2) {
			// 	  tipo.splice(i, 2);
			// 	  i--;
			// 	}
			// }
		}
		calendario_ini()
		// console.log(tipo); 
	});

	$('#bg-danger').on('click', function () {
		if($('#bg-danger').is(':checked')){
			tipo.push(3);
		}else{
			tipo = tipo.filter(element => element !== 3);		
		}
		// console.log(tipo); 
		calendario_ini();
	});

	$('#bg-dark').on('click', function () {
		if($('#bg-dark').is(':checked')){
			tipo.push(4);
		}else{
			tipo = tipo.filter(element => element !== 4);				
		}
		calendario_ini();
		// console.log(tipo); 
	});

	$('#bg-ocre1').on('click', function () {
		if($('#bg-ocre1').is(':checked')){
			tipo.push(5);
		}else{
			tipo = tipo.filter(element => element !== 5);		
		}
		// console.log(tipo); 
		calendario_ini();
	});

	$('#bg-ocre2').on('click', function () {
		if($('#bg-ocre2').is(':checked')){
			tipo.push(6);
		}else{
			tipo = tipo.filter(element => element !== 6);				
		}
		// console.log(tipo); 
		calendario_ini();
	});

	$('#bg-primary').on('click', function () {
		if($('#bg-primary').is(':checked')){
			tipo.push(7);
		}else{
			tipo = tipo.filter(element => element !== 7);	
		}
		// console.log(tipo); 
		calendario_ini();
	});

	$('#bg-grey1').on('click', function () {
		if($('#bg-grey1').is(':checked')){
			tipo.push(8);
		}else{
			tipo = tipo.filter(element => element !== 8);				
			
		}
		// console.log(tipo); 
		calendario_ini();
	});

	// Verificar si el checkbox está marcado y tiene el atributo "title" igual a "EVENTO"
	// if ($('#bg-secondary').is(':checked') && $('#bg-secondary').attr('title') === 'EVENTO') {
	// 	// Realizar alguna acción si se cumple la condición
	// 	console.log('El checkbox está marcado y tiene el título "EVENTO"');
	// } else {
	// 	// Realizar alguna acción si no se cumple la condición
	// 	console.log('El checkbox no está marcado o no tiene el título "EVENTO"');
	// }


	function bloquear(fecha) {
		if (calendar.view.type=='dayGridMonth') {
			let mes = moment(fecha).format('MM');
			let anio = moment(fecha).format('YYYY');
			$.ajax({
				url: base+'/reservar/get_bloqueos/'+fecha,
				type: 'get',
				dataType: 'json',
				headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
				success: function (response) {
					if(response.length > 0) {
						response.forEach(function(fechabloqueo) {
							let anterior = $("*[data-date='"+fechabloqueo.fecha_inicio+"']").html();
							if (anterior.indexOf('BLOQUEADA') == -1) {
								let bloqueo = "<div id='blq-"+fechabloqueo.fecha_inicio+"'><i class='fas fa-exclamation-triangle' style='color:yellow;'></i>"+'<label style="font-weight:bold;color:white;">BLOQUEADA</label></div>';
								$("*[data-date='"+fechabloqueo.fecha_inicio+"']").css("background-color","#a80241");
								// $("*[data-date='"+fechabloqueo.fecha_inicio+"']").addClass("bg-danger");
								$("*[data-date='"+fechabloqueo.fecha_inicio+"']").prepend(bloqueo);
							}
						})
					}
				}
			});
		} else if (calendar.view.type=='timeGridWeek') {
		} else if (calendar.view.type=='timeGridDay') {
		} else if (calendar.view.type=='listMonth') {
		}
	}

	
	// function pax(fecha,reserva=0,pax) {
	// 	if (pax !==null) {
	// 		let anterior = $("*[data-date='"+fecha+"']").html();
	// 		if (anterior.indexOf('Pax') == -1) {
	// 			let color = null;
	// 			if ($("*[data-date='"+fecha+"']").css("background-color")=="rgb(255, 0, 0)") {
	// 				color= "white";
	// 			} else {
	// 				color= "black";
	// 			}
	// 			let pasajeros = "<label class='lblpopover lbl-"+fecha+" res-"+reserva+"'>Pax: "+pax+"</label>";
	// 			$("[data-date='"+fecha+"'] .fc-daygrid-day-number")
	// 				.after(pasajeros)
	// 				.next('label')
	// 				.addClass('bg-dark')
	// 				.css('color','white')
	// 				.css('font-weight','bold')
	// 				.css('padding','2%')
	// 				.css('float', 'left')
	// 				.css('margin-right', '25%')
	// 				.css('margin-top', '4%')
	// 				.css('font-size', '80%')
	// 				.hide();
					
	// 		}
	// 	}
	// }
	$(document).on('shown.bs.popover', function () {
		$(".close").on('click',function() {
			$(this).parent().parent().parent().popover('hide');
		})
		$(".cancelar").on("click",function() {
			$("#clave_usuario").val('');

			var numeroId = $(this).attr('id').split('-')[1];
			console.log('numero='+numeroId);

			listRazonCancelacion();
			$('#mdl-cancelar').modal('show');
			// $(".popover").popover('hide');

		});

		$(".noshow").on("click",function() {
			$("#clave_usuario").val('');
			$('#mdl-noshow').modal('show');
			// $(".popover").popover('hide');
		});


		$(".editar").on("click",function() {

			// $(".popover").popover('hide');

			// let id = parseInt($('div:contains("ID:")').text().substr($('div:contains("ID:")').text().indexOf("ID: ")+3,$('div:contains("ID:")').text().indexOf("Sucursal: ")-$('div:contains("ID:")').text().indexOf("ID: ")+3));	
			let id= $(this).attr('id').split('-')[1];
			// console.log('numero='+numeroId);

			editar(id);

		});


		$(".mostrar").on("click",function() {
			// let id = parseInt($('div:contains("ID:")').text().substr($('div:contains("ID:")').text().indexOf("ID: ")+3,$('div:contains("ID:")').text().indexOf("Sucursal: ")-$('div:contains("ID:")').text().indexOf("ID: ")+3));

			let id= $(this).attr('id').split('-')[1];


			$.ajax({
				url: base+'/reservar/get_reserva/'+id,
				type: 'get',
				dataType: 'json',
				headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
				success: function (response) {
					$("#fecha_reserva").val(response[0].fecha_reserva);
					$("#hora_reserva").val(response[0].hora_reserva);
					$("#pasajeros").val(response[0].cantidad_pasajeros);
					$("#tipo").val(response[0].tipo);
					$("#cliente").val(response[0].nombre_cliente);
					$("#empresa").val(response[0].nombre_empresa);
					$("#hotel").val(response[0].nombre_hotel);
					$("#telefono").val(response[0].telefono_cliente);
					$("#correo").val(response[0].email_clente);
					$("#sucursal").val(response[0].tsucursal);
					$("#salon").val(response[0].tsalon);
					$("#mesa").val(response[0].mesa);
					$("#observaciones").val(response[0].observaciones);
					$("#nombre_adicional").val(response[0].evento_nombre_adicional);
					$("#pax").val(response[0].evento_pax);
					$("#nombre_contacto").val(response[0].evento_nombre_contacto);
					$("#telefono_contacto").val(response[0].evento_telefono_contacto);
					$("#correo_contacto").val(response[0].evento_email_contacto);
					$("#idioma").val(response[0].evento_idioma);
					$("#cristaleria").val(response[0].evento_cristaleria);
					$("#anticipo").val(response[0].evento_anticipo);
					$("#valor_menu").val(response[0].evento_valor_menu);
					$("#total_s_propina").val(response[0].evento_total_sin_propina);
					$("#total_c_propina").val(response[0].evento_total_propina);
					$("#pago_local").val(response[0].tevento_paga_en_local);
					$("#audio").val(response[0].tevento_audio);
					$("#video").val(response[0].tevento_video);
					$("#video_audio").val(response[0].tevento_video_audio);
					$("#adicional").val(response[0].tevento_mesa_soporte_adicional);
					$("#autoriza").val(response[0].autoriza);
					$("#telefono_autoriza").val(response[0].telefono_autoriza);
					$("#monto_autorizado").val(response[0].monto_autorizado);
					$("#menu_impreso").val(response[0].tevento_menu_impreso);
					$("#table_tent").val(response[0].tevento_table_tent);
					$("#restriccion").val(response[0].tevento_restriccion_alimenticia);
					$("#detalle_restriccion").val(response[0].evento_detalle_restriccion);
					$("#decoracion").val(response[0].evento_decoracion); //?
					$("#monta").val(response[0].evento_monta); //?
					$("#ubicacion").val(response[0].evento_ubicacion);
					$("#comentarios").val(response[0].evento_comentarios);
					$("#rsalon").val(response[0].salon);
					$("#rmesa").val(response[0].mesa);
					$("#lnk_menu1").empty();
					$("#lnk_menu1").append(imageFormatter(response[0].archivo_1));
					$("#lnk_menu2").empty();
					$("#lnk_menu2").append(imageFormatter(response[0].archivo_2));
					$("#lnk_precuenta").empty();
					$("#lnk_precuenta").append(imageFormatter(response[0].archivo_3));
					$("#lnk_factura").empty();
					$("#lnk_factura").append(imageFormatter(response[0].archivo_4));
					$("#lnk_otro").empty();
					$("#lnk_otro").append(imageFormatter(response[0].archivo_5));
					$("#lnk_logo").empty();
					$("#lnk_logo").append(imageFormatter(response[0].evento_logo));
					
					$("#tipo_reserva").hide();
					$("#ssucursal").hide();
					$("#ssalon").hide();
					$("#smesa").hide();
					$("#div_passwd").hide();
					$("#spago_local").hide();
					$("#saudio").hide();
					$("#svideo").hide();
					$("#sextra").hide();
					$("#svideo_audio").hide();
					$("#sadicional").hide();
					$("#smenu_impreso").hide();
					$("#stable_tent").hide();
					$("#srestriccion").hide();										

					continuar(response);
				}
			});
		});
	});
	
	
	$("#btn-cancelar").on("click",function() {
		let clave = $("#clave_usuario").val();
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
				let id = parseInt($('div:contains("ID:")').text().substr($('div:contains("ID:")').text().indexOf("ID: ")+3,$('div:contains("ID:")').text().indexOf("Sucursal: ")-$('div:contains("ID:")').text().indexOf("ID: ")+3));

				console.log(id);

				let razon = $('#raz_canc option:selected').val();
				let obs = $("#obs_canc").val();
				const opcionesFetch1 = {
					method: 'PUT',
					headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
					body: JSON.stringify({  id:id,razon_cancelacion:razon,observacion_cancelacion:obs })
				}
				fetch(base+'/reservar/cancelar',opcionesFetch1)
				.then(response => response.json())
				.then(function(response) {
					$("#clave_usuario").val('');
					$("#raz_canc").val('');
					$("#obs_canc").val('');
					$("#btn-cerrar").trigger("click");
					$('#mdl-cancelar').modal('hide');
					$(".popover").popover('hide');
					Swal.fire({
						title: "LA RESERVA HA SIDO CANCELADA EXITOSAMENTE",
						text: "",
						icon: "success",
						confirmButtonColor: "#f34e4e",
						confirmButtonText: "Continuar",
					});
					// calendar.refetchEvents();
					// fechas();				
					// setTimeout(() => {
					// 	filtrarEventos();						
					// }, 3000);
					// calendario_ini();
					// Todo: se realizo de esta forma ya que actualizando el calendario no me toma los pax correctamente	
					window.location = base + "/calendario/calendario"; 


				});
			}
		});
	})
	$("#btn-ns").on("click",function() {
		let clave = $("#clave_usuario_es").val()
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
				let id = parseInt($('div:contains("ID:")').text().substr($('div:contains("ID:")').text().indexOf("ID: ")+3,$('div:contains("ID:")').text().indexOf("Sucursal: ")-$('div:contains("ID:")').text().indexOf("ID: ")+3));
				const opcionesFetch1 = {
					method: 'PUT',
					headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
					body: JSON.stringify({  id:id,estado:7 })
				}
				fetch(base+'/reservar/cambio_estado',opcionesFetch1)
				.then(response => response.json())
				.then(function(response) {
					$("#clave_usuario").val('');
					$("#btn-cerrar_ns").trigger("click");
						$(".popover").popover('hide');
						Swal.fire({
							title: "LA RESERVA HA SIDO CANCELADA EXITOSAMENTE",
							text: "",
							icon: "success",
							confirmButtonColor: "#f34e4e",
							confirmButtonText: "Continuar",
						});
						calendar.refetchEvents();
						calendar.render();
				});
			}

		});
	})
	$("#btn-bl").on("click",function() {
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
					///////////////////
					if (moment($("#fechainicio").val()).isAfter(moment($("#fechafin").val())) || moment($("#horainicio").val(),'HH:mm:ss').isAfter(moment($("#horafin").val(),'HH:mm:ss'))) {
						Swal.fire({
							title: "¡LA FECHA/HORA DE INICIO ES MAYOR QUE LA DE FINALIZACIÓN!",
							text: "Tanto la fecha como la hora de finalización del bloqueo deben ser mayores a las de inicio; corrija e intente de nuevo",
							icon: "error",
							confirmButtonColor: "#f34e4e",
							confirmButtonText: "Continuar",
						});
					} else if ($("#btn-bl").html()=='Bloquear'){
						let datos = [
							id = 0,
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
								$("#btn-cerrar_bloquear").trigger("click");
								// bloquear($("#fechainicio").val());
								Swal.fire({
									title: "LA FECHA HA SIDO BLOQUEADA EXITOSAMENTE",
									text: "",
									icon: "success",
									confirmButtonColor: "#f34e4e",
									confirmButtonText: "Continuar",
								});
							}
						});
					} else if($("#btn-bl").html()=='Editar') {
						///////////////////////////////
						let datos = [
							id = parseInt($("#blq_res").html().substr($("#blq_res").html().indexOf("ID: ")+4).trim()),
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
								$("#btn-cerrar_bloquear").trigger("click");
								// bloquear($("#fechainicio").val());
								Swal.fire({
									title: "LA FECHA HA SIDO BLOQUEADA EXITOSAMENTE",
									text: "",
									icon: "success",
									confirmButtonColor: "#f34e4e",
									confirmButtonText: "Continuar",
								});
								//revisar
								location.reload();
							}
						});
						///////////////////////////////
					}
				}
			}
		});
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
				}
			}
		})
	});
	// sucursal(0);
	$('#expanderCalendario').on('click',function() {
		if ($(this).hasClass('fa-expand-arrows-alt')) {
			$('.container-fluid').addClass('w-100').removeClass('container-fluid')
			$(this).removeClass('fa-expand-arrows-alt');
			$(this).addClass("fa-compress-arrows-alt");
			$(this).attr('title', 'Contraer el calendario');
			$("#cont").addClass("d-none");
			$("#cal").removeClass("col-xl-9").addClass("col-xl-12");
		} else {
			$('.w-100').removeClass('w-100').addClass('container-fluid')
			$(this).addClass('fa-expand-arrows-alt');
			$(this).removeClass("fa-compress-arrows-alt");
			$(this).attr('title', 'Expandir el calendario');
			$("#cal").removeClass("col-xl-12").addClass("col-xl-9");
			$("#cont").removeClass("d-none");
			
		}
	});


	if ($(window).width() < 800) {
		// Quitar clase		
		$('#cal').removeClass('col-xl-9');
		
	} else {
		// Agregar clase		
		$('#cal').addClass('col-xl-9');
		
	}



// $(document).on('click', '.lblpopover', function() {

// console.log('lucho');

// });	
	etq_pax = false;
	setTimeout(() => {
		console.log('tiempo');
		$('.external-event input[type="checkbox"]').prop('checked', false);
		$('.external-event:contains("EVENTO")').find('input[type="checkbox"]').prop('checked',true);
		// $('.external-event:contains("REGULAR")').find('input[type="checkbox"]').prop('checked',true);	

		filtrarEventos()
	}, 3000);

});

function listRazonCancelacion(){

	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}

	fetch(base+'/reservar/razones',opcionesFetch)
		.then(response => response.json())
		.then(function(response) {
			
			var html = '<option value="">Seleccione</option>'
			response.forEach(function(vector) {
				html+='<option value="' + vector.id + '">'+vector.razon+'</option>'; 
			});
			$('#raz_canc').html(html);
	});

}






function continuar(response) {
	if (response[0].tipo=='EVENTO' || response[0].tipo=='REGULAR') {
		console.log(1)
		$("#pax").val($("#pasajeros").val());
		$("#panel_eventos").css("visibility", "visible");

	} else {
		$("#panel_eventos").css("visibility", "hidden");
	}
	$("#clave_usuario").val('');
	$('#mdl-vreserva').modal('toggle');
}
$('#mdl-vreserva').on('show.bs.modal', function () {	
	// $("#div_passwd").hide();
});


$('#mdl-noshow').on('hide.bs.modal', function () {	
	$(".popover").popover('hide');	
});

$('#mdl-cancelar').on('hide.bs.modal', function () {	
	$(".popover").popover('hide');	
});




$('#mdl-vreserva').on('hidden.bs.modal', function () {
	$('fmenu1').val(null);
	$('fmenu2').val(null);
	$("#fprecuenta").val(null);
	$("#ffactura").val(null);
	$("#fotro").val(null);
	$("#flogo").val(null);
	$("#fecha_reserva").val(null);
	$("#hora_reserva").val(null);
	$("#spago_local").val(null);
	$("#saudio").val(null);
	$("#svideo").val(null);
	$("#svideo_audio").val(null);
	$("#adicional").val(null);
	$("#ubicacion").val(null);
	$("#smenu_impreso").val(null);
	$("#stable_tent").val(null);
	$("#srestriccion").val(null);
	$("#sextra").val(null);
	$("#detalle_restriccion").val(null);
	$("#pasajeros").val(null);
	$("#tipo_reserva").val(null);
	$("#cliente").val().trim(null) ;
	$("#empresa").val().trim(null);
	$("#hotel").val().trim(null);
	$("#telefono").val().trim(null);
	$("#correo").val().trim(null) ;
	$("#ssucursal").val(null);
	$("#ssalon").val(null);
	$("#smesa").val(null);
	$("#observaciones").val().trim(null);
	$("#nombre_adicional").val().trim(null);
	$("#pax").val(null);
	$("#nombre_contacto").val().trim(null);
	$("#telefono_contacto").val().trim(null);
	$("#correo_contacto").val().trim(null);
	$("#idioma").val().trim(null);
	$("#cristaleria").val().trim(null);
	$("#anticipo").val(null);
	$("#valor_menu").val(null);
	$("#total_s_propina").val(null);
	$("#total_c_propina").val(null);
	$("#autoriza").val(null);
	$("#telefono_autoriza").val(null);
	$("#monto_autorizado").val(null);
	$("#decoracion").val(null);
	$("#monta").val(null);
	$("#comentarios").val(null);
	$("#clave").val('');
	$("#div_passwd").hide();
	$('fmenu1').hide();
	$('fmenu2').hide();
	$("#fprecuenta").hide();
	$("#ffactura").hide();
	$("#fotro").hide();
	$("#flogo").hide();
	$("#id_reserva").html('');	

	$(".popover.bs-popover-top").popover('hide');	

});

$("#selEstado").on("change",function() {
	filtrarEventos()
})
function sucursal(valor) {
	let clase = 'VIVO';
	if (valor == 1)
		clase = $("#selSucursal option:selected").text().replace(/\s/g, '');
	if (clase=='Todas') {
		$('.evento').show();
	} else {
		$('.evento').not('.'+clase).hide();
		$('.evento'+'.'+clase).show();
	}
}
$("#selSucursal").on("change",function() {
	sucursal(1);
})

$("#selTurno").on("change",function() {
	filtrarEventos()
})
function agregarEtiquetas(date, cell) {
  cell.append('<span class="etiqueta">Etiqueta</span>');
}
$('#external-events input').on('change', function() {
	filtrarEventos()
});

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

	fetch(base+'/clientes/clientesempresas',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		$("#listaEmpresas").empty();
		response.forEach(function(vector) {
			$("#listaEmpresas").append('<option value="'+vector.empresa+'">');
		})
	});

	fetch(base+'/clientes/clienteshoteles',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		$("#listaHoteles").empty();
		response.forEach(function(vector) {
			$("#listaHoteles").append('<option value="'+vector.hotel+'">');
		})
	});

	fetch(base+'/clientes/clientestelefonos')
	.then(response => response.json())
	.then(function(response) {
		$("#listaTelefonos").empty();
		response.forEach(function(vector) {
			$("#listaTelefonos").append('<option value="'+vector.telefono+'">');
		})
	});

	fetch(base+'/clientes/clientescorreos',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		$("#listaCorreos").empty();
		response.forEach(function(vector) {
			$("#listaCorreos").append('<option value="'+vector.email+'">');
		})
	});
}
function imageFormatter(value) {
	///////////////////////////
	let url=null;
	let act = null;

	if (value == null) {
		return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="75px" width="75px">'
	} else if (value == "") {
		return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="75px" width="75px">'
	} else {
		let ext = value.substring(value.length - 3);
		switch(ext) {
			case 'pdf':
				act=1;
				url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/272a0577357ca4502d5111c5af4228fe22810758.png';
				break;
			case 'png':
				act=1;
				url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
				break;
			case 'jpg':
			case 'jpeg':
				act=1;
				url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
			break;
			default:
				act=null;
				url='https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png';
				break;
		}
		return '<a href="'+value+'"><img src="'+url+'" height="75px" width="75px"></a>';
	}
}
$('.archivos').on ("click",function(e) {
	e.preventDefault();
	let url = $(this).html().substr(9,$("#lnk_menu1").html().indexOf('<img')-11)
	$('#mdl-documento iframe').attr('src', url);
	$('#mdl-documento').modal('show');
});
$("#marcarTipos").on("click",function() {
	$('.external-event input[type="checkbox"]').prop('checked', true);
	filtrarEventos()
})
$("#desmarcarTipos").on("click",function() {
	$('.external-event input[type="checkbox"]').prop('checked', false);
	$('.external-event:contains("EVENTO")').find('input[type="checkbox"]').prop('checked',true);
	filtrarEventos()
})

$("#filtrarEventos").on("click",function() {
	fechas()
});
function filtrarEventos() {
	if (calendar) {
		let tipo_reserva = $("#external-events input:checked").map(function() {
			return $(this).attr('title')
		}).get().join(', ');
		let turno_reserva = $('#selTurno option:selected').text();
		let estado_reserva =  etiquetasSeparadas = $("#selEstado option:selected").map(function() {
			return $(this).text();
		}).get().join(", ");
		let eventos = calendar.getEvents();
		eventos.forEach(function(evento) {
			// console.log(evento)
			if ((tipo_reserva.indexOf(evento.extendedProps.tipo) > -1) && 
			(turno_reserva.toUpperCase().indexOf(evento.extendedProps.dianoche) > -1 || turno_reserva == 'Todas') &&
			(estado_reserva.indexOf(evento.extendedProps.testado) > -1)
			) {
				evento.setProp('display', 'block');
			} else {
				let fechaReserva = evento.extendedProps.fecha_reserva; // Reemplaza con la variable dinámica
				let clase = `lblpopover.lbl-${fechaReserva}`;
				$(`.${clase}`).remove();
				evento.setProp('display', 'none');
			}
		});
		fechas()
	}
}
function fechas() {
	let view = calendar.view;
	let currentDate = calendar.getDate();
	let start = moment(currentDate).startOf('month');
	let end = moment(start).endOf('month');
	let allEventsInView = calendar.getEvents(start, end);
	let visibleEventsInView = allEventsInView.filter(function(event) {
		return event.display !== 'none';
	});
	let visibleDatesInView = visibleEventsInView.map(function(event) {
		return event.start;
	});
	visibleDatesInView.map(function(date) {
		getTotalPaxForDate( date.toISOString().slice(0, 10));
		return date.toISOString().slice(0, 10);
	});	
}
function getTotalPaxForDate(date) {
	let eventos = calendar.getEvents();
	// let totalPax = 0;
	eventos.forEach(function(evento) {
		if (moment(evento.start).format('YYYY-MM-DD') == date && evento.extendedProps.testado !== "Cancelada" && evento.extendedProps.testado !== "Rechazada" && evento.extendedProps.testado !== "No Show") {
			totalPax = evento.extendedProps.total_pax;
		}
	}); 
	
	pax(date,totalPax)
}
function pax(fecha,pax) {
	if (pax !==null) {
		let anterior = $("*[data-date='"+fecha+"']").html();
		if (anterior && anterior.indexOf('Pax') == -1) {
			let f1 = moment(fecha).format('YYYYMMDD')
			let color = null;
			if ($("*[data-date='"+fecha+"']").css("background-color")=="rgb(255, 0, 0)") {
				color= "white";
			} else {
				color= "black";
			}
			// let pasajeros = "<label class='lblpopover lbl-"+fecha+"'>Pax: "+pax+"</label>";
			let pasajeros = "<a fref='#' class='btn lblpopover lbl-"+fecha+"'>Pax: "+pax+"</a>";
			// let pasajeros = "<label class='lblpopover lbl-"+fecha+"'>Pax: "+pax+"</label>";
			// let pasajeros = "<a href='"+base+'/'+"'><label class='lblpopover lbl-"+fecha+"'>Pax: "+pax+"</label></a>";
			// let pasajeros = "<a class = lblpopover lbl-"+fecha+" href='"+base+'/'+"'>Pax: "+pax+"</a>";
			// console.log("<a href='"+base+'/'+"'><label class='lblpopover lbl-"+fecha+"'>Pax: "+pax+"</label></a>");
			// console.log("<a href='"+base+'/'+"'><label class='lblpopover lbl-"+fecha+"'>Pax: "+pax+"</label></a>");
			$("[data-date='"+fecha+"'] .fc-daygrid-day-number")
				.after(pasajeros)
				.next('a')
				// .next('label')
				.addClass('bg-dark')
				.css('color','white')
				.css('font-weight','bold')
				.css('padding','2%')
				.css('float', 'left')
				.css('margin-right', '25%')
				.css('margin-top', '4%')
				.css('font-size', '80%')
				.css('z-index',999999999999999);
			$('.lbl-'+fecha).on('click',function(e) {
				etq_pax=true
				e.preventDefault();
				e.stopPropagation();
				var newWindow = window.open(base+'/', '_blank');
				$(newWindow).on('load', function() {
					etq_pax = false;
					$('#fecha', newWindow.document).val(fecha);
					// Hacer el recalculo del pax en inicio, que no tome en cuernta los estados
					// Cancelada, No Show y Rechazada
				});

			})
		}	
		if (calendar.view.type === 'timeGridWeek') {
			const fechaMoment = moment(fecha);
			const fechaFormateada = fechaMoment.format("D/M");
			$('a.fc-col-header-cell-cushion:contains("' + fechaFormateada + '")').each(function() {
				const paxExist = $(this).next('.pax').length;
				if (!paxExist && pax > 0) {
					$(this).after('<span class="pax">PAX: ' + pax + '</span>');
				}
			});
		}
	}
}
function vistaActual(date) {
    if (calendar.view.type === 'timeGridWeek') {
      var dayOfWeek = date.toLocaleString('es', { weekday: 'long' });
      var weekLabel = 'pax_semana';
		$('.fc-scrollgrid-sync-inner').append('<br>Pax: 25');
    } 

}
function onMonthChange() {
	setTimeout(() => {
		filtrarEventos()
	}, 1500);
	// $("#det_REGULAR").html('999')
	let fechaActual = calendar.getDate();
	let fecha = moment(fechaActual).format('YYYY-MM-DD')
	$(".cant_tipo").html(0);
	$.get(base+'/calendario/tipos_mes/'+fecha, function(data) {
		let response = JSON.parse(data)
	    response.forEach(function(tipo) {
			$("#det_"+tipo.tipo).html(tipo.cant)
		});

	});		
}
function mostrarReservas(fecha,e) {
	e.preventDefault();
	console.log(fecha);
}

function editar(id) {	

    $("#div_passwd").show();
    $(".requerido").show();
    $("#tipo").hide();
    $("#sucursal").hide();
    $("#salon").hide();
    $("#mesa").hide();
    $("#pago_local").hide();
    $("#audio").hide();
    $("#video").hide();
    $("#video_audio").hide();
    $("#adicional").hide();
    $("#extra").hide();
    $("#menu_impreso").hide();
    $("#table_tent").hide();
    $("#restriccion").hide();
    $("#tipo_reserva").show();
    $("#ssucursal").show();
    $("#ssalon").show();
    $("#smesa").show();
    $("#spago_local").show();
    $("#saudio").show();
    $("#svideo").show();
    $("#svideo_audio").show();
    $("#sadicional").show();
    $("#sextra").show();
    $("#smenu_impreso").show();
    $("#stable_tent").show();
    $("#srestriccion").show();
    $("#fmenu1").show();
    $("#fmenu2").show();
    $("#fprecuenta").show();
    $("#ffactura").show();
    $("#flogo").show();
    $("#fotro").show();

    $(".clear_fmenu1").show().attr("data-id", id);
    $(".clear_fmenu2").show().attr("data-id", id);
    $(".clear_fprecuenta").show().attr("data-id", id);
    $(".clear_ffactura").show().attr("data-id", id);
    $(".clear_flogo").show().attr("data-id", id);
    $(".clear_fotro").show().attr("data-id", id);

    $("#fecha_reserva").attr("disabled", false);
    $("#hora_reserva").attr("disabled", false);
    $("#pasajeros").attr("disabled", false);
    $("#cliente").attr("disabled", false);
    $("#empresa").attr("disabled", false);
    $("#hotel").attr("disabled", false);
    $("#telefono").attr("disabled", false);
    $("#correo").attr("disabled", false);
    $("#observaciones").attr("disabled", false);
    $("#nombre_adicional").attr("disabled", false);
    $("#pax").attr("disabled", false);
    $("#nombre_contacto").attr("disabled", false);
    $("#telefono_contacto").attr("disabled", false);
    $("#correo_contacto").attr("disabled", false);
    $("#idioma").attr("disabled", false);
    $("#cristaleria").attr("disabled", false);
    $("#anticipo").attr("disabled", false);
    $("#valor_menu").attr("disabled", false);
    $("#total_s_propina").attr("disabled", false);
    $("#total_c_propina").attr("disabled", false);
    $("#autoriza").attr("disabled", false);
    $("#telefono_autoriza").attr("disabled", false);
    $("#monto_autorizado").attr("disabled", false);
    $("#detalle_restriccion").attr("disabled", false);
    $("#decoracion").attr("disabled", false);
    $("#ubicacion").attr("disabled", false);
    $("#monta").attr("disabled", false);
    $("#comentarios").attr("disabled", false);
    $("#id_reserva").html("Editar Reserva ID: " + id);
    $('a[href="#general"]')[0].click();
    
    
    $.ajax({
        url: base + "/reservar/get_reserva/" + id,
        type: "get",
        dataType: "json",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
        success: function (response) {
            console.log(response[0]);

            $("#fecha_reserva").val(response[0].fecha_reserva);
            $("#hora_reserva").val(response[0].hora_reserva);
            $("#pasajeros").val(response[0].cantidad_pasajeros);
            $("#tipo").val(response[0].tipo_reserva);

			listTipos(response[0].tipo_reserva);

            // panel(response[0].tipo);

            $("#tipo_reserva").val(response[0].tipo_reserva);
            $("#cliente").val(response[0].nombre_cliente);
            $("#empresa").val(response[0].nombre_empresa);
            $("#hotel").val(response[0].nombre_hotel);
            $("#telefono").val(response[0].telefono_cliente);
            $("#correo").val(response[0].email_cliente);
            $("#ssucursal").val(response[0].sucursal);

            // sucursal(response[0].sucursal, response[0].salon, response[0].mesa);

			listSucursales(response[0].sucursal);
			listSalones(response[0].salon, response[0].sucursal);
			listMesas(response[0].mesa, response[0].salon);

            $("#observaciones").val(response[0].observaciones);
            $("#nombre_adicional").val(response[0].evento_nombre_adicional);
            $("#pax").val(response[0].evento_pax);
            $("#nombre_contacto").val(response[0].evento_nombre_contacto);
            $("#telefono_contacto").val(response[0].evento_telefono_contacto);
            $("#correo_contacto").val(response[0].evento_email_contacto);
            $("#idioma").val(response[0].evento_idioma);
            $("#cristaleria").val(response[0].evento_cristaleria);
            $("#anticipo").val(response[0].evento_anticipo);
            $("#valor_menu").val(response[0].evento_valor_menu);
            $("#total_s_propina").val(response[0].evento_total_sin_propina);
            $("#total_c_propina").val(response[0].evento_total_propina);
            $("#spago_local").val(response[0].evento_paga_en_local);
            $("#saudio").val(response[0].evento_audio);
            $("#svideo").val(response[0].evento_video);
            $("#svideo_audio").val(response[0].evento_video_audio);
            $("#sadicional").val(response[0].evento_mesa_soporte_adicional);
            $("#sextra").val(response[0].evento_extra_permitido);
            $("#autoriza").val(response[0].autoriza);
            $("#telefono_autoriza").val(response[0].telefono_autoriza);
            $("#monto_autorizado").val(response[0].monto_autorizado);
            $("#smenu_impreso").val(response[0].evento_menu_impreso);
            $("#stable_tent").val(response[0].evento_table_tent);
            $("#srestriccion").val(response[0].evento_restriccion_alimenticia);
            $("#detalle_restriccion").val(
                response[0].evento_detalle_restriccion
            );
            $("#decoracion").val(response[0].evento_decoracion);
            $("#monta").val(response[0].evento_monta); //?
            $("#ubicacion").val(response[0].evento_ubicacion);
            $("#comentarios").val(response[0].evento_comentarios);
            $("#rsalon").val(response[0].salon);
            $("#rmesa").val(response[0].mesa);
            $("#lnk_menu1").html(
                imageForm("lnk_menu1", response[0].archivo_1)
            );
            $("#lnk_menu2").html(
                imageForm("lnk_menu2", response[0].archivo_2)
            );
            $("#lnk_precuenta").html(
                imageForm("lnk_precuenta", response[0].archivo_3)
            );
            $("#lnk_factura").html(
                imageForm("lnk_factura", response[0].archivo_4)
            );
            $("#lnk_otro").html(imageForm("lnk_otro", response[0].archivo_5));
            $("#lnk_logo").html(
                imageForm("lnk_logo", response[0].evento_logo)
            );
            // arch(JSON.stringify(response[0]));
            // if (
            //     response[0].tipo == "EVENTO" ||
            //     response[0].tipo == "PRERESERVA"
            // ) {
            //     $("#pax").val($("#pasajeros").val());
            //     $("#panel_eventos").css("visibility", "visible");
            // } else {
            //     $("#panel_eventos").css("visibility", "hidden");
            // }
            

			continuar(response);
        },
    });
   
}


$('#tipo_reserva').on('change',function() {	
	console.log(2)
	// if ($("#tipo_reserva option:selected").text()=='EVENTO' ||
	//  $("#tipo_reserva option:selected").text()=='REGULAR' ) {
		//Todo: aqui va a mostrar tantos la reservas tipo EVENTO como REGULARES seleccionadas.
		$("#pax").val($("#pasajeros").val());
		$("#panel_eventos").css("visibility", "visible");

	// } else {
	// 	$("#panel_eventos").css("visibility", "hidden");
	// }
});


function cambiar_archivo(etiqueta, anchor, ctl) {
    $("#" + etiqueta).html("");
    let miAnchor = $("#" + anchor);
    let miImagen = miAnchor.find("img");
    if (miImagen.length > 0) {
        miImagen.remove();
    }
    let pdf = $("#" + ctl)[0].files[0].type.indexOf("pdf");
    let jpeg = $("#" + ctl)[0].files[0].type.indexOf("jpeg");
    let jpg = $("#" + ctl)[0].files[0].type.indexOf("jpg");
    let png = $("#" + ctl)[0].files[0].type.indexOf("png");
    if (pdf == -1 && jpeg == -1 && jpg == -1 && png == -1) {
        $("#" + ctl).val(null);
        toastr.error(
            "El archivo no ha sido cargado debido a que sólo puede cargar archivos pdf, jpeg, jpg, png; intente de nuevo con un arcivo válido"
        );
    } else {
        if (pdf > -1) {
            url =
                "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/272a0577357ca4502d5111c5af4228fe22810758.png";
        } else if (jpeg > -1 || jpg > -1 || png > -1) {
            url =
                "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png";
        }
        miAnchor.append(
            '<img src="' +
                url +
                '" height="50px" width="50px" title="' +
                $("#" + ctl)[0].files[0].name +
                '"></img>'
        );
        let nombre = "";
        if ($(window).width() > 992) {
            nombre =
                $("#" + ctl)[0].files[0].name.length > 17
                    ? $("#" + ctl)[0].files[0].name.substring(0, 14) + "..."
                    : $("#" + ctl)[0].files[0].name;
        } else {
            nombre = $("#" + ctl)[0].files[0].name;
        }
        $("#" + etiqueta).html(nombre);
        $("#" + etiqueta).attr("title", $("#" + ctl)[0].files[0].name);
    }
}

$("#fmenu1,#fmenu2,#fprecuenta,#ffactura,#flogo,#fotro").on(
    "change",
    function () {
        let id = $(this).attr("id");
        switch (id) {
            case "fmenu1":
                cambiar_archivo("lbl-fmenu1", "lnk_menu1", id);
                break;
            case "fmenu2":
                cambiar_archivo("lbl-fmenu2", "lnk_menu2", id);
                break;
            case "fprecuenta":
                cambiar_archivo("lbl-fprecuenta", "lnk_precuenta", id);
                break;
            case "ffactura":
                cambiar_archivo("lbl-ffactura", "lnk_factura", id);
                break;
            case "flogo":
                cambiar_archivo("lbl-flogo", "lnk_logo", id);
                break;
            case "fotro":
                cambiar_archivo("lbl-fotro", "lnk_otro", id);
                break;
        }
    }
);

limpiarArchivos();

function limpiarArchivos() {
    $(".clear_fmenu1").on("click", function () {
        $("#fmenu1").val("");

        if ($("#lbl-fmenu1").html() != "") {
            $("#lbl-fmenu1").html("");
            $("#lnk_menu1").html("");
        }
        borrarArchivo($(".clear_fmenu1").data("id"), "archivo_1", "menu1");
    });

    $(".clear_fmenu2").on("click", function () {
        $("#fmenu2").val("");

        if ($("#lbl-fmenu2").html() != "") {
            $("#lbl-fmenu2").html("");
            $("#lnk_menu2").html("");
        }

        borrarArchivo($(".clear_fmenu2").data("id"), "archivo_2", "menu2");
    });

    $(".clear_fprecuenta").on("click", function () {
        $("#fprecuenta").val("");

        if ($("#lbl-fprecuenta").html() != "") {
            $("#lbl-fprecuenta").html("");
            $("#lnk_precuenta").html("");
        }
        borrarArchivo(
            $(".clear_fprecuenta").data("id"),
            "archivo_3",
            "precuenta"
        );
    });

    $(".clear_ffactura").on("click", function () {
        $("#ffactura").val("");

        if ($("#lbl-ffactura").html() != "") {
            $("#lbl-ffactura").html("");
            $("#lnk_factura").html("");
        }
        borrarArchivo($(".clear_ffactura").data("id"), "archivo_4", "factura");
    });

    $(".clear_fotro").on("click", function () {
        $("#fotro").val("");
        if ($("#lbl-fotro").html() != "") {
            $("#lbl-fotro").html("");
            $("#lnk_otro").html("");
        }
        borrarArchivo($(".clear_fotro").data("id"), "archivo_5", "otro");
    });

    $(".clear_flogo").on("click", function () {
        $("#flogo").val("");
        if ($("#lbl-flogo").html() != "") {
            $("#lbl-flogo").html("");
            $("#lnk_logo").html("");
        }
        borrarArchivo($(".clear_fotro").data("id"), "evento_logo", "logo");
    });
}

function borrarArchivo(id, archivo, id_name) {
    // var hrefValor = $('.lnk_menu1').attr('href');
    // var url_archivo = $("#lnk_"+archivo+" a").attr('href');
    console.log(id, archivo);
    var data = {
        id: id,
        columna: archivo,
    };
    $.ajax({
        type: "POST",
        url: base + "/reservar/borrar_archivo",
        data: data,
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            // 'Content-Type': 'application/json'
        },
        dataType: "JSON",
        success: function (response) {
            if (response.status == 1) {
                console.log(response.data);

                if (archivo == "archivo_1") {
                    if (response.data.archivo_1 == "") {
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_2") {
                    if (response.data.archivo_1 == "") {
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_3") {
                    if (response.data.archivo_1 == "") {
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_4") {
                    if (response.data.archivo_1 == "") {
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_5") {
                    if (response.data.archivo_1 == "") {
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "evento_logo") {
                    if (response.data.archivo_1 == "") {
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                }

                $("#lbl-f" + id_name).html("");
                $("#lnk_" + id_name).html("");
            }
        },
    });
}

$("#btn_reerva").on("click", function () {
    // mostrar_loader();
    let valido = validar();
    if (valido) {
        let clave = $("#clave").val();
        const opcionesFetch0 = {
            method: "POST",
            headers: {
                "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clave: clave,
            }),
        };
        fetch(base + "/reservar/verificarclave", opcionesFetch0)
            .then((response) => response.json())
            .then(function (response) {
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
                        method: "GET",
                        headers: {
                            "X-CSRF-Token": $('meta[name="_token"]').attr(
                                "content"
                            ),
                            "Content-Type": "application/json",
                        },
                    };
                    fetch(
                        base + "/reservar/check_bloqueo/" + fecha + "/" + hora,
                        opcionesFetch3
                    )
                        .then((response) => response.json())
                        .then(function (response) {
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
                                const opcionesFetch0 = {
                                    method: "POST",
                                    headers: {
                                        "X-CSRF-Token": $(
                                            'meta[name="_token"]'
                                        ).attr("content"),
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        cliente: cli,
                                    }),
                                };
                                fetch(
                                    base + "/clientes/buscarliente",
                                    opcionesFetch0
                                )
                                    .then((response) => response.json())
                                    .then(function (response) {
                                        if (response.respuesta == 0) {
                                            let data = [
                                                (tipo = $( "#tipo option:selected" ).val() != "Seleccione" ? $( "#tipo option:selected" ).val() : 0),
                                                (cliente = $("#cliente").val()),
                                                (empresa = $("#empresa").val()),
                                                (hotel = $("#hotel").val()),
                                                (telefono = $("#telefono").val()),
                                                (correo = $("#correo").val()),
                                            ];
                                            const opcionesFetch1 = {
                                                method: "POST",
                                                headers: {
                                                    "X-CSRF-Token": $( 'meta[name="_token"]' ).attr("content"), "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    data: data,
                                                }),
                                            };
                                            fetch(
                                                base + "/clientes/clientemin",
                                                opcionesFetch1
                                            )
                                                .then((response) =>
                                                    response.json()
                                                )
                                                .then(function (response) {
                                                    if ( response[0]["status"] == 1 ) {
                                                        toastr.clear();
                                                        toastr.success( "reserva actualizada" );
                                                        // actualizar();
                                                        actualizar_reserva();
                                                    } else {
                                                        toastr.clear();
                                                        let error = "";
                                                        if ( response[0][ "error" ].indexOf( "clientes_tipo_id_foreign" ) > -1 ) {
                                                            error =
                                                                "No se ha podido crear el cliente debido a que no indicó el tipo de cliente";
                                                        } else if (
                                                            response[0][
                                                                "error"
                                                            ].indexOf(
                                                                "el valor null para la columna «telefono»"
                                                            ) > -1
                                                        ) {
                                                            error =
                                                                "No se ha podido crear el cliente debido a que no indicó el número de teléfono";
                                                        } else {
                                                            error =
                                                                "No se ha podido crear el cliente debido a que ocurrió un error";
                                                        }
                                                        toastr.error(error);
                                                    }
                                                });
                                        } else {
                                            $.LoadingOverlay("show");
                                            actualizar_reserva();
                                            $.LoadingOverlay("hide");
                                            toastr.success( "RESERVA ACTUALIZADA" );
                                        }
                                    });
                            }
                        });
                }
                /////////////////////
            });
    } else {
        Swal.fire({
            title: "¡Tiene campos obligatorios por completar!",
            text: "Todos los campos maracados con un * son obligatorios, debe proporcionar la información solicitada",
            icon: "error",
            confirmButtonColor: "#f34e4e",
            confirmButtonText: "Regresar",
        });
    }
    // ocultar_loader();
});

function actualizar_reserva() {    

    const id = parseInt( $("#id_reserva").html().substring($("#id_reserva").html().indexOf("ID: ") + 4) .trim() );
    let dianoche = null;
    let horaInicio = moment($("#hora_reserva").val(), "h:mma");
    var horaFin = moment("4:00pm", "h:mma");
    if (horaInicio.isBefore(horaFin)) {
        dianoche = 1;
    } else {
        dianoche = 2;
    }
    const formData = new FormData();
    const archivo1 =
        typeof $("#fmenu1")[0].files[0] === "undefined"
            ? $("#arch1").val()
            : $("#fmenu1")[0].files[0];
    const archivo2 =
        typeof $("#fmenu2")[0].files[0] === "undefined"
            ? $("#arch2").val()
            : $("#fmenu2")[0].files[0];
    const archivo3 =
        typeof $("#fprecuenta")[0].files[0] === "undefined"
            ? $("#arch3").val()
            : $("#fprecuenta")[0].files[0];
    const archivo4 =
        typeof $("#ffactura")[0].files[0] === "undefined"
            ? $("#arch4").val()
            : $("#ffactura")[0].files[0];
    const archivo5 =
        typeof $("#fotro")[0].files[0] === "undefined"
            ? $("#arch5").val()
            : $("#fotro")[0].files[0];
    const evento_logo =
        typeof $("#flogo")[0].files[0] === "undefined"
            ? $("#arch6").val()
            : $("#flogo")[0].files[0];
    const fecha_reserva = $("#fecha_reserva").val();
    const hora_reserva = $("#hora_reserva").val();
    const evento_paga_en_local =
        $("#spago_local option:selected").val() == "Seleccione"
            ? 2
            : $("#spago_local option:selected").val();
    const evento_audio =
        $("#saudio option:selected").val() == "Seleccione"
            ? 2
            : $("#saudio option:selected").val();
    const evento_video =
        $("#svideo option:selected").val() == "Seleccione"
            ? 2
            : $("#svideo option:selected").val();
    const evento_video_audio =
        $("#svideo_audio option:selected").val() == "Seleccione"
            ? 2
            : $("#svideo_audio option:selected").val();
    const evento_mesa_soporte_adicional =
        $("#adicional option:selected").val() == "Seleccione"
            ? 2
            : $("#sadicional option:selected").val();
    const evento_ubicacion = $("#ubicacion").val();
    const evento_menu_impreso =
        $("#smenu_impreso option:selected").val() == "Seleccione"
            ? 2
            : $("#smenu_impreso option:selected").val();
    const evento_table_tent =
        $("#stable_tent option:selected").val() == "Seleccione"
            ? 2
            : $("#stable_tent option:selected").val();
    const evento_restriccion_alimenticia =
        $("#srestriccion option:selected").val() == "Seleccione"
            ? 2
            : $("#srestriccion option:selected").val();
    const evento_extra_permitido =
        $("#sextra option:selected").val() == "Seleccione"
            ? 2
            : $("#sextra option:selected").val();
    const evento_detalle_restriccion = $("#detalle_restriccion").val();
    formData.append("id", id);
    formData.append("fecha_reserva", fecha_reserva);
    formData.append("hora_reserva", hora_reserva);
    formData.append("pasajeros", $("#pasajeros").val());
    formData.append("tipo", $("#tipo_reserva option:selected").val());
    formData.append("cliente", $("#cliente").val().trim());
    formData.append("empresa", $("#empresa").val().trim());
    formData.append("hotel", $("#hotel").val().trim());
    formData.append("telefono", $("#telefono").val().trim());
    formData.append("correo", $("#correo").val().trim());
    formData.append("sucursal", $("#ssucursal option:selected").val());
    formData.append("salon", $("#ssalon option:selected").val());
    formData.append("mesa", $("#smesa option:selected").val());
    formData.append("observaciones", $("#observaciones").val().trim());

    formData.append( "evento_nombre_adicional", $("#nombre_adicional").val().trim() );
    formData.append("evento_pax", $("#pax").val());
    formData.append( "evento_nombre_contacto", $("#nombre_contacto").val().trim() );
    formData.append( "evento_telefono_contacto", $("#telefono_contacto").val().trim() ); 
    formData.append( "evento_correo_contacto", $("#correo_contacto").val().trim() );
    formData.append("evento_idioma", $("#idioma").val().trim());
    formData.append("evento_cristaleria", $("#cristaleria").val().trim());
    formData.append("evento_anticipo", $("#anticipo").val());
    formData.append("evento_valor_menu", $("#valor_menu").val());
    formData.append("evento_valor_menu", $("#valor_menu").val());
    formData.append("evento_total_sin_propina", $("#total_s_propina").val());
    formData.append("evento_total_propina", $("#total_c_propina").val());
    formData.append("evento_paga_en_local", evento_paga_en_local);

    formData.append("evento_audio", evento_audio);
    formData.append("evento_video", evento_video);
    formData.append("evento_video_audio", evento_video_audio);
    formData.append( "evento_mesa_soporte_adicional", evento_mesa_soporte_adicional );
    formData.append("evento_ubicacion", evento_ubicacion);

    formData.append("evento_menu_impreso", evento_menu_impreso);
    formData.append("evento_table_tent", evento_table_tent);
    formData.append( "evento_restriccion_alimenticia", evento_restriccion_alimenticia );
    formData.append("evento_detalle_restriccion", evento_detalle_restriccion);
    formData.append("evento_extra_permitido", evento_extra_permitido);
    formData.append("autoriza", $("#autoriza").val());
    formData.append("telefono_autoriza", $("#telefono_autoriza").val());
    formData.append("monto_autorizado", $("#monto_autorizado").val());

    formData.append("evento_decoracion", $("#decoracion").val());
    formData.append("ambiente", $("#ubicacion").val());
    formData.append("evento_monta", $("#monta").val());
    formData.append("evento_comentarios", $("#comentarios").val());
    formData.append("dianoche", dianoche);

    formData.append("archivo_1", archivo1);
    formData.append("archivo_2", archivo2);
    formData.append("archivo_3", archivo3);
    formData.append("archivo_4", archivo4);
    formData.append("archivo_5", archivo5);
    formData.append("evento_logo", evento_logo);

    const opcionesFetch = {
        method: "POST",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
        },
        body: formData,
    };
    fetch(base + "/reservar/actualizar", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            if (response[0].status == 0) {
                toastr.error(response[0].error);
            } else {               

                $("#frm-general").trigger("reset");
                $("#frm-evento").trigger("reset");
                $("#clave").val("");
                $("#panel_eventos").css("visibility", "hidden");
                Swal.fire({
                    title: "La reserva ha sido actualizada exitosamente",
                    text: "",
                    icon: "success",
                    confirmButtonColor: "#51d28c",
                    confirmButtonText: "Continuar",
                }).then(function (result) {
                    $("#mdl-vreserva").modal("toggle");
                    pax(0);
                    $("#reservas_tbl").bootstrapTable("refresh");
                });
            }
        });
}

// Todo Pendiente 11-01-24 falta evaluar el validado para el formulario de editar reserva
function validar() {
    let valido = true;
    $("#frm_reservas .req").each(function () {
        let id = null;
        switch ($(this)[0]["tagName"]) {
            case "INPUT":
                id = $(this)[0]["id"];
                if (
                    $("#" + id).val().length == 0 &&
                    $("#" + id).is(":visible")
                ) {
                    valido = false;
                    $("#err_" + id).html("Campo obligatorio");
                }
                break;
            case "SELECT":
                id = $(this)[0]["id"];
                if (
                    $("#" + id + " option:selected").val() == "Seleccione" ||
                    $("#" + id + " option:selected").val() == undefined
                ) {
                    valido = false;
                    $("#err_" + id).html("Campo obligatorio");
                }
                break;
        }
    });
    return valido;
}