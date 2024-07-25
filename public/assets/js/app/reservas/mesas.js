var txtOriginal = "";
var montoOriginal = "";
var act = 'mesas';
var titulo = 'Crear Mesas'
var url = ''
var table = 'mesas_tbl';
$(document).ready(function(){
	tabla(table);
	$(".edit-control").hide();
	$("#agr_mesa").hide();
	$("#nuevo_mesa").on('input', function (evt) {
		$(this).val($(this).val().replace(/[^0-9]/g, ''));
	});
	$("#capacidad").on('input', function (evt) {
		$(this).val($(this).val().replace(/[^0-9]/g, ''));
	});
	$("#sucursal").append('<option selected disabled>Seleccione</option>');
	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	fetch(base+'/reservas/reservassucursales',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			$("#sucursal").append('<option value = '+vector.id+'>'+vector.sucursal+'</option>');
		})
	});
	$("#sucursal").on("change",function() {
		let suc=$("#sucursal option:selected").val();
		$("#salon").empty();
		$("#salon").append('<option selected disabled>Seleccione</option>');
		const opcionesFetch = {
			method: 'GET',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		}
		fetch(base+'/reservas/salonessucursales/'+suc,opcionesFetch)
		.then(response => response.json())
		.then(function(response) {
			response.forEach(function(vector) {
				$("#salon").append('<option value = '+vector.id+'>'+vector.salon+'</option>');
			})
		});
	})
	$("body").on("click",'button.edit-tbl',function(e) {

        let id = parseInt($(this).attr("id").replace("editar", "").trim());
        let sucursal_id =  $(this).data('sucursal_id');
        let salon_id =  $(this).data('salon_id');
        let mesa =  $(this).data('mesa');
        let capacidad =  $(this).data('capacidad');

        $(".modal-title").html("Edición de la Mesa ID: " + id);

        let mddl_mesa = new bootstrap.Modal(document.getElementById('mdl-mesa'), {});

        $("#mesa_id").val(id);
        // $("#edit_sucursal_id").val(sucursal_id);
        listSucursales(sucursal_id);
        listSalones(salon_id, sucursal_id);

        $("#edit_salon_id").val(salon_id);
        $("#edit_mesa").val(mesa);
        $("#edit_capacidad").val(capacidad);

        mddl_mesa.show();

        $("#btn-guardar").attr("disabled", false);



		// let mesaId=parseInt($(this).closest('td').prev().prev()[0]['outerText']);
		// let rowId = parseInt($(this).closest('tr')[0]['rowIndex']);
		// $(this).closest('td').prev().addClass('background-edit');
		// $(this).closest('td').prev().prev().addClass('background-edit');
		// $(this).closest('td').prev().prev().prev().addClass('background-edit');
		// $(this).closest('td').prev().prev().prev().prev().addClass('background-edit');
		// sucOriginal = $(this).closest('td').prev().prev().prev().prev()[0]['outerText'];
		// salOriginal = $(this).closest('td').prev().prev().prev()[0]['outerText'];
		// mesOriginal = $(this).closest('td').prev().prev()[0]['outerText'];
		// capOriginal = $(this).closest('td').prev()[0]['outerText'];
		// let control =
		// `
		// 	<td><div class="row">
		// 		<div class="col-xs-8 col-sm-8 col-md-8 data-mesa-in">`+capOriginal+`<span></span>
		// 		</div>
		// 		<div class="col-xs-12 col-sm-12 col-md-1 edit-ctl`+rowId+` edit-control">
		// 			<button id="edt_acc`+rowId+`" class="btn btn-primary btn-sm edt_ctl" title="Confirmar"><i
		// 					class="fas fa-check"></i></button>
		// 		</div>
		// 		<div class="col-xs-12 col-sm-12 col-md-1 canc-ctl`+rowId+` edit-control">
		// 			<button id="edt_can`+rowId+`" class="btn btn-dark btn-sm can_ctl" title="Cancelar"><i
		// 					class="fas fa-times"></i></button>
		// 		</div>
		// 	</div></td>
		// `;
		// let control1 =
		// `
		// 	<td>
		// 		<select id="sal" class="form-control col-xs-8 col-sm-8 col-md-8 "></select>
		// 	</td>
		// `;
		// let control2 =
		// `
		// 	<td>
		// 		<select id="suc" class="form-control col-xs-8 col-sm-8 col-md-8 "></select>
		// 	</td>
		// `;
		// $(this).closest('td').prev()[0]['innerHTML']=control;
		// $(this).closest('td').prev().prev().prev()[0]['innerHTML']=control1;
		// $(this).closest('td').prev().prev().prev().prev()[0]['innerHTML']=control2;
		// $(this).closest('td').prev().attr('contenteditable','true');
		// $(this).closest('td').prev().prev().attr('contenteditable','true');
		// $("#suc").append('<option disabled>Seleccione</option>');
		// const opcionesFetch = {
		// 	method: 'GET',
		// 	headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		// }
		// fetch(base+'/reservas/reservassucursales',opcionesFetch)
		// .then(response => response.json())
		// .then(function(response) {
		// 	response.forEach(function(vector) {
		// 		let sel = vector.sucursal == sucOriginal?" selected ":"";
		// 		$("#suc").append('<option value = '+vector.id+sel+'>'+vector.sucursal+'</option>');
		// 	})
		// });
		// setTimeout(() => {
		// 	salon();
		// }, 500);
		// $("#suc").on("change",function() {
		// 	salon();
		// });
		// $(".edit-tbl").attr("disabled",true);
		// $(".delete-tbl").attr("disabled",true);
		// $("#mesa_add").attr("disabled",true);
	});

    $('#edit_sucursal_id').on('change', function () {
       var sucursal_id = $(this).val();
       listSalones("", sucursal_id);

    });


	$("body").on("click",'button.can_ctl',function() {
		$(this).closest('td').removeClass('background-edit');
		$(this).closest('td').html(txtOriginal);
		$('#mesas_tbl').bootstrapTable('refresh');
		toastr.error('Se ha cancelado la edición');
	})
	$("body").on("click",'button#btn-guardar',function() {

        let id = $('#mesa_id').val();

		// let suc=$("#sucursal option:selected").val();
		// let id = parseInt($(this).closest('tr')[0].children[0]['textContent'].trim());
		// sucNuevo = $("#suc option:selected").val();
		// salNuevo = $("#sal option:selected").val();
		// capNuevo = $(this).closest('td')[0]['outerText'];
		// mesNuevo = $(this).closest('td').prev()[0]['outerText']; //mesa

        sucNuevo = $("#edit_sucursal_id option:selected").val();
		salNuevo = $("#edit_salon_id option:selected").val();
		capNuevo = $("#edit_capacidad").val();
		mesNuevo = $("#edit_mesa").val(); //mesa



		if (sucNuevo.trim().length >0 && salNuevo.trim().length >0 && capNuevo.trim().length >0 && mesNuevo.trim().length >0) {
			const opcionesFetch = {
				method: 'PUT',
				headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
				body: JSON.stringify({ id:id, sucursal_id:sucNuevo,salon_id:salNuevo,mesa:mesNuevo,capacidad:capNuevo })
			}
			fetch(base+'/reservas/mesas/'+id,opcionesFetch)
			.then(response => response.json())
			.then(function(response) {
				if (response[0].status == 1) {
					// $(".edit-tbl").attr("disabled",false);
					// $(".delete-tbl").attr("disabled",false);
					// $("#mesa_add").attr("disabled",false);
                    $('.modal-backdrop').remove();
                    $("#mdl-mesa").hide();
					$('#mesas_tbl').bootstrapTable('refresh');
					toastr.success('El registro ha sido actualizado exitosamente');
				} else {
					toastr.error('Error: '+response[0].error);
				}
			})
		} else {
			toastr.error('Todos los campos son obligatorios y deben ser incluidos')
		}

	})

    $("body").on("click",'button.delete-tbl',function(e) {
        e.preventDefault();
		let id=parseInt($(this).closest('tr')[0].children[0]['textContent'].trim());
        Swal.fire({
			title: "¿Está seguro que desa eliminar el registro?",
            text: "Una vez realizada esta acción, la misma no podrá ser revertida",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#51d28c",
            cancelButtonColor: "#f34e4e",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then(function (result) {
			if (result.value) {
				const opcionesFetch = {
					method: 'DELETE',
					headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
					body: JSON.stringify({ id:id })
				}
				fetch(base+'/reservas/mesas/'+id,opcionesFetch)
				.then(response => response.json())
				.then(function(response) {
					if (response[0].status == 1) {

						$('#mesas_tbl').bootstrapTable('refresh');
						toastr.success('El registro ha sido eliminado exitosamente');
					} else {
						toastr.error('Error: '+response[0].error);
					}
				})
            }
        });
    });
	$("#agr_can").on("click",function() {
		$("#nuevo_mesa").val('');
		$("#nuevo_monto").val('');
		$("#agr_mesa").hide();

		toastr.error("Se ha cancelado la creación del registro");
	});
	$("#agregar").on("click",function() {
		if(
			$("#sucursal option:selected").val() == "Seleccione" ||
			typeof $("#salon option:selected").val() =="undefined" ||
			$("#nuevo_mesa").val().trim() ==0 ||
			$("#capacidad").val().trim() ==0
		){
			toastr.error("Todos los campo son obligatorios, ninguno puede estar vacío");
		} else {

			let sucursal = $("#sucursal option:selected").val();
			let salon = $("#salon option:selected").val()

			let mesa = $("#nuevo_mesa").val();
			let capacidad = $("#capacidad").val();
			const opcionesFetch = {
				method: 'POST',
				headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
				body: JSON.stringify({  sucursal:sucursal,salon:salon,mesa:mesa,capacidad:capacidad })
			}
			fetch(base+'/reservas/mesas',opcionesFetch)
			.then(response => response.json())
			.then(function(response) {
				if (response[0].status ==1) {

					$("#nuevo_mesa").val('');
					$("#nuevo_monto").val('');
					$("#agr_mesa").hide();
					$('#sucursal').val('');
					$('#salon').val('');
					$('#capacidad').val('');		

					$('#mesas_tbl').bootstrapTable('refresh');
					toastr.success('El registro ha sido creado exitosamente');
				} else {
					toastr.error('Error: '+response[0].error);
				}
			})
		}
		// if(
		// 	$("#sucursal option:selected").val() ==0 &&
		// 	$("#salon option:selected").val() ==0 &&
		// 	$("#nuevo_mesa").val().trim() ==0 &&
		// 	$("#capacidad").val().trim() ==0
		// ){
		// 	toastr.error("Debe indicar la sucursal, el sal´n, el número de mesa y la capacidad, los campos no pueden estar vacios");
		// }else if ($("#nuevo_mesa").val().trim() ==0) {
		// 	toastr.error("Debe indicar la mesa, el campo no puede estar vacio");
		// } else if($("#nuevo_monto").val().trim() ==0) {
		// 	toastr.error("Debe indicar el monto, el campo no puede estar vacio");
		// } else {
		// 	// let mesa = $("#nuevo_mesa").val();
		// 	// let monto = $("#nuevo_monto").val();
		// 	// const opcionesFetch = {
		// 	// 	method: 'POST',
		// 	// 	headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		// 	// 	body: JSON.stringify({  mesa: mesa, monto:monto })
		// 	// }
		// 	// fetch(base+'/mesareservas/mesas',opcionesFetch)
		// 	// .then(response => response.json())
		// 	// $("#nuevo_mesa").val('');
		// 	// $("#nuevo_monto").val('');
		// 	// $("#agr_mesa").hide();
		// 	// $('#mesas_tbl').bootstrapTable('refresh');
		// 	toastr.success('El registro ha sido creado exitosamente');
		// }
	});
});

$("#nuevo_monto").on('input', function (evt) {
	$(this).val($(this).val().replace(/[^0-9]/g, ''));
});

function frm_monto(value) {
	return value.toLocaleString("es-CL");
}

function salon() {
	let id_suc = $("#suc option:selected").val();
	$("#sal").empty();
	$("#suc").append('<option disabled>Seleccione</option>');
	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	fetch(base+'/reservas/salonessucursales/'+id_suc,opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			let sel = vector.salon == salOriginal?" selected ":"";
			$("#sal").append('<option value = '+vector.id+sel+'>'+vector.salon+'</option>');
		});
	});
}
iconos();
btnAgregar();
