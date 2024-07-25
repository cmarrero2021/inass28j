@extends('adminlte::page')
@section('title','Seguimiento Trabajadores')
@section('content_header')
    <meta name="_token" content="{{ csrf_token() }}">
    <h1 class="m-0 text-dark">Seguimiento Trabajadores</h1>
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
            id="tbl-seguimiento" 
            class="table table-hover" 
            data-toolbar="#toolbar"
            data-toggle="table" 
            data-url="{{route('trab_seguimiento')}}" 
            data-side-pagination="server" 
            data-pagination="true" 
            data-page-list="[10, 20, 50,  100, 'All']" 
            data-page-size-options='["10", "20", "50", "100", "Todos"]' 
            data-custom-all-text="Todos"
            data-page-size-func="pageSizeFunc"
            data-page-size="10" 
            data-buttons="btnAgregar"
            data-show-export="true" 
            data-export-data-type="all" 
            data-export-types="['csv', 'json', 'excel']" 
            data-show-fullscreen="true" 
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
                    <th colspan="7">LISTADOD DE TRABAJADORES</th>
                </tr>
                <tr>
                    <th data-formatter="operateFormatter" data-events="operateEvents"></th>
                    <th data-field="hora_voto" data-visible="false" >HORA</th>
                    <th data-field="observaciones" data-visible="false">OBSERVACIONES</th>
                    <th data-field="telefono" data-sortable="true">TELÉFONO|</th>
                    <th data-field="cedula"  data-sortable="true">CÉDULA</th>
                    <th data-field="nombres" data-sortable="true">NOMBRES</th>
                    <th data-field="nucleo" data-sortable="true">NÚCLEO</th>
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
@stop
<script>
    // $(document).ready(function() {
    //     $('.subir').click(function(){
    //              $("html, body").animate({ scrollTop: 0 }, 600);
    //         });
    //     $(".bajar").click(function() {
    //         // var tableHeight = $("#tbl-seguimiento")[0].scrollHeight;
    //         // $("html, body").animate({ scrollTop: tableHeight }, 600);
    //     });          
    // });
    function operateFormatter(value, row, index) {
        let btns=[];
        btn_check = '<form> @csrf <button id="chk'+index+'" class="form-control btn btn-sm btn-primary chequear" title="Chequear"><i class="fas fa-check"></i></button></form>';
        btn_save = '<form> @csrf <button id="save'+index+'" class="form-control btn btn-sm btn-success save d-none" title="Guardar cambios"><i class="fas fa-save"></i></button></form>';
        btn_delete = '<form> @csrf <button id="del'+index+'" class="form-control btn btn-sm btn-danger delete d-none" title="Revertir cambios"><i class="fas fa-times"></i></button></form>';        
        btns = [btn_check, btn_save, btn_delete].join('');    
            return[btns];
    }
    window.operateEvents = {
        'click .chequear': function(e, value, row, index) {
            $('#tbl-seguimiento').bootstrapTable('showColumn', 'hora_voto');
            $('#tbl-seguimiento').bootstrapTable('showColumn', 'observaciones');
            $('#tbl-seguimiento').bootstrapTable('updateCell', {index: index, field: 'hora_voto', value: '<input class="form-control bg-primary" id="check_hora_voto" type="time" >'});
            $('#tbl-seguimiento').bootstrapTable('updateCell', {index: index, field: 'observaciones', value: '<textarea class="form-control bg-primary" id="check_observaciones"></textarea>'});
            $('.chequear').addClass('d-none');
            $('#save' + index).removeClass('d-none');
            $('#del' + index).removeClass('d-none');
        },
        'click .save': function(e, value, row, index) {
            let data = {
                'cedula':row.cedula,
                'hora_voto':$("#check_hora_voto").val(),
                'observaciones':$("#check_observaciones").val(),
            }
            $.ajax({
                type: "POST",
                url: "/trabajador/check",
                data: data,
                headers: {
                    "X-CSRF-Token": $('meta[name="_token"]').attr("content"),
                },
                dataType: "JSON",
                success: function (response) {
                    $('#tbl-seguimiento').bootstrapTable('hideColumn', 'hora_voto');
                    $('#tbl-seguimiento').bootstrapTable('hideColumn', 'observaciones');
                    $('#tbl-seguimiento').bootstrapTable('refresh');
                    toastr.success('La hora de votación ha sido registrada exitosamente');
                },
            });              
        },
        'click .delete': function(e, value, row, index) {
            $('#tbl-seguimiento').bootstrapTable('hideColumn', 'hora_voto');
            $('#tbl-seguimiento').bootstrapTable('hideColumn', 'observaciones');
            $('#tbl-seguimiento').bootstrapTable('refresh');
        }
    };
    document.addEventListener('DOMContentLoaded', function() {
        var elementosBajar = document.querySelectorAll('.bajar');
        elementosBajar.forEach(function(elemento) {
            elemento.addEventListener('click', function() {
                var tableHeight = $("#tbl-seguimiento")[0].scrollHeight;
                $("html, body").animate({ scrollTop: tableHeight }, 600);
            });
        });
        var elementosSubir = document.querySelectorAll('.subir');
        elementosSubir.forEach(function(elemento) {
            elemento.addEventListener('click', function() {
                $("html, body").animate({ scrollTop: 0 }, 600);
                
            });
        });    
    });    
</script>
