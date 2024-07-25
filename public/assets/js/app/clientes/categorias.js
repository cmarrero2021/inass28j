var txtOriginal = "";
var montoOriginal = "";

var act = 'categoria';
var titulo = 'Crear Categoría'
var url = ''
var table = 'categorias_tbl';
$(document).ready(function(){
	tabla(table);
	$("body").on("click",'button.edit-tbl',function(e) {

        let id        = parseInt($(this).attr("id").replace("editar", "").trim());
        let categoria = $(this).data('categoria');
        let monto     = $(this).data('monto');

        $(".modal-title").html("Edición de la Categoría ID: " + id);
        let mddl_cat = new bootstrap.Modal(document.getElementById('mdl-categoria'), {});

        $("#cat_id").val(id);
        $("#categoria").val(categoria);
        $("#monto").val(monto);
        $("#btn-guardar").attr("disabled", false);

        mddl_cat.show();


		// let categoriaId=parseInt($(this).closest('td').prev().prev()[0]['outerText']);
		// let rowId = parseInt($(this).closest('tr')[0]['rowIndex']);
		// $(this).closest('td').prev().addClass('background-edit');
		// $(this).closest('td').prev().prev().addClass('background-edit');
		// txtOriginal = $(this).closest('td').prev().prev()[0]['outerText'];
		// montoOriginal = $(this).closest('td').prev()[0]['outerText'];
		// let control =
		// `
		// 	<div class="row">
		// 		<div class="col-xs-8 col-sm-8 col-md-8 data-categoria-in">`+montoOriginal+`<span></span>
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
		// $(this).closest('td').prev().prev().attr('contenteditable','true');
		// $(this).closest('td').prev().prev()[0].focus();
		// $(".edit-tbl").attr("disabled",true);
		// $(".delete-tbl").attr("disabled",true);
		// $("#categoria_add").attr("disabled",true);
	});
	// $("body").on("click",'button.can_ctl',function() {
	// 	$(this).closest('td').removeClass('background-edit');
	// 	$(this).closest('td').html(txtOriginal);
	// 	$('.categoriaCol').attr('contenteditable','false');
	// 	$(".edit-control").hide();
	// 	$(".edit-tbl").attr("disabled",false);
	// 	$(".delete-tbl").attr("disabled",false);
	// 	$("#categoria_add").attr("disabled",false);
	// 	$('#categorias_tbl').bootstrapTable('refresh');
	// 	toastr.error('Se ha cancelado la edición');
	// })

    $("#btn-guardar").on("click", function () {

        let id= $("#cat_id").val();
        let categoria = $("#categoria").val();
        let monto = $("#monto").val();

        var error = [];

        if (categoria ==='') {
            error.push("<li>Debe ingresar la Categoría, el campo no puede estar vacio.</li>");
        }
        if(monto==='' || isNaN(monto)){
            error.push("<li>Debe ingresar el Monto, el campo no puede estar vacio.</li>");
        }
        console.log(monto);

        if (error.length > 0) {
            Swal.fire({
                title: "¡NO SE PUEDE GUARDAR EL REGISTRO!",
                html: "<ul>"+error.join('')+"</ul>",
                icon: "error",
                confirmButtonColor: "#f34e4e",
                confirmButtonText: "Advertencia",
            });

        }
        else{
            const opcionesFetch = {
                method: 'PUT',
                headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
                body: JSON.stringify({ id:id, categoria: categoria,monto:monto })
            }
            fetch(base+'/clientes/categorias/'+id,opcionesFetch)
            .then(response => response.json())
            .then(function(response) {
                if (response[0].status ==1) {

                    $("#cat_id").val('');
                    $("#categoria").val('');
                    $("#monto").val('');
                    $('.modal-backdrop').remove();
                    $("#mdl-categoria").hide();
                    $('#categorias_tbl').bootstrapTable('refresh');
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
	// 	let nuevoMonto=parseInt($(this).closest('tr')[0].children[2]['textContent'].replace(".","").trim());

    //     var error = [];

    //     if (nuevoTexto ==='') {
    //         error.push("<li>Debe ingresar la Categoría, el campo no puede estar vacio.</li>");
    //     }
    //     if(nuevoMonto==='' || isNaN(nuevoMonto)){
    //         error.push("<li>Debe ingresar el Monto, el campo no puede estar vacio.</li>");
    //     }
    //     console.log(nuevoMonto);

    //     if (error.length > 0) {
    //         Swal.fire({
    //             title: "¡NO SE PUEDE GUARDAR EL REGISTRO!",
    //             html: "<ul>"+error.join('')+"</ul>",
    //             icon: "error",
    //             confirmButtonColor: "#f34e4e",
    //             confirmButtonText: "Advertencia",
    //         });

    //     }else{
    //         const opcionesFetch = {
    //             method: 'PUT',
    //             headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
    //             body: JSON.stringify({ id:id, categoria: nuevoTexto,monto:nuevoMonto })
    //         }
    //         fetch(base+'/clientes/categorias/'+id,opcionesFetch)
    //         .then(response => response.json())
    //         .then(function(response) {
    //             if (response[0].status ==1) {
    //                 $(".edit-tbl").attr("disabled",false);
    //                 $(".delete-tbl").attr("disabled",false);
    //                 $("#categoria_add").attr("disabled",false);
    //                 $('#categorias_tbl').bootstrapTable('refresh');
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
				fetch(base+'/clientes/categorias/'+id,opcionesFetch)
				.then(response => response.json())
				.then(function(response) {
					if(response[0].status ==1) {
						$('#categorias_tbl').bootstrapTable('refresh');
						toastr.success('El registro ha sido eliminado exitosamente');
					} else {
						toastr.error('Error: '+response[0].error);
					}
				})
			};
        });
    });
	$("#agr_can").on("click",function() {
		$("#nuevo_categoria").val('');
		$("#nuevo_monto").val('');
		$("#agr_categoria").hide();

		toastr.error("Se ha cancelado la creación del registro");
	});
});

$("#nuevo_monto").on('input', function (evt) {
	$(this).val($(this).val().replace(/[^0-9]/g, ''));
});
$("#monto").on('input', function (evt) {
	$(this).val($(this).val().replace(/[^0-9]/g, ''));
});

function frm_monto(value) {
	return value.toLocaleString("es-CL");
}

iconos();
btnAgregar();
function crear() {
	if($("#nuevo_monto").val().trim() ==0 && ($("#nuevo_categoria").val().trim() ==0)) {
		toastr.error("Debe indicar la categoría y el monto, los campos no pueden estar vacios");
	}else if ($("#nuevo_categoria").val().trim() ==0) {
		toastr.error("Debe indicar la categoria, el campo no puede estar vacio");
	} else if($("#nuevo_monto").val().trim() ==0) {
		toastr.error("Debe indicar el monto, el campo no puede estar vacio");
	} else {
		let categoria = $("#nuevo_categoria").val();
		let monto = $("#nuevo_monto").val();
		const opcionesFetch = {
			method: 'POST',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({  categoria: categoria, monto:monto })
		}
		fetch(base+'/clientes/categorias',opcionesFetch)
		.then(response => response.json())
		.then(function(response) {
			if (response[0].status == 1) {
				$("#nuevo_categoria").val('');
				$("#nuevo_monto").val('');
				$("#agr_categoria").hide();
				$('#categorias_tbl').bootstrapTable('refresh');
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

	if($(".can-edit-categoria-cliente").length){
		can_edit="";
	}
	if($(".can-delete-categoria-cliente").length){
		can_delete="";
	}

    var boton = /*html*/
    `  
	<button class="btn btn-primary btn-sm edit-tbl"${can_edit}  title="Editar" data-monto="${row.monto}" data-categoria="${row.categoria}"  data-id="${row.id}" id="editar${row.id}"><i class="fas fa-edit"></i></button>
    <button class="btn btn-danger btn-sm delete-tbl" ${can_delete} title="Eliminar" id="eliminar${index}"><i class="fas fa-trash"></i></button>	
    `
    return boton;
}
