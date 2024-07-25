function casosFormatter(value) {
    if (value >= 1000) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
        return value;
    }
}
var jsonData2 = JSON.parse(jsonData21);
var jsonData3 = JSON.parse(jsonData31);
$('#municipio-estatus').bootstrapTable({
    data: jsonData2,
    search: true,
});
$('#tnl-genero').bootstrapTable({
    data: jsonData3
});    
var categories = [...new Set(jsonData2.map(item => item.municipio))];
var series = [...new Set(jsonData2.map(item => item.estatus))];
var data = {
    categories: categories,
    series: series.map(function(estatus) {
        var color;
        switch (estatus) {
            case 'EN PROCESO':
                color = '#FFA500';
                break;
            case 'ASIGNADO':
                color = '#0000FF';
                break;
            case 'ATENDIDO':
                color = '#008000';
                break;
            case 'POR SOLUCIONAR':
                color = '#FF0000';
                break;
            default:
                color = '#000000';
        }
        return {
            name: estatus,
            data: categories.map(function(municipio) {
                var matchingData = jsonData2.find(item => item.estatus === estatus && item.municipio === municipio);
                return matchingData ? matchingData.total_casos : 0;
            }),
            color: color
        };
    })
};
var container = document.getElementById('casos-municipios-status');
var maxXValue = Math.max(...jsonData2.map(item => item.total_casos));
var options = {
    chart: {
        width: container.offsetWidth,
        height: 380,
        title: {
            text: 'Casos por municipio y estatus',
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: true,
        },         
        format: '1,000'
    },
    yAxis: {
        title: 'Casos'
    },
    xAxis: {
        title: 'Cantidad',
        min: 0,
        max: maxXValue,
    },
    series: {
        showLabel: false
    }
};
var theme = {
    chart: {
        background: {
            color: '#fff',
            opacity: 0
        }
    },
    title: {
        color: '#000',
        fontSize: 28,
        fontWeight: 'bold',
    },
    xAxis: {
        title: {
            color: '#000000'
        },
        label: {
            color: '#000000'
        },
        tickColor: '#000000'
    },
    yAxis: {
        title: {
            color: '#000000'
        },
        label: {
            color: '#000000'
        },
        tickColor: '#000000'
    },
    plot: {
        lineColor: 'rgba(166, 176, 207, 0.1)'
    },
    legend: {
        label: {
            color: '#000000'
        }
    }
};
tui.chart.registerTheme('myTheme', theme);
options.theme = 'myTheme';
var barChart = tui.chart.barChart(container, data, options);
window.onresize = function () {
    barChart.resize({
        width: container.offsetWidth,
        height: 350
    });
};
///////////GENERO
var container = document.getElementById('grf-genero');
var data = {
    categories: ['Genero'],
    series: jsonData3.map(item => ({
        name: item.genero,
        data: item.cant,
        // color: item.genero === 'MASCULINO' ? '#0000FF' : '#FF0000' // Azul para MASCULINO y Rojo para FEMENINO
        
    }))
};
var options2 = {
    chart: {
        title: {
            text: 'Distribución por género',
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: true,
        },
        format: function format(value, chartType, areaType, valuetype, legendName) {
        if (areaType === 'makingSeriesLabel') {
            value = value + ' CASOS';
        }
        return value;
        }
    },
    series: {
        radiusRange: ['40%', '100%'],
        showLabel: true,
        color: function(colorTheme) {
        return colorTheme.itemIndex === 0 ? '#00FFFF' : '#FF0000'; // Azul para MASCULINO y Rojo para FEMENINO
        }    
    },
    tooltip: {
        suffix: ' CASOS'
    },
    legend: {
        color:'#000000',
        align: 'bottom'
    }  
    };
    var theme2 = {
        chart: {
            background: {
            color: '#fff',
            opacity: 0
        },
        
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000'
    },
    plot: {
        lineColor: 'rgba(166, 176, 207, 0.1)'
    },
    legend: {
        label: {
            fontSize:'18px',
            color: '#000',
            fontFamily: 'sans-serif',
            fontWeight: 'bold'
        }
    },
    series: {
        colors: ['#4f90f7','#f28383'],
        lineWidth: 2,
        strokeStyle: '#000',
        shadowColor: '#fff',
        label: {
            fontSize:'48px',
            color: '#000',
            fontWeight: 'bold'
        }
    }
};

tui.chart.registerTheme('myTheme', theme2);
options2.theme = 'myTheme';
var donutChart = tui.chart.pieChart(container, data, options2);
///////////////

