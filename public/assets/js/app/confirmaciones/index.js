var act = 'confirmaciones';
var titulo = 'Crear confirmaciones'
var url = ''
var table = 'confirmaciones_tbl';
$(document).ready(function(){
    btnAgregar()
    $("[name='btnAdd']").addClass('btn-success');
    $("body").on("click",'button.delete-tbl',function(e) {
        let id = parseInt($(this).attr('id').replace("eliminar",''))
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
				fetch(base+'/confirmaciones/'+id,opcionesFetch)
				.then(response => response.json())
				.then(function (response) {
					if (response[0].status == 1) {

						$('#confirmaciones_tbl').bootstrapTable('refresh');
						toastr.success('El registro ha sido eliminado exitosamente');
					} else {
						toastr.error('Error: '+response[0].error);
					}
				})
            }
        });
    });
    $("body").on("click",'button.edit-tbl',function(e) {
        let pax = parseInt($(this).parent().prev().prev()[0].textContent);
        let turno = $(this).parent().prev().prev().prev()[0].textContent;
        let fecha = $(this).parent().prev().prev().prev().prev()[0].textContent;
        let sucursal=$(this).parent().prev().prev().prev().prev().prev()[0].textContent;
        $("#pax").val(pax)
        $("#finicio").val(moment(fecha, "DD/MM/YYYY").format("YYYY-MM-DD"));
        $("#sucursal option").each(function () {
            if ($(this).text() === sucursal) {
                $(this).attr('selected', true);
                return false;
            }
        });
        if (turno === "TARDE") {
            $("#btnTarde").prop('checked', true);
        } else if (turno === "NOCHE") {
            $("#btnNoche").prop('checked', true);
        }
        let id = parseInt($(this).attr('id').replace("editar",''))
        $(".modal-title").html("Edición confirmación automática ID: "+id);
        $("#fin").hide()
        $("#mdl-confirmacion").modal('show');

    });
    $("#pax").on('blur',function() {
        if ($("#pax").val().length > 0) {
            $("#error_pax").html('');
        }
    })
    solo_numero('pax');
});

$("#btn-guardar").on("click",function() {
	let clave = $("#clave_usuario").val()
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
            let continuar = true;
            if ($("#finicio").val().length ==0) {
                $("#error_finicio").html('El campo es obligatorio')
                continuar = false;
            }
            if ($("#ffin").val().length ==0 && $("#ffin").is(':visible')) {
                $("#error_ffin").html('El campo es obligatorio')
                continuar = false;
            }
            if ($("#pax").val().length ==0) {
                $("#error_pax").html('El campo es obligatorio')
                continuar = false;
            }
            if (continuar){
                let finicio=$("#finicio").val();
                let ffin=$("#ffin").val();
                let turno=$('input[name="btnTurno"]:checked').val();
                let sucursal=$("#sucursal option:selected").val();
                let pax=$("#pax").val();
                let opcionesFetch1;
                let url;
                if ($(".modal-title").html() !== "Creación de confirmaciones automáticas") {
                    let id = parseInt($(".modal-title").html().substring($(".modal-title").html().indexOf('ID: ')+4));
                    opcionesFetch1 = {
                        method: 'PUT',
                        headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
                        body: JSON.stringify({  id:id,finicio:finicio,ffin:ffin,turno:turno,sucursal:sucursal,pax:pax })
                    }
                    url = base+'/confirmaciones/'+id;
                } else {
                    opcionesFetch1 = {
                        method: 'POST',
                        headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
                        body: JSON.stringify({  finicio:finicio,ffin:ffin,turno:turno,sucursal:sucursal,pax:pax })
                    }
                    url = base+'/confirmaciones';
                }
                fetch(url,opcionesFetch1)
                .then(response => response.json())
                .then(function(response) {
                    console.log(response);
                    $("#btn-cerrar").trigger("click");
                    if (response[0].status === '0') {
                        toastr.error(response[0].error);
                    } else {
                        if (response[0].fallos == 1) {
                            toastr.info(response[0].mensaje);
                        } else {
                            toastr.success(response[0].mensaje);
                        }
                    }
                    $('#confirmaciones_tbl').bootstrapTable('refresh');
                });
            } else {
                toastr.error("Ha dejado en blanco campos oibligatorios");
            }
		}
	});
})
$('#mdl-confirmacion').on('hidden.bs.modal', function (e) {
    let fechaActual = moment().format("YYYY-MM-DD");;
    $("#finicio").val(fechaActual)
    $("#ffin").val(fechaActual)
    $("#pax").val('');
    $("#clave_usuario").val(' ');
    $("#sucursal").val(2);
})
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
function btnAgregar() {
	return {
		btnAdd: {
			class: 'btn-success',
			text: 'Crear Confirmación',
			icon: 'fas fa-plus-circle',
			event: function () {
				$(".modal-title").html("Creación de confirmaciones automáticas");
				$('#mdl-confirmacion').modal({backdrop: 'static', keyboard: false});
                $("#fin").show();
				$('#mdl-confirmacion').modal('show');
			},
			attributes: {
				title: 'Crear Confirmaciones'
			}
		}
	}
}
function customDateSearch(data, searchValue) {
   try {
       // Convierte la cadena de búsqueda en un objeto fecha
       var searchDate = new Date(searchValue);

       // Itera sobre los datos para encontrar las filas que coincidan con la búsqueda
       for (var i = 0; i < data.length; i++) {
          var rowDate = new Date(data[i].fecha_confirmacion);
          if (rowDate.getTime() === searchDate.getTime()) {
             return true;
          }
       }

       return false;
    } catch(error) {
        console.error('');
        return false;
    }
}

