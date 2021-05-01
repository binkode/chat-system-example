<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  function index(Request $request) {
    return User::select(['name', 'email'])->inRandomOrder()->paginate();
  }
  public function whoami(Request $request){
    return $request->user();
  }
}
