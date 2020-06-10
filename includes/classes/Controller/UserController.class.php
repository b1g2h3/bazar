<?php

namespace App\Controller;


use App\Models\User;
use App\Services\Input;
use App\Services\Redirect;
use App\Services\Token;
use App\Services\Validate;
use App\Services\View;

class UserController
{
    public static function index()
    {
        // Check if user is not logged in
        $user = new User(); // current user

//        if (!$user->isLoggedIn()) {
//            Redirect::to('prihlasit');
//        }

        $view = new View('users/index');
        $view->allUsers = $user->getAllUsers();
        echo $view->render();
    }

    public function show()
    {

    }

    public function store()
    {

    }

    public function update()
    {

    }

    public function destroy()
    {

    }

}
