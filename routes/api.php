<?php

use App\Http\Controllers\Api\PortofolioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/contact', [ContactController::class, 'store']);

Route::prefix('portfolio')->group(function () {
    Route::get('projects', [PortofolioController::class, 'index']);
    Route::get('projects/{id}', [PortofolioController::class, 'show']);
    Route::get('categories', [PortofolioController::class, 'categories']);
});
