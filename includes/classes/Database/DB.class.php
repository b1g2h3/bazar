<?php

namespace App\Database;

use App\Services\Config;
use PDO;
use PDOException;

class DB
{
    protected
        $username = "admin",
        $password = "123456";
    private static $pdo = false;
    public $conn;

    private function __construct()
    {
        try {
            $this->conn = new PDO("mysql:host=127.0.0.1;dbname=bazar2;", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);;
        } catch (PDOException $e) {
            die(\Tracy\Debugger::barDump($e->getMessage()));
        }
    }
    public static function init()
    {
        if (self::$pdo === false) {
            self::$pdo = new Db;
        }
        return self::$pdo;
    }
}
