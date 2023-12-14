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

    public function getBookNotificationPaginate(Request $request)
    {
        $itemPerPage = $request->query('itemPerPage', 5);

        $notifyList = DatabaseNotification::query();
        $notifyList->where('type', 'App\Notifications\BookNotification')->orderBy('created_at', 'desc');

        return response()->json($notifyList->paginate($itemPerPage));
    }

    public function destroy($id)
    {
        DatabaseNotification::findOrFail($id)->delete();
        return response()->json('deleted', 201);
    }

    public function destroyAll(Request $request)
    {
        // return response()->json($request);
        $ids = $request->ids;
        DatabaseNotification::destroy($ids);
        return response()->json('deleted', 201);
    }
}
