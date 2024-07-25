// var table= 'reservas_tbl';
$.LoadingOverlaySetup({
    background: "rgba(0, 0, 0, 0.5)",
});


$(document).ready(function () {
    // filtrosAvanzados(today);

    crearReservaInicio();

    $("#reservas_tbl").bootstrapTable("hideColumn", "telefono_cliente");
    $("#reservas_tbl").bootstrapTable("hideColumn", "email_cliente");
    $("#reservas_tbl").bootstrapTable("hideColumn", "nombre_empresa");
    $("#reservas_tbl").bootstrapTable("hideColumn", "nombre_hotel");
    $("#reservas_tbl").bootstrapTable("hideColumn", "fecha_reserva");
    $("#reservas_tbl").bootstrapTable("hideColumn", "tsucursal");
    $("#reservas_tbl").bootstrapTable("hideColumn", "tsalon");
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
    $("#reservas_tbl").bootstrapTable("hideColumn", "ambiente");
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
    $("#reservas_tbl").bootstrapTable("hideColumn", "usuario_confirmacion");
    $("#reservas_tbl").bootstrapTable("hideColumn", "usuario_rechazo");
    $("#reservas_tbl").bootstrapTable("hideColumn", "fecha_confirmacion");
    $("#reservas_tbl").bootstrapTable("hideColumn", "fecha_rechazo");
    $("#reservas_tbl").bootstrapTable("hideColumn", "razon_rechazo");
    $("#reservas_tbl").bootstrapTable("hideColumn", "razon");
    $("#reservas_tbl").bootstrapTable("hideColumn", "observacion_cancelacion");


    

    // $('#reservas_tbl').bootstrapTable({

    //     pagination: {
    //         showTotal: true, // Muestra el total de registros
    //         // paginationShowTotal: function(total, range) {
    //         //     return '<span>' + range[0] + '-' + range[1] + ' de ' + total + '</span>'; // Formatea el mensaje de la cantidad de registros mostrados
    //         // },
    //         paginationPreCount: 5, // Número de registros iniciales que se muestran
    //         sidePagination: 'server', // Tipo de paginación (por defecto es client)
    //         pageSize: 1000// Cantidad de registros por página
    //     }
        
    //     // pageSize: 1000, // Establece 10 filas por página
    //     // pageList: [1000] // Define las opciones de paginación
    // });

    miToolbar();

    // tableInit();

    // Refrescar la tabla de reserva cada 5 minutos
    setInterval(() => {
        tableInit();
        pax(0);
        let fecha = new Date();
        console.log(moment(fecha).format("YYYY-MM-DD HH:mm:ss"));
    }, 300000);

    $("#estado_filter").on("change", function () {
        var valorSeleccionado = $(this).val();

        pax(1);

        if (valorSeleccionado === "") {
            $("#reservas_tbl").bootstrapTable("filterBy", {});
        } else {
            $("#reservas_tbl").bootstrapTable("filterBy", {
                testado: valorSeleccionado,
            });
        }
        
    });

   

    $("[name='btnAdd']").removeClass("btn-secondary");
    $("[name='btnAdd']").addClass("btn-success");
    /////////////////////////////
    const opcionesFetch = {
        method: "GET",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
    };
    fetch(base + "/reservar/auxiliares", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            razones = response.razones;
            estados = response.estados;
            tipos = response.tipos;
            sucursales = response.sucursales;
            $("#raz_canc").append('<option value="">Seleccione</option>');
            razones.forEach(function (vector) { 
                $("#raz_canc").append( '<option value="' + vector.id + '">' + vector.razon + "</option>" );
            });
            $("#estado").append('<option value="">Seleccione</option>');
            estados.forEach(function (vector) {
                if (vector.id != 4) {
                    $("#estado").append( '<option value="' + vector.id + '">' + vector.estado + "</option>" );
                }
            });
            tipos.forEach(function (vector) {
                if (vector.id != 4) {
                    $("#tipo_reserva").append( "<option value = " + vector.id + ">" + vector.estado + "</option>" );
                    $("#ntipo").append( "<option value = " + vector.id + ">" + vector.estado + "</option>" );

                }
            });
            sucursales.forEach(function (vector) {
                let seleccionado = null;
                if (vector.sucursal == "VIVO") {
                    seleccionado = " SELECTED ";
                } else {
                    seleccionado = null;
                }

                $("#selSucursal").append( "<option value = " + vector.id + seleccionado + ">" + vector.sucursal + "</option>" );
                $("#ssucursal").append( "<option value = " + vector.id + seleccionado + ">" + vector.sucursal + "</option>" );
            });
        });

    $("#fecha").on("change", function () {
        pax(1);
        // filtrosAvanzados($(this).val());
    });

    pax(0);
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
                    if (estado === "") {
                        $("#estado").focus();

                        Swal.fire({
                            title: "EL ESTADO ES OBLIGATORIO",
                            text: "Debe selecccionar el estado; verifíque y vuelva a intentar",
                            icon: "error",
                            confirmButtonColor: "#f34e4e",
                            confirmButtonText: "Continuar",
                        });
                    } else {
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
                                pax(0);
                                $("#reservas_tbl").bootstrapTable("refresh");
                            });
                    }
                }
            });
    });
    $("#btn-cancelar1").on("click", function () {
        console.log(1);
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
                    if (
                        $("#raz_canc").val() == "" ||
                        $("#raz_canc").val() == null
                    ) {
                        $("#raz_canc").focus();
                        Swal.fire({
                            title: "LA RAZÓN DE CANCELACIÓN ES OBLIGATORIA",
                            text: "Debe incluir la razón de la cancelación; verifíque y vuelva a intentar",
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
                                toastr.success(
                                    "La reserva fue cancelada exitosamente"
                                );
                                pax(0);
                                $("#reservas_tbl").bootstrapTable("refresh");
                            });
                    }
                }
            });
    });
    $("#btn-rechazar").on("click", function () {
        let clave = $("#clave_usuario-r").val();
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
                            body: JSON.stringify({
                                id: id,
                                razon_rechazo: razon,
                            }),
                        };
                        fetch(base + "/reservar/rechazar", opcionesFetch1)
                            .then((response) => response.json())
                            .then(function (response) {
                                $("#clave_usuario-r").val("");
                                $("#raz_rechazo").val("");
                                $("#btn-cerrar_r").trigger("click");
                                toastr.success(
                                    "La reserva fue rechazada exitosamente"
                                );
                                $("#reservas_tbl").bootstrapTable("refresh");
                            });
                    }
                }
            });
    });

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
    // $("#tipo_reserva").append('<option selected>Seleccione</option>');
    // fetch(base+'/reservar/tipos',opcionesFetch)
    // .then(response => response.json())
    // .then(function(response) {
    // 	response.forEach(function(vector) {
    // 		$("#tipo_reserva").append('<option value = '+vector.id+'>'+vector.estado+'</option>');
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
    $(".loader").hide();
});
// $('#valor_menu').on('keyup', function () {
//     valor = digits($(this).val());
// 	$(this).val(valor);
// });
// $('#valor_menu').on('keyup', function() {
//     $(this).val(function(index, value) {
//       return /[0-9\.]/i.test(value) ? value : '';
//     });
// });

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

