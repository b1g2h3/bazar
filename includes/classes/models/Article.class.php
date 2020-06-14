<?php

namespace App\Models;

use Exception;
use App\Database\DB;

class Article
{
    public static function getAllArticles()
    {
        $db = DB::init();
        $conn = $db->PDO();
        $sql = 'SELECT * FROM articles';
        $sth = $conn->prepare($sql);
        $sth->execute();
        return $sth->fetchAll();
    }

    public static function create($data, $images)
    {
        $db = DB::init();
        $conn = $db->PDO();
        $sql = "insert articles(title, description, price, location, phone) values (:title, :description, :price, :location, :phone)";
        $args = array(':title' => $data['Název'], ':description' => $data['Popis'], ':price' => $data['Cena'], ':location' => $data['Lokalita'], ':phone' => $data['Telefon']);
        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            $insertedId = $conn->lastInsertId();
            Image::create($images, $insertedId);
            return true;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }
}
