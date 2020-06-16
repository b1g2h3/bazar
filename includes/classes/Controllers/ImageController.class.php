<?php

namespace App\Controller;


use App\Models\Image;

class ImageController
{

    /**
     * @param $data
     */
    public static function destroy($id)
    {
        $id = str_replace('img', '', $id);
        $image = Image::find($id);

        if ($image) {
            if (Image::delete($image['id'])) {
                $msg =array('success' => 'Obrázek byl odstraněn.');
                echo json_encode($msg);
            } else {
                echo json_encode(array('errors' => 'Obrázek nebyl odstraněn.'));
            }
        }
    }
}
