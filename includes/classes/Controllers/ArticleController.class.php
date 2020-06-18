<?php

namespace App\Controller;


use App\Models\Article;
use App\Models\Image;
use App\Services\Mail;
use App\Services\Redirect;

class ArticleController
{
    /**
     *  return all articles with filters
     */
    public static function index()
    {
        $request = $_REQUEST;
        if (isset($request['orderBy']) && !is_null($request['orderBy'])) {
            if ($request['orderBy'] === "1") {
                $orderBy = 'DESC';
            } elseif ($request['orderBy'] === "2") {
                $orderBy = 'ASC';
            } elseif($request['orderBy'] === "price") {
                $orderBy = 'price';
            }
        } else {
            $orderBy = 'DESC';
        }

        $cenaOd = 0;
        $cenaDo = 1000000000000000000;
        if (isset($request['cenaOd'])) {
            if (!is_null($request['cenaOd']) && is_numeric($request['cenaOd'])) {
                $cenaOd = $request['cenaOd'];
            }
        } elseif (isset($request['cenaDo'])) {
            if (!is_null($request['cenaDo']) && is_numeric($request['cenaDo'])) {
                $cenaDo = $request['cenaDo'];
            }
        }



        if (isset($request['orderBy']) && !is_null($request['orderBy'])) {
            $allArticles = Article::getArticleByFilter($orderBy, $cenaOd, $cenaDo);
        } else {
            $allArticles = Article::getAllArticles();
        }

        include('./includes/views/Articles/index.php');
    }

    /**
     * @param $articleID
     */
    public static function getArticleImages($articleID)
    {
        $images = Image::findImages($articleID);
        $imagesBinnary = array();
        foreach ($images as $image) {
            $imagesBinnary[] = array('base64' => base64_encode($image['image']), 'id' => $image['id']);
        }
        $msg = array('success' => 'Obrázky byly nalezeny.', 'images' => $imagesBinnary);
        echo json_encode($msg);
    }

    /**
     *  return view for articles
     */
    public static function edit()
    {
        if (!is_bool($_SESSION['isEditor']) || !is_bool($_SESSION['isAdmin']))
            Redirect::to('/');

        if ($_SESSION['isEditor'])
            $allArticles = Article::getAllArticlesWithoutImages();
        if ($_SESSION['isAdmin'])
            $allArticles = Article::getAllArticles();
        include('./includes/views/Articles/edit.php');
    }

    /**
     * @param $id
     */
    public static function show($id)
    {
        $article = Article::find($id);
        if (!$article)
            Redirect::to('/');

        if ($article['reservation'] != 0)
            $article['reservation'] = Article::findReservation($article['reservation']);

        $article['images'] = Image::findImages($id);
        include('./includes/views/Articles/show.php');
    }

