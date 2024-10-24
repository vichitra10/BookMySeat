<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SeatController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/seats', [SeatController::class, 'index']);
Route::post('/seats/book', [SeatController::class, 'bookSeats']);


