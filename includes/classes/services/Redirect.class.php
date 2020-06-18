<?php

namespace App\Services;

class Redirect
{
    /**
     * @param $location
     */
    public static function to($location)
    {
        header('Location: ' . $location);
    }
}
