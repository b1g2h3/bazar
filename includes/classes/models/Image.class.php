<?php

namespace App\Models;

use Exception;
use App\Database\DB;

class Image
{

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
                return true;
            }
        }
    }
}
