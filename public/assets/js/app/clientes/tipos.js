var txtOriginal = "";
var act = 'tipos';
var titulo = 'Crear Tipos de Clientes'
var url = ''
var table = 'tipos_tbl';
$(document).ready(function(){
	tabla(table);
	$(".edit-control").hide();
	$("#agr_tipo").hide();
	$("body").on("click",'button.edit-tbl',function(e) {

        let id = parseInt($(this).attr("id").replace("editar", "").trim());
        let tipo =  $(this).data('tipo');
        $(".modal-title").html("Edición del Tipo ID: " + id);
        let mddl_tipo = new bootstrap.Modal(document.getElementById('mdl-tipo'), {});

        $("#tipo_id").val(id);
        $("#tipo").val(tipo);
        $("#btn-guardar").attr("disabled", false);

        mddl_tipo.show();


		// let tipoId=parseInt($(this).closest('td').prev().prev()[0]['outerText']);
		// let rowId = parseInt($(this).closest('tr')[0]['rowIndex']);
		// $(this).closest('td').prev().addClass('background-edit');
		// txtOriginal = $(this).closest('td').prev()[0]['outerText'];
		// let control =
		// `
		// 	<div class="row">
		// 		<div class="col-xs-8 col-sm-8 col-md-8 data-tipo-in">`+txtOriginal+`<span></span>
		// 		</div>
		// 		<div class="col-xs-12 col-sm-12 col-md-1 edit-ctl`+rowId+` edit-control">
		// 			<button id="edt_acc`+rowId+`" class="btn btn-primary btn-sm edt_ctl" title="Confirmar"><i
		// 					class="fas fa-check"></i></button>
		// 		</div>
		// 		<div class="col-xs-12 col-sm-12 col-md-1 canc-ctl`+rowId+` edit-control">
		// 			<button id="edt_can`+rowId+`" class="btn btn-dark btn-sm can_ctl" title="Cancelar"><i
		// 					class="fas fa-times"></i></button>
		// 		</div>
		// 	</div>
		// `;
		// $(this).closest('td').prev()[0]['innerHTML']=control;
		// $(this).closest('td').prev().attr('contenteditable','true');
		// $(this).closest('td').prev()[0].focus();
		// $(".edit-tbl").attr("disabled",true);
		// $(".delete-tbl").attr("disabled",true);
		// $("#tipo_add").attr("disabled",true);
	});
	// $("body").on("click",'button.can_ctl',function() {
	// 	$(this).closest('td').removeClass('background-edit');
	// 	$(this).closest('td').html(txtOriginal);
	// 	$('.tipoCol').attr('contenteditable','false');
	// 	$(".edit-control").hide();
	// 	$(".edit-tbl").attr("disabled",false);
	// 	$(".delete-tbl").attr("disabled",false);
	// 	$("#tipo_add").attr("disabled",false);
	// 	$('#tipos_tbl').bootstrapTable('refresh');
	// 	toastr.error('Se ha cancelado la edición');
	// })

    $("#btn-guardar").on("click", function () {

        let tipo = $("#tipo").val();
        let id= $("#tipo_id").val();

        if (tipo.length == 0 ) {
            $("#btn-guardar").attr("disabled", true);
            Swal.fire({
                title: "EL CAMPO TIPO ES OBLIGATORIO",
                text: "Debe llenar el campo tipo; verifíque y vuelva a intentar",
                icon: "error",
                confirmButtonColor: "#f34e4e",
                confirmButtonText: "Advertencia",
            })

        }else{
            const opcionesFetch = {
                method: 'PUT',
                headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
                body: JSON.stringify({ id:id, tipo: tipo })
            }
            fetch(base+'/clientes/tipos/'+id,opcionesFetch)
            .then(response => response.json())
            .then(function(response) {

                if (response[0].status==1) {
                    $("#tipo").val('');
                    $("#tipo_id").val('');
                    $('.modal-backdrop').remove();
                    $("#mdl-tipo").hide();
                    $('#tipos_tbl').bootstrapTable('refresh');
                    toastr.success('El registro ha sido actualizado exitosamente');
                } else {
                    toastr.error('Error: '+response[0].error);

                }
            })

        }
    });



	// $("body").on("click",'button.edt_ctl',function() {
	// 	let id = parseInt($(this).closest('tr')[0].children[0]['textContent'].trim());
	// 	let nuevoTexto=$(this).closest('tr')[0].children[1]['textContent'].replace(".","").trim();

    //     if(nuevoTexto===''){
    //         Swal.fire({
    //             title: "EL CAMPO TIPO ES OBLIGATORIO",
    //             text: "Debe llenar el campo tipo; verifíque y vuelva a intentar",
    //             icon: "error",
    //             confirmButtonColor: "#f34e4e",
    //             confirmButtonText: "Continuar",
    //         });
    //     }else{

    //         const opcionesFetch = {
    //             method: 'PUT',
    //             headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
    //             body: JSON.stringify({ id:id, tipo: nuevoTexto })
    //         }
    //         fetch(base+'/clientes/tipos/'+id,opcionesFetch)
    //         .then(response => response.json())
    //         .then(function(response) {
    //             if (response[0].status==1) {
    //                 $(".edit-tbl").attr("disabled",false);
    //                 $(".delete-tbl").attr("disabled",false);
    //                 $("#tipo_add").attr("disabled",false);
    //                 $('#tipos_tbl').bootstrapTable('refresh');
    //                 toastr.success('El registro ha sido actualizado exitosamente');
    //             } else {
    //                 toastr.error('Error: '+response[0].error);

    //             }
    //         })
    //     }


	// })

    $("body").on("click",'button.delete-tbl',function(e) {
        e.preventDefault();
		let id=parseInt($(this).closest('tr')[0].children[0]['textContent'].trim());
        // console.log(id)
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
				fetch(base+'/clientes/tipos/'+id,opcionesFetch)
				.then(response => response.json())
				.then(function (response) {
					console.log("response : ",response)
					if (response[0].status==1) {
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
		let tipo = $("#nuevo_tipo").val();

        if(tipo===''){
            $("#nuevo_tipo").focus();
            Swal.fire({
                title: "EL CAMPO TIPO ES OBLIGATORIO",
                text: "Debe llenar el campo tipo; verifíque y vuelva a intentar",
                icon: "error",
                confirmButtonColor: "#f34e4e",
                confirmButtonText: "Continuar",
            });
        }else{
            const opcionesFetch = {
                method: 'POST',
                headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
                body: JSON.stringify({  tipo: tipo })
            }
            fetch(base+'/clientes/tipos',opcionesFetch)
            .then(response => response.json())
            .then(function (response) {
                if (response[0].status==1) {

                    $("#nuevo_tipo").val('');
                    $("#agr_tipo").hide();
                    $('#tipos_tbl').bootstrapTable('refresh');
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

function formatterAccion(value, row, index){

	var can_edit = 'disabled';
	var can_delete = 'disabled';

	if($(".can-edit-tipos-cliente").length){
		can_edit="";
	}
	if($(".can-delete-tipos-cliente").length){
		can_delete="";
	}

    var boton = /*html*/
    `  
	<button class="btn btn-primary btn-sm edit-tbl" ${can_edit} title="Editar" id="editar${row.id}" data-tipo="${row.tipo}"><i class="fas fa-edit"></i></button>
    <button class="btn btn-danger btn-sm delete-tbl" ${can_delete} title="Eliminar" id="eliminar${index}"><i class="fas fa-trash"></i></button>	
    `
    return boton;
}
