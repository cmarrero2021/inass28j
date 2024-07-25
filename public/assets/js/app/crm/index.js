mostrar_loader();

$.LoadingOverlaySetup({
    background: "rgba(0, 0, 0, 0.5)",
});

const urlParams = new URLSearchParams(window.location.search);
const estadoParam = urlParams.get("estado");

window.icons = {
    refresh: "fa-refresh",
    toggleOn: "fa-toggle-on",
    toggleOff: "fa-toggle-on",
    columns: "fa-th-list",
    paginationSwitch: "fa-toggle-on",
    refresh: "fa-sync",
    fullscreen: "fa-arrows-alt",
    export: "fa-download",
};

$("#reservas_tbl").bootstrapTable({
    pagination: true,
    pageSize: 1000,
});

var sal_sel = null;
$(document).ready(function () {
    $("#desde").val("");
    $("#hasta").val("");

    // $('#sel_estados').select2(
    //     // {
    //     //     placeholder: "Selecione...",
    //     //     allowClear: true
    //     // }
    // );

    $("#sel_estados").select2();

    $("#sel_sucursal").select2();
    $("#sel_tipos").select2();
    $("#sel_salones").select2();
    $("#sel_mesas").select2();
    //$('#sel_clientes').select2();

    //Listado de Clientes
    $("#sel_clientes").select2({
        language: {
            errorLoading: function () {
                return "No se pudieron cargar los resultados";
            },
            inputTooLong: function (args) {
                var remainingChars = args.input.length - args.maximum;

                var message = "Por favor, elimine " + remainingChars + " car";

                if (remainingChars == 1) {
                    message += "ácter";
                } else {
                    message += "acteres";
                }

                return message;
            },
            inputTooShort: function (args) {
                var remainingChars = args.minimum - args.input.length;

                var message =
                    "Por favor, introduzca " + remainingChars + " car";

                if (remainingChars == 1) {
                    message += "ácter";
                } else {
                    message += "acteres";
                }

                return message;
            },
            loadingMore: function () {
                return "Cargando más resultados…";
            },
            maximumSelected: function (args) {
                var message =
                    "Sólo puede seleccionar " + args.maximum + " elemento";

                if (args.maximum != 1) {
                    message += "s";
                }

                return message;
            },
            noResults: function () {
                return "No se encontraron resultados";
            },
            searching: function () {
                return "Buscando…";
            },
            removeAllItems: function () {
                return "Eliminar todos los elementos";
            },
            removeItem: function () {
                return "Eliminar elemento";
            },
            search: function () {
                return "Buscar";
            },
        },
        multiple: true,
        tokenSeparators: [",", " "],
        ajax: {
            url: base + "/clientes/list_clientes2",
            dataType: "json",
            delay: 250,
            data: function (params) {
                var queryParameters = {
                    q: params.term, // search term
                    page: params.page,
                };
                return queryParameters;
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                return {
                    results: $.map(data.items, function (item) {
                        return {
                            text: item.nombre,
                            id: item.nombre,
                        };
                    }),
                    pagination: {
                        more: params.page * 30 < data.total_count,
                    },
                };
            },
            cache: true,
        },
    });

    //Fin Listado de Clientes

    $("#sel_cancelacion").select2();

    if (estadoParam != "" || estadoParam != null) {
        listEstadoFiltro(estadoParam);
    } else {
        listEstadoFiltro();
    }

    listTiposFiltro();

    listSucursalesFiltro();

    //listCliente2();

    listCancelancion();

    // listTipos();

    // listEstado();

    // $('#sel_estados').val(9); // Select the option with a value of '9'
    // $('#sel_estados').trigger('change'); // Notify any JS components that the value changed

    $('[aria-label="Exportar datos"]').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        $("#ex-clave").val("");
        $("#mdl-clave").modal("toggle");
    });
    $("#btn-continuar_clv").on("click", function () {
        let clave = $("#ex-clave").val();
        const opcionesFetch0 = {
            method: "POST",
            headers: {
                "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clave: clave,
            }),
        };
        fetch(base + "/reservar/verificarclave", opcionesFetch0)
            .then((response) => response.json())
            .then(function (response) {
                if (response[0].respuesta == 0) {
                    Swal.fire({
                        title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
                        text: "Verifíquela y vuelva a intentar",
                        icon: "error",
                        confirmButtonColor: "#f34e4e",
                        confirmButtonText: "Continuar",
                    });
                } else {
                    $("#mdl-clave").modal("toggle");
                    $("#ex-clave").val("");
                    $("#reservas_tbl").tableExport({
                        type: "xlsx",
                        fileName:
                            moment().format("YYYYMMDD_HHmmss") + "_reservas",
                        ignoreColumn: ["archivo_1", "archivo_2", "actions"],
                        exportHiddenCells: true,
                    });
                }
            });
    });

   

    // $('#reservas_tbl').bootstrapTable('hideColumn', 'telefono_cliente');
   
    $("#reservas_tbl").bootstrapTable("hideColumn", "fecha_reserva");
    $("#reservas_tbl").bootstrapTable("hideColumn", "email_cliente");
    $("#reservas_tbl").bootstrapTable("hideColumn", "nombre_empresa");
    $("#reservas_tbl").bootstrapTable("hideColumn", "nombre_hotel");
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'fecha_reserva');
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'tsucursal');
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'tsalon');
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_nombre_adicional");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_pax");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_valor_menu");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_total_sin_propina");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_total_propina");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_email_contacto");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_telefono_contacto");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_anticipo");
    $("#reservas_tbl").bootstrapTable("hideColumn", "tevento_paga_en_local");
    $("#reservas_tbl").bootstrapTable("hideColumn", "tevento_audio");
    $("#reservas_tbl").bootstrapTable("hideColumn", "tevento_video");
    $("#reservas_tbl").bootstrapTable("hideColumn", "tevento_video_audio");
    $("#reservas_tbl").bootstrapTable(
        "hideColumn",
        "tevento_restriccion_alimenticia"
    );
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_ubicacion");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_monta");
    $("#reservas_tbl").bootstrapTable(
        "hideColumn",
        "evento_detalle_restriccion"
    );
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'ambiente');
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_comentarios");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_nombre_contacto");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_idioma");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_cristaleria");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_decoracion");
    $("#reservas_tbl").bootstrapTable(
        "hideColumn",
        "evento_mesa_soporte_adicional"
    );
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_extra_permitido");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_menu_impreso");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_table_tent");
    $("#reservas_tbl").bootstrapTable("hideColumn", "evento_logo");
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'usuario_confirmacion');
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'usuario_rechazo');
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'fecha_confirmacion');
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'fecha_rechazo');
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'razon_rechazo');
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'razon');
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'observacion_cancelacion');
    $("#reservas_tbl").bootstrapTable("hideColumn", "archivo_1");
    $("#reservas_tbl").bootstrapTable("hideColumn", "archivo_2");

    const opcionesFetch = {
        method: "GET",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
    };

    // filtradoCancelacionInit();

    // actualizar();

    if (estadoParam != "" || estadoParam != null) {
        // Todo: No esta ejecutando el filtrado solicitado 23-01-24 se realizan pruebas luego

        filtrar(estadoParam);
    }

    // filtradoSucursalInit();

    // Todo Me queda por terminar salones , mesas, clientes y razon cancelacion

    // $('#sel_salones').remove();
    // $('.salones').html('<div class="mb-3"><label for="sel_salones" class="form-label font-size-13 text-muted">Salones</label><select id="sel_salones"  onchange="cambio_salon();" multiple=false ></select></div>');
    // var selSalon = new Choices('#sel_salones', {
    //     type: 'select-one',
    //     removeItemButton: true,
    //     placeholder: true,
    //     placeholderValue: ''
    // });

    // sal(selSalon)

    // const selMesa = new Choices('#sel_mesas', {
    //     type: 'select-one',
    //     placeholder: true,
    //     placeholderValue: ''
    // });
    // var opciones = '';

    $(".loader").hide();

    // fetch(base+'/reservar/estados',opcionesFetch)
    // .then(response => response.json())
    // .then(function(response) {
    // 	$('#estado').append('<option value="">Seleccione</option>')
    // 	response.forEach(function(vector) {
    // 		if (vector.id != 4) {
    // 			$('#estado').append('<option value="' + vector.id + '">'+vector.estado+'</option>')
    // 		}
    // 	})
    // });

    // $("#ssucursal").append('<option selected disabled>Seleccione</option>');
    // fetch(base+'/reservas/reservassucursales',opcionesFetch)
    // .then(response => response.json())
    // .then(function(response) {
    // 	response.forEach(function(vector) {
    // 		$("#ssucursal").append('<option value = '+vector.id +'>'+vector.sucursal+'</option>');
    // 	})
    // });
});

function listTiposLocal(selected = "") {
    $("#tipo_reserva").append('<option value="">Seleccione</option>');
    fetch(base + "/reservar/tipos", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            response.forEach(function (vector) {
                if (vector.id != 4) {
                    s = vector.id == selected ? " selected " : "";
                    $("#tipo_reserva").append(
                        "<option value = " +
                            vector.id +
                            ' " ' +
                            s +
                            ' " >' +
                            vector.estado +
                            "</option>"
                    );
                }
            });
        });
}

function listRazonesLocal() {
    fetch(base + "/reservar/razones", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            $("#raz_canc").append('<option value="">Seleccione</option>');
            response.forEach(function (vector) {
                $("#raz_canc").append(
                    '<option value="' +
                        vector.id +
                        '">' +
                        vector.razon +
                        "</option>"
                );
            });
        });
}

$("#anticipo").on("keyup", function () {
    $(this).val(formatDineroEs($(this).val()));
});

$("#valor_menu").on("keyup", function () {
    $(this).val(formatDineroEs($(this).val()));
});

$("#total_s_propina").on("keyup", function () {
    $(this).val(formatDineroEs($(this).val()));
});

$("#total_c_propina").on("keyup", function () {
    $(this).val(formatDineroEs($(this).val()));
});

$(document).keypress(function (event) {
    if (event.which === 13) {
        if ($("#mdl-vreserva").is(":visible")) {
            // Ejecuta la función para guardar los datos de la modal de reservas
            guadar_validado_reserva();
        } else if ($("#mdl-salones").is(":visible")) {
            // Ejecuta la funcion para guardar datos de del salon
            editarSalon();
        } else if ($("#mdl-cancelar").is(":visible")) {
            // Ejecuta la funcion para guardar los datos de cancelacion
            guardar_validado_cancelar();
        } else if ($("#mdl-estados").is(":visible")) {
            // Ejecuta la funcion para guardar el estado
            guardar_estado();
        } else if ($("#mdl-mesa").is(":visible")) {
            // Ejecuta la funcion para guardar mesa
            guardar_mesa();
        } else if ($("#mdl-rechazo").is(":visible")) {
            // Ejecuta la funcion para guardar el rechazo
            guardar_validado_rechazo();
        } else if ($("#mdl-obs").is(":visible")) {
            // Ejecuta la funcion para guardar las observaciones
            guardar_observaciones();
        } else {
            filtrar();
        }
    }
});

const opcionesFetch = {
    method: "GET",
    headers: {
        "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
        "Content-Type": "application/json",
    },
};

var opciones = "";
// Inicicializo las variables para los filtros de tipo Choices

// var selClientes = new Choices('#sel_clientes', {
//     removeItemButton: true,
//     placeholder: true,
//     placeholderValue: ''
// });

