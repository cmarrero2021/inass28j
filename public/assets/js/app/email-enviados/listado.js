$(document).ready(function () {

    tableInit();

    changeForm();


});

function tableInit() {



    var table = "email_enviados_tbl";
    let buttonsOrder = [];
    buttonsOrder.push('btnAdd');
    buttonsOrder.push('toggle');
    buttonsOrder.push('columns');
    buttonsOrder.push('refresh');

    var fecha_start = $('#startDate').val();
    var fecha_end = $('#endDate').val();

    var email = $('#email').val();
    var event= $('#event').val();

    var filter = "?";

    if(fecha_start!="" && fecha_end!="" ){
        filter += "startDate="+fecha_start+"&";
        filter += "endDate="+fecha_end+"&";
    }

    if(email!=""){
        filter += "email="+email+"&";
    }

    if(event!=""){
        filter += "event="+event+"&";
    }


    $('#email_enviados_tbl').bootstrapTable('refreshOptions', {
        buttonsOrder: buttonsOrder,
        url: base + "/email_enviado_list"+filter
    })
    $("[name='btnAdd']").removeClass("btn-secondary");
    $("[name='btnAdd']").addClass("btn-success");
    // $(".edit-control").hide();
    // $("#agr_categoria").hide();
}

function changeForm() {

    $('#startDate').on('change', function () {
        tableInit();
    });
    $('#endDate').on('change', function () {
        tableInit();
    });
    $('#email').on('change', function () {
        tableInit();
    });
    $('#event').on('change', function () {
        tableInit();
    });

}

iconos();
