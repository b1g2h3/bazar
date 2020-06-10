<?php

namespace App\Controller;


use App\Services\View;

class UserController
{
    public static function index()
    {
        $view = new View('users/index');
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
