<div class="table-container">
        <table 
            id="tbl-movilizacion-todo-est" 
            class="table table-hover" 
            data-toolbar="#toolbar"
            data-toggle="table" 
            data-url="{{route('movilizacion_hora_est')}}" 
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
                    <th colspan="3"><h2>Resúmen Movilización Estudiantes</h2></th>
                </tr>
                <tr>
                    <th data-field="hora" >HORA</th>
                    <th data-field="cant">CANTIDAD</th>
                    <th data-field="acumulado">ACUMULADO</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>