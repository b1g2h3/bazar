<?php

require('server.php');


switch ($_POST['method']) {
    case 'addUser':
        \App\Controller\UserController::store($_POST['data']);
        break;
    case 'updateUser':
        \App\Controller\UserController::update($_POST['data']);
        break;
    case 'deleteUser':
        \App\Controller\UserController::destroy($_POST['data']);
        break;
    case 'handleLogin':
        \App\Controller\AuthController::handleLogin($_POST['data']);
        break;
    case 'addArticle':
        \App\Controller\ArticleController::create($_POST, $_FILES);
        break;
    case 'updateArticle':
        \App\Controller\ArticleController::update($_POST, $_FILES);
        break;
    case 'deleteImage':
    \App\Controller\ImageController::destroy($_POST['imageId']);
        break;
    case 'getArticleImages':
        \App\Controller\ArticleController::getArticleImages($_POST['id']);
        break;
    case 'sendArticleToEmail':
        \App\Controller\ArticleController::sendArticleToEmail($_POST);
        break;
    case 'sendReservationToOwner':
        \App\Controller\ArticleController::sendReservationToOwner($_POST);
        break;
    default:
        \Tracy\Debugger::barDump('cesta neexistuje');
}