// $('.accordion-button').on('click', function () {
//     var fecha = $("#fecha").val();
//     filtrosAvanzados(fecha);

// });

function filtrosAvanzados(fecha) {
    $.ajax({
        url: base + "/reservar/opc_filtro_reservas/1?fecha=" + fecha,
        type: "get",
        async: false,
        dataType: "json",
    }).done(function (response) {
        response.clientes.forEach(function (vector) {
            if (vector.label) {
                $("#bsqClientes").append( "<option value = " + vector.value + ">" + vector.label + "</option>" );
            }
        });
        response.telefono.forEach(function (vector) {
            $("#bsqTelefono").append( "<option value = " + vector.value + ">" + vector.label + "</option>" );
        });
        response.correo.forEach(function (vector) {
            if (vector.label) {
                $("#bsqCorreo").append( "<option value = " + vector.value + ">" + vector.label + "</option>" );
            }
        });
        response.empresa.forEach(function (vector) {
            if (vector.label) {
                $("#bsqEmpresa").append( "<option value = " + vector.value + ">" + vector.label + "</option>" );
                 }
        });
        response.hotel.forEach(function (vector) {
            if (vector.label) {
                $("#bsqHotel").append( "<option value = " + vector.value + ">" + vector.label + "</option>" );
            }
        });
    });

    $("#bsqClientes").prepend("<option value = 0 selected>Todas</option>");
    $("#bsqTelefono").prepend("<option value = 0 selected>Todas</option>");
    $("#bsqCorreo").prepend("<option value = 0 selected>Todas</option>");
    $("#bsqEmpresa").prepend("<option value = 0 selected>Todas</option>");
    $("#bsqHotel").prepend("<option value = 0 selected>Todas</option>");
    $("#bsqClientes").on("change", function () {
        var value = $("#bsqClientes option:selected").text();
        var val = $("#bsqClientes option:selected").val();
        $("#bsqTelefono").val("0");
        $("#bsqCorreo").val("0");
        $("#bsqEmpresa").val("0");
        $("#bsqHotel").val("0");
        if (value === "Todas") {
            $("#reservas_tbl").bootstrapTable("filterBy", {});
        } else {
            $("#reservas_tbl").bootstrapTable("filterBy", {
                nombre_cliente: value,
            });
        }
    });

    $("#bsqTelefono").on("change", function () {
        $("#bsqClientes").val("0");
        $("#bsqCorreo").val("0");
        $("#bsqEmpresa").val("0");
        $("#bsqHotel").val("0");
        var value = $("#bsqTelefono option:selected").text();
        if (value === "Todas") {
            $("#reservas_tbl").bootstrapTable("filterBy", {});
        } else {
            $("#reservas_tbl").bootstrapTable("filterBy", {
                telefono_cliente: value,
            });
        }
    });

    $("#bsqCorreo").on("change", function () {
        $("#bsqClientes").val("0");
        $("#bsqTelefono").val("0");
        // $('#bsqCorreo').val('0');
        $("#bsqEmpresa").val("0");
        $("#bsqHotel").val("0");

        var value = $("#bsqCorreo option:selected").text();
        if (value === "Todas") {
            $("#reservas_tbl").bootstrapTable("filterBy", {});
        } else {
            $("#reservas_tbl").bootstrapTable("filterBy", {
                email_cliente: value,
            });
        }
    });

    $("#bsqEmpresa").on("change", function () {
        $("#bsqClientes").val("0");
        $("#bsqTelefono").val("0");
        $("#bsqCorreo").val("0");
        $("#bsqHotel").val("0");
        var value = $("#bsqEmpresa option:selected").text();
        if (value === "Todas") {
            $("#reservas_tbl").bootstrapTable("filterBy", {});
        } else {
            $("#reservas_tbl").bootstrapTable("filterBy", {
                nombre_empresa: value,
            });
        }
    });
    $("#bsqHotel").on("change", function () {
        $("#bsqClientes").val("0");
        $("#bsqTelefono").val("0");
        $("#bsqCorreo").val("0");
        $("#bsqEmpresa").val("0");
        var value = $("#bsqHotel option:selected").text();
        if (value === "Todas") {
            $("#reservas_tbl").bootstrapTable("filterBy", {});
        } else {
            $("#reservas_tbl").bootstrapTable("filterBy", {
                nombre_hotel: value,
            });
        }
    });

    const bsqClientes = new Choices("#bsqClientes", {
        removeItemButton: true,
        placeholderValue: "Seleccione el cliente",
    });

    const bsqTelefono = new Choices("#bsqTelefono", {
        removeItemButton: true,
        placeholderValue: "Seleccione el Telefono",
    });

    const bsqCorreo = new Choices("#bsqCorreo", {
        removeItemButton: true,
        placeholderValue: "Seleccione el correo",
    });

    const bsqEmpresa = new Choices("#bsqEmpresa", {
        removeItemButton: true,
        placeholderValue: "Seleccione la empresa",
    });
    const bsqHotel = new Choices("#bsqHotel", {
        removeItemButton: true,
        placeholderValue: "Seleccione el hotel",
    });
}

