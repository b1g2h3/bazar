<?php

namespace App\Models;

use Exception;
use App\Database\DB;

class Image
{

    public static function findImages($aticleID)
    {
        $db = DB::init();
        $conn = $db->PDO();
        $sql = 'SELECT image
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

    public static function create($images, $articleId)
    {
        $db = DB::init();
        $conn = $db->PDO();
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
