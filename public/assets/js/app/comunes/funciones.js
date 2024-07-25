function formatMoney(value) {
    value = Number(value);
    var num = '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return num;
}

function digits(string, d = "") {
    var out = '';
    var filtro = '1234567890' + d;
    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    return out;
}

function formatDineroEs(value){

    var num = value.replace(/\./g, "");
    if (!isNaN(num)) {
        num = num .toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g, "$1.");
        num = num.split("").reverse().join("").replace(/^[\.]/, "");
        // $(this).val(num);
        return num;
    } else {

        return value.replace(/[^\d\.]*/g, "");

        // $(this).val($(this).val() .replace(/[^\d\.]*/g, "") );
    }
}


function validarRut(rut) {
    rut = rut.replace(/\./g, '').replace(/\-/g, '');
    let numero = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    if (dv == 'K') {
        dv = 10;
    }
    let suma = 0;
    let factor = 2;
    for (let i = numero.length - 1; i >= 0; i--) {
        suma += factor * parseInt(numero.charAt(i));
        factor = factor == 7 ? 2 : factor + 1;
    }
    let dvEsperado = 11 - (suma % 11);
    if (dvEsperado == dv) {
        return true;
    } else {
        return false;
    }
}

function validarCorreo(correo) {
    let patronCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    return patronCorreo.test(correo);
}

function validarTelefono(ctl_telefono) {
    let telefono = ctl_telefono.val();
    if (telefono.length > 13) {
        $(ctl_telefono).val(telefono.substr(0, 13));
    }
    telefono = telefono.replace(/[^0-9+\s() ]/g, '')
    telefono = telefono.replace(/ /g, "");
    let patronTelefono = /\+([0-9]{3})([0-9]{4})([0-9]{4})/;
    return patronTelefono.test(telefono);
}

function validar() {
    let valido = true;
    $(".req").each(function () {
        let id = null;
        switch ($(this)[0]["tagName"]) {
            case 'INPUT':
                id = $(this)[0]["id"];
                if ($("#" + id).val().length == 0 && $("#" + id).is(':visible')) {
                    valido = false;
                    $("#err_" + id).html("Campo obligatorio");
                }else{
                    $("#err_" + id).html("");
                }
                break;
            case 'SELECT':
                id = $(this)[0]["id"];
                if ($("#" + id + " option:selected").val() == "Seleccione" || $("#" + id + " option:selected").val() == undefined) {
                    valido = false;
                    $("#err_" + id).html("Campo obligatorio");
                }else{
                    $("#err_" + id).html("");
                }
                break;
        }
    });

    

    return valido;
}

function inicio_telefono(control) {
    let campoInput = $('#' + control);
    campoInput.val('+' + campoInput.val());
    campoInput.on('input', function () {
        let valor = campoInput.val().trim();
        if (!valor.startsWith('+')) {
            campoInput.val('+' + valor);
        }
    });
}

function solo_numero(control) {
    $('#' + control).on('keypress', function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    });
}

const opcionesFetchFuncion = {
    method: 'GET',
    headers: {
        'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
        'Content-Type': 'application/json'
    },
}

function listSucursales(seleccionado = "") {
    fetch(base + '/reservas/reservassucursales', opcionesFetchFuncion)
        .then(response => response.json())
        .then(function (response) {
            var option = '<option value="">Seleccione</option>';
            response.forEach(function (vector) {
                s = vector.id == seleccionado ? 'selected' : '';
                option += "<option value='" + vector.id + "' " + s + " >" + vector.sucursal + "</option>";
            });

            $("#ssucursal").html(option);
            $(".list-sucursales").html(option);
        });
}
function listSucursalesFiltro(seleccionado = "") {

    fetch(base + '/reservas/reservassucursales', opcionesFetchFuncion)
    .then(response => response.json())
    .then(function (response) {

        var option = '<option value=""></option>';
        // var option = '';
        response.forEach(function (vector) {
            s = vector.id == seleccionado ? 'selected' : '';
            option += "<option value='" + vector.id + "' " + s + " >" + vector.sucursal + "</option>";
            });
        $("#sel_sucursal").html(option);        
    });

}