// var selEstado = new Choices('#sel_estados', {
//     removeItemButton: true,
//     placeholder: true,
//     placeholderValue: ''
// });

// var selTipo = new Choices('#sel_tipos', {
//     removeItemButton: true,
//     placeholder: true,
//     placeholderValue: ''
// });

// var selCancelacion = new Choices('#sel_cancelacion', {
//     type: 'select-one',
//     placeholder: true,
//     placeholderValue: ''
// });

// var selSucursal = new Choices('#sel_sucursal', {
//     type: 'select-one',
//     placeholder: true,
//     placeholderValue: ''
// });
//////////////////////////////////////

function filtradoClienteInit() {
    // selClientes.setChoices(function () {
    //     var filtro = "";
    //     // Agrego aqui validaciones
    //     // if($("#desde").val()!="" && $("#hasta").val()){
    //     //     filtro = "?desde="+$('#desde').val()+"&hasta="+$('#hasta').val()
    //     // }else{
    //     //     filtro = "?fecha="+today
    //     // }
    //     return fetch(
    //             base + '/clientes/list_clientes_por_fecha'+filtro, opcionesFetch
    //         )
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             return data.map(function (cliente) {
    //                 return {
    //                     label: cliente.nombre,
    //                     // value: cliente.id // Se hizo esta ajustes ya que no se ha guardado los id de los clientes
    //                     value: cliente.nombre
    //                 };
    //             });
    //         });
    // });
}

const CHILE_ZONE = 'America/Santiago'; // Zona horaria de Chile

function formatFechaChile(value, row) {
    // return moment(value).locale("es").zone(CHILE_ZONE).format('LL');
    return moment(value).locale("es-CL").format('DD-MM-YYYY');
}

function filtradoEstadoInit() {
    // selEstado.setChoices(function () {
    //     return fetch(
    //             base + '/reservar/estados', opcionesFetch
    //     )
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         return data.map(function (estado) {
    //             return {
    //                 label: estado.estado,
    //                 value: estado.id
    //             };
    //         });
    //     });
    // });
}

// function filtradoTipoInit(){

//     selTipo.setChoices(function () {
//         return fetch(
//                 base + '/reservar/tipos', opcionesFetch
//             )
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 return data.map(function (tipo) {
//                     return {
//                         label: tipo.estado,
//                         value: tipo.id
//                     };
//                 });
//             });
//     });
// }

// function filtradoCancelacionInit(){

//     selCancelacion.setChoices(function () {
//         return fetch(base + '/reservar/razones', opcionesFetch)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 return data.map(function (razon) {
//                     return {
//                         label: razon.razon,
//                         value: razon.id
//                 };
//             });
//         });
//     });

// }

// function filtradoSucursalInit(){

//     selSucursal.setChoices(function () {
//         return fetch(base + '/reservas/reservassucursales', opcionesFetch)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 return data.map(function (sucursal) {
//                     return {
//                         label: sucursal.sucursal,
//                         value: sucursal.id
//                     };
//                 });
//         });
//     });
// }

window.icons = {
    refresh: "fa-refresh",
    toggleOn: "fa-toggle-on",
    toggleOff: "fa-toggle-on",
    columns: "fa-th-list",
    paginationSwitch: "fa-toggle-on",
    refresh: "fa-sync",
    fullscreen: "fa-arrows-alt",
    export: "fa-download",
};

paxParcial();

function paxParcial() {
    $("#reservas_tbl").bootstrapTable({
        onLoadSuccess: function (data) {
            var totalPax = 0;
            $.each(data, function (index, row) {
                if (row.estado != 4 && row.estado != 7 && row.estado != 8) {
                    totalPax += row.cantidad_pasajeros;
                }
            });
            $("#total_pax").text(totalPax);
        },
    });
}

$("#btn_filtrar").click(function () {
    filtrar();
});

function filtrar(estado = "") {
    $.LoadingOverlay("show");

    let valorSeleccionado = $("input[name=rd_turno]:checked").val();
    let turno = null;

    switch (valorSeleccionado) {
        case "todas":
            turno = "TODOS";
            break;
        case "tarde":
            turno = "TARDE";
            break;
        case "noche":
            turno = "NOCHE";
            break;
    }
    const opcionesFetch0 = {
        method: "POST",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            turno: turno,
            desde: $("#desde").val(),
            hasta: $("#hasta").val(),
            estados:
                estado == "" || estado == null
                    ? $("#sel_estados").val()
                    : [estado],
            tipos: $("#sel_tipos").val(),
            sucursales: $("#sel_sucursal").val(),
            salones: $("#sel_salones").val(),
            mesas: $("#sel_mesas").val(),
            // clientes: $("#sel_clientes").val(),
            clientes: $("#sel_clientes_v2").val(),
            cancelacion: $("#sel_cancelacion").val(),
        }),
    };
    fetch(base + "/reservar/filtros", opcionesFetch0)
        .then((response) => response.json())
        .then(function (response) {
            $("#reservas_tbl").bootstrapTable("load", response);
            let pax = 0;
            response.forEach(function (vector) {
                if (
                    vector.estado != 4 &&
                    vector.estado != 7 &&
                    vector.estado != 8
                ) {
                    pax += parseInt(vector.cantidad_pasajeros);
                }
            });
            $("#total_pax").text(pax);
            $.LoadingOverlay("hide");
        });
}

$("#desfiltrar").on("click", function () {
    $.LoadingOverlay("show");

    const opcionesFetch0 = {
        method: "GET",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
    };
    fetch(base + "/reservar/list?fecha=" + today, opcionesFetch0)
        .then((response) => response.json())
        .then(function (response) {
            $("#reservas_tbl").bootstrapTable("load", response);

            let pax = 0;
            response.forEach(function (vector) {
                if (
                    vector.estado != 4 &&
                    vector.estado != 7 &&
                    vector.estado != 8
                ) {
                    pax += parseInt(vector.cantidad_pasajeros);
                }
            });
            $("#total_pax").text(pax);
        });

    $("#desde").val("");
    $("#hasta").val("");
    // Destuye y vuelve armar el listado de los clientes

    // selClientes.destroy();
    // selClientes = new Choices('#sel_clientes', {
    //     removeItemButton: true,
    //     placeholder: true,
    //     placeholderValue: ''
    // });
    // filtradoClienteInit();
    ////////////////////////
    // Destuye y vuelve armar el listado de los estados

    // selEstado.destroy();
    // selEstado = new Choices('#sel_estados', {
    //     removeItemButton: true,
    //     placeholder: true,
    //     placeholderValue: ''
    // });
    // filtradoEstadoInit();

    //Limpia  los campos que llevan data
    $(".select-edit-estado").val(null).trigger("change");
    $(".list-tipos").val(null).trigger("change");
    $("#sel_sucursal").val(null).trigger("change");
    $("#sel_mesas").val(null).trigger("change");
    $("#sel_sucursales").select2().val(null).trigger("change");
    $(".list-razones").select2().val(null).trigger("change");
    $(".list-clientes").select2().val(null).trigger("change");
    $(".llist-razones").select2().val(null).trigger("change");

    $.LoadingOverlay("hide");
});

function iniciar_salon() {
    const selSalon = new Choices("#sel_salones", {
        removeItemButton: true,
        placeholder: true,
        placeholderValue: "",
    });
}

$("#sel_sucursal").on("change", function () {
    let suc = $("#sel_sucursal").val();

    $(".list-salones").val(null).trigger("change");

    listSalonesFiltro("", suc);

    // const opcionesFetch = {
    //     method: 'GET',
    //     headers: {
    //         'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
    //         'Content-Type': 'application/json'
    //     },
    // }
    // $('#sel_salones').remove();
    // $('.salones').html('<div class="mb-3"><label for="sel_salones" class="form-label font-size-13 text-muted">Salones</label><select id="sel_salones"  onchange="cambio_salon();" multiple=false></select></div>');
    // cambio_salon();
    // const selSalon = new Choices('#sel_salones', {
    //     type: 'select-one',
    //     removeItemButton: true,
    //     placeholder: true,
    //     placeholderValue: ''
    // });
    // selSalon.setChoices(function () {
    //     return fetch(base + '/reservas/salonessucursales/' + suc, opcionesFetch)
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             return data.map(function (salon) {
    //                 return {
    //                     label: salon.salon,
    //                     value: salon.id
    //                 };
    //             });
    //         });
    // });
});

function sal(salon_choice) {
    sal_sel = salon_choice;
}

$("#sel_salones").on("change", function () {
    var salones = $(this).val();

    listMesasFiltro("", salones);
});

function cambio_salon() {
    let sal = sal_sel.getValue(true);
    if (sal.length > 0) {
        const opcionesFetch = {
            method: "GET",
            headers: {
                "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                "Content-Type": "application/json",
            },
        };
        $("#sel_mesas").remove();
        $(".mesas").html(
            '<div class="mb-3"><label for="sel_mesas" class="form-label font-size-13 text-muted">Mesas</label><select id="sel_mesas" multiple=false></select></div>'
        );
        const selMesa = new Choices("#sel_mesas", {
            type: "select-one",
            removeItemButton: true,
            placeholder: true,
            placeholderValue: "",
        });
        selMesa.setChoices(function () {
            return fetch(
                base + "/reservas/salonesmesascrm/" + sal,
                opcionesFetch
            )
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    return data.map(function (table) {
                        return {
                            label: table.mesa.toString(),
                            value: table.id,
                        };
                    });
                });
        });
    }
}
// $("#tipo_reserva").on("change",function() {
// 	if ($("#tipo_reserva option:selected").text()=='EVENTO') {
// 		$("#pax").val($("#pasajeros").val());
// 		$("#panel_eventos").css("visibility", "visible");

// 	} else {
// 		$("#panel_eventos").css("visibility", "hidden");
// 	}
// });

function encontrarOpcion(opcion) {
    return opcion.value === "2" && opcion.label === "VIVO";
}

// function sucursal(salon,mesa) {
// 	suc=$("#ssucursal option:selected").val();
// 	const opcionesFetch = {
// 		method: 'GET',
// 		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
// 	}
// 	fetch(base+'/reservas/salonessucursales/'+suc,opcionesFetch)
// 	.then(response => response.json())
// 	.then(function(response) {
// 	$("#ssalon").empty();
// 	$("#ssalon").append('<option selected value="">Seleccione</option>');
// 	$("#smesa").empty();
//     $("#smesa").append('<option selected value="">Seleccione</option>');
// 		response.forEach(function(vector) {
// 			let sseleccionado = vector.id==salon?' selected ':'';
// 			$("#ssalon").append('<option value = '+vector.id+sseleccionado+'>'+vector.salon+'</option>');
// 		})
// 	});

// 	let sal = salon?salon:$("#ssalon option:selected").val();
// 	if (sal > 1) {
// 		fetch(base+'/reservas/salonesmesas/'+sal,opcionesFetch)
// 		.then(response => response.json())
// 		.then(function(response) {
// 			$("#smesa").empty();
// 			$("#smesa").append('<option selected value="">Seleccione</option>');
// 			if (response && response.length > 0) {
// 				response.forEach(function(vector) {
// 					let mseleccionado = vector.mesa_id==mesa?' selected ':'';
// 					$("#smesa").append('<option value = '+vector.mesa_id+' '+ mseleccionado +'>'+vector.mesa+'</option>');
// 				})
// 			}
// 		});
// 	}
// }
function guardar_validado_cancelar() {
    let clave = $("#clave_usuario").val();
    const opcionesFetch0 = {
        method: "POST",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clave: clave,
        }),
    };
    fetch(base + "/reservar/verificarclave", opcionesFetch0)
        .then((response) => response.json())
        .then(function (response) {
            if (response[0].respuesta == 0) {
                Swal.fire({
                    title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
                    text: "Verifíquela y vuelva a intentar",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Continuar",
                });
            } else {
                let id = $("#can_res")
                    .html()
                    .substring($("#can_res").html().indexOf(": ") + 2)
                    .trim();
                let razon = $("#raz_canc option:selected").val();
                let obs = $("#obs_canc").val();
                const opcionesFetch1 = {
                    method: "PUT",
                    headers: {
                        "X-CSRF-Token": $('meta[name="_token"]').attr(
                            "content"
                        ),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: id,
                        razon_cancelacion: razon,
                        observacion_cancelacion: obs,
                    }),
                };
                fetch(base + "/reservar/cancelar", opcionesFetch1)
                    .then((response) => response.json())
                    .then(function (response) {
                        $("#clave_usuario").val("");
                        $("#raz_canc").val("");
                        $("#obs_canc").val("");
                        $("#btn-cerrar").trigger("click");
                        toastr.success("La reserva fue cancelada exitosamente");
                        // $('#reservas_tbl').bootstrapTable('refresh');
                        filtrar();
                    });
            }
        });
}

$("#btn-cancelar").on("click", function () {
    guardar_validado_cancelar();
});

$("#btn-cancelar_ns").on("click", function () {
    let clave = $("#clave_usuario_es").val();
    const opcionesFetch0 = {
        method: "POST",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clave: clave,
        }),
    };
    fetch(base + "/reservar/verificarclave", opcionesFetch0)
        .then((response) => response.json())
        .then(function (response) {
            if (response[0].respuesta == 0) {
                Swal.fire({
                    title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
                    text: "Verifíquela y vuelva a intentar",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Continuar",
                });
            } else {
                let id = $("#nsh_res")
                    .html()
                    .substring($("#nsh_res").html().indexOf(": ") + 2)
                    .trim();
                const opcionesFetch1 = {
                    method: "PUT",
                    headers: {
                        "X-CSRF-Token": $('meta[name="_token"]').attr(
                            "content"
                        ),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: id,
                        estado: 7,
                    }),
                };
                fetch(base + "/reservar/cambio_estado", opcionesFetch1)
                    .then((response) => response.json())
                    .then(function (response) {
                        $("#clave_usuario").val("");
                        $("#btn-cerrar_ns").trigger("click");
                        toastr.success(
                            "La reserva fue marcada No Show exitosamente"
                        );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    });
            }
        });
});
$("#btn-cancelar_es").on("click", function () {
    let clave = $("#clv").val();
    const opcionesFetch0 = {
        method: "POST",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clave: clave,
        }),
    };
    fetch(base + "/reservar/verificarclave", opcionesFetch0)
        .then((response) => response.json())
        .then(function (response) {
            if (response[0].respuesta == 0) {
                Swal.fire({
                    title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
                    text: "Verifíquela y vuelva a intentar",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Continuar",
                });
            } else {
                let id = $("#est_res")
                    .html()
                    .substring($("#est_res").html().indexOf(": ") + 2)
                    .trim();
                let estado = $("#estado option:selected").val();
                const opcionesFetch1 = {
                    method: "PUT",
                    headers: {
                        "X-CSRF-Token": $('meta[name="_token"]').attr(
                            "content"
                        ),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: id,
                        estado: estado,
                    }),
                };
                fetch(base + "/reservar/cambio_estado", opcionesFetch1)
                    .then((response) => response.json())
                    .then(function (response) {
                        $("#clave_usuario").val("");
                        $("#btn-cerrar_es").trigger("click");
                        toastr.success(
                            "El cambio de estado fue realizado exitosamente"
                        );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    });
            }
        });
});
iconos();

