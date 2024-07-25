var txtOriginal = "";
var montoOriginal = "";
var act = "configuracion";
var titulo = "Crear nueva configuración";
var url = "";
var table = "configuracion_tbl";

$.LoadingOverlaySetup({
    background: "rgba(0, 0, 0, 0.5)",
});

$(function () {
    tabla(table);

    onChanges();

    listConfiguracionTipo();

    listConfiguracionVista();

    listConfiguracionDuracion();
  
});

$("#valor").on("input", function () {
    if (this.value.length > 6) {
        this.value = this.value.slice(0, 6); // Esto limitará la longitud máxima a 5 dígitos
    }
});

ClassicEditor.create(document.querySelector("#descripcion-ckeditor"))
    .then(function (editor) {
        // editor.ui.view.editable.element.style.height = '200px';
    })
    ["catch"](function (error) {
        console.error(error);
    });

function onChanges() {
    $("#tipo_id").on("change", function () {
        var tipo = $(this).val();
        // Si tipo_id es igual columnas (3)
        if (tipo == 3) {
            $("#datosColum").removeClass("d-none");
            $(
                "#valorRf, #valorDuracion, #valorEmail, #valorDescripcion"
            ).addClass("d-none");
            $("#vista_id").val("");
        } else if (tipo == 1 || tipo == 2 || tipo == 5 || tipo == 4) {
            if (tipo == 2 || tipo == 5 || tipo == 4) {
                $("#valorEmail, #valorDescripcion").removeClass("d-none");
            } else {
                $("#valorEmail, #valorDescripcion").addClass("d-none");
            }

            $("#datosColum").addClass("d-none");
            $(".colum-item tbody").html("");
            $("#valorRf, #valorDuracion").removeClass("d-none");
        } else {
            $("#datosColum").addClass("d-none");
            $(".colum-item tbody").html("");

            $(
                "#valorRf, #valorDuracion, #valorEmail, #valorDescripcion"
            ).addClass("d-none");
        }
    });

    $("#vista_id").on("change", function () {
        var vista_id = $(this).val();
        // Todo: Si tipo_id es igual a 3 pendiente por hacer validación
        listarDatosColumnas(vista_id);
    });
}

function formatterActivo(value, row, index) {
    var result="No";
    var tipo = "bg-danger";
    if(value==1){
        result="Si";
        tipo = "bg-success";
    }
    var valores = /*html*/
        `<span class="badge ${tipo}">${result}</span>`
    return valores;
}

function listarDatosColumnas(id) {
    if (id) {
        $.ajax({
            type: "GET",
            url: base + "/colum_list/" + id,
            dataType: "JSON",
            success: function (response) {
                var html = "";
                var i = 0;

                response.forEach((e) => {
                    html +=
                        /*html*/
                        ` <tr id="fila_${i}">
                        <td>${e.column_name}</td>
                        <td>
                            <input type="hidden" class="form-control" name="column_bd[]" id=""  value="${e.column_name}">
                            <input type="text" class="form-control" name="column_table[]" id=""  value="${e.column_name}">
                         </td>
                        <td>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="visisble[]" checked value="1" id="vis_${i}">
                                <label class="form-check-label" for="vis_${i}">
                                    Sí
                                </label>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-warning move-up" title="Subir">
                                <i class="fas fa-arrow-up"></i>
                            </button>

                            <button class="btn btn-sm btn-warning move-down" title="Bajar">
                                <i class="fas fa-arrow-down"></i>
                            </button>

                            <button type="button" class="btn btn-danger btn-sm" title="Eliminar" onclick="elimina(${i})">
                            <i class="fas fa-times"></i>
                            </button>
                        </td>
                    </tr>
                    `;
                    i++;
                });

                $(".colum-item tbody").html(html);
            },
        });
    }
    $(".colum-item tbody").html("");
}

function elimina(id) {
    toastr.success("Se ha eliminado la fila");
    $("#fila_" + id).remove();
}


$(document).on("click", ".move-up", function (e) {
    e.preventDefault();
    var currentRow = $(this).closest("tr");
    $(currentRow).insertBefore($(currentRow).prev());
});

$(document).on("click", ".move-down", function (e) {
    e.preventDefault();
    var currentRow = $(this).closest("tr");
    $(currentRow).insertAfter($(currentRow).next());
});

function validaciones() {
    valida = true;

    $("#mdl-configuracion .req").each(function () {
        id = $(this).prop("id");

        if (
            $(this).prop("type") === "select-one" &&
            $("#" + id + " option:selected").val() == ""
        ) {
            $(".err_" + id).html("Campo obligatorio");
            valida = false;

            // } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'date' && $("#" + id).val().trim() == '') {
            //     $(".err_" + id).html("Campo obligatorio");
            //     valida= false;
            // } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'time' && $("#" + id).val().trim() == '') {
            //     $(".err_" + id).html("Campo obligatorio");
            //     valida= false;
        } else if (
            $("#" + id).is(":visible") &&
            $(this).prop("type") === "text" &&
            $("#" + id)
                .val()
                .trim() == ""
        ) {
            $(".err_" + id).html("Campo obligatorio");
            valida = false;
        } else {
            $(".err_" + id).html("");
        }
    });

    return valida;
}

