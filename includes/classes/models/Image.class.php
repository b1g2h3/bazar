<?php

namespace App\Models;

use Exception;
use App\Database\DB;

class Image
{

    /**
     * @param $aticleID
     * @return array
     */
    public static function findImages($aticleID)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = 'SELECT id, image
                FROM images
                WHERE articles_id = :articleID;';
        $args = array(':articleID' => $aticleID);
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
     * @param $imageID
     * @return mixed
     */
    public static function find($imageID)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = 'SELECT id, image
                FROM images
                WHERE id = :imageID;';
        $args = array(':imageID' => $imageID);
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
     * @return bool
     */
    public static function delete($id)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "DELETE FROM images WHERE id = ?";

        try {
            $sth = $conn->prepare($sql);
            $sth->execute(array($id));
            return true;
        } catch (Exception $e) {
            \Tracy\Debugger::barDump($e->getMessage());
        }
    }


    /**
     * @param $images
     * @param $articleId
     * @return bool
     */
    public static function create($images, $articleId)
    {
        $pdo = DB::init();
        $conn = $pdo->conn;
        $sql = "insert images(image, articles_id) values (:image, :articleId)";
        $sth = $conn->prepare($sql);
        if ($sth) {
            foreach ($images as $image) {
                try {
                    $args = array(
                        ':articleId' => $articleId,
                        ':image' => $image,
                    );
                    $sth->execute($args);
                } catch (Exception $e) {
                    \Tracy\Debugger::barDump($e->getMessage());
                }
            }
            return true;
        }
    }
}
