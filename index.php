<?php

require('server.php');

$title = 'Bazar | Administrace';
require('./includes/src/header.php');
require('./includes/src/nav.php');

switch ($_REQUEST['page']) {
    case 'login':
        include('./includes/views/Auth/login.php');
        break;
    case 'logout':
        include('./includes/views/Auth/logout.php');
        break;
    case 'users':
        \App\Controller\UserController::index();
        break;
    case 'articles':
        \App\Controller\ArticleController::index();
        break;
    case 'articleDetail':
        \App\Controller\ArticleController::show($_REQUEST['id']);
        break;
    case 'editArticles':
        \App\Controller\ArticleController::edit();
        break;
    default:
        \App\Controller\ArticleController::index();
        break;
}

require('./includes/src/footer.php');
