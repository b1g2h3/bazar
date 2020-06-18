<?php

namespace App\Services;

class Hash
{
    /**
     * @param $string
     * @return false|string|null
     */
    public static function make($string)
    {
        return password_hash($string, PASSWORD_DEFAULT);
    }

    /**
     * @param $password
     * @param $hashedPassword
     * @return bool
     */
    public static function verify($password, $hashedPassword)
    {
        return password_verify($password, $hashedPassword);
    }
}
