<?php

namespace App\Controller;


use App\Models\Article;
use App\Models\Image;
use Tracy\Debugger;

class ArticleController
{


    public static function index()
    {
        $request = $_REQUEST;;
        if (!is_null($request['orderBy'])) {
            if ($request['orderBy'] === "1") {
                $orderBy = 'DESC';
            } elseif ($request['orderBy'] === "2") {
                $orderBy = 'ASC';
            } else {
                $orderBy = 'DESC';
            }
        }

        $cenaOd = 0;
        $cenaDo = 1000000;
        if (!is_null($request['cenaOd']) && is_numeric($request['cenaOd'])) {
            $cenaOd = $request['cenaOd'];
        }
        if (!is_null($request['cenaDo']) && is_numeric($request['cenaDo'])) {
            $cenaDo = $request['cenaDo'];
        }



        if (!is_null($request['orderBy'])) {
            $allArticles = Article::getArticleByFilter($orderBy, $cenaOd, $cenaDo);
        } else {
            $allArticles = Article::getAllArticles();
        }

        include('./includes/views/Articles/index.php');
    }

    public static function getArticleImages($articleID)
    {
        $images = Image::findImages($articleID);
        \Tracy\Debugger::barDump($images);
        echo json_encode(array('success' => 'Obrázky byly nalezeny.', 'images' => $images));
    }

    public static function edit()
    {
        $allArticles = Article::getAllArticles();
        include('./includes/views/Articles/edit.php');
    }

    public static function show($id)
    {
        $article = Article::find($id);
        $article['images'] = Image::findImages($id);
        include('./includes/views/Articles/show.php');
    }

    public static function create($request, $files)
    {
        $data = json_decode($request['data'], true);
        $errors = null;
        unset($data['files']);
        unset($data['method']);

        foreach ($data as $name => $param) {
            if (empty($param)) {
                $errors[$name] = $name . " je nutné vyplnit";
            } elseif (strlen($param) < 4) {
                $error[$name] = $name . " musí obsahovat minimálně 4 znaky.";
            } elseif (strlen($param) > 50) {
                $errors[$name] = $name . " musí obsahovat maximálně 200 znaků.";
            }
        }
        \Tracy\Debugger::barDump($files);
        if (empty($files)) {
            $errors['Obrázky'] = "Vložte obrázky";
        }
        is_numeric($data['Cena']) ? '' :  $errors['Cena'] = "Cena musí obsahovat jen čísla";

        if (!is_null($errors)) {
            \Tracy\Debugger::barDump($errors);
            echo json_encode(array('errors' => $errors));
            return;
        }

        $allowed = array('jpg', 'jpeg', 'png');
        $images = array();
        $numberOfImages = count($files['file']['name']);
        for ($i = 0; $i < $numberOfImages; $i++) {
            $fileName = $files['file']['name'][$i];
            $fileType = $files['file']['type'][$i];
            $fileTpName = $files['file']['tmp_name'][$i];
            $fileSize = $files['file']['size'][$i];
            $fileError = $files['file']['error'][$i];
            $fileExt = explode('.', $fileName);
            $fileAcualExt = strtolower(end($fileExt));
            if (in_array($fileAcualExt, $allowed)) {
                if ($fileError === 0) {
                    if ($fileSize < 500000) {
                        $images[$i] = file_get_contents($fileTpName);
                    } else {
                        $errors['Obrázky'] = "Váš soubor je příliš velký!";
                    }
                } else {
                    $errors['Obrázky'] = "Vyskytla se chyba při nahrávaní Vašeho souboru";
                }
            } else {
                $errors['Obrázky'] = "Formát obrázku není povolen.";
            }
        }
        if (!is_null($errors)) {
            echo json_encode(array('errors' => $errors));
            return;
        } else {
            $articleID =  Article::create($data, $images);
            if ($articleID) {
                $data['id'] = $articleID;
                echo json_encode(array('success' => 'Inzerát byl vytvořen.', 'article' => $data));
            } else {
                echo json_encode(array('errors' => 'Inzerát nebyl vytvořen.'));
            }
        }
    }
}
