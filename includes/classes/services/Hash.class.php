<?php

namespace App\Services;

class Hash
{

    public static function make($string)
    {
        return password_hash($string, PASSWORD_DEFAULT);
    }

    public static function verify($string)
    {
        return password_verify($string, PASSWORD_DEFAULT);
    }

    public static function salt($length)
    {
        return random_bytes($length);
    }

    public static function unique()
    {
        return self::make(uniqid());
    }
}
