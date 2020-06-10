<?php

namespace App\Services;

class Input
{
    protected $_errors;

    public static function exists($type = 'post')
    {
        switch ($type) {
            case 'post':
                return (!empty($_POST)) ? true : false;
                break;
            case 'get':
                return (!empty($_GET)) ? true : false;
                break;
            default:
                return false;
                break;
        }
    }

    public static function get($item)
    {
        if (isset($_POST[$item])) {
            return $_POST[$item];
        } else if (isset($_GET[$item])) {
            return $_GET[$item];
        }

        return '';
    }

    public static function create($name, $type)
    {
        echo '
            <div class="form-group">
                <label for="' . $name . '">' . $name . ':</label>
                <input type="' . $type . '" name="' . $name . '" required class="form-control" placeholder="' . $name . '" id="' . $name . '">
                ' . Input::handleError($name) . '
            </div>
        ';
    }

    public static function handleError($name)
    {
        if (Session::exists($name)) {
            echo '<div class="text-danger">
                    ' . Session::get($name) . '
                    </div>';
            \App\Services\Session::delete($name);
        }
    }
}
