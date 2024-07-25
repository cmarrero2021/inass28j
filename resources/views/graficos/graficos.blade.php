@extends('adminlte::page')
@section('title','Gráficos Movilización Hora')
@section('content_header')
    <meta name="_token" content="{{ csrf_token() }}">
    <h1 class="m-0 text-dark">Gráficos Movilización Hora</h1>
@stop
@section('content')
<div class="accordion" id="acordeonMovilizacionTotal">
	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoTotal">
        <button class="accordion-button bg-dark collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoResumen" aria-controls="colapsoResumen">
				Resúmen Movilización
			</button>
		</h2>
		<div id="colapsoResumen" class="accordion-collapse collapse" aria-labelledby="encabezadoTotal" data-bs-parent="#acordeonMovilizacionTotal">
			<div class="accordion-body">
				<!-- Seccion 1 -->
                @include('graficos.partials.resumen')
			</div>
		</div>
	</div>
	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoNucleo">
			<button class="accordion-button collapsed bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoNucleo" aria-expanded="false" aria-controls="colapsoNucleo">
				Movilización por Territorio
			</button>
		</h2>
		<div id="colapsoNucleo" class="accordion-collapse collapse" aria-labelledby="encabezadoNucleo" data-bs-parent="#acordeonMovilizacionTotal">
			<div class="accordion-body">
				<!-- Seccion 2 -->
				<div class="accordion-body">
                @include('graficos.partials.nucleos')
{{--				<hr/>
                @include('graficos.partials.nucleoshoracant')
				<hr/>
                @include('graficos.partials.nucleoshoraacum')--}}
			</div>
			</div>
		</div>
	</div>
	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoEstado">
			<button class="accordion-button collapsed bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoEstado" aria-expanded="false" aria-controls="colapsoEstado">
				Movilización por Estado
			</button>
		</h2>
		<div id="colapsoEstado" class="accordion-collapse collapse" aria-labelledby="encabezadoEstado" data-bs-parent="#acordeonMovilizacionTotal">
			<div class="accordion-body">
				<!-- Seccion 3 -->
                @include('graficos.partials.estados')
			</div>
		</div>
	</div>
	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoTipo">
			<button class="accordion-button collapsed bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoTipo" aria-expanded="false" aria-controls="colapsoTipo">
				Movilización por Tipo
			</button>
		</h2>
		<div id="colapsoTipo" class="accordion-collapse collapse" aria-labelledby="encabezadoEstado" data-bs-parent="#acordeonMovilizacionTotal">
			<div class="accordion-body">
				<!-- Seccion 3 -->
                @include('graficos.partials.tipos')
			</div>
		</div>
	</div>
	<div class="accordion-item d-none">
		<h2 class="accordion-header" id="encabezadoNucleoTipo">
			<button class="accordion-button collapsed bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoNucleoTipo" aria-expanded="false" aria-controls="colapsoNucleoTipo">
				Movilización por Nucleo y Tipo
			</button>
		</h2>
		<div id="colapsoNucleoTipo" class="accordion-collapse collapse" aria-labelledby="encabezadoEstado" data-bs-parent="#acordeonMovilizacionTotal">
			<div class="accordion-body">
			</div>
		</div>
	</div>
	<div class="accordion-item d-none">
		<h2 class="accordion-header" id="encabezadoEstadoTipo">
			<button class="accordion-button collapsed bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoEstadoTipo" aria-expanded="false" aria-controls="colapsoEstadoTipo">
				Movilización por Estado y Tipo
			</button>
		</h2>
		<div id="colapsoEstadoTipo" class="accordion-collapse collapse" aria-labelledby="encabezadoEstadoTipo" data-bs-parent="#acordeonMovilizacionTotal">
			<div class="accordion-body">
			</div>
		</div>
	</div>
    <hr class="mt-3 mb3"/>
    <div class="accordion d-none" id="acordeonMovilizacionTrabajador">
	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoTotalTrabajador">
			<button class="accordion-button bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoResumenTrabajador" aria-expanded="false" aria-controls="colapsoResumenTrabajador">
				Resúmen Movilización Trabajadores
			</button>
		</h2>
		<div id="colapsoResumenTrabajador" class="accordion-collapse collapse" aria-labelledby="encabezadoTotalTrabajador" data-bs-parent="#acordeonMovilizacionTrabajador">
			<div class="accordion-body">
			</div>
		</div>
	</div>

	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoNucleoTrabajador">
			<button class="accordion-button collapsed bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoNucleoTrabajador" aria-expanded="false" aria-controls="colapsoNucleoTrabajador">
				Movilización Trabajadores por Núcleo 
			</button>
		</h2>
		<div id="colapsoNucleoTrabajador" class="accordion-collapse collapse" aria-labelledby="encabezadoNucleoTrabajador" data-bs-parent="#acordeonMovilizacionTrabajador">
			<div class="accordion-body">
			</div>
		</div>
	</div>
	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoEstadoTrabajador">
			<button class="accordion-button collapsed bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoEstadoTrabajador" aria-expanded="false" aria-controls="colapsoEstadoTrabajador">
				Movilización Trabajadores por Estado
			</button>
		</h2>
		<div id="colapsoEstadoTrabajador" class="accordion-collapse collapse" aria-labelledby="encabezadoEstadoTrabajador" data-bs-parent="#acordeonMovilizacionTrabajador">
			<div class="accordion-body">
			</div>
		</div>
	</div>
	<div class="accordion-item d-none">
		<h2 class="accordion-header" id="encabezadoTipoTrabajador">
			<button class="accordion-button collapsed bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#Trabajador" aria-expanded="false" aria-controls="Trabajador">
				Movilización Trabajadores por Tipo
			</button>
		</h2>
		<div id="Trabajador" class="accordion-collapse collapse" aria-labelledby="encabezadoEstadoTrabajador" data-bs-parent="#acordeonMovilizacionTrabajador">
			<div class="accordion-body">
			</div>
		</div>
	</div>
	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoNucleoTipoTrabajador">
			<button class="accordion-button collapsed bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoNucleoTipoTrabajador" aria-expanded="false" aria-controls="colapsoNucleoTipoTrabajador">
				Movilización Trabajadores por Nucleo y Tipo
			</button>
		</h2>
		<div id="colapsoNucleoTipoTrabajador" class="accordion-collapse collapse" aria-labelledby="encabezadoNucleoTipoTrabajador" data-bs-parent="#acordeonMovilizacionTrabajador">
			<div class="accordion-body">
			</div>
		</div>
	</div>
	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoEstadoTipoTrabajador">
			<button class="accordion-button collapsed bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoEstadoTipoTrabajador" aria-expanded="false" aria-controls="colapsoEstadoTipoTrabajador">
				Movilización Trabajadores por Estado y Tipo
			</button>
		</h2>
		<div id="colapsoEstadoTipoTrabajador" class="accordion-collapse collapse" aria-labelledby="encabezadoEstadoTipoTrabajador" data-bs-parent="#acordeonMovilizacionTrabajador">
			<div class="accordion-body">
			</div>
		</div>
	</div>	
    <hr class="mt-3 mb3"/>
    <div class="accordion" id="acordeonMovilizacionEstudiante">
	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoTotalEstudiante">
			<button class="accordion-button bg-success text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoResumenEstudiante" aria-expanded="false" aria-controls="colapsoResumenEstudiante">
				Resúmen Movilización Estudiantes
			</button>
		</h2>
		<div id="colapsoResumenEstudiante" class="accordion-collapse collapse" aria-labelledby="encabezadoTotalEstudiante" data-bs-parent="#acordeonMovilizacionEstudiante">
			<div class="accordion-body">
			</div>
		</div>
	</div>
	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoNucleoEstudiante">
			<button class="accordion-button collapsed bg-success text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoNucleoEstudiante" aria-expanded="false" aria-controls="colapsoNucleoEstudiante">
				Movilización Estudiantes por Núcleo 
			</button>
		</h2>
		<div id="colapsoNucleoEstudiante" class="accordion-collapse collapse" aria-labelledby="encabezadoNucleoEstudiante" data-bs-parent="#acordeonMovilizacionEstudiante">
			<div class="accordion-body">
			</div>
		</div>
	</div>
	<div class="accordion-item">
		<h2 class="accordion-header" id="encabezadoEstadoEstudiante">
			<button class="accordion-button collapsed bg-success text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#colapsoEstadoEstudiante" aria-expanded="false" aria-controls="colapsoEstadoEstudiante">
				Movilización Estudiantes por Estado
			</button>
		</h2>
		<div id="colapsoEstadoEstudiante" class="accordion-collapse collapse" aria-labelledby="encabezadoEstadoEstudiante" data-bs-parent="#acordeonMovilizacionEstudiante">
			<div class="accordion-body">
			</div>
		</div>
	</div>
