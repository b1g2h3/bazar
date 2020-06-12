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
        \App\Controller\ArticleController::create($_POST['data']);
        break;
    default:
        \Tracy\Debugger::barDump('cesta neexistuje');
}
