<?php

namespace App\Controller;


use App\Models\User;
use App\Services\Hash;
use App\Services\Input;
use App\Services\Redirect;
use App\Services\Token;
use App\Services\Session;
use App\Services\Validate;
use App\Services\View;

class AuthController
{

    /**
     *
     */
    public static function login()
    {
        $view = new View('auth/login');
        echo $view->render();
    }

    /**
     * @param $data
     */
    public static function handleLogin($data)
    {
        $data = json_decode($data['data'], true);
        unset($data['token']);
        $validate = new Validate();
        $validation = $validate->check($data, array(
            'email' => array(
                'required' => true,
                'min' => 2,
                'max' => 30,
                // 'email' => true,
            ),
            'password' => array(
                'required' => true,
                'min' => 2,
                'max' => 50
            ),
        ));
        echo json_encode($validation->errors());
        if ($validation->passed()) {
            $user = new User();
            try {
                $id =$user->login($data);
                \Tracy\Debugger::barDump($id);
                if($id)
                {
                    echo json_encode(array('success' => 'Uživatel byl zaregistrován.', 'id' => $id));
                } else {
                    echo json_encode(array('errors' => array('email' => 'Nesprávné přihlašovací údaje')));
                }

            } catch (Exception $e) {
                \Tracy\Debugger::barDump($e);
            }
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
