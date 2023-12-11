<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\Notification;

class BookNotificationController extends Controller
{
    public function getBookNotification(){
        $notificationList = DatabaseNotification::where('type','App\Notifications\BookNotification')->get();
        return response()->json($notificationList);
    }
}
