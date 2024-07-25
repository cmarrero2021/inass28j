$(document).ready(function () {
    const opcionesFetch0 = {
        method: 'GET',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
            'Content-Type': 'application/json'
        },

    }
    fetch(base + '/giftcard/listar_mesoneros', opcionesFetch0)
        .then(response => response.json())
        .then(function (response) {
            $("#cmesonero").empty();
            $('#cmesonero').append('<option value="" disabled selected>Seleccione</option>')
            response.forEach(function (vector) {
                $('#cmesonero').append('<option value="' + vector.id + '">' + vector.mesonero + '</option>')
            });
        });

    listMesas();
});

$('#mdl-canjear').on('shown.bs.modal', function () {
    $("#clave_canjear").val(' ');
    // $('#cmesonerotext').val("");
    $("#tit_canjear").html("CANJEAR GIFTCARD ID " + $("#id_giftcard").html());
    $("#btn-canjear").addClass('btn-success');
    $("#btn-anular").addClass('btn-danger');
    $("#btn-canjear").removeClass('btn-secondary');
    $("#btn-anular").removeClass('btn-secondary');
    $("#btn-canjear").attr('disabled', false);
    $("#btn-anular").attr('disabled', false);
});
$('#mdl-canjear').on('hide.bs.modal', function () {
    $("#clave_canjear").val(' ');
    // $('#cmesonerotext').val("");
    $("#tit_canjear").html("");
    $("#btn-canjear").addClass('btn-success');
    $("#btn-anular").addClass('btn-danger');
    $("#btn-canjear").removeClass('btn-secondary');
    $("#btn-anular").removeClass('btn-secondary');
    $("#btn-canjear").attr('disabled', false);
    $("#btn-anular").attr('disabled', false);

});
$('#mdl-anular').on('shown.bs.modal', function () {
    $("#clave_anular").val(' ');
    $("#motivo_anulacion").val('');
    $("#tit_anular").html("ANULAR GIFTCARD ID " + $("#id_anular").html());
    $("#btn-canjear").addClass('btn-success');
    $("#btn-anular").addClass('btn-danger');
    $("#btn-canjear").removeClass('btn-secondary');
    $("#btn-anular").removeClass('btn-secondary');
    $("#btn-canjear").attr('disabled', false);
    $("#btn-anular").attr('disabled', false);
});
$('#mdl-anular').on('hide.bs.modal', function () {
    $("#clave_anular").val(' ');
    $("#motivo_anulacion").val('');
    $("#tit_anular").html("");
    $("#btn-canjear").addClass('btn-success');
    $("#btn-anular").addClass('btn-danger');
    $("#btn-canjear").removeClass('btn-secondary');
    $("#btn-anular").removeClass('btn-secondary');
    $("#btn-canjear").attr('disabled', false);
    $("#btn-anular").attr('disabled', false);

});

$("#otro_canjear_giftcard").on('click', function () {

    let id_giftcard = $("#id_giftcard").html();
    const formData =  new FormData();

    formData.append('id', id_giftcard)
    $.ajax({
        type: "POST",
        headers: { 'X-CSRF-Token': $('meta[name="_token"]').attr('content') },
        url: base + '/giftcard/canjear_giftcard',
        data: formData,
        data: formData,
        processData: false,
        contentType: false,

        success: function (response) {
            console.log(response)
        }
    });

});