$("#btn-guardar").on("click", function () {    

    guardarConfiguracion();   

});

function guardarConfiguracion(){

    if (validaciones()) {
        // Selecciona el formulario por su identificador
        var formulario = $("#form-config");

        // Crea un objeto FormData para enviar los datos del formulario
        // var formData = new FormData(formulario[0]);
        var formData = formulario.serialize();

        // formData.append('_method', 'PUT');        

        var id   = $('#configura_id').val();
        var type = "POST";
        var url  = "configuracion_global";

        // Todo No envia data al tratar de envairlo via PUT

        if(id.length > 0){
            url = "configuracion_global/"+id;
            type = "PATCH";
        }
        // Envía los datos del formulario utilizando AJAX
        $.ajax({
            url: url ,
            type: type,
            headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
            data: formData,
            // processData: false,
            // contentType: false,
            dataType: "JSON",
            success: function (response) {
                console.log(response)

                if(response.status==1){
                    toastr.success('La configuracion se ha creado exitosamente');
                    $("#configuracion_tbl").bootstrapTable('refresh');                 
                    $('#mdl-configuracion').modal('hide');
                    
                }else{
                    console.log(response)
                }

            },
            error: function (xhr, textStatus, error) {
                // Maneja errores aquí
                toastr.error('Ha ocurrido un error '+ error);

            },
        });
    }
}

// $("#t_transportista option[value="+ data.transportista_id +"]").attr("selected",true);
//                 $("#t_rampla option[value="+ data.tipo_rampla_id +"]").attr("selected",true);

function formatterAcciones(value, row, index) {
  
    var boton = /*html*/
    `   <div class="my-1">
            <button class="btn btn-primary btn-sm edit-configuracion" data-bs-toggle="modal" data-bs-target="#mdl-configuracion" title="Editar Configuración" id="edit-configuracion-${row.id}" data-id="${row.id}"
            data-tipo_id="${row.tipo_id}" data-vista_id="${row.vista_id}" data-nombre="${row.name}" data-valor="${row.valor}"
            data-duracion="${row.duracion}" data-descripcion="${row.descripcion}">
                <i class="fas fa-pen"></i>                
            </button>
        </div>
    `   

    var valores = /*html*/
    `
        <div class="d-flex justify-content-center align-items-center">
            ${boton}
        </div>
    `
    return valores;
}

// Al presionar en editar
$("body").on("click", 'button.edit-configuracion', function (e) {   
    
    $.LoadingOverlay("show");

    let id =  $(this).data('id');  

    $(".modal-title").html("Edicion de configuración ID:" +id);

    $('#configura_id').val(id);
    
    $.ajax({
        type: "GET",
        url: base +"/configuracion_global/"+id,
        
        dataType: "JSON",
        success: function (response) {

            let tipo_id = response.tipo_id;
            let vista_id = response.vista_id;

            if(tipo_id ==4 || tipo_id ==5 || tipo_id ==2){
                $('#valorRf, #valorDuracion, #valorEmail, #valorDescripcion').removeClass('d-none')
            }
            else if(tipo_id ==1){
        
                $('#valorRf, #valorDuracion').removeClass('d-none');
                $('#valorEmail, #valorDescripcion').addClass('d-none');
            }
            else{
                if(tipo_id==3){
                    $('#datosColum').removeClass('d-none')
                }else{
                    $('#datosColum').addClass('d-none')
                }
        
                $('#valorRf, #valorDuracion, #valorEmail, #valorDescripcion').addClass('d-none')
            }
            $('#name').val(response.name);
            $('#valor').val(response.valor);    
            $('#descripcion').val(response.descripcion);
        

            $("#activoCheckChecked").attr("checked", response.activo===1?true:false);

            listConfiguracionTipo(tipo_id);
        
            listConfiguracionVista(vista_id);
        
            listConfiguracionDuracion(response.duracion);
            
            $.LoadingOverlay("hide");
            
        }
    }); 

});


// Todo:  solucionar error de  selected en el formulario ya que se repiten

$('#mdl-configuracion').on('hidden.bs.modal', function () {
    //Limpio el formulario 
    limpiarFormulario();
})

$('#btn-cerrar-configuracion').on('click', function () {
    //Limpio el formulario 
    limpiarFormulario(); 
});

function limpiarFormulario(){
    // $(".modal-title").html("");}
    $("#activoCheckChecked").attr("checked", true);
    $('#datosColum').addClass('d-none');   
    $("#datosColum table.colum-item tbody").html("");
    $('#configura_id').val('');
    $('#name').val('');
    $('#tipo_id').val('');
    $('#vista_id').val('');
    $('#valor').val('');
    $('#duracion').val('');
    $('#email').val('');
    $('#descripcion').val('');
    $('option:selected').prop('selected', false);
}

iconos();
btnAgregar();
