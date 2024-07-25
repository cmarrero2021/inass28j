$(function() {
    
});



iconos();

function formatterAcciones(value, row, index) {
  
    var verGift = /*html*/
    `   <div class="my-1">
            <button class="btn btn-primary btn-sm ver-gift" data-bs-toggle="modal" data-bs-target="#ver-gift-modal" title="Ver Gitcard Asociadas" id="ver-gifcard${row.id}" data-id="${row.id}" data-session_id="${row.session_id}" >
                <i class="fas fa-eye"></i>
            </button>
        </div>
    `   

    var valores = /*html*/
    `
        <div class="d-flex justify-content-center align-items-center">
            ${verGift}
        </div>
    `
    return valores;
}

$('#pagos_gift_tbl').on('click', '.ver-gift', function () { 
    
    $('#pago_gif_id').html($(this).data('id'));

    $('#tablaBeneficiarios tbody').html("");

    buscarGiftcars($(this).data('session_id'));

    
});

function buscarGiftcars(session_id){

var urlgift = base + "/giftcard/giftcard_check/";

    $.ajax({
        type: "GET",
        url: base+ "/giftcard/buscar_giftcards/"+session_id,  
        dataType: "JSON",
        success: function (response) {
            console.log(response)
            var html ="";

            response.forEach(e => {
                html+= /*html*/
                ` <tr> 
                    <td>${e.beneficiario}</td>
                    <td>${e.email}</td>
                    <td>${e.format_monto}</td>
                    <td> <a href="${urlgift + e.codigo}" class="btn btn-sm btn-success" target="_blank"> Ver QR</a> </td>
                </tr>
                ` 
            });

            $('#tablaBeneficiarios tbody').html(html);            
        }
    });

}
