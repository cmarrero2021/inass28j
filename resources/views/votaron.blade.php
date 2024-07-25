@extends('adminlte::page')
@section('title','Trabajadores votaron')
@section('content_header')
    <meta name="_token" content="{{ csrf_token() }}">
    <h1 class="m-0 text-dark">Trabajadores votaron</h1>
@stop
@section('content')
    <div class="table-container">
        <div class="scrollup">
            <div class="text-center">
                <a href="#" class="bajar" title="Bajar al final de la tabla"><i class="fas fa-arrow-alt-circle-down" style="font-size: 18px;"></i></a>
            </div>
            <div class="text-center">
                <a href="#" class="subir" title="Subir al inicio de la tabla"><i class="fas fa-arrow-alt-circle-up" style="font-size: 18px;"></i></a>
            </div>
        </div>
        <table 
            id="tbl-trabajadores-votaron" 
            class="table table-hover table-striped" 
            data-toolbar="#toolbar"
            data-toggle="table" 
            data-show-columns="true" 
            data-url="{{route('vot_tabla')}}" 
            data-side-pagination="server" 
            data-pagination="true" 
            data-page-list="[10, 20, 50,  100, 'All']" 
            data-page-size-options='["10", "20", "50", "100", "Todos"]' 
            data-custom-all-text="Todos"
            data-page-size-func="pageSizeFunc"
            data-page-size="10" 
            data-show-export="true" 
            data-export-data-type="all" 
            data-export-types="['csv', 'json', 'excel']" 
            data-show-fullscreen="true" 
            data-filter-control="true" 
            data-show-search-clear-button="true" 
            data-show-multi-sort="true" 
            data-show-print="true" 
            data-locale="es-VE"
            data-search="true"
            data-search-accent-neutralise="true"
            data-show-refresh="true"
        >
            <thead>
                <tr>
                    <th colspan="8">LISTADOD DE TRABAJADORES VOTARON</th>
                </tr>
                <tr>
                    <th data-field="cedula" data-filter-control="input" data-sortable="true">CEDULA</th>
                    <th data-field="nombres" data-filter-control="input" data-sortable="true">NOMBRES</th>
                    <th data-field="estado" data-filter-control="select" data-sortable="true">ESTADO</th>
                    <th data-field="municipio" data-filter-control="select" data-visible="false" data-sortable="true">MUNICIPIO</th>
                    <th data-field="parroquia" data-filter-control="select" data-visible="false" data-sortable="true">PARROQUIA</th>
                    <th data-field="telefono" data-visible="true">TELÉFONO</th>
                    <th data-field="observaciones" data-visible="false" data-filter-control="select" data-sortable="true">OBSERVACIONES</th>
                    <th data-field="hora_voto" data-visible="true" data-sortable="true">HORA VOTO</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
