<?php

namespace App\Models;

use App\Services\Hash;
use Exception;
use App\Database\DB;

class User
{
    public static function getAllUsers()
    {
        $db = DB::init();
        $conn = $db->PDO();
        $sql = 'SELECT * FROM users';
        $sth = $conn->prepare($sql);
        $sth->execute();
        return $sth->fetchAll();
    }

    public static function create($data)
    {
        $db = DB::init();
        $conn = $db->PDO();
        $sql = "insert users(name, email, password, role_id) values (:name, :email, :password, :role_id)";
        $args = array(':name' => $data['name'], ':email' => $data['email'], 'password' => $data['password'], ':role_id' => $data['role_id']);
        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            return true;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }


    public static function find($param)
    {
        $db = DB::init();
        $conn = $db->PDO();
        $field = (is_numeric($param)) ? 'id' : 'email';
        $sql = 'SELECT * FROM users WHERE ' . $field . ' = :' . $field;
        $sth = $conn->prepare($sql);
        $sth->execute(array(':' . $field => $param));
        return $sth->fetch();
    }

    public static function update($data)
    {
        $args = array(
            ':id' => $data['id'],
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':role_id' => $data['role_id']
        );
        if (array_key_exists('password', $data)) {
            $sql = "UPDATE users SET email = :email, name = :name, password = :password, role_id = :role_id WHERE id = :id";
            $args[':password'] = $data['password'];
        } else {
            $sql = "UPDATE users SET email = :email, name = :name, role_id = :role_id WHERE id = :id";
        }

        try {
            $db = DB::init();
            $conn = $db->PDO();
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            return true;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    public static function delete($id)
    {
        $db = DB::init();
        $conn = $db->PDO();
        $sql = "DELETE FROM users WHERE id = ?";

        try {
            $sth = $conn->prepare($sql);
            $sth->execute(array($id));
            return true;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    /**
     * @param $user
     * @return bool|mixed
     */
    public function login($user)
    {
        $this->_data = $this->find($user['email']);

        if ($user) {
            if (Hash::verify($user['password'], $this->_data['password'])) {
                return $this->_data['id'];
            }
        }

        return false;
    }

    /**
     *
     */
    public function logout()
    {

        //        $this->_db->deleteSession('user_session', $this->data()->id);
        //
        //        Session::delete($this->_sessionName);
        //        Cookie::delete($this->_cookieName);
    }
}