function tableInit() {
    let buttonsOrder = [];
    buttonsOrder.push("btnAdd");
    buttonsOrder.push("toggle");
    buttonsOrder.push("columns");
    buttonsOrder.push("refresh");

    $("#reservas_tbl").bootstrapTable("refreshOptions", {
        buttonsOrder: buttonsOrder,
        rowStyle: function (row, index) {
            var clases = "";

            if (
                row.testado === "Cancelada" ||
                row.testado === "No Show" ||
                row.testado === "Rechazada"
            ) {
                clases = "text-black-30"; // Cambia el color de las letras a color gris claro para filas con estado "Cancelado, No Show y Rechazada "
            }
            if(row.tipo == 'EVENTO' ){
                clases = clases+ " cls-evento ";
            }
            return {
                classes: clases,
            };
        },
    });
}

function miToolbar() {
    return (
        '<select id="miSelect" class="form-control">' +
        '<option value="">Todos</option>' +
        '<option value="25">25</option>' +
        '<option value="30">30</option>' +
        "</select>"
    );
}

function pax(valor, turno="") {
    let sucursal = 2;
    if (valor == 1) sucursal = $("#selSucursal").val();

    var estado = $("#estado_filter").val();
   
    const opcionesFetch2 = {
        method: "GET",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
    };
    fetch(
       
        base + "/reservar/pax_fecha/" + sucursal + "/" + $("#fecha").val() + "/" + turno +"?estado="+estado ,
        opcionesFetch2
    )
        .then((response) => response.json())
        .then(function (response) {
            if (response[0].sum == null || response[0].sum == "") {
                $("#total_pax").html(0);
            } else {
                $("#total_pax").html(response[0].sum);
            }
        });
    $("#reservas_tbl").bootstrapTable("refresh", {
        url:
            base +
            "/reservar/get_reservas_sucursal_fecha/" +
            sucursal +
            "/" +
            $("#fecha").val(),
    });
    
}

function horaFormatter(value, row, index) {
    let hora = row.hora_reserva;
    let newHora = hora.slice(0, -3);

    return newHora;
}

