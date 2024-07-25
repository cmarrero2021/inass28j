<script>
        $(document).ready(function(){
            setTimeout(function(){
                console.log("act");
                location.reload();
            }, 300000); // 300000 milisegundos = 5 minutos
        });        
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

        /// MOVILIZACION HORA
        var movilizacion = @json($movilizacion_hora);
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
        var nomarch = obtenerFechaHoraActual()+" Movilización general por hora"
        var options = {
            chart: { title: 'Movilización general acumulada por hora', width: 1000, height: 500 },
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
	var nomarch = obtenerFechaHoraActual()+" Movilización por territorio"
	var options = {
		chart: { title: 'Movilización acumulada por territorio', width: 1000, height: 900 },
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
	var nomarch = obtenerFechaHoraActual()+" Movilización por estado"
	var options = {
		chart: { title: 'Movilización acumulada por estado', width: 800, height: 1000 },
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
</script>
