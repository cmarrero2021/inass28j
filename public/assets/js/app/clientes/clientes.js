$(document).ready(function(){
	$('[name="btnAdd"]').removeClass('btn-secondary');
	$('[name="btnAdd"]').addClass('btn-success');
	$('#clientes_tbl').bootstrapTable('hideColumn', 'fecha_nacimiento');
	$('#clientes_tbl').bootstrapTable('hideColumn', 'comuna');
	$('#clientes_tbl').bootstrapTable('hideColumn', 'direccion');
	$('#clientes_tbl').bootstrapTable('hideColumn', 'numero_tarjeta');
	$('#clientes_tbl').bootstrapTable('hideColumn', 'empresa');
	$('#clientes_tbl').bootstrapTable('hideColumn', 'hotel');
	$('#clientes_tbl').bootstrapTable('hideColumn', 'referencia');
	$('#clientes_tbl').bootstrapTable('hideColumn', 'vino_favorito_1');
	$('#clientes_tbl').bootstrapTable('hideColumn', 'vino_favorito_2');
	$('#clientes_tbl').bootstrapTable('hideColumn', 'vino_favorito_3');
	$('#clientes_tbl').bootstrapTable('hideColumn', 'referencia');
	$("#categoria").append('<option selected>Seleccione</option>');
	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}

	fetch(base+'/clientes/clientescategorias',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			$('#categoria').append('<option value="' + vector.id + '">'+vector.categoria+'</option>')
		})
	});

	$("#tipo").append('<option selected>Seleccione</option>');
	fetch(base+'/clientes/clientestipos',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			$("#tipo").append('<option value = '+vector.id+'>'+vector.tipo+'</option>');
		})
	});
	$("#comuna").append('<option selected>Seleccione</option>');
	fetch(base+'/clientes/clientescomunas',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			$("#comuna").append('<option value = '+vector.id+'>'+vector.comuna+'</option>');
		})
	});

	// inicio_telefono('telefono');
});
$("#btn-guardar").on("click",function() {
	if($("#nombre").val().length == 0 || $("#telefono").val().length < 11 )  {
		$("#nombre").val().length == 0 ? $("#error_nombre").html('Campo Obligatorio') : $("#error_nombre").html('')
		// $("#empresa").val().length == 0 ? $("#error_empresa").html('Campo Obligatorio') : $("#error_empresa").html('')
		// $("#hotel").val().length == 0 ? $("#error_hotel").html('Campo Obligatorio') : $("#error_hotel").html('')
		$("#telefono").val().length < 11 ? $("#error_telefono").html('Campo Obligatorio y debe tener un minimo de de 11 carácteres') : $("#error_telefono").html('')
		// $("#correo").val().length == 0 ? $("#error_correo").html('Campo Obligatorio') : $("#error_correo").html('')
		$("#btn-guardar").attr("disabled",true);
		Swal.fire({
			title: "¡No se pueden guardar los registros!",
			text: "El TELÉFONO debe tener un minimo de 11 carácteres",
			icon: "error",
			confirmButtonColor: "#f34e4e",
			confirmButtonText: "Advertencia",
		})
	} else {
		let rut = $("#rut").val();
		let nombre = $("#nombre").val();
		let fecha_nacimiento = $("#fecha_nacimiento").val();
		let telefono = $("#telefono").val();
		let email = $("#email").val();
		let comuna = $("#comuna").val()=='Seleccione'?null:$("#comuna").val();
		let direccion = $("#direccion").val();
		let categoria = $("#categoria").val()=='Seleccione'?null:$("#categoria").val();
		let tipo = $("#tipo").val()=='Seleccione'? null : $("#tipo").val();
		let empresa = $("#empresa").val();
		let hotel = $("#hotel").val();
		let club = $("#club").val();
		let vino1 = $("#vino1").val();
		let vino2 = $("#vino2").val();
		let vino3 = $("#vino3").val();
		let referencia = $("#referencia").val();
		let metodo = "";
		let url = "";
		let id = 0;
		valid="";
		if ($(".modal-title").html()== "Creación del cliente") {
			metodo = 'POST';
			url = '/clientes/clientes';
		} else {
			metodo = 'PUT';
			id = parseInt($(".modal-title").html().replace("Edición del cliente ID: ","").trim());
			url = '/clientes/clientes/'+id;
		}
		const opcionesFetch = {
			// method: 'POST',
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
			$("#rut").val('');
			$("#nombre").val('');
			$("#fecha_nacimiento").val('');
			$("#telefono").val('');
			$("#email").val('');
			$("#comuna").val('');
			$("#direccion").val('');
			$("#categoria").val('');
			$("#tipo").val('');
			$("#empresa").val('');
			$("#hotel").val('');
			$("#club").val('');
			$("#vino1").val('');
			$("#vino2").val('');
			$("#vino3").val('');
			$("#referencia").val('');
			$("#btn-guardar").attr("disabled",true);
			$("#btn-cerrar").trigger("click");
			toastr.success("El registro fué creado exitosamente");
			$('#clientes_tbl').bootstrapTable('refresh');
		});
	}
});

$("#rut").on("change blur keyup",function() {
	if ($(this).val().trim().length > 0 ) {
		if (validarRut($(this).val())) {
			$("#error_rut").html('');
		} else {
			$("#error_rut").html('Formato del RUT no válido');
		}
	} else {
		$("#error_rut").html('');
	}
})
$("#email").on("change blur keyup click",function() {
	if ($(this).val().trim().length > 0) {
		if (validarCorreo($(this).val())) {
			$("#error_correo").html('');
		} else {
			$("#error_correo").html('Formato del correo no válido');
		}
	}
})
document.addEventListener("DOMContentLoaded", function () {
    var phoneMask = IMask(document.getElementById('telefono'), {
        mask: '+00000000000'
    }); // Number mask

})

