var txtOriginal = "";
var fechaIniOriginal = "";
var act = 'sucursales';
var titulo = 'Crear Sucursal'
var url = ''
var table = 'sucursales_tbl';
$(document).ready(function(){
	tabla(table);
	$(".edit-control").hide();
	$("#agr_sucursal").hide();

	$("body").on("click",'button.edit-tbl',function(e) {
		let sucursalId=parseInt($(this).closest('td').prev().prev()[0]['outerText']);
		let rowId = parseInt($(this).closest('tr')[0]['rowIndex']);
		$(this).closest('td').prev().addClass('background-edit');
		$(this).closest('td').prev().prev().addClass('background-edit');
		$(this).closest('td').prev().prev().prev().addClass('background-edit');
		txtOriginal = $(this).closest('td').prev().prev().prev()[0]['outerText'];
		fechaIniOriginal = $(this).closest('td').prev().prev()[0]['innerText'];
		fechaFinOriginal = $(this).closest('td').prev()[0]['innerText'];
		let control =
		`
			<div class="row">
				<div class="col-xs-8 col-sm-8 col-md-8 data-sucursal-in"><input type="date" id="ffin"><span></span>
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
		let control1 =`<div class="col-xs-8 col-sm-8 col-md-8 data-sucursal-in"><input type="date" id="fini"><span></span>
				</div>`;
		$(this).closest('td').prev()[0]['innerHTML']=control;
		$(this).closest('td').prev().prev()[0]['innerHTML']=control1;
		$(this).closest('td').prev().attr('contenteditable','true');
		$(this).closest('td').prev().prev().attr('contenteditable','true');
		$(this).closest('td').prev().prev().prev().attr('contenteditable','true');
		$("#fini").val(formatearFecha(fechaIniOriginal));
		$("#ffin").val(formatearFecha(fechaFinOriginal));
		$(this).closest('td').prev().prev().prev()[0].focus();
		$(".edit-tbl").attr("disabled",true);
		$(".delete-tbl").attr("disabled",true);
		$("#sucursal_add").attr("disabled",true);
	});
	$("body").on("click",'button.can_ctl',function() {
		$(this).closest('td').removeClass('background-edit');
		$(this).closest('td').html(txtOriginal);
		$('.sucursalCol').attr('contenteditable','false');
		$(".edit-control").hide();
		$(".edit-tbl").attr("disabled",false);
		$(".delete-tbl").attr("disabled",false);
		$("#sucursal_add").attr("disabled",false);
		$('#sucursales_tbl').bootstrapTable('refresh');
		toastr.error('Se ha cancelado la edición');
	})
	$("body").on("click",'button.edt_ctl',function() {
		let id = parseInt($(this).closest('tr')[0].children[0]['textContent'].trim());
		let nuevoTexto=$(this).closest('tr')[0].children[1]['textContent'].replace(".","").trim();
		let nuevaFechaIni=$("#fini").val();
		let nuevaFechaFin=$("#ffin").val();

        var error = [];

        if (nuevoTexto ==='') {
            error.push("<li>Debe indicar la sucursal, el campo no puede estar vacio.</li>");
        }
        if(nuevaFechaIni===''){
            error.push("<li>Debe indicar la Fecha Inicio, el campo no puede estar vacio.</li>");
        }
        if(nuevaFechaFin ===''){
            error.push('<li>Debe indicar la Fecha Finalización, el campo no puede estar vacio.</li>');
        }
        if (error.length > 0) {
            Swal.fire({
                title: "¡NO SE PUEDE GUARDAR EL REGISTRO!",
                html: "<ul>"+error.join('')+"</ul>",
                icon: "error",
                confirmButtonColor: "#f34e4e",
                confirmButtonText: "Advertencia",
            });
        }else{
            const opcionesFetch = {
                method: 'PUT',
                headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
                body: JSON.stringify({ id:id, sucursal: nuevoTexto,fecha_ini:nuevaFechaIni,fecha_fin:nuevaFechaFin })
            }
            fetch(base+'/reservas/sucursales/'+id,opcionesFetch)
            .then(response => response.json())
            .then(function(response) {
                if (response[0].status == 1) {

                    $(".edit-tbl").attr("disabled",false);
                    $(".delete-tbl").attr("disabled",false);
                    $("#sucursal_add").attr("disabled",false);
                    $('#sucursales_tbl').bootstrapTable('refresh');
                    toastr.success('El registro ha sido actualizado exitosamente');
                } else {
                    toastr.error('Error: '+response[0].error);
                }
            })
        }


	})

    $("body").on("click",'button.delete-tbl',function(e) {
        e.preventDefault();
		let id=parseInt($(this).closest('tr')[0].children[0]['textContent'].trim());
        Swal.fire({
            title: "¿Está seguro que desa desactivar la Confirmación Automática?",
            text: "Una vez realizada esta acción, esta regla de confirmación autromática no tendrá efecto",
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
				fetch(base+'/reservas/sucursales/'+id,opcionesFetch)
				.then(response => response.json())
				.then(function (response) {
					if (response[0].status == 1) {

						$('#sucursales_tbl').bootstrapTable('refresh');
						toastr.success('La confirmación automática ha sido deshabilitada exitosamente');
					} else {
						toastr.error('Error: '+response[0].error);
					}
				})
            }
        });
    });
	$("#agr_can").on("click",function() {
		$("#nuevo_sucursal").val('');
		$("#nuevo_monto").val('');
		$("#agr_sucursal").hide();

		toastr.error("Se ha cancelado la creación del registro");
	});
	$("#agr_acc").on("click",function() {
		if ($("#nuevo_sucursal").val().trim() ==0) {
			toastr.error("Debe indicar la sucursal, el campo no puede estar vacio");
		} else {
			let sucursal = $("#nuevo_sucursal").val();
			let fecha_ini = $("#fecha_inicio").val();
			let fecha_fin = $("#fecha_fin").val();
			const opcionesFetch = {
				method: 'POST',
				headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
				body: JSON.stringify({  sucursal: sucursal, fecha_ini:fecha_ini,fecha_fin:fecha_fin })
			}
			fetch(base+'/reservas/sucursales',opcionesFetch)
			.then(response => response.json())
			.then(function (response) {
				if (response[0].status==1) {

					$("#nuevo_sucursal").val('');
					$("#nuevo_monto").val('');
					$("#agr_sucursal").hide();
					$('#sucursales_tbl').bootstrapTable('refresh');
					toastr.success('El registro ha sido creado exitosamente');
				} else {
					toastr.error('Error: '+response[0].error);
				}
			})
		}
	});
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
iconos();
btnAgregar();
function crear() {

    var error = [];

	if ($("#nuevo_sucursal").val().trim() ==0) {
        error.push("<li>Debe indicar la sucursal, el campo no puede estar vacio.</li>");
    }

    if($("#fecha_inicio").val()===''){
        error.push("<li>Debe indicar la Fecha Inicio, el campo no puede estar vacio.</li>");
	}

    if($("#fecha_fin").val()===''){
        error.push('<li>Debe indicar la Fecha Finalización, el campo no puede estar vacio.</li>');
	}

    if (error.length > 0) {

        Swal.fire({
            title: "¡NO SE PUEDE GUARDAR EL REGISTRO!",
            html: "<ul>"+error.join('')+"</ul>",
            icon: "error",
            confirmButtonColor: "#f34e4e",
            confirmButtonText: "Advertencia",
        });
    }

    else {
		let sucursal = $("#nuevo_sucursal").val();
		let fecha_ini = $("#fecha_inicio").val();
		let fecha_fin = $("#fecha_fin").val();
		const opcionesFetch = {
			method: 'POST',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({  sucursal: sucursal, fecha_ini:fecha_ini,fecha_fin:fecha_fin })
		}
		fetch(base+'/reservas/sucursales',opcionesFetch)
		.then(response => response.json())
		.then(function (response) {
			if (response[0].status==1) {

				$("#nuevo_sucursal").val('');
				$("#nuevo_monto").val('');
				$("#agr_sucursal").hide();
				$('#sucursales_tbl').bootstrapTable('refresh');
				toastr.success('El registro ha sido creado exitosamente');
			} else {
				toastr.error('Error: '+response[0].error);
			}
		})
	}
}

function formatterAccion(value, row, index){

	var can_edit = 'disabled';
	var can_delete = 'disabled';

	if($(".can-edit-sucursal").length){
		can_edit="";
	}
	if($(".can-delete-sucursal").length){
		can_delete="";
	}

    var boton = /*html*/
    `  
	<button class="btn btn-primary btn-sm edit-tbl" ${can_edit} title="Editar" id="editar${row.id}"><i class="fas fa-edit"></i></button>
	<button class="btn btn-danger btn-sm delete-tbl" ${can_delete} title="Eliminar" id="eliminar${row.id}"><i class="fas fa-trash"></i></button>
    `
    return boton;
}

