<div>
    Mostrando desde {{ $paginator->firstItem() }} hasta {{ $paginator->lastItem() }} de {{ $paginator->total() }} registros
</div>    
<div class="pagination">
    @if ($paginator->onFirstPage())
        <button type="button" class="page-link disabled" disabled>
            <strong>&lt;</strong>
        </button>
    @else
        <button type="button" class="page-link" onclick="location.href='{{ $paginator->previousPageUrl() }}'" rel="prev"><strong>&lt;</strong></button>
    @endif
    @foreach ($elements as $element)
        @if (is_string($element))
            <span>{{ $element }}</span>
        @endif
        @if (is_array($element))
            @foreach ($element as $page => $url)
                @if ($page == $paginator->currentPage())
                    <button type="button" class="page-link current">{{ $page }}</button>
                @else
                    <button type="button" class="page-link" onclick="location.href='{{ $url }}'">{{ $page }}</button>
                @endif
            @endforeach
        @endif
    @endforeach
    @if ($paginator->hasMorePages())
        <button type="button" class="page-link" onclick="location.href='{{ $paginator->nextPageUrl() }}'" rel="next"><strong>&gt;</strong></button>
    @else
        <button type="button" class="page-link disabled" disabled>
            <strong>&gt;</strong>
        </button>    
    @endif
</div>