@stop
@section('css')
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/icons.min.css') }}" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <link href="{{ asset('assets/css/app.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/bootstrap-table.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/bootstrap-table-group-by.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/toastr.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/sweetalert2.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/choices.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/select2.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/styles.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ URL::asset('assets/libs/tui-chart/tui-chart.min.css') }}" rel="stylesheet">
@stop
@section('js')
    <script src="{{ asset('/assets/js/jquery-3.5.1.js') }}"></script>
    <script src="{{ asset('/assets/libs/bootstrap/bootstrap.min.js') }}"></script>
    <script src="{{ asset('/assets/libs/toastr/toastr.min.js') }}"></script>
    <script src="{{ asset('/assets/libs/sweetalert2/sweetalert2.min.js') }}"></script>
    <script src="{{ asset('/assets/js/jspdf.min.js') }}"></script>
    <script src="{{ asset('/assets/js/jspdf.plugin.autotable.js') }}"></script>
    <script src="{{ asset('/assets/js/bootstrap-table.min.js') }}"></script>
    <script src="{{ asset('/assets/js/bootstrap-table-locale-all.min.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-table@1.22.3/dist/extensions/filter-control/bootstrap-table-filter-control.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-table@1.22.3/dist/extensions/fixed-columns/bootstrap-table-fixed-columns.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-table@1.22.3/dist/extensions/multiple-sort/bootstrap-table-multiple-sort.js"></script>    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-table@1.22.3/dist/extensions/print/bootstrap-table-print.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-table@1.22.3/dist/extensions/sticky-header/bootstrap-table-sticky-header.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-table@1.22.3/dist/bootstrap-table-locale-all.min.js"></script>    
    <script src="{{ asset('/assets/js/bootstrap-table/extensions/export/bootstrap-table-export.min.js') }}"></script>
    <script src="{{ asset('/assets/js/bootstrap-table/extensions/export/tableExport.min.js') }}"></script>
    <script src="{{ asset('/assets/js/bootstrap-table/extensions/export/xlsx.full.min.js') }}"></script>
    <script src="{{ asset('/assets/js/bootstrap-table/extensions/fixed-columns/bootstrap-table-fixed-columns.min.js') }}"></script>
    <script src="{{ asset('/assets/js/jspdf.min.js') }}"></script>
    <script src="{{ asset('/assets/js/bootstrap-table-group-by.min.js') }}"></script>
    <script src="{{ asset('/assets/js/jquery-ui-1.10.4.custom.min.js') }}"></script>
    <script src="{{ asset('/assets/js/moment.min.js') }}"></script>
    <script src="{{ asset('/assets/libs/tui-chart/tui-chart.min.js') }}"></script>
    <script>
        $(document).ready(function() {
            setTimeout(() => {
                let todosElemento = $("a:contains('NaN')");
                todosElemento.first().text("Todos");
            }, 1000);
            /////////////////
            function loadFilterOptions(field) {
                $.ajax({
                    url: "{{ route('trab_filtros') }}",
                    method: 'GET',
                    data: { field: field },
                    success: function(data) {
                        var selectControl = $('select.bootstrap-table-filter-control-' + field);
                        if (selectControl.length) {
                            // Guardar la opción actualmente seleccionada
                            var selectedOption = selectControl.val();
                            selectControl.empty();
                            selectControl.append($('<option>', { value: '', text: 'Todos' }));
                            $.each(data.options, function(key, value) {
                                selectControl.append($('<option>', {
                                    value: key,
                                    text: value
                                }));
                            });

                            // Restaurar la opción seleccionada
                            selectControl.val(selectedOption);
                        }
                    }
                });
            }

            loadFilterOptions('estado');
            loadFilterOptions('municipio');
            loadFilterOptions('parroquia');            
            // $('#tbl-trabajadores-votaron').on('page-change.bs.table refresh.bs.table', function () {
            $('#tbl-trabajadores-votaron').on('post-body.bs.table page-change.bs.table refresh.bs.table', function () {
                loadFilterOptions('estado');
                loadFilterOptions('municipio');
                loadFilterOptions('parroquia');
            });            
            /////////////////
            $('.subir').click(function(){
                 $("html, body").animate({ scrollTop: 0 }, 600);
            });
            $(".bajar").click(function() {
                var tableHeight = $("#tbl-trabajadores-votaron")[0].scrollHeight;
                $("html, body").animate({ scrollTop: tableHeight }, 600);
            });  
            //////////////
            $.ajax({
                    type: "POST",
                    url:   "{{ route('auxiliars.main.workers') }}",
                    headers: {
                        "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                },
                dataType: "JSON",
                success: function (response) {
                    $.each(JSON.parse(response['estados']), function (index, item) {
                    $('#selEstado').append($('<option>', { 
                        value: item.id,
                        text : item.estado 
                    }));
                });
                $.each(JSON.parse(response['nucleos']), function (index, item) {
                    $('#selNucleo').append($('<option>', { 
                        value: item.id,
                        text : item.nucleo 
                    }));
                });
                $.each(JSON.parse(response['tipos']), function (index, item) {
                    if (item.id != 6) {
                    $('#selTipo').append($('<option>', { 
                            value: item.id,
                            text : item.tipo_elector 
                        }));
                    }
                });                        
                $('#selFormacion').append($('<option>', { 
                    value: 1,
                    text : 'NINGUNA' 
                }));
            }});
            $('[name="btnAdd"]').removeClass('btn-secondary');
            $('[name="btnAdd"]').addClass('btn-success');

            var botonAgregarTrabajador = $('button[title="Agregar trabajador"]');
            $('button[title="Agregar trabajador"]').remove();
            $('.columns-right').append(botonAgregarTrabajador);
            ///////////////////
            $('[name="btnAdd"]').on('click',function() {
                $(".ver-campo").hide();
                $("#hora_hora_voto").hide();
                $("#personal").show();
                $(".editar-campo").show();
                $(".requerido").show();
                $("#modal-title").html("Crear trabajador");
                $("#dismiss").show();
                $("#accept").show();
                $("#txt_cedula").val('');
                $("#txt_nombre").val('');
                $("#selVoto").val("NO");
                $("#txt_hora").val('');
                $("#txt_telefono").val('');
                $("#txt_observaciones").val('');
                $("#mdl-trabajadores").modal("show")
                
            });            
        });
        function btnAgregar() {
            return {
                btnAdd: {
                    class: 'btn-success',
                    text: "Agregar trabajador",
                    icon: 'bi bi-person-fill-add',
                    event: function () {
                        
                    },
                    attributes: {
                        title: "Agregar trabajador"
                    }
                }
            }
        }        
        
        function operateFormatter(value, row, index) {
            let btns=[];
            @php
                $usrChk = auth()->check() && auth()->user()->can('admin.workers.check');
                $usrViw = auth()->check() && auth()->user()->can('admin.workers.view');
                $usrEdt = auth()->check() && auth()->user()->can('admin.workers.edit');
                $usrDes = auth()->check() && auth()->user()->can('admin.workers.destroy');
            @endphp

            @if($usrChk)
                btn_check = ['<form> @csrf <a class="chequear " href="javascript:void(0)" title="Chequear">',
                    '<i class="fas fa-check text-info"></i>',
                    '</a></form>  '].join('')
            @else
                btn_check = ''
            @endif            
            @if($usrViw)
                btn_view =['<a class="ver " href="javascript:void(0)" title="Ver">',
                        '<i class="fas fa-eye text-success"></i>',
                        '</a>  '].join('')
            @else
                btn_view = ''
            @endif            
            @if($usrEdt)
                btn_edit = ['<a class="editar " href="javascript:void(0)" title="Editar">',
                        '<i class="fas fa-edit text-primary"></i>',
                        '</a>  '].join('')
            @else
                btn_edit = ''
            @endif            
            @if($usrDes)
                btn_destroy = ['<a class="eliminar" href="javascript:void(0)" title="Eliminar">',
                        '<i class="fas fa-trash text-danger"></i>',
                        '</a>'].join('')
            @else
                btn_destroy = ''
            @endif            

            btns = [
                btn_check,btn_view,btn_edit,btn_destroy
            ].join('');
            return[btns];
            }
            window.operateEvents = {
                'click .chequear': function(e, value, row, index) {
                    //***************************** */
					Swal.fire({
						title: 'Ingrese la hora',
						html:
						'<input id="swal-input1" class="swal2-input" type="time" required>',
						showCancelButton: true,
						confirmButtonText: 'Aceptar',
						cancelButtonText: 'Cancelar',
						preConfirm: () => {
							const horaVoto = $('#swal-input1').val();
							if (!horaVoto) {
								Swal.showValidationMessage('Por favor ingrese la hora');
							}
							return horaVoto;
						}
					}).then((result) => {
						if (result.isConfirmed) {
                            var data = {
                                cedula: row['cedula'],
                                voto: 'SI',
                                hora_voto: result.value,
                            };
                            $.ajax({
                                type: "POST",
                                url: "/trabajador/check",
                                data: data,
                                headers: {
                                    "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                                },
                                dataType: "JSON",
                                success: function (response) {
                                    $('#tbl-trabajadores-votaron').bootstrapTable('refresh');
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'HORA REGISTRADA EXITOSAMENTE',
                                        showConfirmButton: 'Cerrar'
                                    });

                                },
                            });                    
						}
					});
                },
                'click .ver': function(e, value, row, index) {
                    $("#modal-title").html("Ficha del trabajador "+row['cedula']+" "+row["nombres"]);
                    $(".ver-campo").show();
                    $(".editar-campo").hide();
                    $("#personal").hide();
                    $(".requerido").hide();
                    $("#lbl_voto").html(row["voto"]);
                    $("#lbl_hora").html(row["hora_voto"]);
                    $("#lbl_estado").html(row["estado"]);
                    $("#lbl_municipio").html(row["municipio"]);
                    $("#lbl_parroquia").html(row["parroquia"]);
                    $("#lbl_nucleo").html(row["nucleo"]);
                    $("#lbl_tipo").html(row["tipo_elector"]);
                    $("#lbl_formacion").html(row["formacion"]);
                    $("#lbl_email").html(row["email"]);
                    $("#lbl_telefono").html(row["telefono"]);
                    $("#lbl_observaciones").html(row["observaciones"]);
                    $("#dismiss").show();
                    $("#accept").hide();
                    $("#mdl-trabajadores").modal("show")
                },
                'click .editar': function(e, value, row, index) {
                    $(".ver-campo").hide();
                    $("#hora_hora_voto").show();
                    $("#personal").show();
                    $(".editar-campo").show();
                    $(".requerido").show();
                    $("#modal-title").html("Editar trabajador "+row['cedula']+" "+row["nombres"]);
                    $("#dismiss").show();
                    $("#accept").show();
                    $("#txt_cedula").val(row["cedula"]);
                    $("#txt_nombre").val(row["nombres"]);
                    row["nombres"]= true ? $("#selVoto").val("SI"):$("#selVoto").val("NO");
                    $("#txt_hora").val(row["hora_voto"]);
                    $("#txt_telefono").val(row["telefono"]);
                    $("#txt_observaciones").val(row["observaciones"]);
                    ci = row['cedula'];
                    $.ajax({
                        type: "POST",
                        url:   "{{ route('workers.get.worker') }}",
                        data: {ci:ci},
                        async:false,
                        headers: {
                            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                        },
                        dataType: "JSON",
                        success: function (response) {
                            $("#selNucleo").val(1);
                            $("#selNucleo").val(response[0].nucleo_id);
                            $("#selTipo").val(response[0].tipo_elector_id);
                            $("#selFormacion").val(1);
                            $("#selEstado").val(response[0].cne_estado_id).trigger('change');
                            setTimeout(() => {
                                $("#selMunicipio").val(response[0].cne_municipio_id).trigger('change');
                                setTimeout(() => {
                                    $("#selParroquia").val(response[0].cne_parroquia_id);
                                }, 250);
                            }, 250);
                        }
                    });  
                    
                    $("#mdl-trabajadores").modal("show")
                },
                'click .eliminar': function(e, value, row, index) {
                    //***************************** */
					Swal.fire({
						title: 'ADVERTENCIA',
                        html: '¡Esta acción <strong style="color:#f00;">ELIMINARÁ AL TRABAJADOR</strong>! ¿Está seguro que desea continuar',
                        icon: 'warning',
						showCancelButton: true,
						confirmButtonText: 'Aceptar',
						cancelButtonText: 'Cancelar',
					}).then((result) => {
						if (result.isConfirmed) {
                            $.ajax({
                                type: "DELETE",
                                url: "trabajadores/"+row['cedula'],
                                headers: {
                                    "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                                },
                                dataType: "JSON",
                                success: function (response) {
                                    $('#tbl-trabajadores-votaron').bootstrapTable('refresh');
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'TRABAJADOR ELIMINADO EXITOSAMENTE',
                                        text: 'El trabajador '+response.nombre+', CI '+ response.cedula+' ha sido borrado exitosamente',
                                        showConfirmButton: 'Cerrar'
                                    });

                                },
                            });                    
						}
					});
                }
            };
            $('#selEstado').on('change',function(){
            var id = $(this).val();
            $.ajax({
                type: "POST",
                url:   "{{ route('auxiliars.states.municipality') }}",
                data: {id: id},
                headers: {
                    "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                },
                dataType: "JSON",
                success: function (response) {
                    $('#selMunicipio').empty();
                    $('#selParroquia').empty();
                    $('#selMunicipio').append($('<option>', { 
                            value: "",
                            text : "Seleccione"
                        }));                        
                    $.each(response, function (index, item) {
                        $('#selMunicipio').append($('<option>', { 
                            value: item.municipio_id,
                            text : item.municipio
                        }));
                    });
                },
            });  
        })
        
            $('#selMunicipio').on('change',function(){
                var id_estado = $("#selEstado").val();
                var id_municipio = $(this).val();
                $.ajax({
                    type: "POST",
                    url:  "{{ route('auxiliars.municipality.parish') }}",
                    data: {id_estado: id_estado,id_municipio},
                    headers: {
                        "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                    },
                    dataType: "JSON",
                    success: function (response) {
                        $('#selParroquia').empty();
                        $('#selParroquia').append($('<option>', { 
                                value: "",
                                text : "Seleccione"
                            }));                        
                        $.each(response, function (index, item) {
                            $('#selParroquia').append($('<option>', { 
                                value: item.parroquia_id,
                                text : item.parroquia
                            }));
                        });
                    },
                });
            });  
            ///////////////////
            $("#accept").on('click',function(e) {
            e.preventDefault();
            let titulo = $("#modal-title").html();
            if (titulo.includes("Editar")) {
                let data = {
                    cedula: $("#txt_cedula").val(),
                    nombres: $("#txt_nombre").val(),
                    voto: $("#selVoto").val(),
                    hora_voto: $("#txt_hora").val(),
                    cne_estado_id: $("#selEstado").val(),
                    cne_municipio_id: $("#selMunicipio").val(),
                    cne_parroquia_id: $("#selParroquia").val(),
                    nucleo_id: $("#selNucleo").val(),
                    tipo_elector_id: $("#selTipo").val(),
                    formacion_id: $("#selFormacion").val(),
                    telefono: $("#txt_telefono").val(),
                    email: $("#txt_email").val(),
                    observaciones: $("#txt_observaciones").val(),
                }
                if(data.voto == "SI" && data.hora_voto =="") {
                    alert("Si indicó que votó, debe colocar la hora en la cual votó ")
                } else {
                    $.ajax({
                        type: "POST",
                        url:  "{{ route('workers.update.worker') }}",
                        data: data,
                        headers: {
                            "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                        },
                        dataType: "JSON",
                        success: function (response) {
                            if (response.status != 200) {
                                let resp_err = "Han ocurrido un error y el trabajador no ha sido actualizado: <br/><ul style='text-align:left;'>";
                                $.each(response.errors, function(i,v) {
                                    resp_err += "<li>"+v[0]+"</li>";
                                });
                                resp_err += "</ul>";
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'HA OCURRIDO UN ERROR',
                                    html: resp_err,
                                    showConfirmButton: 'Cerrar'
                                });                                    
                            } else {
                                $('#tbl-trabajadores-votaron').bootstrapTable('refresh');
                                Swal.fire({
                                    icon: 'success',
                                    title: 'REGISTRO ACTUALIZADO EXITOSAMENTE',
                                    text: 'Se han actualizado exitosamente los datos del trabajador',
                                    showConfirmButton: 'Cerrar'
                                });                                    
                                $("#mdl-trabajadores").modal("hide")
                            }
                        },
                    });                        
                
                }
            } else {
                let data = {
                    cedula: $("#txt_cedula").val(),
                    nombres: $("#txt_nombre").val(),
                    voto: $("#selVoto").val(),
                    hora_voto: $("#txt_hora").val(),
                    cne_estado_id: $("#selEstado").val(),
                    cne_municipio_id: $("#selMunicipio").val(),
                    cne_parroquia_id: $("#selParroquia").val(),
                    nucleo_id: $("#selNucleo").val(),
                    tipo_elector_id: $("#selTipo").val(),
                    formacion_id: $("#selFormacion").val(),
                    telefono: $("#txt_telefono").val(),
                    email: $("#txt_email").val(),
                    observaciones: $("#txt_observaciones").val(),
                };
                $.ajax({
                    type: "POST",
                    url:   "{{ route('admin.workers.store') }}",
                    data: data,
                    headers: {
                        "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                    },
                    dataType: "JSON",
                    success: function (response) {
                        if(response.errors) {
                            console.log(response.errors)
                            let errores = '';
                            let campos=[];
                            $.each(response.errors, function(llave, valor) {
                                errores += '<li style="text-align:left !important;">'+valor[0]+'</li>'
                                $("#"+llave).addClass('bg-danger');
                                campos.push(llave[0]);
                            });
                            errores = '<ul>'+errores+'</ul>'
                            Swal.fire({
                                icon: 'warning',
                                title: 'SE HAN ENCONTRADO LOS SIGUIENTES ERRORES!',
                                html: errores,
                                showConfirmButton: 'Cerrar'
                            })
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'SE HA CREADO CORRECTAMENTE EL REGISTRO',
                                showConfirmButton: 'Cerrar'
                            })
                            $(['name="refresh"']).trigger('click')
                            $("#mdl-trabajadores").modal("hide")
                        }
                    }
                }); 
            }                
        });
        
    </script>
@stop