// if(editar_reserva) alert(editar_reserva)

function listarReservasFormatter(value, row, index) {
    let visible = [];

    var val_rechazada =
        /*html*/
        `<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-rechazo" data-bs-toggle="modal" onclick='rechazo(` +
        row.id +
        `);'>Rechazar Reserva</a></li>`;

    if (row.estado == 8) {
        // Rechazada
        val_rechazada = "";
    }

    return [
        `
		<div class="dropdown">
			<a class="btn btn-link text-body shadow-none dropdown-toggle" href="#"
				role="button" data-bs-toggle="dropdown" aria-expanded="false">
				<i class="bx bx-dots-horizontal-rounded"></i>
			</a>
			<ul class="dropdown-menu dropdown-menu-end">
				<li><a class="dropdown-item cancelar-reserva" data-bs-target="#mdl-cancelar" data-bs-toggle="modal" onclick='cancelar(` +
            row.id +
            `);'>Cancelar Reserva</a></li>
				<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-noshow" data-bs-toggle="modal" onclick='noshow(` +
            row.id +
            `);'>No Show</a></li>

                ${val_rechazada}

				<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-estado" data-bs-toggle="modal" onclick='estado(` +
            row.id +
            `);'>Cambiar Estado</a></li>
				<hr/>
				<li><a class="dropdown-item editar" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" onclick='ver(` +
            row.id +
            `);'>Ver Reserva</a></li>
				<li><a class="dropdown-item editar" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" onclick='editar(` +
            row.id +
            `);'>Editar Reserva</a></li>
				<hr/>
				<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-historial" data-bs-toggle="modal" onclick='historial(` +
            row.id +
            `);'>Historial de cambios</a></li>
			</ul>
		</div>`,
    ];
}
$("#mdl-vreserva").on("hidden.bs.modal", function () {
    $(".view-rechazado").addClass("d-none");

    $("fmenu1").val(null);
    $("fmenu2").val(null);
    $("#fprecuenta").val(null);
    $("#ffactura").val(null);
    $("#fotro").val(null);
    $("#flogo").val(null);
    $("#fecha_reserva").val(null);
    $("#hora_reserva").val(null);
    $("#spago_local").val(null);
    $("#saudio").val(null);
    $("#svideo").val(null);
    $("#svideo_audio").val(null);
    $("#adicional").val(null);
    $("#ubicacion").val(null);
    $("#smenu_impreso").val(null);
    $("#stable_tent").val(null);
    $("#srestriccion").val(null);
    $("#sextra").val(null);
    $("#detalle_restriccion").val(null);
    $("#pasajeros").val(null);
    $("#tipo_reserva").val(null);
    $("#cliente").val().trim(null);
    $("#empresa").val().trim(null);
    $("#hotel").val().trim(null);
    $("#telefono").val().trim(null);
    $("#correo").val().trim(null);
    $("#ssucursal").val(null);
    $("#ssalon").val(null);
    $("#smesa").val(null);
    $("#observaciones").val().trim(null);
    $("#nombre_adicional").val().trim(null);
    $("#pax").val(null);
    $("#nombre_contacto").val().trim(null);
    $("#telefono_contacto").val().trim(null);
    $("#correo_contacto").val().trim(null);
    $("#idioma").val().trim(null);
    $("#cristaleria").val().trim(null);
    $("#anticipo").val(null);
    $("#valor_menu").val(null);
    $("#total_s_propina").val(null);
    $("#total_c_propina").val(null);
    $("#autoriza").val(null);
    $("#telefono_autoriza").val(null);
    $("#monto_autorizado").val(null);
    $("#decoracion").val(null);
    $("#monta").val(null);
    $("#comentarios").val(null);
    $("#clave").val(" ");
    $("#div_passwd").hide();
    $("fmenu1").hide();
    $("fmenu2").hide();
    $("#fprecuenta").hide();
    $("#ffactura").hide();
    $("#fotro").hide();
    $("#flogo").hide();
    $("#id_reserva").html("");
});

// limpiarArchivos();

// function limpiarArchivos(){

//     $('.clear_fmenu1').on('click', function() {
//         $('#fmenu1').val('');
//         $('#lbl-fmenu1').html('');
//         $('#lnk_menu1').html('');

//     });

//     $('.clear_fmenu2').on('click', function() {
//         $('#fmenu2').val('');
//         $('#lbl-fmenu2').html('');
//         $('#lnk_menu2').html('');
//     });

//     $('.clear_fprecuenta').on('click', function() {
//         $('#fprecuenta').val('');
//         $('#lbl-fprecuenta').html('');
//         $('#lnk_precuenta').html('');
//     });

//     $('.clear_ffactura').on('click', function() {
//         $('#ffactura').val('');
//         $('#lbl-ffactura').html('');
//         $('#lnk_factura').html('');
//     });

//     $('.clear_flogo').on('click', function() {
//         $('#flogo').val('');
//         $('#lbl-flogo').html('');
//         $('#lnk_logo').html('');
//     });

//     $('.clear_fotro').on('click', function() {
//         $('#fotro').val('');
//         $('#lbl-fotro').html('');
//         $('#lnk_otro').html('');
//     });

// }

limpiarArchivos();

function limpiarArchivos() {
    $(".clear_fmenu1").on("click", function () {
        $("#fmenu1").val("");

        if ($("#lbl-fmenu1").html() != "") {
            $("#lbl-fmenu1").html("");
            $("#lnk_menu1").html("");
        }
        borrarArchivo($(".clear_fmenu1").data("id"), "archivo_1", "menu1");
    });

    $(".clear_fmenu2").on("click", function () {
        $("#fmenu2").val("");

        if ($("#lbl-fmenu2").html() != "") {
            $("#lbl-fmenu2").html("");
            $("#lnk_menu2").html("");
        }

        borrarArchivo($(".clear_fmenu2").data("id"), "archivo_2", "menu2");
    });

    $(".clear_fprecuenta").on("click", function () {
        $("#fprecuenta").val("");

        if ($("#lbl-fprecuenta").html() != "") {
            $("#lbl-fprecuenta").html("");
            $("#lnk_precuenta").html("");
        }
        borrarArchivo(
            $(".clear_fprecuenta").data("id"),
            "archivo_3",
            "precuenta"
        );
    });

    $(".clear_ffactura").on("click", function () {
        $("#ffactura").val("");

        if ($("#lbl-ffactura").html() != "") {
            $("#lbl-ffactura").html("");
            $("#lnk_factura").html("");
        }
        borrarArchivo($(".clear_ffactura").data("id"), "archivo_4", "factura");
    });

    $(".clear_fotro").on("click", function () {
        $("#fotro").val("");
        if ($("#lbl-fotro").html() != "") {
            $("#lbl-fotro").html("");
            $("#lnk_otro").html("");
        }
        borrarArchivo($(".clear_fotro").data("id"), "archivo_5", "otro");
    });

    $(".clear_flogo").on("click", function () {
        $("#flogo").val("");
        if ($("#lbl-flogo").html() != "") {
            $("#lbl-flogo").html("");
            $("#lnk_logo").html("");
        }
        borrarArchivo($(".clear_fotro").data("id"), "evento_logo", "logo");
    });
}

