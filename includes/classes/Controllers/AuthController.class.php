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
        if($user) {
            if (Hash::verify($data['password'], $user['password'])) {
                $_SESSION['isLoggedIn'] = true;
                $_SESSION['isAdmin'] = $user['roles_id'] === "1" ? true : false;
                $_SESSION['isEditor'] = $user['roles_id'] === "2" ? true : false;
                $_SESSION['id'] = $user['id'];
                $_SESSION['email'] = $user['email'];
                echo json_encode(array('success' => 'Uživatel byl přihlášen.', 'user' => $user));
            }
        } else {
            echo json_encode(array('errors' => array('email' => 'Špatné iniciály.')));
        }
    }

    /**
     *
     */
    public static function logout()
    {
        session_destroy();
        Redirect::to('/');
    }
}
