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
       foreach($data as $name => $param) {
           if(empty($param)){
               $errors[$name] = self::$customAttr[$name]." je nutné vyplnit";
           } elseif(strlen($param ) < 4) {
               $error[$name] = self::$customAttr[$name]." musí obsahovat minimálně 4 znaky.";
           } elseif(strlen($param ) > 50) {
               $errors[$name] = self::$customAttr[$name]." musí obsahovat maximálně 50 znaků.";
           }
       }
       if(empty($role_id)) {
           $errors['role_id'] = "Musíte vybrat roli uživatele.";
       }
        if(User::find($data['email'])) {
            $errors['email'] = "Email již existuje.";
        }
       if(!is_null($errors))
       {
           echo json_encode(array('errors' => $errors));
           return;
       }
       $data['password'] = Hash::make($data['password']);
       $data['role_id'] = $role_id;
       User::create($data);
       $user = User::find($data['email']);
       unset($user['password']);
       if($user){
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
        $data = json_decode($data['data'], true);

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
