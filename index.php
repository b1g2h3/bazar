<?php


$loader = require __DIR__ . '/vendor/autoload.php';


include './includes/routes/Route.php';
include './includes/core.inc.php';

use App\Controller\AuthController;
use App\Controller\UserController;
use App\Routes\Route;

\Tracy\Debugger::enable();
\Tracy\Debugger::barDump('dawdada');

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
    UserController::edit($_POST);
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



// Get and Post route example
Route::add('/get-post-sample', function () {
    navi();
    echo 'You can GET this page and also POST this form back to it';
    echo '<form method="post"><input type="text" name="input"><input type="submit" value="send"></form>';
    if (isset($_POST['input'])) {
        echo 'I also received a POST with this data:<br>';
        print_r($_POST);
    }
}, ['get', 'post']);

// Route with regexp parameter
Route::add('/user/(.*)/edit', function ($id) {
    navi();
    echo 'Edit user with id ' . $id . '<br>';
});

// Accept only numbers as parameter. Other characters will result in a 404 error
Route::add('/foo/([0-9]*)/bar', function ($var1) {
    navi();
    echo $var1 . ' is a great number!';
});



// Add a 404 not found route
Route::pathNotFound(function ($path) {
    header('HTTP/1.0 404 Not Found');
    navi();
    echo 'Error 404 :-(<br>';
    echo 'The requested path "' . $path . '" was not found!';
});

// Add a 405 method not allowed route
Route::methodNotAllowed(function ($path, $method) {
    header('HTTP/1.0 405 Method Not Allowed');
    navi();
    echo 'Error 405 :-(<br>';
    echo 'The requested path "' . $path . '" exists. But the request method "' . $method . '" is not allowed on this path!';
});

// Run the Router with the given Basepath
Route::run(BASEPATH);