$("#btn_canjear_giftcard").on('click', function () {




    // let clave = $("#clave_canjear").val().trim();
    // const opcionesFetch0 = {
    //     method: 'POST',
    //     headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
    //     body: JSON.stringify({  clave:clave })
    // }
    // fetch(base+'/reservar/verificarclave',opcionesFetch0)
    // .then(response => response.json())
    // .then(function(response) {
    //     if (response[0].respuesta == 0) {
    //         Swal.fire({
    //             title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
    //             text: "Verifíquela y vuelva a intentar",
    //             icon: "error",
    //             confirmButtonColor: "#f34e4e",
    //             confirmButtonText: "Cerrar",
    //         });

    //     } else {
    //         let id_giftcard = $("#id_giftacrd").html();
    //         let mesonero_id = $("#cmesonero option:selected").val();
    //         if (mesonero_id=='') {
    //             Swal.fire({
    //                 title: "DEBE INDICAR EL CAMARERO",
    //                 text: "El camarero que realiza el canje es un campo obligatorio y debe ser indicado",
    //                 icon: "error",
    //                 confirmButtonColor: "#f34e4e",
    //                 confirmButtonText: "Cerrar",
    //             });
    //         } else {
    //             // toastr.success('pasó');
    //             // Anteriormente si la clave estaba correcta se colocalba aqui la logica
    //         }
    //     }

    // let mesonero_id = $("#cmesonero option:selected").val();
    // let mesonero = $('#cmesonerotext').val();
    // if (mesonero=='') {
    //     Swal.fire({
    //         title: "DEBE INDICAR EL CAMARERO",
    //         text: "El camarero que realiza el canje es un campo obligatorio y debe ser indicado",
    //         icon: "error",
    //         confirmButtonColor: "#f34e4e",
    //         confirmButtonText: "Cerrar",
    //     });

    // }else{


        Swal.fire({
            title: "¿Está seguro que desea canjear la gifcard?",
        text: "Una vez realizada esta acción, la misma no podrá ser revertida",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#51d28c",
        cancelButtonColor: "#f34e4e",
        confirmButtonText: "Canjear",
        cancelButtonText: "Cancelar"
    }).then(function (result) {

        if (result.value) {


            const formData = new FormData();

            let id_giftcard = $("#id_giftcard").html();
            // const formData = new FormData();

            const adjunto = $('input[name="adjunto"]')[0].files[0];
            const n_cuenta = $("#n_cuenta").val();
            const mesa_id = $("#mesa_id").val();

            formData.append('id', id_giftcard);
            formData.append('mesa_id', mesa_id);
            formData.append('n_cuenta', n_cuenta);
            formData.append('adjunto', adjunto);


            // $.ajax({
            //     type: "put",
            //     headers: { 'X-CSRF-Token': $('meta[name="_token"]').attr('content'), },
            //     url: base + '/giftcard/canjear_giftcard',
            //     data: formData,
            //     contentType: false,
            //     processData: false,
            //     // dataType: "JSON",
            //     success: function (response) {
            //         console.log(response)
            //     }
            // });

            const opcionesFetch = {
                method: 'POST',
                headers: {
                    'X-CSRF-Token': $('meta[name="_token"]').attr('content')
                },
                body: formData,
            }

            fetch(base + '/giftcard/canjear_giftcard', opcionesFetch)
            .then(response => response.json())
            .then(function (response) {
                    console.log(response)
                    if (response[0].status == 1) {

                        if (response[0].data.estado_id == 2) {
                            $('.estado-header-f').removeClass('bg-success');
                            $('.estado-header-f').addClass('bg-primary');
                            $('.text-estado-f').html(response[0].data.estado.estado)
                        }
                        $("#btn_cerrar_canje").trigger('click');
                        $("#estado").html('USADA');
                        $("#btn-canjear").removeClass('btn-success');
                        $("#btn-anular").removeClass('btn-danger');
                        $("#btn-canjear").addClass('btn-secondary');
                        $("#btn-anular").addClass('btn-secondary');
                        $("#btn-canjear").attr('disabled', true);
                        $("#btn-anular").attr('disabled', true);
                        toastr.success('La giftcard se ha canjeado satisfactoriamente')

                    } else {
                        Swal.fire({
                            title: "HA OCURRIDO UN ERROR",
                            text: "Ha ocurrido un error y no se ha podido canjear la giftcard",
                            icon: "error",
                            confirmButtonColor: "#f34e4e",
                            confirmButtonText: "Cerrar",
                        });
                        toastr.error(response[0].error);
                    }
                });

        }
    });
})




$("#btn_anular_giftcard").on('click', function () {
    let clave = $("#clave_anular").val().trim();
    const opcionesFetch0 = {
        method: 'POST',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clave: clave
        })
    }
    fetch(base + '/reservar/verificarclave', opcionesFetch0)
        .then(response => response.json())
        .then(function (response) {
            if (response[0].respuesta == 0) {
                Swal.fire({
                    title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
                    text: "Verifíquela y vuelva a intentar",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Cerrar",
                });

            } else {
                let id_giftcard = $("#id_anular").html();
                let motivo_anulacion = $("#motivo_anulacion").val().trim();
                if (motivo_anulacion.lenth === 0) {
                    Swal.fire({
                        title: "DEBE INDICAR EL MOTIVO",
                        text: "El motivo de la anulación es un campo obligatorio y debe ser proporcionado",
                        icon: "error",
                        confirmButtonColor: "#f34e4e",
                        confirmButtonText: "Cerrar",
                    });
                } else {
                    const opcionesFetch = {
                        method: 'PUT',
                        headers: {
                            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: id_giftcard,
                            motivo_anulacion: motivo_anulacion
                        })
                    }
                    fetch(base + '/giftcard/anular_giftcard', opcionesFetch)
                        .then(response => response.json())
                        .then(function (response) {
                            if (response[0].status == 1) {
                                $("#btn_cerrar_anulacion").trigger('click');
                                $("#estado").html('ANULADA');
                                $("#btn-canjear").removeClass('btn-success');
                                $("#btn-anular").removeClass('btn-danger');
                                $("#btn-canjear").addClass('btn-secondary');
                                $("#btn-anular").addClass('btn-secondary');
                                $("#btn-canjear").attr('disabled', true);
                                $("#btn-anular").attr('disabled', true);
                                toastr.success('La giftcard se ha anulado satisfactoriamente')
                            } else {
                                Swal.fire({
                                    title: "HA OCURRIDO UN ERROR",
                                    text: "Ha ocurrido un error y no se ha podido anular la giftcard",
                                    icon: "error",
                                    confirmButtonColor: "#f34e4e",
                                    confirmButtonText: "Cerrar",
                                });
                                toastr.error(response[0].error);
                            }
                        });
                }
            }

        });
})
