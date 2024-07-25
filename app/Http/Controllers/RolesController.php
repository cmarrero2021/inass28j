<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Spatie\Permission\Contracts\Permission;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;

class RolesController extends Controller
{
    public function __construct() {
        $this->middleware('can:admin.roles.index')->only('index');
        $this->middleware('can:admin.roles.edit')->only('edit');
        $this->middleware('can:admin.roles.create')->only('create');
        $this->middleware('can:admin.roles.show')->only('show');
        $this->middleware('can:admin.roles.destroy')->only('destroy');
    }
    public function index()
    {
        $roles = Role::all();
        return view('admin.roles.index',compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::all();
        return view('admin.roles.create',compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'permissions' => 'array|min:1',
    
        ]);        
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();   
        }
        $permissionsArray = [];
        foreach ($request->permissions as $key => $value) {
            $permissionsArray = array_merge($permissionsArray, array_flip([$key => $key]));
        }
        $permissionsList = array_values($permissionsArray);
        $role = Role::create($request->all());
        $role->syncPermissions($permissionsList);
        return redirect()->route('admin.roles.edit',$role)->with('info','Rol creado exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        return view('admin.roles.show',compact('role'));
    }

    public function edit(Role $role)
    {
        $permissions = Permission::all();
        $rol_id = $role->id;
        $permisos=DB::table('role_has_permissions')->where('role_id','=',$rol_id)->get()->toArray();
        return view('admin.roles.edit',compact('role','permissions','permisos'));
    }

    public function update(Request $request, Role $role)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'permissions' => 'array|min:1',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $permissionsArray = [];
        foreach ($request->permissions as $key => $value) {
            $permissionsArray = array_merge($permissionsArray, array_flip([$key => $key]));
        }
        $permissionsList = array_values($permissionsArray);
        $role = Role::find($role->id);
        $role->update($request->all());
        $role->permissions()->sync($permissionsList);
    
        return redirect()->route('admin.roles.edit',$role)->with('info','Rol creado exitosamente');
    }    
    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('admin.roles.index',$role)->with('info','Rol eliminado exitosamente');
    }
    public function assign(Request $request, $id) {
        $role = Role::findOrFail($id);
        $name = $role->name;
        $recordsPerPage = $request->input('recordsPerPage', isset($request->recordsPerPage)?isset($request->recordsPerPage):10); // Valor por defecto es 10
        $usersQuery = User::with('roles');
        $users = $recordsPerPage === 'all' ? $usersQuery->get() : $usersQuery->paginate($recordsPerPage);
        $roles = [];
        $search = null;
        foreach ($users as $user) {
            $assigned = $user->roles->contains($role);
            $roles[] = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'assigned' => $assigned,
                'role' => $role,
            ];
        }
        return view('admin.roles.assign', compact('id','name', 'roles','users','recordsPerPage','search'));
    }
    public function search(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $name = $role->name;
        $recordsPerPage = $request->input('recordsPerPage', isset($request->recordsPerPage)?isset($request->recordsPerPage):10);
        $search = $request->input('search');
        $usersQuery = User::with('roles');
        if ($search) {
            $usersQuery->where('name', 'ilike', "%{$search}%")
                        ->orWhere('email', 'ilike', "%{$search}%");
        }
        $users = $recordsPerPage === 'all' ? $usersQuery->get() : $usersQuery->paginate($recordsPerPage);
        $roles = [];
        foreach ($users as $user) {
            $assigned = $user->roles->contains($role);
            $roles[] = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'assigned' => $assigned,
                'role' => $role,
            ];
        }
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $collection = collect($roles);
        $perPage = $recordsPerPage === 'all' ? $collection->count() : $recordsPerPage;
        $results = $collection->slice(($currentPage - 1) * $perPage, $perPage)->values();
        $paginatedResults = new LengthAwarePaginator($results, $collection->count(), $perPage, $currentPage, ['path' => LengthAwarePaginator::resolveCurrentPath()]);
        session(['current_page' => $request->input('current_page', 1)]);
        return view('admin.roles.assign', compact('id','name', 'roles','users','recordsPerPage', 'search', 'paginatedResults'));
    }
    public function rol2user(Request $request)
    {
        $rolesArray = $request->users;
        $roles = collect($rolesArray)->map(function ($roleId, $userId) {
            $role = Role::findById($roleId);
            return [
                'model_id' => $userId,
                'model_type' => config('permission.models.user'),
                'role_name' => $role->name,
            ];
        })->toArray();
        $firstKey = key($roles);
        $rolName = $request->rolName;
        $roleToRemove = Role::findByName($rolName);
        if (!is_null($rolesArray)) {
            $userIds = array_keys($rolesArray);
            $users = User::all();
            $users->each(function (User $user) use ($roleToRemove) {
                $user->removeRole($roleToRemove);
            });
            $users = User::whereIn('id', $userIds)->get();
            $users->each(function (User $user) use ($rolName) {
                $user->syncRoles($rolName);
            });
        }
        $role = Role::where('name', '=', $rolName)->first();
        $id = $role->id;
        $name = $role->name;
        $recordsPerPage = $request->input('recordsPerPage', isset($request->recordsPerPage)?isset($request->recordsPerPage):10); // Valor por defecto es 10
        $usersQuery = User::with('roles');
        $users = $recordsPerPage === 'all' ? $usersQuery->get() : $usersQuery->paginate($recordsPerPage);
        $roles = [];
        $search = null;
        foreach ($users as $user) {
            $assigned = $user->roles->contains($role);
            $roles[] = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'assigned' => $assigned,
                'role' => $role,
            ];
        }
        return view('admin.roles.assign', compact('id','name', 'roles','users','recordsPerPage','search'))->with(session()->flash('info', 'La asignación y eliminación de usuarios al rol ' . $name . ' fue realizada exitosamente'));        
    }    
}
