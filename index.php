<?php


$loader = require __DIR__ . '/vendor/autoload.php';


include './includes/routes/Route.php';
include './includes/core.inc.php';

use App\Controller\AuthController;
use App\Controller\UserController;
use App\Routes\Route;

\Tracy\Debugger::enable();


// Define a global basepath
define('BASEPATH', '/');

function navi()
{
    require('./includes/src/header.php');
    require('./includes/src/nav.php');
}

function footer()
{
    include('./includes/src/footer.php');
}


// function setMethod($method, $function)
// {
//     switch ($method) {
//         case $method == 'GET':
//             navi();
//             $function;
//             footer();
//             break;
//         case $method == 'POST':
//             $function;
//             break;
//         case $method == 'PUT':
//             $function;
//             break;
//         case $method == 'DESTROY':
//             $function;
//             break;
//         default:
//             $function;
//             break;
//     }
// }


// Add base route
Route::add('/', function () {
    navi();

    footer();
});


// Add base route
Route::add('/inzeraty', function () {
    navi();

    footer();
});

// Add base route
Route::add('/uzivatele', function () {
    navi();
    UserController::index();
    footer();
});

Route::add('/adduser', function () {
    UserController::store($_POST);
}, ['post']);

Route::add('/edituser', function () {
    UserController::update($_POST);
}, ['post']);

Route::add('/prihlasit', function () {
    navi();
    AuthController::login();
    footer();
}, ['get']);
Route::add('/prihlasit', function () {
    AuthController::handleLogin($_POST);
}, ['post']);
Route::add('/odhlasit', function () {
    AuthController::logout();
});


// Add a 404 not found route
Route::pathNotFound(function ($path) {
    header('HTTP/1.0 404 Not Found');
    navi();
    echo 'Error 404 :-(<br>';
    echo 'Cesta "' . $path . '" nebyla nalezena!';
});

// Add a 405 method not allowed route
Route::methodNotAllowed(function ($path, $method) {
    header('HTTP/1.0 405 Method Not Allowed');
    navi();
    echo 'Error 405 :-(<br>';
//    echo 'Tato cesta "' . $path . '" existuje. Ale cesta je dostupna pro metodu "' . $method . '" is not allowed on this path!';
});

// Run the Router with the given Basepath
Route::run(BASEPATH);
