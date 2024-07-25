@extends('adminlte::page')
@section('title','Crear roles')
@section('content_header')
    <h1 class="m-0 text-dark">Crear roles</h1>
@stop

@section('content')
    <div class="card">
        @if (session('info'))
            <div class="alert alert-success">
                {{session('info')}}
            </div>
        @endif
        <form action="{{route('admin.roles.store')}}" method="post">
            @csrf
            <div class="form-group ml-3">
                <label >Nombre</label>
                <input type="text" name="name" id="" class="form-control" placeholder="Ingrese el nombre del rol">
                @error('name')
                <small class="text-danger">
                    {{$$message}}
                </small>
                @enderror
            </div>
            <h2 class="h3">Listado de Permisos</h2>
            @foreach ($permissions as $permission)
                <div>
                    <input type="checkbox" name="permissions[{{$permission->name}}]" id="{{$permission->name}}" class="mr-1">
                    {{$permission->description}}
                </div>
            @endforeach
            <div class="d-flex justify-content-start">
                <input type="submit" value="Crear Rol" class="btn btn-sm btn-primary me-auto me-0 mt-3">
            </div>
        </form>
    </div>
@stop
@section('css')
@stop
@section('js')
@stop