<?php

namespace App\Controller;


use App\Models\Article;

class ArticleController
{


    public static function index()
    {
        $allArticles = Article::getAllArticles();
        include('./includes/views/Articles/index.php');
    }

    public static function edit()
    {
        $allArticles = Article::getAllArticles();
        include('./includes/views/Articles/edit.php');
    }

    public static function create($request, $files)
    {
        $data = json_decode($request['data'], true);
        $errors = null;
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
        if ($files['file']['name'][0] === 'blob') {
            $errors['Obrázky'] = "Vložte obrázky";
        }
        self::validatePhoneNumber($data['Telefon']) ? '' : $errors['Telefon'] = "Telefonní číslo není ve správném formátu. +420987654321";
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
            \Tracy\Debugger::barDump(Article::create($data, $images));
            if (Article::create($data, $images)) {
                echo json_encode(array('success' => 'Inzerát byl vytvořen.', 'inzerat' => $data));
            } else {
                echo json_encode(array('errors' => 'Inzerát nebyl vytvořen.'));
            }
        }
    }

    protected static function validatePhoneNumber($phone)
    {
        $filteredPhoneNumber = filter_var($phone, FILTER_SANITIZE_NUMBER_INT);
        $phoneToCheck = str_replace("-", "", $filteredPhoneNumber);
        if (strlen($phoneToCheck) < 8 || strlen($phoneToCheck) > 14) {
            return false;
        } else {
            return true;
        }
    }
}
