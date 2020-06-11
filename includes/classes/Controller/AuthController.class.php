<?php

namespace App\Controller;


use App\Models\User;
use App\Services\Input;
use App\Services\Redirect;
use App\Services\Token;
use App\Services\Session;
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
                'Email' => array('required' => true),
                'Heslo' => array('required' => true)
            ));
            if ($validation->hasntError()) {
                // Login user
                $user = new User();

                $login = $user->login(Input::get('name'), Input::get('Heslo'));

                if ($login) {
                    // echo 'Success';
                    Redirect::to('admin');
                } else {
                    Session::flash('email', 'Nesprávné iniciály.');
                    Redirect::back();
                }
            }
        }
    }

    public static function logout()
    {
        $user = new User();
        $user->logout();
        Redirect::to('/');
    }
}
