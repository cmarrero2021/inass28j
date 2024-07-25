<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;
class PermissionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct() {
        $this->middleware('can:admin.permissions.index')->only('index');
        $this->middleware('can:admin.permissions.edit')->only('edit');
        $this->middleware('can:admin.permissions.create')->only('create');
        $this->middleware('can:admin.permissions.show')->only('show');
        $this->middleware('can:admin.permissions.destroy')->only('destroy');
    }    
    public function index()
    {
        $permissions = Permission::all();
        return view('admin.permissions.index',compact('permissions'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $permissions = Permission::all();
        // return view('admin.roles.create',compact('permissions'));
        return view('admin.permissions.create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
    
        ]);        
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();   
        }
        $permission = Permission::create($request->all());
        return redirect()->route('admin.permissions.edit',$permission)->with('info','Permiso creado exitosamente');

    }

    /**
     * Display the specified resource.
     */
    public function show(Permission $permission)
    {
        return view('admin.roles.show',compact('permission'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Permission $permission)
    public function edit($id)
    {
        $permissions = Permission::find($id);
        return view('admin.permissions.edit',compact('permissions'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $permission = Permission::find($id);
        $permission->update($request->all());
        return redirect()->route('admin.permissions.edit',$permission)->with('info','Permiso actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $permission = Permission::find($id);
        $permission->delete();
        return redirect()->route('admin.permissions.index',$permission)->with('info','Permiso eliminado exitosamente');

    }
    public function search(Request $request)
    {
        $permission = Permission::all();
        $recordsPerPage = $request->input('recordsPerPage', isset($request->recordsPerPage)?isset($request->recordsPerPage):10);
        $search = $request->input('search');
        $permissionsQuery = Permission::where('description','like',"%".$request->search."%")->orWhere('name','like',"%".$request->search."%");
        $permisologia = $permissionsQuery->get();
        $permisos = $recordsPerPage === 'all' ? $permissionsQuery->get() : $permissionsQuery->paginate($recordsPerPage);
        $permiso = [];
        foreach ($permisologia as $perm) {
            $permiso[] = [
                'id' => $perm->id,
                'name' => $perm->name,
                'description' => $perm->description,
            ];
        }
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $collection = collect($permission);
        $cantRegistros = count($permiso);
        $perPage = $recordsPerPage === 'all' ? $collection->count() : $recordsPerPage;
        $results = $collection->slice(($currentPage - 1) * $perPage, $perPage)->values();
        $paginatedResults = new LengthAwarePaginator($results, $collection->count(), $perPage, $currentPage, ['path' => LengthAwarePaginator::resolveCurrentPath()]);
        session(['current_page' => $request->input('current_page', 1)]);
        return view('admin.permissions.index', compact('permiso', 'cantRegistros', 'recordsPerPage', 'search', 'paginatedResults'));
    }
}
