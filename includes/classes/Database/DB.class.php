<?php

namespace App\Database;

use App\Services\Config;
use PDO;
use PDOException;

class DB
{
    private static $_instance = null;
    protected $_pdo,
        $_results,
        $_result,
        $_query,
        $_count = 0;
    private function __construct()
    {
        try {
            $this->_pdo = new PDO(
                'mysql:host=' . Config::get('mysql/host') . ';
                                     dbname=' . Config::get('mysql/db'),
                Config::get('mysql/username'),
                Config::get('mysql/password')
            );
        } catch (PDOException $e) {
            die($e->getMessage());
        }
    }
    public static function getInstance()
    {
        if (!isset(self::$_instance)) {
            self::$_instance = new DB();
        }
        return self::$_instance;
    }

    protected function actionOne($sql, $param)
    {

        $item = is_numeric($param) ? 'id' : 'email';
        $this->_query = $this->_pdo->prepare($sql);
        $this->_query->execute(array(':' . $item   => $param));
        $this->_result = $this->_query->fetch();
        return $this->_result;
    }

    protected function actionDeleteSession($sql, $id)
    {
        $this->_query = $this->_pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $this->_query->execute(array(':id' => $id));
        $this->_results = $this->_query->fetchAll();
    }

    protected function actionAll($sql)
    {
        $sql = 'select * from users';
        $this->_query = $this->_pdo->prepare($sql);
        $this->_query->execute();
        $this->_results = $this->_query->fetchAll();
    }


    public function get($table, $field, $param)
    {
        $sql = 'SELECT * FROM ' . $table . ' WHERE ' . $field . ' = :' . $field;

        return $this->actionOne($sql, $param);
    }

    public function createUser($sql, $data)
    {
        $this->_query = $this->_pdo->prepare($sql);
        if ($this->_query->execute($data)) {
            return true;
        }
    }

    public function updateUser($sql, $data)
    {
        if(array_key_exists('password', $data)){
            $array = array(':id' => $data['id'], ':name' => $data['name'], ':email' => $data['email'], 'password' => $data['password'], ':role_id' => $data['role_id']);
        } else {
            $array = array(':id' => $data['id'], ':name' => $data['name'], ':email' => $data['email'], ':role_id' => $data['role_id']);
        }
        $this->_query = $this->_pdo->prepare($sql);
        if ($this->_query->execute($array)) {
            return true;
        }
    }

    public function insertSession($sql, $data)
    {
        $this->_query = $this->_pdo->prepare($sql);
        if ($this->_query->execute($data)) {
            return true;
        }
    }

    public function deleteSession($table, $id)
    {
        $sql = 'SELECT * FROM ' . $table . ' WHERE id = :id';
        $this->actionDeleteSession($sql, $id);
    }

    public function getAll($table)
    {
        $sql = 'SELECT * FROM ' . $table;
        $this->actionAll($sql);
    }

    public function result()
    {
        return $this->_result;
    }

    public function results()
    {
        return $this->_results;
    }
}
