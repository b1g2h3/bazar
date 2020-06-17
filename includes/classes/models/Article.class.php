<?php

namespace App\Models;

use Exception;
use App\Database\DB;
use Tracy\Debugger;

class Article
{

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
            LEFT JOIN images i
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

    public static function getAllArticlesWithoutImages()
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = 'SELECT  *
            FROM articles';
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
                LEFT JOIN images i
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
        $sql = "insert articles(title, description, price, location, email, created_at) values (:title, :description, :price, :location, :email, :created_at)";
        $args = array(
            ':title' => $data['Název'],
            ':description' => $data['Popis'],
            ':price' => $data['Cena'],
            ':location' => $data['Lokalita'],
            ':email' => $data['Email'],
            ':created_at' => date ("Y-m-d H:i:s"),
        );
        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            $insertedId = $conn->lastInsertId();
            \Tracy\Debugger::barDump($insertedId);
            Image::create($images, $insertedId);
            return $insertedId;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    public static function update($data, $images)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "UPDATE articles 
                SET title = :title, 
                    description = :description, 
                    price = :price, 
                    location = :location, 
                    email = :email,
                    reservation = :reservation,                  
                    updated_at = :updated_at                    
                WHERE id = :id";
        $args = array(
            ':title' => $data['Název'],
            ':description' => $data['Popis'],
            ':price' => $data['Cena'],
            ':location' => $data['Lokalita'],
            ':email' => $data['Email'],
            ':reservation' => $data['rezervace'],
            ':updated_at' => date ("Y-m-d H:i:s"),
            ':id' => $data['id']
        );
        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            is_null($images) ?: Image::create($images, $data['id']);
            return true;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    public static function book($article)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "UPDATE articles 
                SET reservation = :reservationID,  updated_at = :updated_at                 
                WHERE id = :id";
        $args = array(
            ':reservationID' => $article['reservationID'],
            ':updated_at' => date ("Y-m-d H:i:s"),
            ':id' => $article['id']
        );
        \Tracy\Debugger::barDump($args);
        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            return true;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    public static function saveResevation($id, $data)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "insert reservation(name, email, message, articles_id, created_at) values (:name, :message, :email,:articleID ,:created_at)";
        $args = array(
            ':name' => $data['Jméno'],
            ':email' => $data['Email'],
            ':message' => $data['Zpráva'],
            ':articleID' => $id,
            ':created_at' => date ("Y-m-d H:i:s"),
        );
        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            $insertedId = $conn->lastInsertId();
            return $insertedId;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }
}
