var txtOriginal = "";
var act = 'razones';
var titulo = 'Crear Razón de Cancekación'
var url = ''
var table = 'tipos_tbl';
$(document).ready(function(){
	tabla(table);
	$(".edit-control").hide();
	$("#agr_tipo").hide();


	$("body").on("click",'button.edit-tbl',function(e) {
		let tipoId=parseInt($(this).closest('td').prev().prev()[0]['outerText']);
		let rowId = parseInt($(this).closest('tr')[0]['rowIndex']);
		$(this).closest('td').prev().addClass('background-edit');
		txtOriginal = $(this).closest('td').prev()[0]['outerText'];
		let control =
		`
			<div class="row">
				<div class="col-xs-8 col-sm-8 col-md-8 data-salon-in"><select id="edt_not" class="form-control"></select><span></span>
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
		let arrSel = [];
		if (txtOriginal === 'SI') {
			arrSel[0]=" selected "
			arrSel[1]=""
		} else {
			arrSel[0]=""
			arrSel[1]=" selected "

		}
		$("#edt_not").append('<option value="0"' +arrSel[1]+'>NO</option>');
		$("#edt_not").append('<option value="1"' +arrSel[0]+'>SI</option>');
		$(this).closest('td').prev().prev()[0].focus();
		$(".edit-tbl").attr("disabled",true);
		$(".delete-tbl").attr("disabled",true);
		$("#tipo_add").attr("disabled",true);
	});
	$("body").on("click",'button.can_ctl',function() {
		$(this).closest('td').removeClass('background-edit');
		$(this).closest('td').html(txtOriginal);
		$('.tipoCol').attr('contenteditable','false');
		$(".edit-control").hide();
		$(".edit-tbl").attr("disabled",false);
		$(".delete-tbl").attr("disabled",false);
		$("#tipo_add").attr("disabled",false);
		$('#tipos_tbl').bootstrapTable('refresh');
		toastr.error('Se ha cancelado la edición');
	})
	$("body").on("click",'button.edt_ctl',function() {
		let id = parseInt($(this).closest('tr')[0].children[0]['textContent'].trim());
		let nuevoTexto = $("#edt_not").val();
		let nuevaRazon=$(this).closest('tr')[0].children[1]['textContent'].replace(".","").trim();
		const opcionesFetch = {
			method: 'PUT',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({ id:id, razon: nuevaRazon,notificar_cliente:nuevoTexto })
		}
		fetch(base+'/reservas/razones/'+id,opcionesFetch)
		.then(response => response.json())
		.then(function (response) {
			if (response[0].status == 1) {

				$(".edit-tbl").attr("disabled",false);
				$(".delete-tbl").attr("disabled",false);
				$("#tipo_add").attr("disabled",false);
				$('#tipos_tbl').bootstrapTable('refresh');
				toastr.success('El registro ha sido actualizado exitosamente');
			} else {
				toastr.error('Error: '+response[0].error);
			}
		})
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
				fetch(base+'/reservas/razones/'+id,opcionesFetch)
				.then(response => response.json())
				.then(function(response){
					if (response[0].status == 1) {

						$('#tipos_tbl').bootstrapTable('refresh');
						toastr.success('El registro ha sido eliminado exitosamente');
					} else {
						toastr.error('Error: '+response[0].error);
					}
				})
            }
        });
    });
	$("#agr_can").on("click",function() {
		$("#nuevo_tipo").val('');
		$("#agr_tipo").hide();
		toastr.error("Se ha cancelado la creación del registro");
	});
	$("#agr_acc").on("click",function() {
		let tipo = $("#nuevo_tipo").val()
		let notificar = $("#notificar_cliente").val()=='No'?0:1;
		const opcionesFetch = {
			method: 'POST',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({  razon: tipo,notificar_cliente:notificar })
		}
		fetch(base+'/reservas/razones',opcionesFetch)
		.then(response => response.json())
		.then(function(response){
			if (response[0].status == 1) {

				$("#nuevo_tipo").val('');
				$("#agr_tipo").hide();
				$('#tipos_tbl').bootstrapTable('refresh');
				toastr.success('El registro ha sido creado exitosamente');
			} else {
				toastr.error('Error: '+response[0].error);
			}
		})
	});
});
function formatterNotificarCliente(value, row) {
	if (value == 0) {
		return "NO";
	} else {
		return "SI";
	}
}
iconos();
btnAgregar();