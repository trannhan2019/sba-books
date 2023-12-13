<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class BookNotificationController extends Controller
{
    public function getBookNotification()
    {
        $notificationList = DatabaseNotification::where('type', 'App\Notifications\BookNotification')->orderBy('created_at', 'desc')->take(10)->get();
        $notificationUnreadCount = DatabaseNotification::where('read_at', null)->count();

        return response()->json(['notificationList' => $notificationList, 'notificationUnreadCount' => $notificationUnreadCount]);
    }

    public function updateReadAt($id)
    {
        $notify = DatabaseNotification::findOrFail($id);
        $notify->read_at = Carbon::now();
        $notify->save();

        return response()->json('done');
    }
}
