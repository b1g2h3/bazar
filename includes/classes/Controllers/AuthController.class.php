<?php

namespace App\Controller;


use App\Models\User;
use App\Services\Redirect;
use App\Services\Hash;
use App\Controller\UserController;

class AuthController
{

    /**
     * @param $data
     */
    public static function handleLogin($data)
    {
        $data = json_decode($data, true);
        $errors = null;
        foreach ($data as $name => $param) {
            if (empty($param)) {
                $errors[$name] = UserController::$customAttr[$name] . " je nutné vyplnit";
            }
            if (strlen($param) < 4) {
                $errors[$name] =  UserController::$customAttr[$name] . " musí obsahovat minimálně 4 znaky.";
            }
            if (strlen($param) > 50) {
                $errors[$name] =  UserController::$customAttr[$name] . " musí obsahovat maximálně 50 znaků.";
            }
        }
        if (!is_null($errors)) {
            echo json_encode(array('errors' => $errors));
            return;
        }
        $user = User::find($data['email']);
        if (Hash::verify($data['password'], $user['password'])) {
            echo json_encode(array('success' => 'Uživatel byl přihlášen.'));
        } else {
            echo json_encode(array('errors' => 'Špatné iniciály.'));
        }
    }

    /**
     *
     */
    public static function logout()
    {
        $user = new User();
        $user->logout();
        Redirect::to('/');
    }
}
