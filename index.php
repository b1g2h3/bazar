<?php


require('./vendor/autoload.php');


include './includes/routes/Route.php';
include './includes/core.inc.php';

use App\Controller\UserController;
use App\Routes\Route;


// Define a global basepath
define('BASEPATH','/');

function navi() {
  include('./includes/src/header.php');
  include('./includes/src/nav.php');
}

function footer() {
    include('./includes/src/footer.php');
}



// Add base route
Route::add('/', function() {
    navi();

    footer();
});


// Add base route
Route::add('/inzeraty', function() {
    navi();

    footer();
});

// Add base route
Route::add('/inzeraty', function() {
    UserController::index();
});

// Post route example
Route::add('/prihlasit', function() {
    navi();
    echo '<form method="post"><input type="text" name="test"><input type="submit" value="send"></form>';
}, 'get');

// Get and Post route example
Route::add('/get-post-sample', function() {
    navi();
    echo 'You can GET this page and also POST this form back to it';
    echo '<form method="post"><input type="text" name="input"><input type="submit" value="send"></form>';
    if (isset($_POST['input'])) {
        echo 'I also received a POST with this data:<br>';
        print_r($_POST);
    }
}, ['get','post']);

// Route with regexp parameter
// Be aware that (.*) will match / (slash) too. For example: /user/foo/bar/edit
// Also users could inject SQL statements or other untrusted data if you use (.*)
// You should better use a saver expression like /user/([0-9]*)/edit or /user/([A-Za-z]*)/edit
Route::add('/user/(.*)/edit', function($id) {
    navi();
    echo 'Edit user with id '.$id.'<br>';
});

// Accept only numbers as parameter. Other characters will result in a 404 error
Route::add('/foo/([0-9]*)/bar', function($var1) {
    navi();
    echo $var1.' is a great number!';
});



// Add a 404 not found route
Route::pathNotFound(function($path) {
    // Do not forget to send a status header back to the client
    // The router will not send any headers by default
    // So you will have the full flexibility to handle this case
    header('HTTP/1.0 404 Not Found');
    navi();
    echo 'Error 404 :-(<br>';
    echo 'The requested path "'.$path.'" was not found!';
});

// Add a 405 method not allowed route
Route::methodNotAllowed(function($path, $method) {
    // Do not forget to send a status header back to the client
    // The router will not send any headers by default
    // So you will have the full flexibility to handle this case
    header('HTTP/1.0 405 Method Not Allowed');
    navi();
    echo 'Error 405 :-(<br>';
    echo 'The requested path "'.$path.'" exists. But the request method "'.$method.'" is not allowed on this path!';
});

// Run the Router with the given Basepath
Route::run(BASEPATH);

// Enable case sensitive mode, trailing slashes and multi match mode by setting the params to true
// Route::run(BASEPATH, true, true, true);
