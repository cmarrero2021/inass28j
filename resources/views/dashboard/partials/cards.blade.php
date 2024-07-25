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
                    <div class="card-header">{{ucwords(str_replace('_', ' ', $movi['tipo']))}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                        <ul>
                            <li><h3>Total: {{ number_format($movi['total'], 0, ',', '.') }}</h3></li>
                            @if ($movi['total_movilizados'] !==NULL)
                                <li><h3>Movilizados: {{ number_format($movi['total_movilizados'], 0, ',', '.')}}</h3></li>
                                <li><h3>Por Movilizar: {{ number_format($movi['total_pormovilizar'], 0, ',', '.')}}</h3></li>
                            @else
                                <h3>&nbsp;</h3>
                                <h3>&nbsp;</h3><br/>

                            @endif
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
        @else            @php
                $m++;
            @endphp
        @endif        
    @endforeach




