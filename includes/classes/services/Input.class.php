<?php

namespace App\Services;

class Input
{

    /**
     * @param $name
     * @param $type
     * @param $required
     */
    public static function create($name, $type, $required)
    {
        $required = $required ? 'required' : '';
        echo '
            <div class="form-group">
                <label for="' . $name . '">' . $name . ':</label>
                <input type="' . $type . '" name="' . $name . '"  ' . $required . '  class="form-control" placeholder="' . $name . '" id="' . $name . '">
                <div id="err' . $name . '" class="hidden error text-danger"></div>
            </div>
        ';
    }
}
