<?php

namespace App\Services;

class Redirect
{
    public static function to($location)
    {
        header('Location: ' . $location);
    }
}
