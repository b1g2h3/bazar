<?php

namespace App\Controller;


use App\Models\User;
use App\Services\Hash;
use App\Services\Validate;
use App\Services\View;
use App\Services\Redirect;
use Tracy\Debugger;

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

        \Tracy\Debugger::barDump($data);
        $validate = new Validate();
        $validation = $validate->check($data, array(
            'email' => array(
                'required' => true,
                'min' => 2,
                'max' => 30,
                'unique' => 'users',
                 'email' => true,
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

        if ($validation->passed()) {

            $user = new User();

            try {
                $user->create($data);
                // Session::flash('home', 'You have been registered and can now log in!');
                return json_decode('true');
                // Redirect::to('indexx.php');
            } catch (Exception $e) {
                die($e->getMessage());
            }
        } else {
            foreach ($validation->errors() as $error) {
                echo $error, '<br>';
            }
        }
    }

    public static function update($data)
    {
//        if($user->isAdmin())
//        {
            $data = json_decode($data['data'], true);

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

            if ($validation->passed()) {

                $user = new User();

                try {
                    $user->update($data);
                    return json_encode('true');
                } catch (Exception $e) {
                    die($e->getMessage());
                }
            }
//        }
    }

    public function destroy()
    {
    }

}
