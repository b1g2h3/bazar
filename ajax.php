<?php

require('server.php');

switch ($_POST['method']) {
    case 'addUser':
        \App\Controller\UserController::store($_POST['data']);
        break;
    case 'editUser':
        \App\Controller\UserController::update($_POST['data']);
        break;
    case 'deleteUser':
        \App\Controller\UserController::destroy($_POST['data']);
        break;
}