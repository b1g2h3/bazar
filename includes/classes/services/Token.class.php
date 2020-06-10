<?php

namespace App\Services;

class Token
{

    public static function generate()
    {
        return Session::put(Config::get('sessions/token_name'), md5(uniqid()));
    }

    public static function check($token)
    {
        $tokenName = Config::get('sessions/token_name');

        if (Session::exists($tokenName) && Session::get($tokenName)) {
            Session::delete($tokenName);
            return true;
        }

        return false;
    }
}
