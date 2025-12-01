<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Http\Middleware\TrustProxies as Middleware;

class TrustProxies extends Middleware
{
    // תסמוך על כל הפרוקסים (או תוכל לשים את טווחי Cloudflare)
    protected $proxies = '*';

    // ודא שכל ה־X-Forwarded-* נלקחים בחשבון
    protected $headers =
        Request::HEADER_X_FORWARDED_FOR |
        Request::HEADER_X_FORWARDED_HOST |
        Request::HEADER_X_FORWARDED_PORT |
        Request::HEADER_X_FORWARDED_PROTO;
}
