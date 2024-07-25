<hr>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6">
            <div class="table-container">
                <table 
                    id="tbl-mov-tra" 
                    class="table table-hover" 
                    data-toolbar="#toolbar"
                    data-toggle="table" 
                    data-url="{{route('elect_gen_tra')}}" 
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
                    data-show-print="true" 
                    data-locale="es-VE"
                    data-search-accent-neutralise="true"
                    data-show-refresh="true"
                >
                    <thead>
                        <tr>
                            <th colspan="4">MOVILIZACIÓN TRABAJADORES</th>
                        </tr>
                        <tr>
                            <th data-field="tipo">TIPO</th>
                            <th data-field="total_movilizados">MOVILIZDOS</th>
                            <th data-field="total_pormovilizar">POR MOVILIZAR</th>
                            <th data-field="total">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
            <div class="card-body">
                <button id="fullscreenBtnGr2"  class = "btn btn-dark text-light" title="expandir gráfico"><i class="fas fa-expand-alt"></i></button>
                <div id="gr-mov-tra" dir="ltr" style="display:flex;justify-content:center;">
                </div>
             </div>
        </div>
    </div>