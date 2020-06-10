<?php

namespace App\Controller;


use App\Models\User;
use App\Services\Input;
use App\Services\Redirect;
use App\Services\Token;
use App\Services\Validate;
use App\Services\View;

class AuthController
{

    public static function login()
    {
        $view = new View('login');
        echo $view->render();
    }

    public static function handleLogin($data)
    {
        $validate = new Validate();

        if (Token::check($data['token'])) {

            $validate = new Validate();
            $validation = $validate->check($data, array(
                'name' => array('required' => true),
                'password' => array('required' => true)
            ));
            if ($validation->passed()) {
                // Login user
                $user = new User();

                $login = $user->login(Input::get('name'), Input::get('password'));

                if ($login) {
                    // echo 'Success';
                    Redirect::to('indexx.php');
                } else {
                    echo '<p>Sorry, logging in failed';
                }
            } else {
                foreach ($validation->errors() as $error) {
                    echo $error, '<br>';
                }
            }
        }

    }

    public static function logout()
    {
        $user= new User();
        $user->logout();
        Redirect::to('/');
    }

}