function obsFormatter(value, row, index) {
    var textObs = "--";
    var titleObs = "--";

    if (value) {
        textObs = value;

        if (value.length > 55) {
            var subcadena = value.substring(0, 55);
            textObs = subcadena + "....";
        }
        titleObs = value;
    }
    var data =
        '<span data-bs-toggle="tooltip" data-bs-placement="top" title="' +
        titleObs +
        '" >' +
        textObs +
        "</span>";

    return data;
}

function menuFormatter(value, row) {
    let url = null;
    let act = null;

    if (value == null) {
        return "";
        // return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">'
    } else if (value == "") {
        return "";
        // return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">'
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
            case "jpeg":
                act = 1;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png";
                break;
            default:
                act = null;
                url =
                    "https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/44def0c2452906e49a0fae35dcf02c8af9bf0864.png";
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
iconos();


$("#reservas_tbl").bootstrapTable({
    pagination: true,
    pageSize:1000,
});


// inicio_telefono("telefono");

// $("#telefono").on("change blur keyup click", function (e) {
//     if (validarTelefono($(this))) {
//         $("#err_telefono").html("");
//     } else {
//         $("#err_telefono").html(
//             "Formato del teléfono no válido (debe comenzar con +, no contener sino números después del + y tener una longitud de 11 caracteres) o teléfono vacio"
//         );
//     }
// });

function botonCFormatter(value, row, index) {
    var boton = "";
    if (row.estado != 4) {
        // 4 = Cancelada
        boton =
            /*html*/
            `
        <button type="button" class="btn btn-danger btn-sm cancelar-reserva" data-bs-target="#mdl-cancelar" data-bs-toggle="modal" onclick='cancelar(${row.id});' title="Cancelar Reserva">
            C
        </button>
        `;
    }
    return boton;
}

function botonNsFormatter(value, row, index) {
    var boton = "";

    if (row.estado != 7) {
        // 7 = No show
        boton =
            /*html*/
            `
        <button type="button" class="btn btn-primary btn-sm noshow-reserva" data-bs-target="#mdl-noshow" data-bs-toggle="modal" onclick='noshow(${row.id});' title="No Show">
            NS
        </button>
        `;
    }
    return boton;
}

function accionesFormatter(value, row) {

    var canCancelarReservas = $(".can-cancelar-reserva").length?"":'disabled';
    var canNoShowReservas = $(".can-no-show-reserva").length?"":'disabled';

    var disabled_ns = "";
    var disabled_c ="";

    if (row.estado == 9 || row.estado == 4 || row.estado == 7 || row.estado == 8) {
        disabled_ns ="disabled";
    }
    
    if (row.estado == 4 || row.estado == 7 || row.estado==8) {
        // 4 = Cancelada,  7 = No show, 8 = rechazada
        disabled_c ="disabled";
        // botonNs = "";
    }

    var botonC =
        /*html*/
        `<div class="mx-1">
        <button type="button" class="btn btn-danger btn-sm cancelar-reserva ${canCancelarReservas} ${disabled_c}" data-bs-target="#mdl-cancelar" data-bs-toggle="modal" onclick='cancelar(${row.id});' title="Cancelar Reserva">
            C
        </button>
    </div>`;

    var botonNs =
        /*html*/
        `<div class="mx-1">
        <button type="button" class="btn btn-primary btn-sm noshow-reserva ${canNoShowReservas}  ${disabled_ns}" data-bs-target="#mdl-noshow" data-bs-toggle="modal" onclick='noshow(${row.id});' title="No Show">
            NS
        </button>
    </div>
    `

    var botonHist  =
    /*html*/
    `<div class="mx-1">
        <button type="button" class="btn btn-warning btn-sm historial-reserva" data-bs-target="#mdl-historial" data-bs-toggle="modal" onclick='historial(${row.id});' title="Hisorial de reserva">
            <i class="fas fa-history"></i>
        </button>
    </div>`
    

    // if (row.estado == 7) { // 7 = No show
    //     botonNs = "";
    // }

    data =
        /*html*/
        `
    <div class="d-flex ">
        ${botonC}
        ${botonNs}
        ${botonHist}
    </div>
    `;
    return data;
}

function listarReservasFormatter(value, row, index) {
    let visible = [];

    var can_edit_reserva = $(".can-edit-reserva").length?"":'disabled';



    // if ($(".can-edit-reserva").length) {
    //     can_edit_reserva =
    //         /*html*/
    //         `<li>
    //         <a class="dropdown-item editar-reserva" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" onclick='editar(${row.id});'>Editar Reserva</a>
    //     </li> `;
    // }

    return [
        `
		<div class="dropdown">
			<a class="btn btn-link text-body shadow-none dropdown-toggle" href="#"
				role="button" data-bs-toggle="dropdown" aria-expanded="false">
				<i class="bx bx-dots-horizontal-rounded"></i>
			</a>
			<ul class="dropdown-menu dropdown-menu-end">                
                <li>
                <a class="dropdown-item editar-reserva ${can_edit_reserva}" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" onclick='editar(${row.id});'>Editar Reserva</a>
                </li>
				<li><a class="dropdown-item cancelar-reserva" data-bs-target="#mdl-cancelar" data-bs-toggle="modal" onclick='cancelar(${row.id});'>Cancelar Reserva</a></li>
				<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-noshow" data-bs-toggle="modal" onclick='noshow(this);'>No Show</a></li>
				<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-estado" data-bs-toggle="modal" onclick='estado(this);'>Cambiar Estado</a></li>
			</ul>
		</div>`,
    ];
}
$("#btn-cancelar_ns").on("click", function () {
    let clave = $("#clave_usuario_es").val();
    console.log(base + "/reservar/verificarclave");
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
                        pax(0);
                        $("#reservas_tbl").bootstrapTable("refresh");
                    });
            }
        });
});
$("[name='btnTurno']").on("change", function () {
    var turno = $("[name='btnTurno']:checked").val();
    pax(1,turno);
    $("#reservas_tbl").bootstrapTable("refresh", {
        url: base + "/reservar/get_turno_fecha/" + $("#fecha").val() + "/" + turno,
    });
});
$("#selSucursal").on("change", function () {
    pax(1);
});

