<?php

namespace App\Database;

use App\Services\Config;
use PDO;
use PDOException;

class DB
{
    private static $init = null,
        $pdo;
    protected
        $serverName = "127.0.0.1",
        $username = "admin",
        $password = "123456";
    private function __construct()
    {
        try {
            $this->pdo = new PDO("mysql:host=$this->serverName;dbname=bazar2", $this->username, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);;
        } catch (PDOException $e) {
            die(\Tracy\Debugger::barDump($e->getMessage()));
        }
    }
    public static function init()
    {
        if (!isset(self::$init)) {
            self::$init = new DB();
        }
        return new self;
    }

    public function PDO()
    {
        return $this->pdo;
    }
}
