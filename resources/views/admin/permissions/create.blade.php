@extends('adminlte::page')
@section('title','Crear roles')
@section('content_header')
    <h1 class="m-0 text-dark">Crear permisos</h1>
@stop

@section('content')
    <div class="card">
        @if (session('info'))
            <div class="alert alert-success">
                {{session('info')}}
            </div>
        @endif
        <form action="{{route('admin.permissions.store')}}" method="post">
            @csrf
            <div class="form-group ml-3">
                <label >Nombre</label>
                <input type="text" name="description" id="" class="form-control" placeholder="Ingrese el nombre del permiso">
                @error('description')
                <small class="text-danger">
                    {{$$message}}
                </small>
                @enderror
            </div>
            <div class="form-group ml-3">
                <label >Ruta</label>
                <input type="text" name="name" id="" class="form-control" placeholder="Ingrese ruta del permiso">
                @error('name')
                <small class="text-danger">
                    {{$$message}}
                </small>
                @enderror
            </div>
            <div class="d-flex justify-content-start">
                <input type="submit" value="Crear Permiso" class="btn btn-sm btn-primary me-auto me-0 mt-3">
            </div>
        </form>
    </div>
@stop
@section('css')
@stop
@section('js')
@stop