function btnCrearReserva() {
    return {
        btnAdd: {
            class: "btn-success",
            text: "Crear Reserva",
            icon: "fas fa-plus-circle",
            event: function () {
                window.location.href = base + "/reservar/reservar";
            },
            attributes: {
                title: "Crear Reserva",
            },
        },
    };
}

function cancelar(res) {
    // let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
    $("#can_res").html("Cancelar Reserva ID: " + res);
}

function rechazo(res) {
    let id =
        res["parentElement"]["parentElement"]["parentElement"]["parentElement"][
            "parentElement"
        ]["children"][0]["textContent"];
    $("#rec_res").html("Cancelar Reserva ID: " + id);
}

function noshow(res) {
    // let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
    $("#nsh_res").html("No Show Reserva ID: " + res);
}

function estado(res) {
    let id =
        res["parentElement"]["parentElement"]["parentElement"]["parentElement"][
            "parentElement"
        ]["children"][0]["textContent"];
    $("#est_res").html("Cambio de estado Reserva ID: " + id);
}

function historial(id) {
   
    $("#historial_res").html("Historial de cambios reserva ID: " + id);
    $("#historial_tbl").bootstrapTable("refresh", {
        url: "/reservar/historial_cambio/" + id,
    });
}

function previoFormatter(value, row, index) {
    $resp = "";
    if (row.registro_previo != null && row.registro_previo != '') {
        let text = row.registro_previo;
        let link = "<a href='#'  title='"+text+"' class='delete text-dark' data-bs-toggle='modal' data-bs-target='#mdl-registro'>" + "<i class='fas fa-eye font-size-16'></i>" + "</a>";
        $resp = text.substring(0, 20) + "... ";
    }
    return $resp;
}

function actualFormatter(value, row, index) {
    $resp = "";
    if (row.registro_actual != null && row.registro_actual != '') {
        let text = row.registro_actual;
        let link = "<a href='#' onclick='registro(" + row.id + ")' title='Mostrar Registro Actual' class='delete text-dark' data-bs-toggle='modal' data-bs-target='#mdl-registro'>" + "<i class='fas fa-eye font-size-16'></i>" + "</a>";
        $resp = text.substring(0, 20) + "... ";
    }
    return $resp;
}

$("#ssalon").on("change", function () {
    const opcionesFetch = {
        method: "GET",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
    };
    let sal = $("#ssalon option:selected").val();
    if (sal !== "Seleccione") {
        fetch(base + "/reservas/salonesmesas/" + sal, opcionesFetch)
            .then((response) => response.json())
            .then(function (response) {
                $("#smesa").empty();
                $("#smesa").append(
                    '<option selected value="">Seleccione</option>'
                );
                if (response && response.length > 0) {
                    response.forEach(function (vector) {
                        $("#smesa").append( "<option value = " + vector.mesa_id + ">" + vector.mesa + "</option>" );
                    });
                }
            });
    }
});

function botonesFormatter(value, row) {

    var can_edit_reserva = $(".can-edit-reserva").length?"":'disabled';

    var data = "";

    var disabled_accep= "";
  
    if(row.estado != 9){
        var disabled_accep= "disabled";
    }

    var bAceptar =  /*html*/
    `
        <button type="button" class="btn btn-success btn-sm aceptar-reserva ${disabled_accep} me-1" data-bs-target="#mdl-aceptar" data-bs-toggle="modal" onclick='aceptar(${row.id});' title="Aceptar Reserva" >
        A
        </button>

    `    
    
    var ver =//html
        `
    <button type="button" class="btn btn-primary btn-sm mx-1" title="Ver Reserva" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" onclick="ver(${value})">
    Ver
    </button>
        ` 
    var edit = //html
        `
    <button type="button" class="btn btn-warning btn-sm mx-1 ${can_edit_reserva}" title="Editar Reserva" data-tipo_reserva="${row.tipo_reserva}" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" onclick="editar(${value})">
        Editar
    </button>
    `

    data =//html
        `
    <div class="d-inline-flex">
        ${edit}     
        ${ver}   
        ${bAceptar} 
    </div>
    `;
    return data;
}
function editarFormatter(value, row) {
    var data = value;

    if ($(".can-edit-reserva").length) {
        data =
            //html
            `
        <button type="button" class="btn btn-warning btn-sm" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" onclick="editar(${value})">
            Editar
        </button>
        `;
    }
    return data;
}