$("#telefono").on("change blur keyup click",function(e) {
	if (validarTelefono($(this))) {
		$("#error_telefono").html('');
	} else {
		$("#error_telefono").html('Formato del teléfono no válido (debe comenzar con +, no contener sino números después del + y tener una longitud de 11 caracteres) o teléfono vacio');
	}
})

function guardar() {
		$("#rut").val('');
		$("#nombre").val('');
		$("#fecha_nacimiento").val('');
		$("#telefono").val('');
		$("#email").val('');
		$("#comuna").val('');
		$("#direccion").val('');
		$("#categoria").val('');
		$("#tipo").val('');
		$("#empresa").val('');
		$("#hotel").val('');
		$("#club").val('');
		$("#vino1").val('');
		$("#vino2").val('');
		$("#vino3").val('');
		$("#referencia").val('');
		$("#btn-guardar").attr("disabled",true);
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		$("#mdl-cliente").hide();
		toastr.success("El registro fué creado exitosamente");
		$('#clientes_tbl').bootstrapTable('refresh');
}
// $("#nombre,#telefono,#email").on("blur",function() {
$("#nombre,#telefono").on("blur",function() {
// $("#rut,#nombre,#telefono,#email").on("blur",function() {
	// if($("#rut").val().length == 0 || $("#nombre").val().length == 0 || $("#telefono").val().length == 0 || $("#email").val().length == 0 ) {
	if($("#nombre").val().length == 0 || $("#telefono").val().length == 0) {
		$("#btn-guardar").attr("disabled",true);
	} else {
		$("#btn-guardar").attr("disabled",false);
	}
});
$("body").on("click",'button.delete-tbl',function(e) {
	let id=parseInt($(this).attr("id").replace("eliminar","").trim());
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
			fetch(base+'/clientes/clientes/'+id,opcionesFetch)
			.then(response => response.json())
			$('#clientes_tbl').bootstrapTable('refresh');
			toastr.success('El registro ha sido eliminado exitosamente');
		}
	});
});
$("body").on("click",'button.edit-tbl',function(e) {
	let id=parseInt($(this).attr("id").replace("editar","").trim());
	$(".modal-title").html("Edición del cliente ID: "+id);
	let mddl_cliente = new bootstrap.Modal(document.getElementById('mdl-cliente'), {});
  		const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	fetch(base+'/clientes/clientes/'+id+'/edit',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		$("#rut").val(response[0].rut);
		$("#nombre").val(response[0].nombre);
		$("#fecha_nacimiento").val(response[0].fecha_nacimiento);
		$("#telefono").val(response[0].telefono);
		$("#email").val(response[0].email);
		$("#comuna option[value='"+response[0].comuna_id+"']").attr("selected",true);
		$("#direccion").val(response[0].direccion);
		$("#categoria option[value='"+response[0].categoria_id+"']").attr("selected",true);
		$("#tipo option[value='"+response[0].tipo_id+"']").attr("selected",true);
		$("#empresa").val(response[0].empresa);
		$("#hotel").val(response[0].hotel);
		$("#referencia").val(response[0].referencia);
		$("#vino1").val(response[0].vino_favorito_1);
		$("#vino2").val(response[0].vino_favorito_2);
		$("#vino3").val(response[0].vino_favorito_3);
		$("#btn-guardar").attr("disabled",false);
	});



	mddl_cliente.show();


});
function btnAgrCliente() {
	return {
		btnAdd: {
			class: 'success',
			text: 'Crear Cliente',
			icon: 'fas fa-plus-circle',
			event: function () {
				$(".modal-title").html("Creación del cliente");
				$('#mdl-cliente').modal({backdrop: 'static', keyboard: false});
				$('#mdl-cliente').modal('show');
			},
			attributes: {
				title: 'Crear Cliente'
			}
		}
	}
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
$('#mdl-cliente').on('hidden.bs.modal', function () {
	$("#rut").val('');
	$("#nombre").val('');
	$("#fecha_nacimiento").val('');
	$("#telefono").val('');
	$("#email").val('');
	$("#comuna").val('');
	$("#direccion").val('');
	$("#categoria").val('');
	$("#tipo").val('');
	$("#empresa").val('');
	$("#hotel").val('');
	$("#club").val('');
	$("#vino1").val('');
	$("#vino2").val('');
	$("#vino3").val('');
	$("#referencia").val('');
	$("#btn-guardar").attr("disabled",true);
	$(".modal-title").html('');
});

function formatterAccion(value, row, index){

	var can_edit = 'disabled';
	var can_delete = 'disabled';

	if($(".can-edit-cliente").length){
		can_edit="";
	}
	if($(".can-delete-cliente").length){
		can_delete="";
	}

    var boton = /*html*/
    `  
	<button class="btn btn-primary btn-sm edit-tbl" ${can_edit}  title="Editar" id="editar${row.id}"><i class="fas fa-edit"></i></button>
	<button class="btn btn-danger btn-sm delete-tbl" ${can_delete}   title="Eliminar" id="eliminar${row.id}"><i class="fas fa-trash"></i></button>
    `
    return boton;
}
