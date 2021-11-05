<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Myckhel\ChatSystem\Traits\Message\HasMessage;
use Myckhel\ChatSystem\Traits\ChatEvent\CanMakeChatEvent;
use Myckhel\ChatSystem\Contracts\IChatEventMaker;


class User extends Authenticatable implements IChatEventMaker
{
    use HasFactory, Notifiable, HasApiTokens, HasMessage, CanMakeChatEvent;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function grantMeToken($name = 'PAT'){
        $token          =  $this->createToken($name);

        return [
          'token'       => $token->plainTextToken,
          'token_type'  => 'Bearer',
        ];
    }
}