function verFormatter(value, row) {
    var data = value;

    // if($('.can-edit-reserva').length){
    data =
        //html
        `
        <button type="button" class="btn btn-success btn-sm" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" onclick="ver(${value})">
            Ver
        </button>
        `;
    // }
    return data;
}

function editar(id) {
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
            console.log(response[0]);

            if( response[0].estado==8){
                $('.view-rechazado').removeClass('d-none');
                $("#testado").val(response[0].testado);
                $("#fecha_rechazo").val( fechaFormatter2(response[0].fecha_rechazo));
                $("#razon_rechazo").val(response[0].razon_rechazo);
            }else{
                $('.view-rechazado').addClass('d-none');
            }

            $("#fecha_reserva").val(response[0].fecha_reserva);
            $("#hora_reserva").val(response[0].hora_reserva);
            $("#pasajeros").val(response[0].cantidad_pasajeros);
            $("#tipo").val(response[0].tipo_reserva);
            panel(response[0].tipo);
            $("#tipo_reserva").val(response[0].tipo_reserva);
            $("#cliente").val(response[0].nombre_cliente);
            $("#empresa").val(response[0].nombre_empresa);
            $("#hotel").val(response[0].nombre_hotel);
            $("#telefono").val(response[0].telefono_cliente);
            $("#correo").val(response[0].email_cliente);
            $("#ssucursal").val(response[0].sucursal);
            sucursal(response[0].sucursal, response[0].salon, response[0].mesa);
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
            if (
                response[0].tipo == "EVENTO" ||
                response[0].tipo == "PRERESERVA"
            ) {
                $("#pax").val($("#pasajeros").val());
                $("#panel_eventos").css("visibility", "visible");
            } else {
                $("#panel_eventos").css("visibility", "hidden");
            }
            ocultar_loader();
        },
    });
    ocultar_loader();
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

            if( response[0].estado==8){
                $('.view-rechazado').removeClass('d-none');
                $("#testado").val(response[0].testado);
                $("#fecha_rechazo").val( fechaFormatter2(response[0].fecha_rechazo));
                $("#razon_rechazo").val(response[0].razon_rechazo);
            }else{
                $('.view-rechazado').addClass('d-none');
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
    if (tipo == "EVENTO" || tipo == "PRERESERVA") {
        $("#pax").val($("#pasajeros").val());
        $("#panel_eventos").css("visibility", "visible");
    } else {
        $("#panel_eventos").css("visibility", "hidden");
    }
}

function sucursal(suc, salon, mesa) {
    console.log(suc, salon, mesa);

    const opcionesFetch = {
        method: "GET",
        headers: {
            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
            "Content-Type": "application/json",
        },
    };
    fetch(base + "/reservas/salonessucursales/" + suc, opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            $("#ssalon").empty();
            $("#ssalon").append(
                '<option selected value="">Seleccione</option>'
            );
            $("#smesa").empty();
            $("#smesa").append('<option selected value="">Seleccione</option>');
            response.forEach(function (vector) {
                let sseleccionado = vector.id == salon ? " selected " : "";
                $("#ssalon").append( "<option value = " + vector.id + sseleccionado + ">" + vector.salon + "</option>" );
            });
        });
    let sal = salon ? salon : $("#ssalon option:selected").val();
    console.log(sal);
    if (sal > 1) {
        fetch(base + "/reservas/salonesmesas/" + sal, opcionesFetch)
            .then((response) => response.json())
            .then(function (response) {
                // $("#smesa").empty();

                if (response && response.length > 0) {
                    response.forEach(function (vector) {
                        let mseleccionado = vector.mesa_id == mesa ? " selected " : "";
                        $("#smesa").append( "<option value = " + vector.mesa_id + " " + mseleccionado + " >" + vector.mesa + "</option>" );
                    });
                }
            });
    }
}

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

$("#mdl-vreserva").on("hide.bs.modal", function (e) {
    $("#clave").val("");

    $('.view-rechazado').addClass('d-none');
    
});