function borrarArchivo(id, archivo, id_name) {
    // var hrefValor = $('.lnk_menu1').attr('href');
    // var url_archivo = $("#lnk_"+archivo+" a").attr('href');
    console.log(id, archivo);
    var data = {
        id: id,
        columna: archivo,
    };
    $.ajax({
        type: "POST",
        url: base + "/reservar/borrar_archivo",
        data: data,
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            // 'Content-Type': 'application/json'
        },
        dataType: "JSON",
        success: function (response) {
            if (response.status == 1) {
                console.log(response.data);

                if (archivo == "archivo_1") {
                    if (response.data.archivo_1 == "") {
                        toastr.success(
                            "Se ha eliminado el archivo " +
                                id_name +
                                " exitosamente"
                        );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_2") {
                    if (response.data.archivo_1 == "") {
                        toastr.success(
                            "Se ha eliminado el archivo " +
                                id_name +
                                " exitosamente"
                        );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_3") {
                    if (response.data.archivo_1 == "") {
                        toastr.success(
                            "Se ha eliminado el archivo " +
                                id_name +
                                " exitosamente"
                        );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_4") {
                    if (response.data.archivo_1 == "") {
                        toastr.success(
                            "Se ha eliminado el archivo " +
                                id_name +
                                " exitosamente"
                        );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_5") {
                    if (response.data.archivo_1 == "") {
                        toastr.success(
                            "Se ha eliminado el archivo " +
                                id_name +
                                " exitosamente"
                        );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "evento_logo") {
                    if (response.data.archivo_1 == "") {
                        toastr.success(
                            "Se ha eliminado el archivo " +
                                id_name +
                                " exitosamente"
                        );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                }

                $("#lbl-f" + id_name).html("");
                $("#lnk_" + id_name).html("");
            }
        },
    });
}

function ver(id) {
    $("#div_passwd").hide();
    $(".requerido").hide();
    $("#tipo").show();
    $("#sucursal").show();
    $("#salon").show();
    $("#mesa").show();
    $("#pago_local").show();
    $("#audio").show();
    $("#video").show();
    $("#video_audio").show();
    $("#adicional").show();
    $("#extra").show();
    $("#menu_impreso").show();
    $("#table_tent").show();
    $("#restriccion").show();
    $("#tipo_reserva").hide();
    $("#ssucursal").hide();
    $("#ssalon").hide();
    $("#smesa").hide();
    $("#spago_local").hide();
    $("#saudio").hide();
    $("#svideo").hide();
    $("#svideo_audio").hide();
    $("#sadicional").hide();
    $("#sextra").hide();
    $("#smenu_impreso").hide();
    $("#stable_tent").hide();
    $("#srestriccion").hide();
    $("#fmenu1").hide();
    $("#fmenu2").hide();
    $("#fprecuenta").hide();
    $("#ffactura").hide();
    $("#flogo").hide();
    $("#fotro").hide();

    $(".clear_fmenu1").hide();
    $(".clear_fmenu2").hide();
    $(".clear_fprecuenta").hide();
    $(".clear_ffactura").hide();
    $(".clear_flogo").hide();
    $(".clear_fotro").hide();

    $("#fecha_reserva").attr("disabled", true);
    $("#hora_reserva").attr("disabled", true);
    $("#pasajeros").attr("disabled", true);
    $("#cliente").attr("disabled", true);
    $("#empresa").attr("disabled", true);
    $("#hotel").attr("disabled", true);
    $("#telefono").attr("disabled", true);
    $("#correo").attr("disabled", true);
    $("#observaciones").attr("disabled", true);
    $("#nombre_adicional").attr("disabled", true);
    $("#pax").attr("disabled", true);
    $("#nombre_contacto").attr("disabled", true);
    $("#telefono_contacto").attr("disabled", true);
    $("#correo_contacto").attr("disabled", true);
    $("#idioma").attr("disabled", true);
    $("#cristaleria").attr("disabled", true);
    $("#anticipo").attr("disabled", true);
    $("#valor_menu").attr("disabled", true);
    $("#total_s_propina").attr("disabled", true);
    $("#total_c_propina").attr("disabled", true);
    $("#autoriza").attr("disabled", true);
    $("#telefono_autoriza").attr("disabled", true);
    $("#monto_autorizado").attr("disabled", true);
    $("#detalle_restriccion").attr("disabled", true);
    $("#decoracion").attr("disabled", true);
    $("#ubicacion").attr("disabled", true);
    $("#monta").attr("disabled", true);
    $("#comentarios").attr("disabled", true);
    $("#id_reserva").html("Ver Reserva ID: " + id);
    $('a[href="#general"]')[0].click();
    $.ajax({
        url: base + "/reservar/get_reserva/" + id,
        type: "get",
        dataType: "json",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
        success: function (response) {
            if (response[0].estado == 8) {
                $(".view-rechazado").removeClass("d-none");
                $("#testado").val(response[0].testado);
                $("#fecha_rechazo").val(
                    fechaFormatter2(response[0].fecha_rechazo)
                );
                $("#razon_rechazo").val(response[0].razon_rechazo);
            } else {
                $(".view-rechazado").addClass("d-none");
            }

            $("#fecha_reserva").val(response[0].fecha_reserva);
            $("#hora_reserva").val(response[0].hora_reserva);
            $("#pasajeros").val(response[0].cantidad_pasajeros);
            $("#tipo").val(response[0].tipo);
            $("#cliente").val(response[0].nombre_cliente);
            $("#empresa").val(response[0].nombre_empresa);
            $("#hotel").val(response[0].nombre_hotel);
            $("#telefono").val(response[0].telefono_cliente);
            $("#correo").val(response[0].email_cliente);
            $("#sucursal").val(response[0].tsucursal);
            $("#salon").val(response[0].tsalon);
            $("#mesa").val(response[0].tmesa);
            $("#observaciones").val(response[0].observaciones);
            $("#nombre_adicional").val(response[0].evento_nombre_adicional);
            $("#pax").val(response[0].evento_pax);
            $("#nombre_contacto").val(response[0].evento_nombre_contacto);
            $("#telefono_contacto").val(response[0].evento_telefono_contacto);
            $("#correo_contacto").val(response[0].evento_email_contacto);
            $("#idioma").val(response[0].evento_idioma);
            $("#cristaleria").val(response[0].evento_cristaleria);
            $("#anticipo").val(response[0].evento_anticipo);
            $("#valor_menu").val(response[0].evento_valor_menu);
            $("#total_s_propina").val(response[0].evento_total_sin_propina);
            $("#total_c_propina").val(response[0].evento_total_propina);
            $("#pago_local").val(response[0].tevento_paga_en_local);
            $("#audio").val(response[0].tevento_audio);
            $("#video").val(response[0].tevento_video);
            $("#video_audio").val(response[0].tevento_video_audio);
            $("#adicional").val(response[0].tevento_mesa_soporte_adicional);
            $("#autoriza").val(response[0].autoriza);
            $("#telefono_autoriza").val(response[0].telefono_autoriza);
            $("#monto_autorizado").val(response[0].monto_autorizado);
            $("#menu_impreso").val(response[0].tevento_menu_impreso);
            $("#table_tent").val(response[0].tevento_table_tent);
            $("#restriccion").val(response[0].tevento_restriccion_alimenticia);
            $("#detalle_restriccion").val(
                response[0].evento_detalle_restriccion
            );
            $("#decoracion").val(response[0].evento_decoracion); //?
            $("#monta").val(response[0].evento_monta); //?
            $("#ubicacion").val(response[0].evento_ubicacion);
            $("#comentarios").val(response[0].evento_comentarios);
            $("#rsalon").val(response[0].salon);
            $("#rmesa").val(response[0].mesa);
            $("#lnk_menu1").append(
                imageForm("lnk_menu1", response[0].archivo_1)
            );
            $("#lnk_menu2").append(
                imageForm("lnk_menu2", response[0].archivo_2)
            );
            $("#lnk_precuenta").append(
                imageForm("lnk_precuenta", response[0].archivo_3)
            );
            $("#lnk_factura").append(
                imageForm("lnk_factura", response[0].archivo_4)
            );
            $("#lnk_otro").append(imageForm("lnk_otro", response[0].archivo_5));
            $("#lnk_logo").append(
                imageForm("lnk_logo", response[0].evento_logo)
            );
        },
    });
    if ($("#tipo option:selected").text() == "EVENTO") {
        $("#pax").val($("#pasajeros").val());
        $("#panel_eventos").css("visibility", "visible");
    }
}

function editar(id) {
    // Todo: falta evaluar si hace falta el cliente o no
    // actualizar();

    $("#div_passwd").show();
    $(".requerido").show();
    $("#tipo").hide();
    $("#sucursal").hide();
    $("#salon").hide();
    $("#mesa").hide();
    $("#pago_local").hide();
    $("#audio").hide();
    $("#video").hide();
    $("#video_audio").hide();
    $("#adicional").hide();
    $("#extra").hide();
    $("#menu_impreso").hide();
    $("#table_tent").hide();
    $("#restriccion").hide();
    $("#tipo_reserva").show();
    $("#ssucursal").show();
    $("#ssalon").show();
    $("#smesa").show();
    $("#spago_local").show();
    $("#saudio").show();
    $("#svideo").show();
    $("#svideo_audio").show();
    $("#sadicional").show();
    $("#sextra").show();
    $("#smenu_impreso").show();
    $("#stable_tent").show();
    $("#srestriccion").show();
    $("#fmenu1").show();
    $("#fmenu2").show();
    $("#fprecuenta").show();
    $("#ffactura").show();
    $("#flogo").show();
    $("#fotro").show();

    $(".clear_fmenu1").show().attr("data-id", id);
    $(".clear_fmenu2").show().attr("data-id", id);
    $(".clear_fprecuenta").show().attr("data-id", id);
    $(".clear_ffactura").show().attr("data-id", id);
    $(".clear_flogo").show().attr("data-id", id);
    $(".clear_fotro").show().attr("data-id", id);

    $("#fecha_reserva").attr("disabled", false);
    $("#hora_reserva").attr("disabled", false);
    $("#pasajeros").attr("disabled", false);
    $("#cliente").attr("disabled", false);
    $("#empresa").attr("disabled", false);
    $("#hotel").attr("disabled", false);
    $("#telefono").attr("disabled", false);
    $("#correo").attr("disabled", false);
    $("#observaciones").attr("disabled", false);
    $("#nombre_adicional").attr("disabled", false);
    $("#pax").attr("disabled", false);
    $("#nombre_contacto").attr("disabled", false);
    $("#telefono_contacto").attr("disabled", false);
    $("#correo_contacto").attr("disabled", false);
    $("#idioma").attr("disabled", false);
    $("#cristaleria").attr("disabled", false);
    $("#anticipo").attr("disabled", false);
    $("#valor_menu").attr("disabled", false);
    $("#total_s_propina").attr("disabled", false);
    $("#total_c_propina").attr("disabled", false);
    $("#autoriza").attr("disabled", false);
    $("#telefono_autoriza").attr("disabled", false);
    $("#monto_autorizado").attr("disabled", false);
    $("#detalle_restriccion").attr("disabled", false);
    $("#decoracion").attr("disabled", false);
    $("#ubicacion").attr("disabled", false);
    $("#monta").attr("disabled", false);
    $("#comentarios").attr("disabled", false);
    $("#id_reserva").html("Editar Reserva ID: " + id);
    $('a[href="#general"]')[0].click();
    mostrar_loader();
    $.ajax({
        url: base + "/reservar/get_reserva/" + id,
        type: "get",
        dataType: "json",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
        success: function (response) {
            if (response[0].estado == 8) {
                $(".view-rechazado").removeClass("d-none");
                $("#testado").val(response[0].testado);
                $("#fecha_rechazo").val(
                    fechaFormatter2(response[0].fecha_rechazo)
                );
                $("#razon_rechazo").val(response[0].razon_rechazo);
            } else {
                $(".view-rechazado").addClass("d-none");
            }

            $("#fecha_reserva").val(response[0].fecha_reserva);
            $("#hora_reserva").val(response[0].hora_reserva);
            $("#pasajeros").val(response[0].cantidad_pasajeros);
            $("#tipo").val(response[0].tipo_reserva);
            panel(response[0].tipo);
            // $("#tipo_reserva").val(response[0].tipo_reserva);
            listTiposLocal(response[0].tipo_reserva);

            $("#cliente").val(response[0].nombre_cliente);
            $("#empresa").val(response[0].nombre_empresa);
            $("#hotel").val(response[0].nombre_hotel);
            $("#telefono").val(response[0].telefono_cliente);
            $("#correo").val(response[0].email_cliente);
            $("#ssucursal").val(response[0].sucursal);
            // sucursal(response[0].salon, response[0].mesa);

            listSucursales(response[0].sucursal);
            listSalones(response[0].salon, response[0].sucursal);
            listMesas(response[0].mesa, response[0].salon);

            $("#observaciones").val(response[0].observaciones);
            $("#nombre_adicional").val(response[0].evento_nombre_adicional);
            $("#pax").val(response[0].evento_pax);
            $("#nombre_contacto").val(response[0].evento_nombre_contacto);
            $("#telefono_contacto").val(response[0].evento_telefono_contacto);
            $("#correo_contacto").val(response[0].evento_email_contacto);
            $("#idioma").val(response[0].evento_idioma);
            $("#cristaleria").val(response[0].evento_cristaleria);
            $("#anticipo").val(response[0].evento_anticipo);
            $("#valor_menu").val(response[0].evento_valor_menu);
            $("#total_s_propina").val(response[0].evento_total_sin_propina);
            $("#total_c_propina").val(response[0].evento_total_propina);
            $("#spago_local").val(response[0].evento_paga_en_local);
            $("#saudio").val(response[0].evento_audio);
            $("#svideo").val(response[0].evento_video);
            $("#svideo_audio").val(response[0].evento_video_audio);
            $("#sadicional").val(response[0].evento_mesa_soporte_adicional);
            $("#sextra").val(response[0].evento_extra_permitido);
            $("#autoriza").val(response[0].autoriza);
            $("#telefono_autoriza").val(response[0].telefono_autoriza);
            $("#monto_autorizado").val(response[0].monto_autorizado);
            $("#smenu_impreso").val(response[0].evento_menu_impreso);
            $("#stable_tent").val(response[0].evento_table_tent);
            $("#srestriccion").val(response[0].evento_restriccion_alimenticia);
            $("#detalle_restriccion").val(
                response[0].evento_detalle_restriccion
            );
            $("#decoracion").val(response[0].evento_decoracion); //?
            $("#monta").val(response[0].evento_monta); //?
            $("#ubicacion").val(response[0].evento_ubicacion);
            $("#comentarios").val(response[0].evento_comentarios);
            $("#rsalon").val(response[0].salon);
            $("#rmesa").val(response[0].mesa);
            $("#lnk_menu1").append(
                imageForm("lnk_menu1", response[0].archivo_1)
            );
            $("#lnk_menu2").append(
                imageForm("lnk_menu2", response[0].archivo_2)
            );
            $("#lnk_precuenta").append(
                imageForm("lnk_precuenta", response[0].archivo_3)
            );
            $("#lnk_factura").append(
                imageForm("lnk_factura", response[0].archivo_4)
            );
            $("#lnk_otro").append(imageForm("lnk_otro", response[0].archivo_5));
            $("#lnk_logo").append(
                imageForm("lnk_logo", response[0].evento_logo)
            );
            arch(JSON.stringify(response[0]));
            ocultar_loader();
        },
    });
    ocultar_loader();
}

function arch(resp) {
    let response = JSON.parse(resp);
    $("#arch1").val(response.archivo_1);
    $("#arch2").val(response.archivo_2);
    $("#arch3").val(response.archivo_3);
    $("#arch4").val(response.archivo_4);
    $("#arch5").val(response.archivo_5);
    $("#arch6").val(response.evento_logo);
}

function ocultar_loader() {
    $(".loader").hide();
}

function mostrar_loader() {
    $(".loader").show();
}

function panel(tipo) {
    if (tipo == "EVENTO") {
        $("#pax").val($("#pasajeros").val());
        $("#panel_eventos").css("visibility", "visible");
    } else {
        $("#panel_eventos").css("visibility", "hidden");
    }
}
// });
function imageForm(anchor, value) {
    ///////////////////////////
    let url = null;
    let act = null;
    if (anchor) {
        let miAnchor = $("#" + anchor);
        let miImagen = miAnchor.find("img");
        if (miImagen.length > 0) {
            miImagen.remove();
        }
    }
    if (value == null) {
        return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">';
    } else if (value == "") {
        return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">';
    } else {
        let ext = value.substring(value.length - 3);
        switch (ext) {
            case "pdf":
                act = 1;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/272a0577357ca4502d5111c5af4228fe22810758.png";
                break;
            case "png":
                act = 1;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png";
                break;
            case "jpg":
                act = 1;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png";
                break;
            case "jpeg":
                act = 1;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png";
                break;
            default:
                act = null;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png";
                break;
        }
        return (
            '<a href="' +
            value +
            '"><img src="' +
            url +
            '" height="50px" width="50px"></a>'
        );
    }
}

function imageFormatter(value) {
    ///////////////////////////
    let url = null;
    let act = null;
    if (value == null) {
        return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">';
    } else if (value == "") {
        return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">';
    } else {
        let ext = value.substring(value.length - 3);
        switch (ext) {
            case "pdf":
                act = 1;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/272a0577357ca4502d5111c5af4228fe22810758.png";
                break;
            case "png":
                act = 1;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png";
                break;
            case "jpg":
                act = 1;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png";
                break;
            case "jpeg":
                act = 1;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png";
                break;
            default:
                act = null;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png";
                break;
        }
        return (
            '<a href="' +
            value +
            '"><img src="' +
            url +
            '" height="50px" width="50px"></a>'
        );
    }
}
$("#mdl-cancelar").on("show.bs.modal", function (e) {
    $("#clave_usuario").val("");
    $("#raz_canc").val("");
    $("#obs_canc").val("");
});
$("#mdl-cancelar").on("hide.bs.modal", function (e) {
    $("#clave_usuario").val("");
    $("#raz_canc").val("");
    $("#obs_canc").val("");
});
$("#mdl-cancelar").on("show.bs.modal", function (e) {
    $("#clave_usuario").val("");
    $("#raz_canc").val("");
    $("#obs_canc").val("");
});
$("#mdl-cancelar").on("hide.bs.modal", function (e) {
    $("#clave_usuario").val("");
    $("#raz_canc").val("");
    $("#obs_canc").val("");
});
$("#mdl-estado").on("show.bs.modal", function (e) {
    $("#clv").val("");
    $("#estado").val("");
});
$("#mdl-estado").on("hide.bs.modal", function (e) {
    $("#clv").val("");
    $("#estado").val("");
});
$("#fecha_reserva").on("blur", function () {
    check_reserva();
});
$("#hora_reserva").on("blur", function () {
    check_reserva();
});

function guadar_validado_reserva() {
    mostrar_loader();
    // let valido = validar();
    // if (valido) {
    let clave = $("#clave").val();
    const opcionesFetch0 = {
        method: "POST",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clave: clave,
        }),
    };
    fetch(base + "/reservar/verificarclave", opcionesFetch0)
        .then((response) => response.json())
        .then(function (response) {
            if (response[0].respuesta == 0) {
                Swal.fire({
                    title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
                    text: "Verifíquela y vuelva a intentar",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Continuar",
                });
            } else {
                fecha = $("#fecha_reserva").val();
                hora = $("#hora_reserva").val();
                const opcionesFetch3 = {
                    method: "GET",
                    headers: {
                        "X-CSRF-Token": $('meta[name="_token"]').attr(
                            "content"
                        ),
                        "Content-Type": "application/json",
                    },
                };
                fetch(
                    base + "/reservar/check_bloqueo/" + fecha + "/" + hora,
                    opcionesFetch3
                )
                    .then((response) => response.json())
                    .then(function (response) {
                        if (response[0].bloqueos > 0) {
                            Swal.fire({
                                title: "¡BLOQUEO DE FECHA!",
                                text: "La fecha y hora seleccionadas presentan bloqueo; por favor seleccione otra fecha/hora",
                                icon: "error",
                                confirmButtonColor: "#f34e4e",
                                confirmButtonText: "Continuar",
                            });
                        } else {
                            /////////////
                            let cli = $("#cliente").val().trim();
                            const opcionesFetch0 = {
                                method: "POST",
                                headers: {
                                    "X-CSRF-Token": $(
                                        'meta[name="_token"]'
                                    ).attr("content"),
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    cliente: cli,
                                }),
                            };
                            fetch(
                                base + "/clientes/buscarliente",
                                opcionesFetch0
                            )
                                .then((response) => response.json())
                                .then(function (response) {
                                    if (response.respuesta == 0) {
                                        let data = [
                                            (tipo =
                                                $(
                                                    "#tipo option:selected"
                                                ).val() != "Seleccione"
                                                    ? $(
                                                          "#tipo option:selected"
                                                      ).val()
                                                    : 0),
                                            (cliente = $("#cliente").val()),
                                            (empresa = $("#empresa").val()),
                                            (hotel = $("#hotel").val()),
                                            (telefono = $("#telefono").val()),
                                            (correo = $("#correo").val()),
                                        ];
                                        const opcionesFetch1 = {
                                            method: "POST",
                                            headers: {
                                                "X-CSRF-Token": $(
                                                    'meta[name="_token"]'
                                                ).attr("content"),
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify({
                                                data: data,
                                            }),
                                        };
                                        fetch(
                                            base + "/clientes/clientemin",
                                            opcionesFetch1
                                        )
                                            .then((response) => response.json())
                                            .then(function (response) {
                                                if (
                                                    response[0]["status"] == 1
                                                ) {
                                                    toastr.clear();
                                                    toastr.success(
                                                        "reserva actualizada"
                                                    );
                                                    actualizar();
                                                    actualizar_reserva();
                                                } else {
                                                    toastr.clear();
                                                    let error = "";
                                                    if (
                                                        response[0][
                                                            "error"
                                                        ].indexOf(
                                                            "clientes_tipo_id_foreign"
                                                        ) > -1
                                                    ) {
                                                        error =
                                                            "No se ha podido crear el cliente debido a que no indicó el tipo de cliente";
                                                    } else if (
                                                        response[0][
                                                            "error"
                                                        ].indexOf(
                                                            "el valor null para la columna «telefono»"
                                                        ) > -1
                                                    ) {
                                                        error =
                                                            "No se ha podido crear el cliente debido a que no indicó el número de teléfono";
                                                    } else {
                                                        error =
                                                            "No se ha podido crear el cliente debido a que ocurrió un error";
                                                    }
                                                    toastr.error(error);
                                                }
                                            });
                                    } else {
                                        $.LoadingOverlay("show");
                                        actualizar_reserva();
                                        $.LoadingOverlay("hide");
                                        toastr.success("RESERVA ACTUALIZADA");
                                    }
                                });
                        }
                    });
            }
            /////////////////////
        });
    // } else {
    //     Swal.fire({
    //         title: "¡Tiene campos obligatorios por completar!",
    //         text: "Todos los campos maracados con un * son obligatorios, debe proporcionar la información solicitada",
    //         icon: "error",
    //         confirmButtonColor: "#f34e4e",
    //         confirmButtonText: "Regresr",
    //     });
    // }
    ocultar_loader();
}
$("#btn_reerva").on("click", function () {
    guadar_validado_reserva();
});
$("#ssucursal").on("change", function () {
    listSalones("", $("#ssucursal").val());

    // Se limpia todas las mesas
    var option = '<option value="">Seleccione</option>';
    $("#smesa").html(option);
});
$("#sextra").on("change", function () {
    if ($(this).val() == 1) {
        $("#dvextras").show();
        $("#detalle_restriccion").height(25);
    } else {
        $("#dvextras").hide();
        $("#detalle_restriccion").height(150);
    }
});

function cancelar(id) {
    // let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
    $("#can_res").html("Cancelar Reserva ID: " + id);

    listRazonesLocal();
}

function aceptar(id) {
    // let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
    $("#accep_res").html("Aceptar Reserva ID: " + id);
}

function rechazo(id) {
    // let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
    $("#rec_res").html("Rechazar Reserva ID: " + id);
}

function noshow(id) {
    // let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
    $("#nsh_res").html("No Show Reserva ID: " + id);
}

function estado(id) {
    // let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
    $("#est_res").html("Cambio de estado Reserva ID: " + id);
}

function historial(id) {
    // let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
    $("#historial_res").html("Historial de cambios reserva ID: " + id);
    $("#historial_tbl").bootstrapTable("refresh", {
        url: "/reservar/historial_cambios/" + id,
    });
}

function previoFormatter(value, row, index) {
    $resp = "";
    if (row.registro_previo != null && row.registro_previo != "") {
        let text = row.registro_previo;
        let link =
            "<a href='#' onclick='registro(" +
            row.id +
            ")' title='Mostrar Registro Previo' class='delete text-dark' data-bs-toggle='modal' data-bs-target='#mdl-registro'>" +
            "<i class='fas fa-eye font-size-16'></i>" +
            "</a>";
        $resp = text.substring(0, 20) + "... ";
    }
    return $resp;
}

function actualFormatter(value, row, index) {
    $resp = "";
    if (row.registro_actual != null && row.registro_actual != "") {
        let text = row.registro_actual;
        let link =
            "<a href='#' onclick='registro(" +
            row.id +
            ")' title='Mostrar Registro Actual' class='delete text-dark' data-bs-toggle='modal' data-bs-target='#mdl-registro'>" +
            "<i class='fas fa-eye font-size-16'></i>" +
            "</a>";
        $resp = text.substring(0, 20) + "... ";
    }
    return $resp;
}

function registro(id) {
    const opcionesFetch1 = {
        method: "GET",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
    };
    fetch(base + "/reservar/registro_cambio/" + id, opcionesFetch1)
        .then((response) => response.json())
        .then(function (response) {
            let res = JSON.parse(response[0]);
            var data = [
                {
                    id: 0,
                    fecha_reserva: "fgg",
                },
            ];
            $("#registro_tbl").bootstrapTable({
                data: data,
            });
        });
}

function validar() {
    let valido = true;
    $(".req").each(function () {
        let id = null;
        switch ($(this)[0]["tagName"]) {
            case "INPUT":
                id = $(this)[0]["id"];
                if (
                    $("#" + id).val().length == 0 &&
                    $("#" + id).is(":visible")
                ) {
                    valido = false;
                    $("#err_" + id).html("Campo obligatorio");
                }
                break;
            case "SELECT":
                id = $(this)[0]["id"];
                if (
                    $("#" + id + " option:selected").val() == "Seleccione" ||
                    $("#" + id + " option:selected").val() == undefined
                ) {
                    valido = false;
                    $("#err_" + id).html("Campo obligatorio");
                }
                break;
        }
    });
    return valido;
}

function cambiar_archivo(etiqueta, anchor, ctl) {
    $("#" + etiqueta).html("");
    let miAnchor = $("#" + anchor);
    let miImagen = miAnchor.find("img");
    if (miImagen.length > 0) {
        miImagen.remove();
    }
    let pdf = $("#" + ctl)[0].files[0].type.indexOf("pdf");
    let jpeg = $("#" + ctl)[0].files[0].type.indexOf("jpeg");
    let jpg = $("#" + ctl)[0].files[0].type.indexOf("jpg");
    let png = $("#" + ctl)[0].files[0].type.indexOf("png");
    if (pdf == -1 && jpeg == -1 && jpg == -1 && png == -1) {
        $("#" + ctl).val(null);
        toastr.error(
            "El archivo no ha sido cargado debido a que sólo puede cargar archivos pdf, jpeg, jpg, png; intente de nuevo con un arcivo válido"
        );
    } else {
        if (pdf > -1) {
            url =
                "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/272a0577357ca4502d5111c5af4228fe22810758.png";
        } else if (jpeg > -1 || jpg > -1 || png > -1) {
            url =
                "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png";
        }
        miAnchor.append(
            '<img src="' +
                url +
                '" height="50px" width="50px" title="' +
                $("#" + ctl)[0].files[0].name +
                '"></img>'
        );
        let nombre = "";
        if ($(window).width() > 992) {
            nombre =
                $("#" + ctl)[0].files[0].name.length > 17
                    ? $("#" + ctl)[0].files[0].name.substring(0, 14) + "..."
                    : $("#" + ctl)[0].files[0].name;
        } else {
            nombre = $("#" + ctl)[0].files[0].name;
        }
        $("#" + etiqueta).html(nombre);
        $("#" + etiqueta).attr("title", $("#" + ctl)[0].files[0].name);
    }
}
$("#fmenu1,#fmenu2,#fprecuenta,#ffactura,#flogo,#fotro").on(
    "change",
    function () {
        let id = $(this).attr("id");
        switch (id) {
            case "fmenu1":
                cambiar_archivo("lbl-fmenu1", "lnk_menu1", id);
                break;
            case "fmenu2":
                cambiar_archivo("lbl-fmenu2", "lnk_menu2", id);
                break;
            case "fprecuenta":
                cambiar_archivo("lbl-fprecuenta", "lnk_precuenta", id);
                break;
            case "ffactura":
                cambiar_archivo("lbl-ffactura", "lnk_factura", id);
                break;
            case "flogo":
                cambiar_archivo("lbl-flogo", "lnk_logo", id);
                break;
            case "fotro":
                cambiar_archivo("lbl-fotro", "lnk_otro", id);
                break;
        }
    }
);

function actualizar_reserva() {
    const id = parseInt(
        $("#id_reserva")
            .html()
            .substring($("#id_reserva").html().indexOf("ID: ") + 4)
            .trim()
    );
    let dianoche = null;
    let horaInicio = moment($("#hora_reserva").val(), "h:mma");
    var horaFin = moment("4:00pm", "h:mma");
    if (horaInicio.isBefore(horaFin)) {
        dianoche = 1;
    } else {
        dianoche = 2;
    }
    const formData = new FormData();
    const archivo1 =
        typeof $("#fmenu1")[0].files[0] === "undefined"
            ? $("#arch1").val()
            : $("#fmenu1")[0].files[0];
    const archivo2 =
        typeof $("#fmenu2")[0].files[0] === "undefined"
            ? $("#arch2").val()
            : $("#fmenu2")[0].files[0];
    const archivo3 =
        typeof $("#fprecuenta")[0].files[0] === "undefined"
            ? $("#arch3").val()
            : $("#fprecuenta")[0].files[0];
    const archivo4 =
        typeof $("#ffactura")[0].files[0] === "undefined"
            ? $("#arch4").val()
            : $("#ffactura")[0].files[0];
    const archivo5 =
        typeof $("#fotro")[0].files[0] === "undefined"
            ? $("#arch5").val()
            : $("#fotro")[0].files[0];
    const evento_logo =
        typeof $("#flogo")[0].files[0] === "undefined"
            ? $("#arch6").val()
            : $("#flogo")[0].files[0];
    const fecha_reserva = $("#fecha_reserva").val();
    const hora_reserva = $("#hora_reserva").val();
    const evento_paga_en_local =
        $("#spago_local option:selected").val() == "Seleccione"
            ? 2
            : $("#spago_local option:selected").val();
    const evento_audio =
        $("#saudio option:selected").val() == "Seleccione"
            ? 2
            : $("#saudio option:selected").val();
    const evento_video =
        $("#svideo option:selected").val() == "Seleccione"
            ? 2
            : $("#svideo option:selected").val();
    const evento_video_audio =
        $("#svideo_audio option:selected").val() == "Seleccione"
            ? 2
            : $("#svideo_audio option:selected").val();
    const evento_mesa_soporte_adicional =
        $("#adicional option:selected").val() == "Seleccione"
            ? 2
            : $("#sadicional option:selected").val();
    const evento_ubicacion = $("#ubicacion").val();
    const evento_menu_impreso =
        $("#smenu_impreso option:selected").val() == "Seleccione"
            ? 2
            : $("#smenu_impreso option:selected").val();
    const evento_table_tent =
        $("#stable_tent option:selected").val() == "Seleccione"
            ? 2
            : $("#stable_tent option:selected").val();
    const evento_restriccion_alimenticia =
        $("#srestriccion option:selected").val() == "Seleccione"
            ? 2
            : $("#srestriccion option:selected").val();
    const evento_extra_permitido =
        $("#sextra option:selected").val() == "Seleccione"
            ? 2
            : $("#sextra option:selected").val();
    const evento_detalle_restriccion = $("#detalle_restriccion").val();
    formData.append("id", id);
    formData.append("fecha_reserva", fecha_reserva);
    formData.append("hora_reserva", hora_reserva);
    formData.append("pasajeros", $("#pasajeros").val());
    formData.append("tipo", $("#tipo_reserva option:selected").val());
    formData.append("cliente", $("#cliente").val().trim());
    formData.append("empresa", $("#empresa").val().trim());
    formData.append("hotel", $("#hotel").val().trim());
    formData.append("telefono", $("#telefono").val().trim());
    formData.append("correo", $("#correo").val().trim());
    formData.append("sucursal", $("#ssucursal option:selected").val());
    formData.append("salon", $("#ssalon option:selected").val());
    formData.append("mesa", $("#smesa option:selected").val());
    formData.append("observaciones", $("#observaciones").val().trim());

    formData.append(
        "evento_nombre_adicional",
        $("#nombre_adicional").val().trim()
    );
    formData.append("evento_pax", $("#pax").val());
    formData.append(
        "evento_nombre_contacto",
        $("#nombre_contacto").val().trim()
    );
    formData.append(
        "evento_telefono_contacto",
        $("#telefono_contacto").val().trim()
    );
    formData.append(
        "evento_correo_contacto",
        $("#correo_contacto").val().trim()
    );
    formData.append("evento_idioma", $("#idioma").val().trim());
    formData.append("evento_cristaleria", $("#cristaleria").val().trim());
    formData.append("evento_anticipo", $("#anticipo").val());
    formData.append("evento_valor_menu", $("#valor_menu").val());
    formData.append("evento_valor_menu", $("#valor_menu").val());
    formData.append("evento_total_sin_propina", $("#total_s_propina").val());
    formData.append("evento_total_propina", $("#total_c_propina").val());
    formData.append("evento_paga_en_local", evento_paga_en_local);

    formData.append("evento_audio", evento_audio);
    formData.append("evento_video", evento_video);
    formData.append("evento_video_audio", evento_video_audio);
    formData.append(
        "evento_mesa_soporte_adicional",
        evento_mesa_soporte_adicional
    );
    formData.append("evento_ubicacion", evento_ubicacion);

    formData.append("evento_menu_impreso", evento_menu_impreso);
    formData.append("evento_table_tent", evento_table_tent);
    formData.append(
        "evento_restriccion_alimenticia",
        evento_restriccion_alimenticia
    );
    formData.append("evento_detalle_restriccion", evento_detalle_restriccion);
    formData.append("evento_extra_permitido", evento_extra_permitido);
    formData.append("autoriza", $("#autoriza").val());
    formData.append("telefono_autoriza", $("#telefono_autoriza").val());
    formData.append("monto_autorizado", $("#monto_autorizado").val());

    formData.append("evento_decoracion", $("#decoracion").val());
    formData.append("ambiente", $("#ubicacion").val());
    formData.append("evento_monta", $("#monta").val());
    formData.append("evento_comentarios", $("#comentarios").val());
    formData.append("dianoche", dianoche);

    formData.append("archivo_1", archivo1);
    formData.append("archivo_2", archivo2);
    formData.append("archivo_3", archivo3);
    formData.append("archivo_4", archivo4);
    formData.append("archivo_5", archivo5);
    formData.append("evento_logo", evento_logo);
    const opcionesFetch = {
        method: "POST",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
        },
        body: formData,
    };
    fetch(base + "/reservar/actualizar", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            if (response[0].status == 0) {
                toastr.error(response[0].error);
            } else {
                $("#frm-general").trigger("reset");
                $("#frm-evento").trigger("reset");
                $("#clave").val(" ");
                $("#panel_eventos").css("visibility", "hidden");
                Swal.fire({
                    title: "La reserva ha sido actualizada exitosamente",
                    text: "",
                    icon: "success",
                    confirmButtonColor: "#51d28c",
                    confirmButtonText: "Continuar",
                }).then(function (result) {
                    $("#mdl-vreserva").modal("toggle");
                    // $('#reservas_tbl').bootstrapTable('refresh');
                    filtrar();
                });
            }
        });
}

function actualizar() {
    const opcionesFetch = {
        method: "GET",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
    };
    fetch(base + "/clientes/clienteslista", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            $("#listaClientes").empty();
            response.forEach(function (vector) {
                $("#listaClientes").append(
                    '<option value="' + vector.nombre + '">'
                );
            });
        });

    fetch(base + "/clientes/clientesempresas", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            $("#listaEmpresas").empty();
            response.forEach(function (vector) {
                $("#listaEmpresas").append(
                    '<option value="' + vector.empresa + '">'
                );
            });
        });

    fetch(base + "/clientes/clienteshoteles", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            $("#listaHoteles").empty();
            response.forEach(function (vector) {
                $("#listaHoteles").append(
                    '<option value="' + vector.hotel + '">'
                );
            });
        });

    fetch(base + "/clientes/clientestelefonos")
        .then((response) => response.json())
        .then(function (response) {
            $("#listaTelefonos").empty();
            response.forEach(function (vector) {
                $("#listaTelefonos").append(
                    '<option value="' + vector.telefono + '">'
                );
            });
        });

    fetch(base + "/clientes/clientescorreos", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            $("#listaCorreos").empty();
            response.forEach(function (vector) {
                $("#listaCorreos").append(
                    '<option value="' + vector.email + '">'
                );
            });
        });
}