listEstado();


function listEstado(){

    var estado =[
        'ACTIVO',
        'INACTIVO',
        'PASADO'
    ];

    var html ='<option value="">Seleccione el estado</option>';

    estado.forEach(e => {
        html+='<option value="'+e+'">'+e+'</option>';
    });
    $("#sel_estados").html(html);

}

const opcionesFetch = {
    method: 'GET',
    headers: {
        'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
        'Content-Type': 'application/json'
    },
}

var opciones = '';

// const selEstado = new Choices('#sel_estados', {
//     type: 'select-one',
//     placeholder: true,
//     placeholderValue: 'Seleccione el Estado',
//     choices: [
//         { value: '', label: '' },
//         { value: 'ACTIVO', label: 'ACTIVO' },
//         { value: 'INACTIVO', label: 'INACTIVO' },
//         { value: 'PASADO', label: 'PASADO' }
//     ]
// });

const selSucursal = new Choices('#sel_sucursal', {
    type: 'select-one',
    placeholder: true,
    placeholderValue: 'Seleccione la sucursal'
});


selSucursal.setChoices(function () {
    return fetch(base + '/reservas/reservassucursales', opcionesFetch)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data.map(function (sucursal) {
                return {
                    label: sucursal.sucursal,
                    value: sucursal.id
                };
            });
        });
});



// selEstado.setChoices(function () {
//     return fetch(
//             base + '/reservar/estados', opcionesFetch
//         )
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             return data.map(function (estado) {
//                 return {
//                     label: estado.estado,
//                     value: estado.id
//                 };
//             });
//         });
// });

$('#btn_filtrar').click(function () {

    let valorSeleccionado = $('input[name=rd_turno]:checked').val();
    let turno = null;
    switch (valorSeleccionado) {
        case 'todas':
            turno = 'TODOS'
            break;
        case 'tarde':
            turno = 'TARDE'
            break;
        case 'noche':
            turno = 'NOCHE'
            break;

    }
    const opcionesFetch0 = {
        method: 'POST',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            turno: turno,
            desde: $("#desde").val(),
            hasta: $("#hasta").val(),
            estados: $("#sel_estados").val(),
            sucursales: $("#sel_sucursal").val(),
        })
    }
    fetch(base + '/confirmaciones-filtros', opcionesFetch0)
        .then(response => response.json())
        .then(function (response) {
            $("#confirmaciones_tbl").bootstrapTable('load', response);
        });
})

$("#desfiltrar").on("click", function () {
    const opcionesFetch0 = {
        method: 'GET',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
            'Content-Type': 'application/json'
        },
    }
    fetch(base + '/confirmacioneslist', opcionesFetch0)
        .then(response => response.json())
        .then(function (response) {
            $("#confirmaciones_tbl").bootstrapTable('load', response);
    });
    $('#sel_estados').val('');

    $('#sel_sucursal').val();

    const itemsSeleccionados = selSucursal.getValue(true);
    // Verificar si hay elementos seleccionados
    if (itemsSeleccionados && itemsSeleccionados.length > 0) {
      // Eliminar el elemento seleccionado
      selSucursal.removeItem(itemsSeleccionados[0].id);
    }
    selSucursal.setChoiceByValue(null);

})