$("#btn_reerva").on("click", function () {
    mostrar_loader();
    let valido = validar();
    if (valido) {
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
                                let telefono = $("#telefono").val().trim();
                                let email = $("#correo").val().trim();

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
                                        telefono: telefono,
                                        email: email
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
                                                (tipo = $( "#tipo option:selected" ).val() != "Seleccione" ? $( "#tipo option:selected" ).val() : 0),
                                                (cliente = $("#cliente").val()),
                                                (empresa = $("#empresa").val()),
                                                (hotel = $("#hotel").val()),
                                                (telefono = $("#telefono").val()),
                                                (correo = $("#correo").val()),
                                            ];
                                            const opcionesFetch1 = {
                                                method: "POST",
                                                headers: {
                                                    "X-CSRF-Token": $( 'meta[name="_token"]' ).attr("content"), "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    data: data,
                                                }),
                                            };
                                            fetch(
                                                base + "/clientes/clientemin",
                                                opcionesFetch1
                                            )
                                                .then((response) =>
                                                    response.json()
                                                )
                                                .then(function (response) {
                                                    if ( response[0]["status"] == 1 ) {
                                                        toastr.clear();
                                                        toastr.success( "reserva actualizada" );
                                                        actualizar();
                                                        actualizar_reserva();
                                                    } else {
                                                        toastr.clear();
                                                        let error = "";
                                                        if ( response[0][ "error" ].indexOf( "clientes_tipo_id_foreign" ) > -1 ) {
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
                                            toastr.success( "RESERVA ACTUALIZADA" );
                                        }
                                    });
                            }
                        });
                }
                /////////////////////
            });
    } else {
        Swal.fire({
            title: "¡Tiene campos obligatorios por completar!",
            text: "Todos los campos maracados con un * son obligatorios, debe proporcionar la información solicitada",
            icon: "error",
            confirmButtonColor: "#f34e4e",
            confirmButtonText: "Regresar",
        });
    }
    ocultar_loader();
});
$("#ssucursal").on("change", function () {
    sucursal(1);
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
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_2") {
                    if (response.data.archivo_1 == "") {
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_3") {
                    if (response.data.archivo_1 == "") {
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_4") {
                    if (response.data.archivo_1 == "") {
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "archivo_5") {
                    if (response.data.archivo_1 == "") {
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                } else if (archivo == "evento_logo") {
                    if (response.data.archivo_1 == "") {
                        toastr.success( "Se ha eliminado el archivo " + id_name + " exitosamente" );
                        $("#reservas_tbl").bootstrapTable("refresh");
                    }
                }

                $("#lbl-f" + id_name).html("");
                $("#lnk_" + id_name).html("");
            }
        },
    });
}