function listSalones(seleccionado = "", suc = "") {

    if (suc != "") {
        fetch(base + '/reservas/salonessucursales/' + suc, opcionesFetchFuncion)
            .then(response => response.json())
            .then(function (response) {
                var option = '<option value="">Seleccione</option>';
                response.forEach(function (vector) {
                    var s = vector.id == seleccionado ? 'selected' : '';
                    option += "<option value='" + vector.id + "' " + s + " >" + vector.salon + "</option>";
                });

                $("#ssalon").html(option);
                $(".list-salones").html(option);
            });
    } else {
        var option = '<option value="">Seleccione</option>';
        $("#ssalon").html(option);
        $(".list-salones").html(option);
    }
}
function listSalonesFiltro(seleccionado = "", suc = "") {

    if (suc != "") {
        fetch(base + '/reservas/salonessucursales/' + suc, opcionesFetchFuncion)
            .then(response => response.json())
            .then(function (response) {
                var option = '';
                response.forEach(function (vector) {
                    var s = vector.id == seleccionado ? 'selected' : '';
                    option += "<option value='" + vector.id + "' " + s + " >" + vector.salon + "</option>";
                });
                $("#sel_salones").html(option);
               
            });
    } else {
        var option = '';
        $("#sel_salones").html(option);
       
    }
}



function listMesas(selected = "", sal = "") {

    var url = base + '/reservas/salonesmesas/';

    if (sal != "" && sal !=null ) {
        url = base + '/reservas/salonesmesas/' + sal;
    }

    fetch(url, opcionesFetchFuncion)
        .then(response => response.json())
        .then(function (response) {
            if (response && response.length > 0) {
                var option = '<option value="">Seleccione</option>';
                response.forEach(function (vector) {
                    s = vector.mesa_id == selected ? ' selected ' : '';
                    // option += "<option value = '+vector.mesa+mseleccionado+'>'+vector.mesa+'</option>";
                    option += "<option value='" + vector.mesa_id + "' " + s + " >" + vector.mesa + "</option>";
                });

            } else {
                var option = '<option value="">Seleccione</option>';
            }
            $(".select-edit-mesa").html(option);
            $("#smesa").html(option);
            $("#mesa_id").html(option);
            $(".list-mesas").html(option);
            
        });

}

function listMesasFiltro(selected = "", sal = "") {

    var url = base + '/reservas/salonesmesascrm/'+sal;

    // if (sal != "" && sal !=null ) {
    //     url = base + '/reservas/salonesmesas/' + sal;
    // }  
    fetch(url, opcionesFetchFuncion)
    .then(response => response.json())
    .then(function (response) {

        var option = '';
        if (response && response.length > 0) {           
            response.forEach(function (vector) {
                s = vector.mesa_id == selected ? ' selected ' : '';
                // option += "<option value = '+vector.mesa+mseleccionado+'>'+vector.mesa+'</option>";
                option += "<option value='" + vector.id + "' " + s + " >" + vector.mesa + "</option>";
            });
        }        
        $("#sel_mesas").html(option);
            
    });

}

function listCliente2(selected = "") {

    var url = base + '/clientes/list_clientes';  

    fetch(url, opcionesFetchFuncion)
    .then(response => response.json())
    .then(function (response) {

        // var option = '<option value="">Seleccione ...<option/>';
        var option = '';        
        if (response && response.length > 0) {
            response.forEach(function (vector) {
                s = vector.nombre == selected ? ' selected ' : '';               
                option += "<option value='" + vector.nombre + "' " + s + " >" + vector.nombre + "</option>";
            });
        }    
        $(".list-clientes").html(option);
            
    });

}

