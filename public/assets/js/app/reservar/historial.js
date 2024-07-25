$(document).ready(function() {
	$('#historial_tbl').on('click-row.bs.table', function (e, row, $element) {
		let estado_previo = JSON.parse(row.vregistro_previo);
		let estado_actual = JSON.parse(row.vregistro_actual);
		$.each(estado_actual,function(k,v) {
			if ( k=='fecha_reserva') {
				$("#"+k+"_act").html(moment(v,'YYYY-MM-DD').format('DD/MM/YYYY'));

			}
            else if (k=='hora_reserva'){
                $("#"+k+"_act").html(moment(v,'HH:mm:ss').format('HH:mm'));
            }
            else {

				$("#"+k+"_act").html(v);
			}
		})
		$.each(estado_previo,function(k,v) {
			if ( k=='fecha_reserva') {
				$("#"+k+"_prv").html(moment(v,'YYYY-MM-DD').format('DD/MM/YYYY'));

			}
            else if (k=='hora_reserva'){
                $("#"+k+"_prv").html(moment(v,'HH:mm:ss').format('HH:mm'));
            } else {

				$("#"+k+"_prv").html(v);
			}
		})
		$.each(estado_previo, function(propiedad, valor_previo) {
			var valor_actual = estado_actual[propiedad];
			if(valor_previo !== valor_actual) {
				$("#"+propiedad+"_act,#"+propiedad+"_prv").addClass("resaltado1");
			} else {
				$("#"+propiedad+"_act,#"+propiedad+"_prv").removeClass("resaltado1");
			}
		});
	});
});
iconos()
function rollback(fila) {
	id = [fila];


    Swal.fire({
        title: "¿Está seguro de ejecutar el rollback?",
        text: "Una vez realizada esta acción, la misma no podrá ser revertida",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#51d28c",
        cancelButtonColor: "#f34e4e",
        confirmButtonText: "Rollback",
        cancelButtonText: "Cancelar"
    }).then(function (result) {

        if (result.value) {

            const opcionesFetch0 = {
                method: 'GET',
                headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
            }
            fetch(base+'/reservar/rollback/'+id,opcionesFetch0)
            .then(response => response.json())
            .then(function(response) {
                console.log(response)
                if (response[0].resultado == 202) {
                    $('#historial_tbl').bootstrapTable('refresh');
                    Swal.fire({
                        title: "!EL ROLLBACK HA SIDO EXITOSO!",
                        text: "Se ha restituido la reserva al estado previo seleccionado",
                        icon: "success",
                        confirmButtonColor: "#33cc33",
                        confirmButtonText: "Cerrar",
                    });
                    toastr.success("Se ha realizado el rollback exitosamente");

                } else {
                    Swal.fire({
                        title: "HA OCURRIDO UN ERROR",
                        text: "Ha ocurrido un error y no se ha podido restituir al estado anterior. El error es: "+response[0].error,
                        icon: "error",
                        confirmButtonColor: "#f34e4e",
                        confirmButtonText: "Cerrar",
                    });
                    toastr.error("Ha ocurrido el error: "+response[0].error);

                }
            });
        }
    })
}
function listarHistorialFormatter(value, row, index) { 

    var can_rollback="disabled";

    if($(".can-rollback-historial").length){
		can_rollback ="";
	}

    var button = /*html*/
    `   <button class="btn btn-danger btn-sm rollback-btn"  ${can_rollback} title="Hacer rollback a la versión previa de este cambio" onclick='rollback(${row.id})'><i class="fas fa-undo-alt"></i></button> `  
    
    return button;	

	
}

function horaFormatter(value,row,index){
    var valor="";
    if(value){
        valor = value.slice(0, -3);
    }
    return valor;
}

	// const opcionesFetch0 = {
	// 	method: 'GET',
	// 	headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	// }
	// fetch(base+'/reservar/rollback/'+id,opcionesFetch0)
	// .then(response => response.json())
	// .then(function(response) {
	// 	console.log(response)
	// 	if (response[0].resultado == 202) {
	// 		$('#historial_tbl').bootstrapTable('refresh');
	// 		Swal.fire({
	// 			title: "!EL ROLLBACK HA SIDO EXITOSO!",
	// 			text: "Se ha restituido la reserva al estado previo seleccionado",
	// 			icon: "success",
	// 			confirmButtonColor: "#33cc33",
	// 			confirmButtonText: "Cerrar",
	// 		});
	// 		toastr.success("Se ha realizado el rollback exitosamente");

	// 	} else {
	// 		Swal.fire({
	// 			title: "HA OCURRIDO UN ERROR",
	// 			text: "Ha ocurrido un error y no se ha podido restituir al estado anterior. El error es: "+response[0].error,
	// 			icon: "error",
	// 			confirmButtonColor: "#f34e4e",
	// 			confirmButtonText: "Cerrar",
	// 		});
	// 		toastr.error("Ha ocurrido el error: "+response[0].error);

	// 	}
	// });


