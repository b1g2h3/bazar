<?php

namespace App\Controller;


use App\Models\User;
use App\Services\Hash;
use App\Services\Validate;
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
        $data = json_decode($data['data'], true);

        $validate = new Validate();
        $validation = $validate->check($data, array(
            'email' => array(
                'required' => true,
                'min' => 2,
                'max' => 30,
                'unique' => 'users',
            ),
            'password' => array(
                'required' => true,
                'min' => 6
            ),
            'name' => array(
                'required' => true,
                'min' => 2,
                'max' => 50
            ),
            'role_id' => array(
                'required' => true,
            )
        ));
        $errors = $validation->errors();
        echo json_encode($validation->errors());
        if ($validation->passed()) {

            $user = new User();
            try {
                $data['password'] = Hash::make($data['password']);
                $user->create($data);
                echo json_encode(array('success' => 'Uživatel byl zaregistrován.'));
            } catch (Exception $e) {
                \Tracy\Debugger::barDump($e);
            }
        }
    }

    public static function update($data)
    {
        $data = json_decode($data['data'], true);
        $validate = new Validate();
        $validation = $validate->check($data, array(
            'email' => array(
                'required' => true,
                'min' => 2,
                'max' => 30,
                // 'email' => true,
            ),
            'name' => array(
                'required' => true,
                'min' => 2,
                'max' => 50
            ),
            'role_id' => array(
                'required' => true,
            )
        ));
        echo json_encode($validation->errors());
        if ($validation->passed()) {
            if ($data['password'] != null) {
                $data['password'] = Hash::make($data['password']);
            } else {
                unset($data['password']);
            }
            $user = new User();
            try {
                $user->update($data);
                echo json_encode(array('success' => 'Uživatel byl zaregistrován.'));
            } catch (Exception $e) {
                \Tracy\Debugger::barDump($e);
            }
        }
    }
}
