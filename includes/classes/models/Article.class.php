<?php

namespace App\Models;

use Exception;
use App\Database\DB;
use Tracy\Debugger;

class Article
{

    /**
     * @return array
     */
    public static function getAllArticles()
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = 'SELECT 
                a.id,
                a.title,
                a.email,
                a.reservation,
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

    /**
     * @return array
     */
    public static function getAllArticlesWithoutImages()
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $args = array(':userID' => $_SESSION['id']);
        $sql = 'SELECT  *
            FROM articles
            WHERE user_id = :userID';
        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            return $sth->fetchAll();
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    /**
     * @param $orderBy
     * @param $cenaOd
     * @param $cenaDo
     * @return array
     */
    public static function getArticleByFilter($orderBy, $cenaOd, $cenaDo)
    {

        $pdo = DB::init();
        $conn = $pdo->conn;
        $name = 'a.created_at';
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

    /**
     * @param $id
     * @return mixed
     */
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

    /**
     * @param $id
     * @return mixed
     */
    public static function findReservation($id)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = 'SELECT *
            FROM reservation
            WHERE id = :id;';
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

    /**
     * @param $data
     * @param $images
     * @return string
     */
    public static function create($data, $images)
    {

        $editor = "";
        $editor2 = "";

        if ($_SESSION['isEditor']) {
            $editor = "user_id,";
            $editor2 = ":user_id,";
        }

        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "insert articles
                    (title,
                     description,
                     price,
                     location,
                     email,
                     " . $editor . "
                     created_at) values (:title, :description, :price, :location, :email," . $editor2 . ":created_at)";
        $args = array(
            ':title' => $data['Název'],
            ':description' => $data['Popis'],
            ':price' => $data['Cena'],
            ':location' => $data['Lokalita'],
            ':email' => $data['Email'],
            ':created_at' => date("Y-m-d H:i:s"),
        );

        if ($_SESSION['isEditor']) {
            $args[':user_id'] = $_SESSION['id'];
        }
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

    /**
     * @param $data
     * @param $images
     * @return bool
     */
    public static function update($data, $images)
    {
        $reservation = '';
        $editor = '';
        if ($data['rezervace'] != 0) {
            unset($data['rezervace']);
        } else {
            $reservation =  " reservation = :reservation,";
        }

        if ($_SESSION['isEditor']) {
            $editor = "user_id = :userID,";
        }
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "UPDATE articles 
                SET title = :title, 
                    description = :description, 
                    price = :price, 
                    location = :location, 
                    email = :email,
                    " . $reservation . "
                    " . $editor . "                  
                    updated_at = :updated_at                    
                WHERE id = :id";
        $args = array(
            ':title' => $data['Název'],
            ':description' => $data['Popis'],
            ':price' => $data['Cena'],
            ':location' => $data['Lokalita'],
            ':email' => $data['Email'],
            ':updated_at' => date("Y-m-d H:i:s"),
            ':id' => $data['id'],
        );


        if ($_SESSION['isEditor']) {
            $args[':userID'] = $_SESSION['id'];
        }

        if (isset($data['rezervace']) && $data['rezervace'] == 0) {
            $args[':reservation'] = $data['rezervace'];
        }

        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            is_null($images) ?: Image::create($images, $data['id']);
            return true;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    /**
     * @param $id
     * @return bool
     */
    public static function delete($id)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "DELETE FROM articles WHERE id = ?";

        try {
            $sth = $conn->prepare($sql);
            $sth->execute(array($id));
            return true;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    /**
     * @param $article
     * @return bool
     */
    public static function book($article)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "UPDATE articles 
                SET reservation = :reservationID,  updated_at = :updated_at                 
                WHERE id = :id";
        $args = array(
            ':reservationID' => $article['reservationID'],
            ':updated_at' => date("Y-m-d H:i:s"),
            ':id' => $article['id']
        );
        try {
            $sth = $conn->prepare($sql);
            $sth->execute($args);
            return true;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }

    /**
     * @param $id
     * @param $data
     * @return string
     */
    public static function saveResevation($id, $data)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "insert reservation(name, email, message, articles_id, created_at) values (:name, :email, :message,:articleID ,:created_at)";
        $args = array(
            ':name' => $data['Jméno'],
            ':email' => $data['Email'],
            ':message' => $data['Zpráva'],
            ':articleID' => $id,
            ':created_at' => date("Y-m-d H:i:s"),
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
