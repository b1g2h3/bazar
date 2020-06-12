<?php

namespace App\Models;

use App\Services\Config;
use App\Services\Hash;
use App\Services\Cookie;
use App\Services\Session;
use Exception;
use PDO;

class User
{
    public static function getAllUsers()
    {
        $servername = "srv-insodev.ccv.cz";
        $username = "insodev";
        $password = "isis";
        $conn = new PDO("mysql:host=$servername;dbname=toku_adaptacniprojekt", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = 'SELECT * FROM users';
        $sth = $conn->prepare($sql);
        $sth->execute();
        return $sth->fetchAll();
    }

    public static function create($data)
    {
        $sql = "insert users(name, email, password, role_id) values (:name, :email, :password, :role_id)";
        $servername = "srv-insodev.ccv.cz";
        $username = "insodev";
        $password = "isis";
        try {
            $conn = new PDO("mysql:host=$servername;dbname=toku_adaptacniprojekt", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $array = array(':name' => $data['name'], ':email' => $data['email'], 'password' => $data['password'], ':role_id' => $data['role_id']);
            $sth = $conn->prepare($sql);
            $sth->execute($array);
            return true;
        } catch (Exception $e) {
            die($e->getMessage());
        }

    }


    public static function find($param)
    {
        $field = (is_numeric($param)) ? 'id' : 'email';

        $sql = 'SELECT * FROM users WHERE '.$field.' = :'.$field;
        $servername = "srv-insodev.ccv.cz";
        $username = "insodev";
        $password = "isis";
        $conn = new PDO("mysql:host=$servername;dbname=toku_adaptacniprojekt", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sth = $conn->prepare($sql);
        $sth->execute(array(':'.$field => $param));
        return $sth->fetch();

    }

    /**
     * @param $data
     * @throws Exception
     */
    public function store($data)
    {
        $sql = "insert users(name, email, password, role_id) values (:name, :email, :password, :role_id)";
        if (!$this->_db->createUser($sql, $data)) {
            throw new Exception('There was a problem updating.');
        }
    }

    /**
     * @param $data
     * @throws Exception
     */
    public function update($data)
    {
        if (array_key_exists('password', $data)) {
            $sql = "UPDATE users SET email = :email, name = :name, password = :password, role_id = :role_id WHERE id = :id";
        } else {
            $sql = "UPDATE users SET email = :email, name = :name, role_id = :role_id WHERE id = :id";
        }
        if (!$this->_db->updateUser($sql, $data)) {
            throw new Exception('There was a problem updating.');
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

        $this->_db->deleteSession('user_session', $this->data()->id);

        Session::delete($this->_sessionName);
        Cookie::delete($this->_cookieName);
    }


    /**
     * @return bool
     */
    public function isLoggedIn()
    {
        return $this->_isLoggedIn;
    }
}
