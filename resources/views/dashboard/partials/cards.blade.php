<div class="card text-white bg-primary mb-3 mr-3 border-dark shadow-lg rounded">
        <div class="card-header">Movilización Trabajadores</div>
        <div class="card-body">
            <h5 class="card-title"></h5>
            <ul>
                <li><h3>Total: {{ number_format($movilizacion[0]->total, 0, ',', '.') }}</h3></li>
                <li><h3>Movilizados: {{ number_format($movilizacion[0]->total_movilizados, 0, ',', '.')}}</h3></li>
                <li><h3>Por Movilizar: {{ number_format($movilizacion[0]->total_pormovilizar, 0, ',', '.')}}</h3></li>
            </ul>
        </div>
    </di>
</div>