function listCancelancion(selected=""){

    var url = base + '/reservar/razones';  

    fetch(url, opcionesFetchFuncion)
    .then(response => response.json())
    .then(function (response) {

        // var option = '<option value="">Seleccione...</option>';
        var option = '<option value=""></option>';

        if (response && response.length > 0) {
            response.forEach(function (vector) {
                s = vector.nombre == selected ? ' selected ' : '';               
                option += "<option value='" + vector.id + "' " + s + " >" + vector.razon + "</option>";
            });
        }    
        $(".list-razones").html(option);
            
    });
}

function listEstadoGift(selected=""){

    fetch(base+'/giftcard/auxiliares', opcionesFetchFuncion)
    .then(response => response.json())
    .then(function (response) {
        console.log(response)

        var option = '<option value="">Seleccione</option>';
        response.estado.forEach(function (vector) {
            s = vector.id== selected ? ' selected ' : '';
            option += "<option value='" + vector.id + "' " + s + " >" + vector.estado + "</option>";
        });
        // $(".list_estado_gift").html(option);
    });
}

function listFormaPago( selected=""){

    const opcionesFetch0 = {
        method: 'GET',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
            'Content-Type': 'application/json'
        },
    }
    fetch(base + '/giftcard/auxiliares', opcionesFetch0)
    .then(response => response.json())
    .then(function (response) {       
      
        var option = '<option value="">Seleccione</option>';
        response.estado.forEach(function (vector) {
            s = vector.id== selected ? ' selected ' : '';
            option += "<option value='" + vector.id + "' " + s + " >" + vector.forma_pago + "</option>";
        });

        $(".list-forma-pago").html(option);
       

    });
}

function listEstado(selected = "") {

    const opcionesFetch = {
        method: 'GET',
        headers: { 'X-CSRF-Token': $('meta[name="_token"]').attr('content'), 'Content-Type': 'application/json' },
    }
    fetch(base + '/reservar/estados', opcionesFetch)
    .then(response => response.json())
    .then(function (response) {
        var option = '';
        if (response && response.length > 0) {
            response.forEach(function (vector) {
                s = vector.id == selected ? ' selected ' : '';
                // if(vector.id!=4 && vector.id!=8 && vector.id!=9 ){
                if(vector.id!=11 ){
                    option += "<option value='" + vector.id + "' " + s + " >" + vector.estado + "</option>";
                }
            });
            $(".select-edit-estado").html(option);
            $('#estado').html(option);
        }
    })
}
function listEstadoFiltro(selected = "") {

    const opcionesFetch = {
        method: 'GET',
        headers: { 'X-CSRF-Token': $('meta[name="_token"]').attr('content'), 'Content-Type': 'application/json' },
    }
    fetch(base + '/reservar/estados', opcionesFetch)
    .then(response => response.json())
    .then(function (response) {
        var option = '';
        if (response && response.length > 0) {
            response.forEach(function (vector) {
                s = vector.id == selected ? ' selected ' : '';
                // if(vector.id!=4 && vector.id!=8 && vector.id!=9 ){
                if(vector.id!=11){
                    option += "<option value='" + vector.id + "' " + s + " >" + vector.estado + "</option>";
                }
                // }
            });
            $("#sel_estados").html(option);            
        }
    })
}

function listTiposFiltro( selected=""){

    const opcionesFetch = {
        method: 'GET',
        headers: { 'X-CSRF-Token': $('meta[name="_token"]').attr('content'), 'Content-Type': 'application/json' },
    }

    fetch(base + '/reservar/tipos', opcionesFetch)
    .then(response => response.json())
    .then(function (response) {
        var option = '';
        if (response && response.length > 0) {

            response.forEach(function (vector) {
                s = vector.id == selected ? ' selected ' : ''; 
                option += "<option value='" + vector.id + "' " + s + " >" + vector.estado + "</option>";               
            });
            $("#sel_tipos").html(option);
       
        }
    })
}

