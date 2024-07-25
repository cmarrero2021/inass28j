@extends('adminlte::page')
@section('title','Listar permisos')
@section('content_header')
    @can('admin.permissions.create')
        <a href="{{route('admin.permissions.create')}}" class="btn btn-sm btn-success float-right" title="Crear permiso"><i class="fas fa-plus mr-3"></i>Crear permiso</a>
    @endcan
    <h1 class="m-0 text-dark">Listar permisos</h1>
    <div class="card">
        @php
        if(isset($permiso)) {
            $permissions = json_decode(json_encode($permiso));
        }
        @endphp
        <form action="{{ route('admin.permissions.search') }}" method="POST" id="search-form">
            @csrf
            <div class="input-group mb-3">
                <input type="text" class="form-control" name="search" id="search" placeholder="Buscar usuarios..." value="{{ request()->input('search') }}">
                <div class="input-group-append">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-search"></i>
                    </button>
                    <button type="button" class="btn btn-danger search-clear" onclick="clearSearch()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            @if ( isset($cantRegistros) && $cantRegistros == 0)
                <div id ="sin_resultados" class="alert alert-danger">No se encontraron coincidencias</div>;
            @endif
        </form>      
@stop
@section('content')
    @if (session('info'))
        <div class="alert alert-danger">
            {{session('info')}}
        </div>
    @endif
    <div class="card">
        <div class="card-body">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th colspan="2"></th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Ruta</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($permissions as $permission)
                    <tr>
                        <td width="10px">
                            <form action="{{route('admin.permissions.edit',$permission->id)}}" method="GET">
                                @csrf
                                @can('admin.permissions.edit')
                                    <button type="submit" class="btn btn-sm btn-primary float-right" title="Editar permiso">
                                        <i class="fas fa-edit"></i>
                                    </button>                                
                                @endcan
                            </form>                            
                        </td>
                        <td width="10px">
                            <form action="{{route('admin.permissions.destroy',$permission->id)}}" method="POST">
                                @csrf
                                @can('admin.permissions.edit')
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-danger float-right" title="Eliminar rol">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                @endcan
                            </form>
                        </td>
                        <td>{{$permission->id}}</td>
                        <td>{{$permission->description}}</td>
                        <td>{{$permission->name}}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop
@section('css')
@stop
@section('js')
<script>
    document.querySelector('.search-clear').addEventListener('click', function() {
        document.querySelector('#search').value = '';
        document.querySelector('#search-form').submit();
        let div = document.getElementById('sin_resultados'); // Obtener el div por su id
        div.parentNode.removeChild(div); // Eliminar el div del DOM    
    });
</script>
@stop