**</div>

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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@toast-ui/chart/dist/toastui-chart.min.css">
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
    <script src="https://cdn.jsdelivr.net/npm/@toast-ui/chart"></script>
<<script>

document.addEventListener('DOMContentLoaded', function() {
	// ////DATA PARA REGIÓN CAPITAL//////
	// let data1 = @json($nucleos_hora_cap);
	// let contenedor1 = 'grf-nucleoshoracancap';
	// let valor1 = 'cant';
	// let titulo1 = 'Movilización Región Capital';
	// let can_nucleos_hora_cap;
	// generarGrafica(data1, contenedor1, valor1, titulo1, can_nucleos_hora_cap);
	// let data2 = @json($nucleos_hora_cap);
	// let contenedor2 = 'grf-nucleoshoraacucap';
	// let valor2 = 'acumulado';
	// let titulo2 = 'Movilización acumulada Región Capital';
	// let acum_nucleos_hora_cap;
	// generarGrafica(data2, contenedor2, valor2, titulo2, acum_nucleos_hora_cap);	

	// let data3 = @json($nucleos_hora_cen);
	// let contenedor3 = 'grf-nucleoshoracancen';
	// let valor3 = 'cant';
	// let titulo3 = 'Movilización Región Centro';
	// let can_nucleos_hora_cen;
	// generarGrafica(data3, contenedor3, valor3, titulo3, can_nucleos_hora_cen);	
	// let data4 = @json($nucleos_hora_cen);
	// let contenedor4 = 'grf-nucleoshoraacucen';
	// let valor4 = 'acumulado';
	// let titulo4 = 'Movilización acumulada Región Centro';
	// let acum_nucleos_hora_cen;
	// generarGrafica(data4, contenedor4, valor4, titulo4, acum_nucleos_hora_cen);	

	// let data5 = @json($nucleos_hora_occ);
	// let contenedor5 = 'grf-nucleoshoracanocc';
	// let valor5 = 'cant';
	// let titulo5 = 'Movilización Región Occidente';
	// let cant_nucleos_hora_occ;
	// generarGrafica(data5, contenedor5, valor5, titulo5, cant_nucleos_hora_occ);	
	// let data6 = @json($nucleos_hora_occ);
	// let contenedor6 = 'grf-nucleoshoraacuocc';
	// let valor6 = 'acumulado';
	// let titulo6 = 'Movilización acumulada Región Occidente';
	// let acum_nucleos_hora_occ;
	// generarGrafica(data6, contenedor6, valor6, titulo6, acum_nucleos_hora_occ);	

	// let data7 = @json($nucleos_hora_and);
	// let contenedor7 = 'grf-nucleoshoracanand';
	// let valor7 = 'cant';
	// let titulo7 = 'Movilización Región Andes';
	// let cant_nucleos_hora_and;
	// generarGrafica(data7, contenedor7, valor7, titulo7, cant_nucleos_hora_occ);	
	// let data8 = @json($nucleos_hora_and);
	// let contenedor8 = 'grf-nucleoshoraacuand';
	// let valor8 = 'acumulado';
	// let titulo8 = 'Movilización acumulada Región Andes';
	// let acum_nucleos_hora_and;
	// generarGrafica(data8, contenedor8, valor8, titulo8, acum_nucleos_hora_occ);	

	// let data9 = @json($nucleos_hora_lla);
	// let contenedor9 = 'grf-nucleoshoracanlla';
	// let valor9 = 'cant';
	// let titulo9 = 'Movilización Región Llanos';
	// let cant_nucleos_hora_lla;
	// generarGrafica(data9, contenedor9, valor9, titulo9, cant_nucleos_hora_lla);	
	// let data10 = @json($nucleos_hora_lla);
	// let contenedor10 = 'grf-nucleoshoraaculla';
	// let valor10 = 'acumulado';
	// let titulo10 = 'Movilización acumulada Región Llanos';
	// let acum_nucleos_hora_lla;
	// generarGrafica(data10, contenedor10, valor10, titulo10, acum_nucleos_hora_lla);	

	// let data11 = @json($nucleos_hora_ori);
	// let contenedor11 = 'grf-nucleoshoracanori';
	// let valor11 = 'cant';
	// let titulo11 = 'Movilización Región Oriente';
	// let cant_nucleos_hora_ori;
	// generarGrafica(data11, contenedor11, valor11, titulo11, cant_nucleos_hora_ori);	
	// let data12 = @json($nucleos_hora_ori);
	// let contenedor12 = 'grf-nucleoshoraacuori';
	// let valor12 = 'acumulado';
	// let titulo12 = 'Movilización acumulada Región Oriente';
	// let acum_nucleos_hora_ori;
	// generarGrafica(data12, contenedor12, valor12, titulo12, acum_nucleos_hora_ori);	

	// let data13 = @json($nucleos_hora_sur);
	// let contenedor13 = 'grf-nucleoshoracansur';
	// let valor13 = 'cant';
	// let titulo13 = 'Movilización Región Sur';
	// let cant_nucleos_hora_sur;
	// generarGrafica(data13, contenedor13, valor13, titulo13, cant_nucleos_hora_sur);	
	// let data14 = @json($nucleos_hora_sur);
	// let contenedor14 = 'grf-nucleoshoraacusur';
	// let valor14 = 'acumulado';
	// let titulo14 = 'Movilización acumulada Región Sur';
	// let acum_nucleos_hora_sur;
	// generarGrafica(data14, contenedor14, valor14, titulo14, acum_nucleos_hora_sur);	

	/// MOVILIZACION HORA
    var movilizacion = @json($movilizacion);
    var max_hora_movilizacion = @json($max_hora_movilizacion);
    var el = document.getElementById('grf-resumen-hora');
    var categories = movilizacion.map(item => item.hora);
    var cantidadData = movilizacion.map(item => item.cant);
    var acumuladoData = movilizacion.map(item => parseInt(item.acumulado));
    var data = {
        categories: categories,
        series: [
            {
                name: 'Cantidad',
                data: cantidadData,
            },
            {
                name: 'Acumulado',
                data: acumuladoData,
            },
        ],
    };
	var theme = {
		series: {
			lineWidth: 5,
			colors: ['#4407ed', '#012e7a'],
			dataLabels: {
				fontFamily: 'arial',
				fontSize: 10,
				fontWeight: 'bold',
				useSeriesColor: false,
				textBubble: {
					visible: true,
					paddingY: 3,
					paddingX: 6,
					arrow: {
						visible: true,
						width: 5,
						height: 5,
						direction: 'bottom'
					}
				}
			}
		},	
		exportMenu: {
			button: {
				backgroundColor: '#000000',
				borderRadius: 5,
				borderWidth: 2,
				borderColor: '#000000',
				xIcon: {
					color: '#ffffff',
					lineWidth: 3,
				},
				dotIcon: {
					color: '#ffffff',
					width: 10,
					height: 3,
					gap: 1,
				},
			},
		},		
	}
	var nomarch = obtenerFechaHoraActual()+" Movilización por hora"
    var options = {
        chart: { title: 'Movilización acumulada por hora a las '+max_hora_movilizacion, width: 1000, height: 500 },
        xAxis: {
            title: 'Hora',
        },
        yAxis: {
            title: 'Cantidad',
        },
        tooltip: {
            grouped: true,
        },
        legend: {
            align: 'bottom',
        },
		exportMenu: {
			filename: nomarch
		},
		series: {
			spline: true,
			dataLabels: { 
				visible: true, 
				offsetY: -10 
			},
		},
		theme,
    };
    var chart = toastui.Chart.lineChart({ el, data, options });
	// // /////////MOVILIZACION NUCLEOS
	var nucleos = @json($nucleos);
	var max_hora_nucleos = @json($max_hora_nucleos);
	var el = document.getElementById('grf-nucleos');
	var series = [];
	nucleos.forEach(function(item) {
		series.push({
			name: item.nucleo,
			data: [parseInt(item.acumulado)],
			dataLabels: {
				visible: true,
				formatter: function(value, category, series) {
					return series.name + ': ' + value;
				}
			}
		});
	});
	var data = {
		categories: ['Acumulado'],
		series: series,
	};
	var theme = {
		series: {
			dataLabels: {
				fontSize: 13,
				fontWeight: 500,
				color: '#000',
				textBubble: { visible: true, arrow: { visible: true } },
			},
		},
		exportMenu: {
			button: {
				backgroundColor: '#000000',
				borderRadius: 5,
				borderWidth: 2,
				borderColor: '#000000',
				xIcon: {
					color: '#ffffff',
					lineWidth: 3,
				},
				dotIcon: {
					color: '#ffffff',
					width: 10,
					height: 3,
					gap: 1,
				},
			},
		},
	};
	var nomarch = obtenerFechaHoraActual()+" Movilización por territorio a las "+max_hora_nucleos
	var options = {
		chart: { title: 'Movilización acumulada por territorio a las '+max_hora_nucleos, width: 1200, height: 1000 },
		series: {
          selectable: true,
          dataLabels: {
            visible: true,
          },
        },
		xAxis: {
			title: 'Núcleo',
		},
		yAxis: {
			title: 'Acumulado',
		},
		tooltip: {
			grouped: true,
		},
		legend: {
			align: 'bottom',
		},
		exportMenu: {
			filename: nomarch
		},
		theme,
	};
	var chart2 = toastui.Chart.barChart({ el, data, options });
	/////////MOVILIZACION ESTADOS
	var estados = @json($estados);
	var max_hora_estados = @json($max_hora_estados);
	var el = document.getElementById('grf-estados');
	var series = [];
	estados.forEach(function(item) {
		series.push({
			name: item.estado,
			data: [parseInt(item.acumulado)],
			dataLabels: {
				visible: true,
				formatter: function(value, category, series) {
					return series.name + ': ' + value;
				}
			}
		});
	});
	var data = {
		categories: ['Acumulado'],
		series: series,
	};
	var theme = {
		series: {
			dataLabels: {
				fontSize: 13,
				fontWeight: 500,
				color: '#000',
				textBubble: { visible: true, arrow: { visible: true } },
			},
		},
		exportMenu: {
			button: {
				backgroundColor: '#000000',
				borderRadius: 5,
				borderWidth: 2,
				borderColor: '#000000',
				xIcon: {
					color: '#ffffff',
					lineWidth: 3,
				},
				dotIcon: {
					color: '#ffffff',
					width: 10,
					height: 3,
					gap: 1,
				},
			},
		},
	};
	var nomarch = obtenerFechaHoraActual()+" Movilización por estado a las "+max_hora_estados
	var options = {
		chart: { title: 'Movilización acumulada por estado'+max_hora_estados, width: 800, height: 1000 },
		series: {
          selectable: true,
          dataLabels: {
            visible: true,
          },
        },
		xAxis: {
			title: 'estado',
		},
		yAxis: {
			title: 'Acumulado',
		},
		tooltip: {
			grouped: true,
		},
		legend: {
			align: 'bottom',
		},
		exportMenu: {
			filename: nomarch
		},
		theme,
	};
	var chart3 = toastui.Chart.barChart({ el, data, options });
	/////////MOVILIZACION TIPOS
	var tipos = @json($tipos);
	var max_hora_tipos = @json($max_hora_tipos);
	var el = document.getElementById('grf-tipos');
	var series = [];
	tipos.forEach(function(item) {
		series.push({
			name: item.tipo,
			data: [parseInt(item.acumulado)],
			dataLabels: {
				visible: true,
				formatter: function(value, category, series) {
					return series.name + ': ' + value;
				}
			}
		});
	});
	var data = {
		categories: ['Acumulado'],
		series: series,
	};
	var theme = {
		series: {
			dataLabels: {
				fontSize: 13,
				fontWeight: 500,
				color: '#000',
				textBubble: { visible: true, arrow: { visible: true } },
			},
		},
		exportMenu: {
			button: {
				backgroundColor: '#000000',
				borderRadius: 5,
				borderWidth: 2,
				borderColor: '#000000',
				xIcon: {
					color: '#ffffff',
					lineWidth: 3,
				},
				dotIcon: {
					color: '#ffffff',
					width: 10,
					height: 3,
					gap: 1,
				},
			},
		},
	};
	var nomarch = obtenerFechaHoraActual()+" Movilización por tipo de elector a las "+max_hora_tipos
	var options = {
		chart: { title: 'Movilización acumulada por elector'+max_hora_tipos, width: 800, height: 1000 },
		series: {
          selectable: true,
          dataLabels: {
            visible: true,
          },
        },
		xAxis: {
			title: 'estado',
		},
		yAxis: {
			title: 'Acumulado',
		},
		tooltip: {
			grouped: true,
		},
		legend: {
			align: 'bottom',
		},
		exportMenu: {
			filename: nomarch
		},
		theme,
	};
	var chart4 = toastui.Chart.barChart({ el, data, options });

	function generarGrafica(data, contenedor, valor, titulo, var_graf) {
		var series1 = null;
		var nucleosHora = data;
		var el = document.getElementById(contenedor);
		var horasUnicas = [...new Set(nucleosHora.map(item => item.hora))];
		var seriesData = {};
		nucleosHora.forEach(item => {
			if (!seriesData[item.nucleo]) {
			seriesData[item.nucleo] = {
				name: item.nucleo,
				data: [],
			};
			}
			var index = horasUnicas.findIndex(hora => hora === item.hora);
			seriesData[item.nucleo].data[index] = parseInt(item[valor]);
		});
		series1 = Object.values(seriesData);
		var graficaData = {
			categories: horasUnicas,
			series: series1
		};
		var options = {
			chart: { title: titulo, width: 1100, height: 500 },
			xAxis: {
			title: 'Hora',
			},
			yAxis: {
			title: 'Cantidad',
			},
			tooltip: {
			grouped: true,
			},
			legend: {
			align: 'bottom',
			},
			exportMenu: {
			filename: obtenerFechaHoraActual() + " " + titulo
			},
			series: {
			spline: true,
			selectable:true,
			dataLabels: {
				visible: true,
				offsetY: -10
			},
			},
			theme: {
			series: {
				lineWidth: 5,
				dataLabels: {
				fontFamily: 'arial',
				fontSize: 10,
				fontWeight: 'bold',
				useSeriesColor: false,
				textBubble: {
					visible: true,
					paddingY: 3,
					paddingX: 6,
					arrow: {
					visible: true,
					width: 5,
					height: 5,
					direction: 'bottom'
					}
				}
				}
			},
			exportMenu: {
				button: {
				backgroundColor: '#000000',
				borderRadius: 5,
				borderWidth: 2,
				borderColor: '#000000',
				xIcon: {
					color: '#ffffff',
					lineWidth: 3,
				},
				dotIcon: {
					color: '#ffffff',
					width: 10,
					height: 3,
					gap: 1,
				},
				},
			},
			}
		};
		var_graf = toastui.Chart.lineChart({ el, data: graficaData, options });
	}
	function obtenerFechaHoraActual() {
		let fecha = new Date();
		let dia = String(fecha.getDate()).padStart(2, '0');
		let mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan en 0
		let año = fecha.getFullYear();
		let horas = String(fecha.getHours()).padStart(2, '0');
		let minutos = String(fecha.getMinutes()).padStart(2, '0');
		let segundos = String(fecha.getSeconds()).padStart(2, '0');
		let fechaFormateada = año + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos;
		return fechaFormateada;
	}
});	


</script>
@stop