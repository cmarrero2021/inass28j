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
            id="tbl-estados" 
            class="table table-hover" 
            data-toolbar="#toolbar"
            data-toggle="table" 
            data-show-columns="true" 
            data-url="{{route('movilizacion_estado')}}" 
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
                    <th colspan="4">MOVILIZACIÓN POR ESTADO</th>
                </tr>
                <tr>
                    <th data-field="estado" data-filter-control="select" data-sortable="true">ESTADO</th>
                    <th data-field="movilizados" data-sortable="true">MOVILIZADOS</th>
                    <th data-field="por_movilizar" data-sortable="true">POR MOVILIZAR</th>
                    <th data-field="total" data-sortable="true">TOTAL</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>