<?php

namespace App\Models;

use App\Services\Hash;
use Exception;
use App\Database\DB;

class User
{
    public static function getAllUsers()
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = 'SELECT * FROM users';
        $sth = $conn->prepare($sql);
        $sth->execute();
        return $sth->fetchAll();
    }

    public static function create($data)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "insert users(name, email, password, role_id, created_at) values (:name, :email, :password, :role_id, :created_at)";
        $args = array(
            ':name' => $data['name'],
            ':email' => $data['email'],
            'password' => $data['password'],
            ':role_id' => $data['role_id'],
            ':created_at' => date ("Y-m-d H:i:s"),
        );
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
        $pdo = DB::init();
        $conn = $pdo->conn;
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
            ':role_id' => $data['role_id'],
            ':updated_at' => date ("Y-m-d H:i:s"),
        );
        if (array_key_exists('password', $data)) {
            $sql = "UPDATE users SET email = :email, name = :name, password = :password, updated_at = :updated_at, role_id = :role_id WHERE id = :id";
            $args[':password'] = $data['password'];
        } else {
            $sql = "UPDATE users SET email = :email, name = :name, updated_at = :updated_at, role_id = :role_id WHERE id = :id";
        }

        try {
            $pdo = DB::init();
            $conn = $pdo->conn;
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            return true;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    public static function delete($id)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
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
