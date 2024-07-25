

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