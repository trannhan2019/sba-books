<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class BookNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    protected $receiver;
    protected $sender;
    protected $book;
    protected $history;

    public function __construct($receiver,$sender,$book,$history)
    {
        $this->receiver = $receiver;
        $this->sender = $sender;
        $this->book = $book;
        $this->history = $history;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database','broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
           "receiver" => $this->receiver,
            "sender" => $this->sender,
            "book" => $this->book,
            "history" => $this->history
        ];
    }

    public function broadcastOn()
    {
        return ['sba-book-manage'];
    }

    public function broadcastAs()
    {
        return 'book-notification-event';
    }
}
