<?php

namespace App\Controller;


use App\Models\User;
use App\Services\Hash;
use App\Services\Validate;
use App\Services\View;
use App\Services\Redirect;

class UserController
{
    /**
     * @var
     */
    public
        $user,
        $errors;
    private static
        $customAttr = array(
            'name' => 'Jméno',
            'role_id' => 'Role',
            'password' => 'Heslo',
            'password_again' => 'Potvrdit heslo',
            'email' => 'Email',
            'password' => 'Heslo',
        );

    /**
     *
     */
    public static function index()
    {
        return User::getAllUsers();
    }

    /**
     * @param $data
     * @throws \Exception
     */
    public static function store($data)
    {
        $data = json_decode($data, true);
        $errors = null;
        $role_id = $data['role_id'];
        unset($data['role_id']);
        foreach ($data as $name => $param) {
            if (empty($param)) {
                $errors[$name] = self::$customAttr[$name] . " je nutné vyplnit";
            }
            if (strlen($param) < 4) {
                $errors[$name] = self::$customAttr[$name] . " musí obsahovat minimálně 4 znaky.";
            }
            if (strlen($param) > 50) {
                $errors[$name] = self::$customAttr[$name] . " musí obsahovat maximálně 50 znaků.";
            }
        }
        if (empty($role_id)) {
            $errors['role_id'] = "Musíte vybrat roli uživatele.";
        }
        if (User::find($data['email'])) {
            $errors['email'] = "Email již existuje.";
        }
        if (!is_null($errors)) {
            echo json_encode(array('errors' => $errors));
            return;
        }
        $data['password'] = Hash::make($data['password']);
        $data['role_id'] = $role_id;
        User::create($data);
        $user = User::find($data['email']);
        unset($user['password']);
        if ($user) {
            echo json_encode(array('success' => 'Uživatel byl zaregistrován.', 'user' => $user));
        } else {
            echo json_encode(array('errors' => 'Uživatel nebyl vytvořen.'));
        }
    }

    /**
     * @param $data
     * @throws \Exception
     */
    public static function update($data)
    {
        $data = json_decode($data, true);
        $errors = null;
        $role_id = $data['role_id'];
        $id = $data['id'];

        if (!empty($data['password'])) {
            $password = $data['password'];
            unset($data['password']);
        }
        \Tracy\Debugger::barDump($data);

        unset($data['role_id']);
        unset($data['id']);
        foreach ($data as $name => $param) {
            if (empty($param)) {
                $errors[$name] = self::$customAttr[$name] . " je nutné vyplnit";
            } elseif (strlen($param) < 4) {
                $error[$name] = self::$customAttr[$name] . " musí obsahovat minimálně 4 znaky.";
            } elseif (strlen($param) > 50) {
                $errors[$name] = self::$customAttr[$name] . " musí obsahovat maximálně 50 znaků.";
            }
        }
        if (empty($role_id)) {
            $errors['role_id'] = "Musíte vybrat roli uživatele.";
        }
        $user = User::find($data['email']);
        $currentUser = User::find($id);
        if ($data['email'] != $currentUser['email'] && !is_bool($user)) {
            $errors['email'] = "Email již existuje.";
        }

        if (!is_null($errors)) {
            echo json_encode(array('errors' => $errors));
            return;
        }
        $data['role_id'] = $role_id;
        $data['id'] = $id;
        $data['password'] = Hash::make($password);
        \Tracy\Debugger::barDump($data);
        User::update($data);
        unset($data['password']);
        if ($user) {
            echo json_encode(array('success' => 'Uživatel byl aktualizován.', 'user' => $data));
        } else {
            echo json_encode(array('errors' => 'Uživatel nebyl vytvořen.'));
        }
    }

    public static function destroy($data)
    {
        // $data = json_decode($data, true);
        // $user = User::find($data['id']);
        $user = true;
        if ($user) {
            // if (User::delete($user['id'])) {
            echo json_encode(array('success' => 'Uživatel byl odstraněn.'));
            // } else {
            //     echo json_encode(array('errors' => 'Uživatel nebyl odstraněn.'));
            // }
        }
    }
}
