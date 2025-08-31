<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('landingPage');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('admin/dashboard');
    })->name('dashboard');
    Route::get('/project-offer', function () {
        return view('admin/projectOffer');
    })->name('project-offer');
    Route::get('/client-dashboard', function () {
        return view('admin/clientDashboard');
    })->name('client-dashboard');
});

Route::get('{any}', function () {
    return view('app'); // view kamu yang ada <div id="root"></div>
})->where('any', '.*');
