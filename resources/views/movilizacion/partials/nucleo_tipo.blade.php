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
            id="tbl-nucleotipo" 
            class="table table-hover" 
            data-toolbar="#toolbar"
            data-toggle="table" 
            data-show-columns="true" 
            data-url="{{route('movilizacion_nucleo_tipo')}}" 
            data-side-pagination="server" 
            data-pagination="true" 
            data-page-list="[24, 48, 72,  96, 'All']" 
            data-page-size-options='["24", "48", "72", "96", "Todos"]' 
            data-custom-all-text="Todos"
            data-page-size-func="pageSizeFunc"
            data-page-size="24" 
            data-show-export="true" 
            data-export-data-type="all" 
            data-export-types="['csv', 'json', 'excel']" 
            data-show-fullscreen="true" 
            data-show-search-clear-button="true" 
            data-show-print="true" 
            data-locale="es-VE"
            data-search="true"
            data-search-accent-neutralise="true"
            data-show-refresh="true"
        >
            <thead>
                <tr>
                    <th colspan="5">MOVILIZACIÓN POR NÚCLEO Y TIPO</th>
                </tr>
                <tr>
                    <th data-field="nucleo" data-filter-control="select" data-sortable="true">NÚCLEO</th>
                    <th data-field="tipo_elector" data-filter-control="select" data-sortable="true">TIPO</th>
                    <th data-field="hora" data-sortable="true">HORA</th>
                    <th data-field="cant" data-sortable="true">CANT.</th>
                    <th data-field="acumulado" data-sortable="true">ACUMULADO</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>