<?php

namespace App\Controller;


use App\Models\User;
use App\Services\View;
use App\Services\Redirect;

class UserController
{
    public $user;
    private function __construct()
    {
        $user = new User(); // current user

        if (!$user->isLoggedIn()) {
            Redirect::to('prihlasit');
        }
    }

    public static function index()
    {
        // Check if user is not logged in
        $user = new User;
        $view = new View('users/index');
        $view->allUsers = $user->getAllUsers();
        echo $view->render();
    }

    public static function store($data)
    {
        var_dump($data);
    }

    public function update()
    {
    }

    public function destroy()
    {
    }
}
