<?php

namespace App\Models;

use Exception;
use App\Database\DB;
use PDO;
use Tracy\Debugger;

class Article
{

    //https://www.interval.cz/clanky/oop-v-php-vzor-singleton/
    public static function getAllArticles()
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = 'SELECT 
                a.id,
                a.title,
                a.description,
                a.location,
                a.price,
                i.image
            FROM articles a
            INNER JOIN images i
                ON a.id = i.articles_id
            GROUP BY a.id';
        try {
            $sth = $conn->prepare($sql);
            $sth->execute();
            return $sth->fetchAll();
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }
    public static function getArticleByFilter($orderBy, $cenaOd, $cenaDo)
    {

        $pdo = DB::init();
        $conn = $pdo->conn;
        $name = 'a.title';
        if ($orderBy == 'price') {
            $orderBy = 'DESC';
            $name = 'a.price';
        }
        $args = array(':priceOd' => $cenaOd, ':priceDo' => $cenaDo);
        $sql = 'SELECT a.id,
                        a.title,
                        a.description,
                        a.location,
                        a.price,
                        i.image
                FROM articles a
                INNER JOIN images i
                    ON a.id = i.articles_id
                WHERE price
                BETWEEN :priceOd AND :priceDo
                GROUP BY a.id
                ORDER BY ' . $name . ' ' . $orderBy;
        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            $results = $sth->fetchAll();
            return $results;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    public static function find($id)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = 'SELECT *
            FROM articles a
            WHERE a.id = :id;';
        $args = array(':id' => $id);

        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            $result = $sth->fetch();
            return $result;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    public static function create($data, $images)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "insert articles(title, description, price, location, phone) values (:title, :description, :price, :location, :phone)";
        $args = array(':title' => $data['Název'], ':description' => $data['Popis'], ':price' => $data['Cena'], ':location' => $data['Lokalita'], ':phone' => $data['Telefon']);
        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            $insertedId = $conn->lastInsertId();
            Image::create($images, $insertedId);
            return $insertedId;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }
}
