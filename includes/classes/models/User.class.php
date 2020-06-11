<?php

namespace App\Models;

use App\Database\DB;
use App\Services\Config;
use App\Services\Hash;
use App\Services\Cookie;
use App\Services\Session;
use Exception;

class User
{

    private $_db,
        $_data,
        $_sessionName,
        $_cookieName,
        $_isLoggedIn;

    public function __construct($user = null)
    {
        $this->_db = DB::getInstance();

        $this->_sessionName = Config::get('sessions/session_name');
        $this->_cookieName = Config::get('remember/cookie_name');

        if (!$user) {
            if (Session::exists($this->_sessionName)) {
                $user = Session::get($this->_sessionName);
                // echo $user;
                if ($this->find($user)) {
                    $this->_isLoggedIn = true;
                } else {
                    // process logout
                }
            }
        } else {
            $this->find($user);
        }
    }

    public function create($fields = array())
    {
        $sql = "insert users(name, email, password, role_id) values (?, ?, ?, ?, ?)";
        if (!$this->_db->insert($sql, $fields)) {
            throw new Exception('There was a problem creating this account.');
        }
    }

    public function  update($data)
    {
        $sql = "UPDATE users
                SET email = :email, name = :name, password = :password, role_id = :role_id
                WHERE id = :id;";
        if (!$this->_db->updateUser($sql, $data)) {
            throw new Exception('There was a problem updating.');
        }
    }

    public function getAllUsers()
    {
        $data = $this->_db->getAll('users');
        return $this->_db->results();

    }

    public function find($user = null)
    {
        if ($user) {
            // if user had a numeric username this FAILS...
            $field = (is_numeric($user)) ? 'id' : 'email';

             $this->_db->get('users', $field, $user);

             if($this->_db->result())
             {
                 return true;
             }
        }
        return false;
    }

    public function login($email = null, $password = null, $remember = false)
    {

        // check if username has been defined 
        if (!$email && !$password && $this->exists()) {
            Session::put($this->_sessionName, $this->data()->id);
        } else {

            $user = $this->find($email);

            if ($user) {

                if (Hash::verify($this->data()->password) === Hash::verify($password)) {
                    Session::put($this->_sessionName, $this->data()->id);
                    if ($remember) {
                        $hash = Hash::unique();
                        $hashCheck = $this->_db->get('users_session', array('user_id', '=', $this->data()->id));

                        if (!$hashCheck->count()) {
                            $this->_db->insert('users_session', array(
                                'user_id' => $this->data()->id,
                                'hash' => $hash
                            ));
                        } else {
                            $hash = $hashCheck->first()->hash;
                        }

                        Cookie::put($this->_cookieName, $hash, Config::get('remember/cookie_expiry'));
                    }
                    return true;
                }
            }
        }

        return false;
    }

//    public function hasPermission($key)
//    {
//        $group = $this->_db->get('groups', array('id', '=', $this->data()->group));
//        if ($group->count()) {
//            $permissions = json_decode($group->first()->permissions, true);
//            if ($permissions[$key] == true) {
//                return true;
//            }
//        }
//        return false;
//    }

    public function exists()
    {
        return (!empty($this->_data)) ? true : false;
    }

    public function logout()
    {

        $this->_db->deleteSession('user_session', $this->data()->id);

        Session::delete($this->_sessionName);
        Cookie::delete($this->_cookieName);
    }

    public function data()
    {
        return $this->_data;
    }

    public function isLoggedIn()
    {
        return $this->_isLoggedIn;
    }
}
