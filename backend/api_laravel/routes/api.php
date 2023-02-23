<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get("/news", "App\Http\Controllers\StoryController@index");
Route::post("/news", "App\Http\Controllers\StoryController@store");
Route::get("/news/{category}", "App\Http\Controllers\StoryController@show");
Route::put("/news/{category}", "App\Http\Controllers\StoryController@update");
Route::delete("/news/{category}", "App\Http\Controllers\StoryController@destroy");