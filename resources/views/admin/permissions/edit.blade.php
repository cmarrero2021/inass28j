@extends('adminlte::page')
@section('title','Editar roles')
@section('content_header')
    <h1 class="m-0 text-dark">Editar permisos</h1>
@stop
@section('content')
    @if (session('info'))
        <div class="alert alert-success">
            {{session('info')}}
        </div>
    @endif
    <form action="{{ route('admin.permissions.update', $permissions->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group ml-3">
                <label >Nombre</label>
                <input type="text" name="description" id="" class="form-control" placeholder="Ingrese el nombre del permiso" value="{{$permissions->description}}">
                @error('description')
                <small class="text-danger">
                    {{$$message}}
                </small>
                @enderror
            </div>
            <div class="form-group ml-3">
                <label >Ruta</label>
                <input type="text" name="name" id="" class="form-control" placeholder="Ingrese ruta del permiso" value="{{$permissions->name}}">
                @error('name')
                <small class="text-danger">
                    {{$$message}}
                </small>
                @enderror
            </div>        
        <div class="d-flex justify-content-start">
            <input type="submit" value="Editar Permiso" class="btn btn-sm btn-primary me-auto me-0 mt-3">
        </div>        
    </form>
@stop
@section('css')
@stop
@section('js')
@stop