function check_reserva() {
    let fecha = $("#fecha_reserva").val();
    let hora = $("#hora_reserva").val();
    if (fecha.length > 0 && hora.length > 0) {
        const opcionesFetch3 = {
            method: "GET",
            headers: {
                "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                "Content-Type": "application/json",
            },
        };
        fetch(
            base + "/reservar/check_bloqueo/" + fecha + "/" + hora,
            opcionesFetch3
        )
            .then((response) => response.json())
            .then(function (response) {
                if (response[0].bloqueos > 0) {
                    Swal.fire({
                        title: "¡BLOQUEO DE FECHA!",
                        text: "La fecha y hora seleccionadas presentan bloqueo; por favor seleccione otra fecha/hora",
                        icon: "error",
                        confirmButtonColor: "#f34e4e",
                        confirmButtonText: "Continuar",
                    });
                }
            });
    }
}

function horaFormatter(value, row, index) {
    let hora = row.hora_reserva;
    let newHora = hora.slice(0, -3);

    return newHora;
}

function paxFormatter(value, row, index) {
    var data =
        /* html*/
        `
        <a href="javascript:void(0)" onclick="editPax(${row.id},${value})" class="edit-pax" data-id="${row.id}" data-pax="${value}" data-bs-target="#mdl-pax" data-bs-toggle="modal" >${value}</a>
    `;

    if (row.estado == 4 || row.estado == 7) {
        data = value;
    }

    return data;
}

