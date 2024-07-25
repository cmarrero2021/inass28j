@extends('adminlte::page')
@section('title','Editar roles')
@section('content_header')
    <h1 class="m-0 text-dark">Editar roles</h1>
@stop

@section('content')
    @if (session('info'))
        <div class="alert alert-success">
            {{session('info')}}
        </div>
    @endif
    <form action="{{ route('admin.roles.update', $role->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group ml-3">
            <label >Nombre</label>
            <input type="text" name="name" id="" class="form-control" placeholder="Ingrese el nombre del rol" value="{{$role->name}}">
            @error('name')
            <small class="text-danger">
                {{$$message}}
            </small>
            @enderror
        </div>
        <h2 class="h3">Listado de Permisos</h2>
        @foreach ($permissions as $permission)
            <div>
                <input type="checkbox" name="permissions[{{$permission->id}}]" id="{{$permission->id}}" class="mr-1" {{ in_array($permission->id, array_column($permisos, 'permission_id')) ? 'checked' : '' }}>{{$permission->description}}                
            </div>
        @endforeach        
        <div class="d-flex justify-content-start">
            <input type="submit" value="Editar Rol" class="btn btn-sm btn-primary me-auto me-0 mt-3">
        </div>        
    </form>
@stop
@section('css')
@stop
@section('js')
@stop