function actualizar_reserva() {

    

    const id = parseInt( $("#id_reserva").html().substring($("#id_reserva").html().indexOf("ID: ") + 4) .trim() );
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

    formData.append( "evento_nombre_adicional", $("#nombre_adicional").val().trim() );
    formData.append("evento_pax", $("#pax").val());
    formData.append( "evento_nombre_contacto", $("#nombre_contacto").val().trim() );
    formData.append( "evento_telefono_contacto", $("#telefono_contacto").val().trim() ); 
    formData.append( "evento_correo_contacto", $("#correo_contacto").val().trim() );
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
    formData.append( "evento_mesa_soporte_adicional", evento_mesa_soporte_adicional );
    formData.append("evento_ubicacion", evento_ubicacion);

    formData.append("evento_menu_impreso", evento_menu_impreso);
    formData.append("evento_table_tent", evento_table_tent);
    formData.append( "evento_restriccion_alimenticia", evento_restriccion_alimenticia );
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
                $("#clave").val("");
                $("#panel_eventos").css("visibility", "hidden");
                Swal.fire({
                    title: "La reserva ha sido actualizada exitosamente",
                    text: "",
                    icon: "success",
                    confirmButtonColor: "#51d28c",
                    confirmButtonText: "Continuar",
                }).then(function (result) {
                    $("#mdl-vreserva").modal("toggle");
                    pax(0);
                    $("#reservas_tbl").bootstrapTable("refresh");
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
                $("#listaClientes").append( '<option value="' + vector.nombre + '">' );
            });
        });

    fetch(base + "/clientes/clientesempresas", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            $("#listaEmpresas").empty();
            response.forEach(function (vector) {
                $("#listaEmpresas").append( '<option value="' + vector.empresa + '">' );
            });
        });

    fetch(base + "/clientes/clienteshoteles", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            $("#listaHoteles").empty();
            response.forEach(function (vector) {
                $("#listaHoteles").append( '<option value="' + vector.hotel + '">' );
            });
        });

    fetch(base + "/clientes/clientestelefonos")
        .then((response) => response.json())
        .then(function (response) {
            $("#listaTelefonos").empty();
            response.forEach(function (vector) {
                $("#listaTelefonos").append( '<option value="' + vector.telefono + '">' );
            });
        });

    fetch(base + "/clientes/clientescorreos", opcionesFetch)
        .then((response) => response.json())
        .then(function (response) {
            $("#listaCorreos").empty();
            response.forEach(function (vector) {
                $("#listaCorreos").append( '<option value="' + vector.email + '">' );
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
$(".archivos").on("click", function (e) {
    e.preventDefault();
    let url = $(this).html().substr(9, $("#lnk_menu1").html().indexOf("<img") - 11);
    $("#mdl-documento iframe").attr("src", url);
    $("#mdl-documento").modal("show");
});


$('#tipo_reserva').on('change',function() {	
	if ($("#tipo_reserva option:selected").text()=='EVENTO' || $("#tipo_reserva option:selected").text()=='PRERESERVA' ) {
		$("#pax").val($("#pasajeros").val());
		$("#panel_eventos").css("visibility", "visible");

	} else {
		$("#panel_eventos").css("visibility", "hidden");
	}
});

//********************** MODULO PARA CREAR RESERVA  **********************/

$('.destacado').on('click', function () {
    mostrarCrearReserva();
});

function crearReservaInicio(){
    var fragmento = window.location.hash;    
    if(fragmento=="#mdl-crear-vreserva"){        
        mostrarCrearReserva();
    }    
}

function mostrarCrearReserva(){
    //$('#frm_crear_reservas')[0].reset();
    $('#mdl-crear-vreserva').modal('show');
}

$("#ncliente, #cons_res, #cons_cli").on("keyup blur change click",function(e) {
	if ($(this).val().trim()==='' && $(this).attr('id') === 'cliente') {
		$(".hist_cli").hide();
	} else {
		$(".hist_cli").show();
	}
	if (e.type === 'blur' || e.type==='change') {
		let cliente=$(this).val().trim();
		const opcionesFetch = {
			method: 'POST',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({  cliente:cliente })
		}
		fetch(base+'/reservas/cliente',opcionesFetch)
		.then(response => response.json())
		.then(function(response) {
			$('#cli_reservas_tbl').bootstrapTable('load', response['reservas_cliente']);
			$('#modal-title-res_cliente').html('Historial reservas '+$('#cliente').val().toUpperCase()+" - Cantidad de No Show últimos 6 meses: "+response['cliente_noshow']);
			$("#noshow_cliente").html(response['cliente_noshow']);
			$("#id_cli").html(response['cliente'][0].id);
			$("#crut").val(response['cliente'][0].rut);
			$("#cnombre").val(response['cliente'][0].nombre);
			$("#cfecha_nacimiento").val(response['cliente'][0].fecha_nacimiento);
			$("#ctelefono").val(response['cliente'][0].telefono);

			$("#ntelefono").val(response['cliente'][0].telefono);
			$("#ncorreo").val(response['cliente'][0].email);
			
			$("#cemail").val(response['cliente'][0].email);
			$("#ccomuna").val(response['cliente'][0].comuna_id);
			$("#cdireccion").val(response['cliente'][0].direccion);
			$("#ccategoria").val(response['cliente'][0].categoria_id);
			$("#ctipo").val(response['cliente'][0].tipo_id);
			$("#cempresa").val(response['cliente'][0].empresa);
			$("#chotel").val(response['cliente'][0].hotel);
			$("#creferencia").val(response['cliente'][0].referencia);
			$("#cvino1").val(response['cliente'][0].vino_favorito1);
			$("#cvino2").val(response['cliente'][0].vino_favorito2);
			$("#cvino3").val(response['cliente'][0].vino_favorito3);
		});
	}
});


function aceptar(id) {

    $("#accep_res").html("Aceptar Reserva ID: " + id);
}


$("#btn-aceptar").on("click",function() {    
	guardar_validado_aceptar();
});

function guardar_validado_aceptar(){
    
    let clave = $("#clave_usuario-accep").val()
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
           
            let id = $("#accep_res").html().substring($("#accep_res").html().indexOf(": ")+2).trim();

            const opcionesFetch1 = {
                method: 'PUT',
                headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
                body: JSON.stringify({  id:id })
            }
            fetch(base+'/reservar/aceptar',opcionesFetch1)
            .then(response => response.json())
            .then(function(response) {
                // console.log(response);
                $("#clave_usuario-accep").val('');                
                $("#btn-cerrar_accep").trigger("click");

                if(response[0].status==1){

                    toastr.success("La reserva fue aceptada exitosamente");
                    // $('#reservas_tbl').bootstrapTable('refresh');
                    // filtrar();
                    pax(1);

                }else{
                    toastr.error(response[0].error);
                }
            });
            
        }

    });
    
}

function fechaCambioFormatter(value, row){
	let date = "-";	

    if(row.estado_previo){       

        if(row.fecha_cambio){
            date = moment(row.fecha_cambio, 'YYYY-MM-DD H:m:s').format('DD/MM/YYYY H:m')
        }        
    }
    
	return date;
}


