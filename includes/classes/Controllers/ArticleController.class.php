<?php

namespace App\Controller;


use App\Models\Article;

class ArticleController
{


    public static function index()
    {
        $allUsers = Article::getAllArticles();
        include('./includes/views/Articles/index.php');
    }

    public static function create($request)
    {
        $data = json_decode($request, true);
        \Tracy\Debugger::barDump($data);
    }
}
