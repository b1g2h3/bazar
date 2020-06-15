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
        $servername = "srv-insodev.ccv.cz",
        $username = "insodev",
        $password = "isis";
    private function __construct()
    {
        try {
            $this->pdo = new PDO("mysql:host=$this->servername;dbname=toku_adaptacniprojekt;", $this->username, $this->password);
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
