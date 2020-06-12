<?php

namespace App\Services;

class Input
{

    public static function create($name, $type)
    {
        echo '
            <div class="form-group">
                <label for="' . $name . '">' . $name . ':</label>
                <input type="' . $type . '" name="' . $name . '" required class="form-control" placeholder="' . $name . '" id="' . $name . '">
                <div id="err' . $name . '" class="hidden error text-danger"></div>
            </div>
        ';
    }
}
