<?php

namespace App\Database;

use App\Services\Config;
use PDO;
use PDOException;

class DB{
    private static $_instance = null;
    protected $_pdo,
        $_results,
        $_result,
        $_query,
        $_count = 0;
    private function __construct()
    {
        try{
            $this->_pdo = new PDO(
                                'mysql:host='.Config::get('mysql/host').';
                                     dbname='. Config::get('mysql/db'),
                                    Config::get('mysql/username'),
                                    Config::get('mysql/password'));
        }catch(PDOException $e){
            die($e->getMessage());
        }
    }
    public static function getInstance()
    {
        if(!isset(self::$_instance)){
            self::$_instance = new DB();
        }
        return self::$_instance;
    }

    protected function actionOne($sql, $param)
    {
        $this->_query = $this->_pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $this->_query->execute(array(':id' => $param));
        $this->_result = $this->_query->fetch();
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
        $sql = 'SELECT * FROM '.$table.' WHERE '.$field .' = :id';
        return $this->actionOne($sql, $param);

    }

    public function deleteSession($table, $id)
    {
        $sql = 'SELECT * FROM '.$table.' WHERE id = :id';
        $this->actionDeleteSession($sql, $id);
    }

    public function getAll($table)
    {
        $sql = 'SELECT * FROM '.$table;
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
?>
