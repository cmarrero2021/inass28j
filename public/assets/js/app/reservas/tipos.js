var txtOriginal = "";
var act = 'tipos';
var titulo = 'Crear Tipos de Reservas'
var url = ''
var table = 'tipos_tbl';
$(document).ready(function(){

    $('#color').keypress(function(e) {
        if (e.which === 32) {
          return false;
        }
    });
    $('#nueva_clase').keypress(function(e) {
        if (e.which === 32) {
          return false;
        }
    });



	tabla(table);
	$(".edit-control").hide();
	$("#agr_tipo").hide();
	$("body").on("click",'button.edit-tbl',function(e) {

        let id = parseInt($(this).attr("id").replace("editar", "").trim());
        let tipo =  $(this).data('tipo');
        let color =  $(this).data('color');
        $(".modal-title").html("Edición del Tipo ID: " + id);

        let mddl_tipo = new bootstrap.Modal(document.getElementById('mdl-tipo'), {});

        $("#tipo_id").val(id);
        $("#tipo").val(tipo);
        $("#color").val(color);

        $("#btn-guardar").attr("disabled", false);

        mddl_tipo.show();

		// let tipoId=parseInt($(this).closest('td').prev().prev()[0]['outerText']);
		// let rowId = parseInt($(this).closest('tr')[0]['rowIndex']);
		// $(this).closest('td').prev().addClass('background-edit');
		// $(this).closest('td').prev().prev().addClass('background-edit');
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
		// $(this).closest('td').prev().prev().attr('contenteditable','true');
		// $(this).closest('td').prev().prev()[0].focus();
		// $(".edit-tbl").attr("disabled",true);
		// $(".delete-tbl").attr("disabled",true);
		// $("#tipo_add").attr("disabled",true);
	});

    $("#btn-guardar").on("click", function () {

        let tipo = $("#tipo").val().trim();
        let color = $("#color").val().trim();
        const colorSinEspacios = color.replace(/ /g,'');
        let id= $("#tipo_id").val();

        var error = [];

        if (tipo ==='') {
            error.push("<li>Debe ingresar el Tipo, el campo no puede estar vacio.</li>");
        }
        if(color ===''){
            error.push("<li>Debe ingresar el nombre del Color, el campo no puede estar vacio.</li>");
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
                body: JSON.stringify({ id:id, tipo:tipo, color_class:colorSinEspacios })
            }
            fetch(base+'/reservas/tipos/'+id,opcionesFetch)
            .then(response => response.json())
            .then(function(response) {

                if (response[0].status==1) {
                    $("#tipo").val('');
                    $("#color").val('');
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
		let nuevoTexto=$(this).closest('tr')[0].children[1]['textContent'].replace(".","").trim();
		let nuevaClase=$(this).closest('tr')[0].children[2]['textContent'].replace(".","").trim();

        var error = [];

        if (nuevoTexto ==='') {
            error.push("<li>Debe ingresar el Tipo, el campo no puede estar vacio.</li>");
        }
        if(nuevaClase ===''){
            error.push("<li>Debe ingresar el nombre del Color, el campo no puede estar vacio.</li>");
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
                body: JSON.stringify({ id:id, tipo: nuevoTexto,color_class:nuevaClase })
            }
            fetch(base+'/reservas/tipos/'+id,opcionesFetch)
            .then(response => response.json())
            .then(function (response) {
                if (response[0].status==1) {
                    $(".edit-tbl").attr("disabled",false);
                    $(".delete-tbl").attr("disabled",false);
                    $("#tipo_add").attr("disabled",false);
                    $('#tipos_tbl').bootstrapTable('refresh');
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
				fetch(base+'/reservas/tipos/'+id,opcionesFetch)
				.then(response => response.json())
				.then(function (response) {
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
		$("#nueva_clase").val('');
		$("#agr_tipo").hide();
		toastr.error("Se ha cancelado la creación del registro");
	});


	$("#agr_acc").on("click",function() {
		let tipo = $("#nuevo_tipo").val().trim()
		let color_class = $("#nueva_clase").val().trim();

        var error = [];

        if (tipo ==='') {
            error.push("<li>Debe ingresar el Tipo, el campo no puede estar vacio.</li>");
        }
        if(color_class===''){
            error.push("<li>Debe ingresar el nombre del Color, el campo no puede estar vacio.</li>");
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
                method: 'POST',
                headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
                body: JSON.stringify({  tipo: tipo,color_class:color_class })
            }
            fetch(base+'/reservas/tipos',opcionesFetch)
            .then(response => response.json())
            .then(function (response) {
                if (response[0].status==1) {

                    $("#nuevo_tipo").val('');
                    $("#nueva_clase").val('');
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