function listTipos( selected=""){

    const opcionesFetch = {
        method: 'GET',
        headers: { 'X-CSRF-Token': $('meta[name="_token"]').attr('content'), 'Content-Type': 'application/json' },
    }

    fetch(base + '/reservar/tipos', opcionesFetch)
    .then(response => response.json())
    .then(function (response) {
        var option = '';
        if (response && response.length > 0) {

            response.forEach(function (vector) {
                s = vector.id == selected ? ' selected ' : ''; 
                option += "<option value='" + vector.id + "' " + s + " >" + vector.estado + "</option>";               
            });
            $(".list-tipos").html(option);
            $("#tipo_reserva").html(option);
       
        }
    })
}
function listConfiguracionTipo(selected=""){

    fetch(base+'/configura_tipos', opcionesFetchFuncion)
    .then(response => response.json())
    .then(function (response) {
        // console.log(response)

        var option = '<option value="">Seleccione</option>';
        response.forEach(function (vector) {
            s = vector.id== selected ? ' selected ' : '';
            option += "<option value='" + vector.id + "' " + s + " >" + vector.nombre + "</option>";
        });
        $(".list-tipos").html(option);
    });

}

function listConfiguracionVista(selected=""){

    fetch(base+'/configura_vistas', opcionesFetchFuncion)
    .then(response => response.json())
    .then(function (response) {
        // console.log(response)

        var option = '<option value="">Seleccione</option>';
        response.forEach(function (vector) {
            s = vector.id== selected ? ' selected ' : '';
            option += "<option value='" + vector.id + "' " + s + " >" + vector.vista + "</option>";
        });
        $(".list-vistas").html(option);
    });
}

function listConfiguracionDuracion(selected){
    var data =[
        'Segundos',
        'Minutos',
        'Horas',
        'Dias',
    ];
    var option = '<option value="">Seleccione</option>';

    data.forEach(vector => {
        s = vector == selected ? ' selected ' : '';
        option += "<option value='" + vector+ "' " + s + " >" + vector + "</option>";        
    });

    $(".list-duracion").html(option);
}


function listRoles(selected=""){

    fetch(base+'/roles_list', opcionesFetchFuncion)
    .then(response => response.json())
    .then(function (response) {
        // console.log(response)
        // var option = '<option value="">Seleccione</option>';
        var option = '';
        response.forEach(function (vector) {
            s = vector.name== selected ? ' selected ' : '';
            option += "<option value='" + vector.name + "' " + s + " >" + vector.name + "</option>";
        });
        $(".list-roles").html(option);
    });
}

function imageForm(value) {
    ///////////////////////////
    let url = null;
    let act = null;

    if (value == null) {
        return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">'
    } else if (value == "") {
        return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">'
    } else {
        let ext = value.substring(value.length - 3);
        switch (ext) {
            case 'pdf':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/272a0577357ca4502d5111c5af4228fe22810758.png';
                break;
            case 'png':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
                break;
            case 'jpg':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
                break;
            case 'jpeg':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
                break;
            default:
                act = null;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png';
                break;
        }
        return '<a href="' + value + '"><img src="' + url + '" height="50px" width="50px"></a>';
    }
}


// function listMesas(seleccionado="", salon =""){

//     var option = '<option value="">Seleccione</option>';


//     if(salon!=''){
//         fetch(base+'/reservas/salonesmesas/'+salon, opcionesFetchFuncion)
//         .then(response => response.json())
//         .then(function(response) {


//             if (response && response.length > 0) {
//                 response.forEach(function(vector) {
//                     var s = vector.mesa_id == seleccionado ? 'selected' : '';
//                     option += "<option value='" +vector.mesa_id + "' " + s + " >" + vector.mesa + "</option>";
//                 })
//             }
//         });
//     }

//     $("#smesa").html(option);

// }
