@php
    $n=0;
    $m = 0;
    $colores = [
        'bg-primary',
        'bg-success',
        'bg-naranja',
        'bg-info',
        'bg-dark',
        'bg-danger',
        'bg-malva',
        'bg-light',
        'bg-warning',
    ];
@endphp
@foreach ($movilizacion as $movi)
    @if ($n==0)
        <div class="row">
    @endif
    @if ($n<3)
        <div class="col-xs-12 col-sm-12 col-md-4">
            @php
                if ($m > 8)
                    $m = 0;
            @endphp               
            <div class="card text-white {{$colores[$m]}} mb-3 mr-3 border-dark shadow-lg rounded">
                <div class="card-header">{{$movi['territorio']}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <ul>
                        <li><h3>Total: {{ number_format($movi['total'], 0, ',', '.') }}</h3></li>
                        <li><h3>Movilizados: {{ number_format($movi['movilizados'], 0, ',', '.')}}</h3></li>
                        <li><h3>Por Movilizar: {{ number_format($movi['por_movilizar'], 0, ',', '.')}}</h3></li>
                    </ul>
                </div>
            </div>            
        </div>
        @if ($n==2)
            </div>
            @php
                $n = 0;
            @endphp
        @else
            @php
                $n++;
            @endphp
        @endif
    @endif
    @if ($m > 8)
        @php
            $m = 0;
        @endphp
    @else
        @php
            $m++;
        @endphp
    @endif        
@endforeach
</div>
@include("dashboard.partials.mov-gen")
@include('graficos.partials.nucleos')   
@include('movilizacion.partials.resumen') 
@include('graficos.partials.resumen') 
@include("dashboard.partials.estados")
@include('graficos.partials.estados')
