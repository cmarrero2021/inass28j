var txtOriginal = "";
var sucursalOriginal = "";
var act = 'salones';
var titulo = 'Crear salones'
var url = ''
var table = 'salones_tbl';

$(document).ready(function(){
	tabla(table);
	$(".edit-control").hide();
	$("#agr_salon").hide();

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


	$("body").on("click",'button.edit-tbl',function(e) {
		let salonId=parseInt($(this).closest('td').prev().prev()[0]['outerText']);
		let rowId = parseInt($(this).closest('tr')[0]['rowIndex']);
		$(this).closest('td').prev().addClass('background-edit');
		$(this).closest('td').prev().prev().addClass('background-edit');
		txtOriginal = $(this).closest('td').prev().prev()[0]['outerText'];
		sucursalOriginal = $(this).closest('td').prev()[0]['outerText'];
		let control =
		`
			<div class="row">
				<div class="col-xs-8 col-sm-8 col-md-8 data-salon-in"><select id="suc" class="form-control"></select><span></span>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-1 edit-ctl`+rowId+` edit-control">
					<button id="edt_acc`+rowId+`" class="btn btn-primary btn-sm edt_ctl" title="Confirmar"><i
							class="fas fa-check"></i></button>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-1 canc-ctl`+rowId+` edit-control">
					<button id="edt_can`+rowId+`" class="btn btn-dark btn-sm can_ctl" title="Cancelar"><i
							class="fas fa-times"></i></button>
				</div>
			</div>
		`;
		$(this).closest('td').prev()[0]['innerHTML']=control;
		$(this).closest('td').prev().prev().attr('contenteditable','true');

		$("#suc").append('<option disabled>Seleccione</option>');
		const opcionesFetch = {
			method: 'GET',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		}
		fetch(base+'/reservas/reservassucursales',opcionesFetch)
		.then(response => response.json())
		.then(function(response) {
			response.forEach(function(vector) {
				let sel = vector.sucursal == sucursalOriginal?" selected ":"";
				$("#suc").append('<option value = '+vector.id+sel+'>'+vector.sucursal+'</option>');
			})
		});	
		$(this).closest('td').prev().prev()[0].focus();
		$(".edit-tbl").attr("disabled",true);
		$(".delete-tbl").attr("disabled",true);
		$("#salon_add").attr("disabled",true);
	});
	$("body").on("click",'button.can_ctl',function() {
		$(this).closest('td').removeClass('background-edit');
		$(this).closest('td').html(txtOriginal);
		$('.salonCol').attr('contenteditable','false');
		$(".edit-control").hide();
		$(".edit-tbl").attr("disabled",false);
		$(".delete-tbl").attr("disabled",false);
		$("#salon_add").attr("disabled",false);
		$('#salones_tbl').bootstrapTable('refresh');
		toastr.error('Se ha cancelado la edición');
	})
	$("body").on("click",'button.edt_ctl',function() {
		let id = parseInt($(this).closest('tr')[0].children[0]['textContent'].trim());
		let nuevoTexto=$(this).closest('tr')[0].children[1]['textContent'].replace(".","").trim();
		let nuevaSucursal=$("#suc option:selected").val();
		// let nuevaSucursal=parseInt($(this).closest('tr')[0].children[2]['textContent'].replace(".","").trim());
		if (nuevoTexto.trim().length>0) {
			const opcionesFetch = {
				method: 'PUT',
				headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
				body: JSON.stringify({ id:id, salon: nuevoTexto,sucursal:nuevaSucursal })
			}
			fetch(base+'/reservas/salones/'+id,opcionesFetch)
			.then(response => response.json())
			.then(function(response){
				if (response[0].status == 1) {
					
					$(".edit-tbl").attr("disabled",false);
					$(".delete-tbl").attr("disabled",false);
					$("#salon_add").attr("disabled",false);
					$('#salones_tbl').bootstrapTable('refresh');
					toastr.success('El registro ha sido actualizado exitosamente');
				} else {
					toastr.error('Error: '+response[0].error);
				}
			})

		} else {
			toastr.error('El nombre del salón no puede estar vacio ');
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
				fetch(base+'/reservas/salones/'+id,opcionesFetch)
				.then(response => response.json())
				.then(function(response) {
					if (response[0].status==1) {

						$('#salones_tbl').bootstrapTable('refresh');
						toastr.success('El registro ha sido eliminado exitosamente');
					} else {
						toastr.error('Error: '+response[0].error);
					}
				})
            }
        });
    });
	$("#agr_can").on("click",function() {
		$("#nuevo_salon").val('');
		$("#sucursal").val('');
		$("#agr_salon").hide();	

		toastr.error("Se ha cancelado la creación del registro");
	});
	$("#agr_acc").on("click",function(e) {
		e.preventDefault();
		console.log(2)
		if($("#sucursal").val().trim() ==0 && ($("#nuevo_salon").val().trim() ==0)) {
			toastr.error("Debe indicar el salón y la sucursal, los campos no pueden estar vacios");
		}else if ($("#nuevo_salon").val().trim() ==0) {
			toastr.error("Debe indicar la salón, el campo no puede estar vacio");
		} else if($("#sucursal").val().trim() ==0) {
			toastr.error("Debe indicar la sucursal, el campo no puede estar vacio");
		} else {
			let salon = $("#nuevo_salon").val();
			let sucursal = $("#sucursal").val();
			const opcionesFetch = {
				method: 'POST',
				headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
				body: JSON.stringify({  salon: salon, sucursal:sucursal })
			}
			fetch(base+'/reservas/salones',opcionesFetch)
			.then(response => response.json())
			.then(function (response) {
				if (response[0].status == 1) {

					$("#nuevo_salon").val('');
					$("#sucursal").val('');
					$("#agr_salon").hide();
					$('#salones_tbl').bootstrapTable('refresh');
					toastr.success('El registro ha sido creado exitosamente');
				} else {
					toastr.error('Error: '+response[0].error);
				}
			})
		}
	});
});

iconos();
btnAgregar();
function crear() {
	// if($("#sucursal").val().trim() ==0 && ($("#nuevo_salon").val().trim() ==0)) {
	// 	toastr.error("Debe indicar el salón y la sucursal, los campos no pueden estar vacios");
	// }else if ($("#nuevo_salon").val().trim() ==0) {
	// 	toastr.error("Debe indicar la salón, el campo no puede estar vacio");
	// } else if($("#sucursal").val().trim() ==0) {
	// 	toastr.error("Debe indicar la sucursal, el campo no puede estar vacio");
	// } else {
	// 	let salon = $("#nuevo_salon").val();
	// 	let sucursal = $("#sucursal").val();
	// 	const opcionesFetch = {
	// 		method: 'POST',
	// 		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	// 		body: JSON.stringify({  salon: salon, sucursal:sucursal })
	// 	}
	// 	fetch(base+'/reservas/salones',opcionesFetch)
	// 	.then(response => response.json())
	// 	.then(function (response) {
	// 		console.log(response);
	// 		if (response[0].status == 1) {

	// 			$("#nuevo_salon").val('');
	// 			$("#sucursal").val('');
	// 			$("#agr_salon").hide();
	// 			$('#salones_tbl').bootstrapTable('refresh');
	// 			toastr.success('El registro ha sido creado exitosamente');
	// 		} else {
	// 			toastr.error('Error: '+response[0].error);
	// 		}
	// 	})
	// }
}