<hr>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="table-container">
                <table 
                    id="tbl-mov-gen" 
                    class="table table-hover table-striped" 
                    data-toolbar="#toolbar"
                    data-toggle="table" 
                    data-url="{{route('elect_gen_mov')}}" 
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
                            <th colspan="4">MOVILIZACIÓN GENERAL</th>
                        </tr>
                        <tr>
                            <th data-field="territorio">TERRITORIO</th>
                            <th data-field="movilizados">MOVILIZADOS</th>
                            <th data-field="por_movilizar">POR MOVILIZAR</th>
                            <th data-field="total">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="card-body">
                <button id="fullscreenBtnGr1"  class = "btn btn-dark text-light" title="expandir gráfico"><i class="fas fa-expand-alt"></i></button>
                <div id="grf-mov-gen" dir="ltr" style="display:flex;justify-content:center;">
                </div>
             </div>
        </div>
    </div>