<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KycController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\WalletToUserController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\LogController;




// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => env('APP_NAME', 'Laravel'),
        'version' => app()->version(),
        'timestamp' => now()->toDateTimeString(),
    ]);
});

Route::post('/users', [UserController::class, 'store']);    // register
Route::post('/login', [UserController::class, 'login']);    // login


Route::middleware(['auth:sanctum', 'last.action'])->group(function () {

    
    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'show']);                           // WORK
        Route::put('/reset-password', [UserController::class, 'resetPassword'])->middleware('log.request:reset-password');
        Route::put('/support-name', [UserController::class, 'updateSupportName']);
    });


    
    Route::prefix('users')->group(function () {
        Route::put('/{user}/wallet', [UserController::class, 'updateWallet'])->middleware('log.request:update-wallet');     // work    
        Route::get('/{user}/logs', [LogController::class, 'index']);
        Route::put('/{user}', [UserController::class, 'update'])->middleware('log.request:update-user');                    // WORK
        Route::get('/{user}', [UserController::class, 'show']);                                                             // WORK
        Route::get('/', [UserController::class, 'index']);

        
        Route::post('/{user}/verify-documents', [UserController::class, 'verifyDocuments'])->middleware('log.request:upload-kyc');              //// ?
        Route::get('/{user}/verify-documents/download', [UserController::class, 'downloadDocument'])->middleware('log.request:download-kyc');
    });


    Route::prefix('kyc')->group(function () {
        Route::post('/upload', [KycController::class, 'upload'])->middleware('log.request:update-wallet');                                      //// ?
        Route::get('/user/{userId}', [KycController::class, 'getUserDocuments']);
        Route::put('/{kyc}/status', [KycController::class, 'updateStatus'])->middleware('log.request:update-kyc-status');
    });




    Route::prefix('tickets')->group(function () {
        Route::post('/', [TicketController::class, 'store']);                       // WORK
        Route::get('/', [TicketController::class, 'index']);                        // WORK
        Route::get('/{ticketId}/messages', [MessageController::class, 'index']);    // WORK
    });


    Route::prefix('transactions')->group(function () {
        Route::get('/', [TransactionController::class, 'index']);                                                                 // WORK
        Route::post('/', [TransactionController::class, 'store'])->middleware('log.request:create-transaction');                  // WORK
        Route::put('/{transaction}', [TransactionController::class, 'update'])->middleware('log.request:update-transaction');     // WORK
        Route::delete('/{transaction}', [TransactionController::class, 'destroy'])->middleware('log.request:delete-transaction'); // WORK
    });


    Route::prefix('payment-methods')->group(function () {
        Route::get('/', [PaymentMethodController::class, 'index']);
        Route::get('/{user}', [PaymentMethodController::class, 'index']);
        Route::post('/', [PaymentMethodController::class, 'store'])->middleware('log.request:upload-peyment-method');
        Route::delete('/{id}', [PaymentMethodController::class, 'destroy'])->middleware('log.request:delete-peyment-method');
    });



    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/messages', [MessageController::class, 'store']);                  // WORK
    Route::get('/currencies', [CurrencyController::class, 'index']);                // WORK
    Route::get('/currencies/{user}', [CurrencyController::class, 'index']);

});