function mesaFormatter(value, row, index) {
    var textMesa = "Mesa ?";
    var classMesa = "text-italic";
    var red = "text-danger";

    if (value) {
        textMesa = value;
        red = "";
    }

    var data =
        /* html*/
        `
        <a href="javascript:void(0)" onclick="editMesa(${row.id}, ${row.mesa}, ${row.salon} )" class="${red} ${classMesa} edit-mesa" data-id="${row.id}" data-mesa_id="${row.mesa}" data-salon="${row.salon}" data-bs-target="#mdl-mesa" data-bs-toggle="modal" >${textMesa}</a>
        `;
    if (row.estado == 4) {
        data = value;
    }

    return data;
}

function salonFormatter(value, row, index) {
    let textSalon = "Salon ?";
    let classSalon = "text-italic";
    let red = "text-danger";

    if (value) {
        textSalon = value;
        red = "";
        classSalon = "";
    }

    var data =
        /* html*/
        `
        <a href="javascript:void(0)" onclick="editSalon(${row.id}, ${row.salon}, ${row.mesa}, ${row.sucursal})" class="${red} ${classSalon} edit-salon" data-id="${row.id}" data-mesa_id="${row.mesa}" data-salon="${row.salon}" data-sucursal="${row.sucursal}" data-bs-target="#mdl-salones" data-bs-toggle="modal" >${textSalon}</a> `;

    return data;
}

