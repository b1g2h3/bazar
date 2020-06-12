<?php

namespace App\Services;

class Hash
{
    public static function make($string)
    {
        return password_hash($string, PASSWORD_DEFAULT);
    }

    public static function verify($password, $hashedPassword)
    {
        return password_verify($password, $hashedPassword);
    }
}
