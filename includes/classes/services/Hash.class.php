<?php

namespace App\Services;

class Hash
{
    public static function make($string)
    {
        return password_hash($string, PASSWORD_DEFAULT);
    }

    public static function verify($password1, $password2)
    {
        return password_verify($password1, $password2);
    }

}