function editSalon(id, salon, mesa, sucursal) {
    $("#salon-edit").val("");
    $("#mesa-salon-edit").val("");
    $("#salon-reserva-id").val();
    $(".err_salon-edit").html("");
    $("#salon-reserva-id").val(id);

    listSalones(salon, sucursal);
    listMesas(mesa, salon);
}

//No esta funcionando
// $('body #reservas_tbl tbody ').on('click','.edit-salon', function () {
//     $('#salon-edit').val('');
//     $('#mesa-salon-edit').val('');
//     $('#salon-reserva-id').val();
//     $('.err_salon-edit').html("");
//     var id = $(this).data('id');
//     var sucursal = $(this).data('sucursal');
//     var salon = $(this).data('salon');
//     var mesa = $(this).data('mesa_id');
//     $('#salon-reserva-id').val(id);
//     listSalones(salon, sucursal);
//     listMesas(mesa, salon);
// });

$("#salon-edit").on("change", function () {
    let salon = $(this).val();
    listMesas("", salon);
});

function estadoFormatter(value, row, index) {
    var data =
        /* html*/
        `
    <a href="javascript:void(0)" onclick="editEstado(${row.id},${row.estado})" class="edit-estado" data-id="${row.id}" data-estado_id="${row.estado}"  data-bs-target="#mdl-estados" data-bs-toggle="modal" >${value}</a>
    `;

    // if ( row.estado == 8) { // Rechazada
    //     data = value;
    // }

    return data;
}
function obsCancelaFormatter(value, row, index) {
    var textObs = "-";

    if (value) {
        textObs = value;

        if (value.length > 10) {
            var subcadena = value.substring(0, 10);
            textObs = subcadena + "....";
        }
    }
    var data =
        /* html*/
        `
       <span title="${value}" alt="${value}">${textObs}</span>
    `;

    if (row.estado == 4 || row.estado == 7) {
        if (value) {
            data = value;

            if (data.length > 55) {
                var subcadena = data.substring(0, 55);
                data = subcadena + "....";
            }
        } else {
            data = "--";
        }
    }

    return data;
}

function obsFormatter(value, row, index) {
    var textObs = "OBS. ?";

    if (value) {
        textObs = value;

        if (value.length > 55) {
            var subcadena = value.substring(0, 55);
            textObs = subcadena + "....";
        }
    }
    var data =
        /* html*/
        `
    <a href="javascript:void(0)" onclick='editObs(${row.id})' class="edit-obs" data-id="${row.id}" data-observacion="${row.observaciones}"  data-bs-target="#mdl-obs" data-bs-toggle="modal" >${textObs}</a>
    `;

    if (row.estado == 4 || row.estado == 7) {
        if (value) {
            data = value;

            if (data.length > 55) {
                var subcadena = data.substring(0, 55);
                data = subcadena + "....";
            }
        } else {
            data = "--";
        }
    }

    return data;
}

function botoneraFormatter(value, row, index) {
    var disabled_re = "";
    var disabled_can = "";
    var disabled_accep = "";

    if (row.estado == 8 || row.estado == 4 ) {
        // Rechazada, Cancelada, Aceptada
        disabled_re = "disabled";
        disabled_can = "disabled";
    }

    if(row.estado == 1 || row.estado == 2 || row.estado == 3) {
        disabled_re = "disabled";
        // disabled_accep = "disabled";
    }

    if (row.estado != 9) {
        disabled_accep = "disabled";
    }


    // if (row.estado == 4) {// Cancelada
    //     disabled_can = "disabled";
    // }

    // Validar permisos
    var bEditar = "";
    var bCancelar = "";
    var bRechazar = "";
    var bAceptar = "";

    if (editar_reserva) {
        bEditar =
            /*html*/
            `
            <button type="button" class="btn btn-primary btn-sm editar me-1"
            data-bs-target="#mdl-vreserva" data-bs-toggle="modal" title="Editar Reserva" onclick='editar(${row.id})'>
                <i class="fas fa-pencil-alt py-1"></i>
            </button>
        `;
    }

    if (cancelar_reserva) {
        bCancelar =
            /*html*/
            `
            <button type="button" class="btn btn-danger btn-sm cancelar-reserva ${disabled_can} me-1" data-bs-target="#mdl-cancelar" data-bs-toggle="modal" onclick='cancelar(${row.id});' title="Cancelar Reserva" >
            C
            </button>

        `;
        bAceptar =
            /*html*/
            `
            <button type="button" class="btn btn-success btn-sm aceptar-reserva ${disabled_accep} me-1" data-bs-target="#mdl-aceptar" data-bs-toggle="modal" onclick='aceptar(${row.id});' title="Aceptar Reserva" >
            A
            </button>

        `;
    }

    if (rechazar_reserva) {
        bRechazar =
            /*html*/
            `
        <button type="button" class="btn btn-warning btn-sm rechazar-reserva ${disabled_re} me-1" data-bs-target="#mdl-rechazo" data-bs-toggle="modal" onclick='rechazo(${row.id});' title="Rechazar Reserva" >
            R
        </button>
        `;
    }

    var botones =
        /*html*/
        `
    <div class="d-inline-flex">

        ${bEditar}
        <button type="button" class="btn btn-primary btn-sm me-1" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" title="Ver Reserva" onclick='ver(${row.id})'>
            <i class="fas fa-eye py-1"></i>
        </button>
        ${bCancelar}
        ${bRechazar}
        ${bAceptar}
    </div>

    `;
    return botones;
}