    /**
     * @param $request
     * @param $files
     */
    public static function create($request, $files)
    {
        if (empty($_SESSION['isEditor']) && empty($_SESSION['isAdmin'])) {
            echo json_encode(array('errors' => 'Neopravněný přístup.'));
            return;
        }

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

    /**
     * @param $request
     * @param $files
     */
    public static function update($request, $files)
    {

        if (empty($_SESSION['isEditor']) && empty($_SESSION['isAdmin'])) {
            echo json_encode(array('errors' => 'Neopravněný přístup.'));
            return;
        }

        $data = json_decode($request['data'], true);

        $errors = null;
        $checked = $data['rezervace'];
        $id = $data['id'];
        unset($data['id']);
        unset($data['files']);
        unset($data['method']);
        unset($data['rezervace']);


        foreach ($data as $name => $param) {
            if (empty($param)) {
                $errors[$name] = $name . " je nutné vyplnit";
            } elseif (strlen($param) < 4) {
                $error[$name] = $name . " musí obsahovat minimálně 4 znaky.";
            } elseif (strlen($param) > 50) {
                $errors[$name] = $name . " musí obsahovat maximálně 200 znaků.";
            }
        }

        is_numeric($data['Cena']) ? '' :  $errors['Cena'] = "Cena musí obsahovat jen čísla";

        if (!is_null($errors)) {
            \Tracy\Debugger::barDump($errors);
            echo json_encode(array('errors' => $errors));
            return;
        }


        $images = null;
        if (!empty($files)) {
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
        }


        if (!is_null($errors)) {
            echo json_encode(array('errors' => $errors));
            return;
        } else {
            $data['rezervace'] = $checked;
            $data['id'] = $id;
            if (Article::update($data, $images)) {
                echo json_encode(array('success' => 'Inzerát byl upraven.', 'article' => $data));
            } else {
                echo json_encode(array('errors' => 'Inzerát nebyl upravej.'));
            }
        }
    }

    /**
     * @param $request
     */
    public static function destroy($request)
    {
        if (empty($_SESSION['isEditor']) && empty($_SESSION['isAdmin'])) {
            echo json_encode(array('errors' => 'Neopravněný přístup.'));
            return;
        }
        unset($request['method']);
        $data = json_decode($request['data'], true);
        $article = Article::find($data['id']);
        if ($article) {
            if (Article::delete($article['id'])) {
                echo json_encode(array('success' => 'Inzerát byl odstraněn.'));
            } else {
                echo json_encode(array('errors' => 'Inzerát nebylo odstranit.'));
            }
        }
    }

    /**
     * @param $request
     */
    public static function sendArticleToEmail($request)
    {
        $errors = null;
        $data = json_decode($request['data']);
        if (filter_var($data->email, FILTER_VALIDATE_EMAIL) === false) {
            $errors['Email'] = 'Email není ve správném formátu';
            echo json_encode(array('errors' => $errors));
            return;
        } else {
            $article = Article::find($data->id);
            $images = Image::findImages($article['id']);
            if (Mail::sendArticle($data->email, $article, $images)) {
                echo json_encode(array('success' => 'Inzerát byl odeslán na Váš email'));
            } else {
                echo json_encode(array('errors' => 'Inzerát nebylo možno poslat.'));
            }
        }
    }

    /**
     * @param $request
     */
    public static function sendReservationToOwner($request)
    {
        $errors = null;
        $data = json_decode($request['data'], true);
        $id = $data['id'];

        unset($data['id']);
        foreach ($data as $name => $param) {
            if (empty($param)) {
                $errors[$name] = $name . " je nutné vyplnit";
            } elseif (strlen($param) < 4) {
                $error[$name] = $name . " musí obsahovat minimálně 4 znaky.";
            } elseif (strlen($param) > 500) {
                $errors[$name] = $name . " musí obsahovat maximálně 200 znaků.";
            }
        }
        if (filter_var($data['Email'], FILTER_VALIDATE_EMAIL) === false) {
            $errors['Email'] = 'Email není ve správném formátu';
        }
        if (!is_null($errors)) {
            \Tracy\Debugger::barDump($errors);
            echo json_encode(array('errors' => $errors));
            return;
        }

        $article = Article::find($id);
        $data['reservationID'] = Article::saveResevation($article['id'], $data);
        if ($data['reservationID']) {
            if (Mail::sendReservation($article, $data)) {
                $msg = array('success' => 'Vaše rezervace byla přijate ke zpracování.');
                echo json_encode($msg);
            }
        } else {
            echo json_encode(array('errors' => 'Vaše rezervace nešla odeslat majiteli.'));
        }
    }

    /**
     * @param $request
     */
    public static function bookArticle($request)
    {
        $article = Article::find($request['articleId']);
        $article['reservationID'] = $request['reservation'];
        if ($article['reservation'] == 0) {
            Article::book($article);
            echo 'Vaše rezervace byla potrvrzena.';
        } else {
            echo 'Vaš inzerát již byl rezervován.';
        }
    }
}