function boton1Formatter(value, row, index) {
    var boton =
        /*html*/
        `
    <button type="button" class="btn btn-primary btn-sm editar"
    data-bs-target="#mdl-vreserva" data-bs-toggle="modal" title="Editar Reserva" onclick='editar(${row.id})'>
        <i class="fas fa-pencil-alt py-1"></i>
    </button>
    `;
    return boton;
}

function boton2Formatter(value, row, index) {
    var boton =
        /*html*/
        `
    <button type="button" class="btn btn-primary btn-sm" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" title="Ver Reserva" onclick='ver(${row.id})'>
        <i class="fas fa-eye py-1"></i>
    </button>
    `;
    return boton;
}
function boton3Formatter(value, row, index) {
    var disabled_can = "";

    if (row.estado == 4) {
        // Cancelada
        disabled_can = "disabled";
    }

    var boton =
        /*html*/
        `
    <button type="button" class="btn btn-danger btn-sm cancelar-reserva ${disabled_can}" data-bs-target="#mdl-cancelar" data-bs-toggle="modal" onclick='cancelar(${row.id});' title="Cancelar Reserva" >
        C
    </button>

    `;
    return boton;
}

function boton4Formatter(value, row, index) {
    var disabled_re = "";

    if (row.estado == 8) {
        // Rechazada
        disabled_re = "disabled";
    }

    var boton =
        /*html*/
        `
    <button type="button" class="btn btn-warning btn-sm rechazar-reserva ${disabled_re}" data-bs-target="#mdl-rechazo" data-bs-toggle="modal" onclick='rechazo(${row.id});' title="Rechazar Reserva" >
        R
    </button>
    `;
    return boton;
}

/// Pax
function editPax(id, pax) {
    $("#pax-id").val(id);
    $("#pax-edit").val(pax);
    $("#tipo_update").val(1); // Pax = 1
}

// $('body #reservas_tbl tbody ').on('click', '.edit-pax', function () {
//     var id = $(this).data('id');
//     var pax = $(this).data('pax');
//     $('#pax-id').val(id);
//     $('#pax-edit').val(pax);
//     $('#tipo_update').val(1); // Pax = 1

// });

$("#btn-guardar-pax").on("click", function () {
    let valor = {
        pax_edit: $("#pax-edit").val(),
        tipo_update: 1,
    };
    actualizaPMEO($("#pax-id").val(), valor);
});
/////

// Mesa
function editMesa(id, mesa, salon) {
    $("#mesa-id").val(id);
    $("#tipo_update").val(2); // Mesa = 2
    $(".select-edit-mesa").val("");
    listMesas(mesa, salon);
}
//No esta funcionando
// $('body #reservas_tbl tbody ').on('click', '.edit-mesa', function () {
//     var id = $(this).data('id');
//     var mesa = $(this).data('mesa_id');
//     var salon = $(this).data('salon');
//     $('#mesa-id').val(id);
//     $('#tipo_update').val(2); // Mesa = 2
//     $(".select-edit-mesa").val("");
//     listMesas(mesa, salon)

// });

function guardar_mesa() {
    let valor = {
        mesa_edit: $(".select-edit-mesa").val(),
        tipo_update: 2,
    };
    actualizaPMEO($("#mesa-id").val(), valor);
}

$("#btn-guardar-mesa").on("click", function () {
    guardar_mesa();
});
////////

// Estados
function editEstado(id, estado) {
    $("#estado-id").val(id);
    $("#tipo_update").val(3); // Estado = 3
    $(".select-edit-estado").val("");
    listEstado(estado);
}
// No esta funcionando
// $('body #reservas_tbl tbody ').on('click', '.edit-estado', function () {

//     var id = $(this).data('id');
//     var estado = $(this).data('estado_id');
//     $('#estado-id').val(id);
//     $('#tipo_update').val(3); // Estado = 3
//     $(".select-edit-estado").val("");
//     listEstado(estado);
// });

function guardar_estado() {
    let valor = {
        estado_edit: $(".select-edit-estado").val(),
        tipo_update: 3,
    };
    actualizaPMEO($("#estado-id").val(), valor);
}

$("#btn-guardar-estado").on("click", function () {
    guardar_estado();
});

//Observaciones

$("#mdl-obs").on("hidden.bs.modal", function () {
    $("#obs-id").val("");
    $("#tipo_update").val("");
    $("#obs-edit").val("");
});

function editObs(id) {
    $("#obs-id").val(id);
    $("#tipo_update").val(4); // Observaciones = 4
    $.ajax({
        type: "GET",
        url: base + "/administrar/ver/" + id,
        dataType: "JSON",
        success: function (response) {
            $("#obs-edit").val(response.observaciones);
        },
    });
}

//No esta funcionando
// $('body #reservas_tbl tbody ').on('click', '.edit-obs', function () {
//     var id = $(this).data('id');
//     var obs = $(this).data('observacion');
//     $('#obs-id').val(id);
//     $("#obs-edit").val(obs);
//     $('#tipo_update').val(4); // Observaciones = 4

// });

function guardar_observaciones() {
    let valor = {
        obs_edit: $("#obs-edit").val(),
        tipo_update: 4,
    };
    actualizaPMEO($("#obs-id").val(), valor);
}

$("#btn-guardar-obs").on("click", function () {
    guardar_observaciones();
});

function actualizaPMEO(id, valor) {
    // console.log(id, valor);

    let url = base + "/crm_update_tipo/" + id;

    $.ajax({
        type: "POST",
        url: url,
        headers: {
            "X-CSRF-TOKEN": token,
        },
        data: valor,
        dataType: "JSON",
        success: function (response) {
            console.log(response);

            if (response.status == 1) {
                // if(valor.tipo_update==1){
                //     $('#mdl-pax').modal('toggle');
                // }
                $("#mdl-pax").modal("hide");
                $("#mdl-mesa").modal("hide");
                $("#mdl-estados").modal("hide");
                $("#mdl-obs").modal("hide");

                toastr.success(response.message);
                // $('#reservas_tbl').bootstrapTable('refresh');
                filtrar();

                paxParcial();
            } else {
                toastr.error(response.error);
            }
        },
    });
}

function guardar_validado_rechazo() {
    let clave = $("#clave_usuario-r").val();
    const opcionesFetch0 = {
        method: "POST",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ clave: clave }),
    };
    fetch(base + "/reservar/verificarclave", opcionesFetch0)
        .then((response) => response.json())
        .then(function (response) {
            if (response[0].respuesta == 0) {
                Swal.fire({
                    title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
                    text: "Verifíquela y vuelva a intentar",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Continuar",
                });
            } else {
                let razon = $("#raz_rechazo").val();
                if (razon === "") {
                    Swal.fire({
                        title: "LA RAZÓN DEL RECHAZO ES OBLIGATORIA",
                        text: "Debe incluir la razón del reachazo; verifíque y vuelva a intentar",
                        icon: "error",
                        confirmButtonColor: "#f34e4e",
                        confirmButtonText: "Continuar",
                    });
                } else {
                    let id = $("#rec_res")
                        .html()
                        .substring($("#rec_res").html().indexOf(": ") + 2)
                        .trim();
                    const opcionesFetch1 = {
                        method: "PUT",
                        headers: {
                            "X-CSRF-Token": $('meta[name="_token"]').attr(
                                "content"
                            ),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: id, razon_rechazo: razon }),
                    };
                    fetch(base + "/reservar/rechazar", opcionesFetch1)
                        .then((response) => response.json())
                        .then(function (response) {
                            $("#clave_usuario-r").val("");
                            $("#raz_rechazo").val("");
                            $("#btn-cerrar_r").trigger("click");

                            if (response[0].status == 1) {
                                toastr.success(
                                    "La reserva fue rechazada exitosamente"
                                );
                                // $('#reservas_tbl').bootstrapTable('refresh');
                                filtrar();
                                paxParcial();
                            } else {
                                toastr.error(response[0].error);
                            }
                        });
                }
            }
        });
}

$("#btn-rechazar").on("click", function () {
    guardar_validado_rechazo();
});

$("#btn-guardar-salon").on("click", function () {
    if ($("#salon-edit").val() == "") {
        $(".err_salon-edit").html("Debe seleccionar un salón");
        return;
    } else {
        $(".err_salon-edit").html("");
        editarSalon();
    }
});

function editarSalon() {
    var id = $("#salon-reserva-id").val();

    var data = {
        salon: $("#salon-edit").val(),
        mesa: $("#mesa-salon-edit").val(),
    };

    $.ajax({
        type: "POST",
        headers: { "X-CSRF-Token": $('meta[name="_token"]').attr("content") },
        url: base + "/actualiza_salon_mesa/" + id,
        data: data,
        dataType: "JSON",
        success: function (response) {
            if (response.status == 1) {
                toastr.success(response.mensaje);
                filtrar();

                $("#mdl-salones").modal("hide");
            } else {
                toastr.error(response.error);
            }
        },
    });
}

$("#btn-limpia-desde").on("click", function () {
    $("#desde").val("");
});
$("#btn-limpia-hasta").on("click", function () {
    $("#hasta").val("");
});

$("#btn-aceptar").on("click", function () {
    guardar_validado_aceptar();
});

function guardar_validado_aceptar() {
    let clave = $("#clave_usuario-accep").val();
    const opcionesFetch0 = {
        method: "POST",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ clave: clave }),
    };
    fetch(base + "/reservar/verificarclave", opcionesFetch0)
        .then((response) => response.json())
        .then(function (response) {
            if (response[0].respuesta == 0) {
                Swal.fire({
                    title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
                    text: "Verifíquela y vuelva a intentar",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Continuar",
                });
            } else {
                let id = $("#accep_res")
                    .html()
                    .substring($("#accep_res").html().indexOf(": ") + 2)
                    .trim();

                const opcionesFetch1 = {
                    method: "PUT",
                    headers: {
                        "X-CSRF-Token": $('meta[name="_token"]').attr(
                            "content"
                        ),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: id }),
                };
                fetch(base + "/reservar/aceptar", opcionesFetch1)
                    .then((response) => response.json())
                    .then(function (response) {
                        $("#clave_usuario-accep").val("");
                        $("#btn-cerrar_accep").trigger("click");

                        if (response[0].status == 1) {
                            toastr.success(
                                "La reserva fue aceptada exitosamente"
                            );
                            // $('#reservas_tbl').bootstrapTable('refresh');
                            filtrar();
                            paxParcial();
                        } else {
                            toastr.error(response[0].error);
                        }
                    });
            }
        });
}

function fechaReservaFormatter(value, row) {
    let date = "-";
    // var nuevoStr ="-";
    if (row.fecha_reserva) {
        // date = moment(row.fecha_reserva, 'YYYY-MM-DD ').format('DD/MM/YYYY')
        date = moment(row.fecha_reserva, "YYYY-MM-DD ").format("DD/MM/YYYY");
        // var nuevoStr = date.substring(0, date.length - 3);
    }

    return date.toString();
}

//////////////////////////////////
