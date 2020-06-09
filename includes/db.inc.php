<?php
// Begin/resume session
session_start();

$GLOBALS['config'] = array(
    'mysql' => array(
        'host' => 'srv-insodev.ccv.cz',
        'username' => 'insodev',
        'password' => 'toku_adaptacniprojekt',
        'db' => 'db'
    ),
    'remember' => array(
        'cookie_name' => 'hash',
        'cookie_expiry' => 604800
    ),
    'sessions' => array(
        'session_name' => 'user',
        'token_name' => 'token'
    )
);

// Include necessary file
function my_autoloader($class) {
    include 'classes/' . $class . '.class.php';
}

spl_autoload_register('my_autoloader');


// Define variable for custom error messages
$errors = [];

// Define key variables for connection
$db_host = 'srv-insodev.ccv.cz';
$db_user = 'insodev';
$db_pass = 'isis';
$db_name = 'toku_adaptacniprojekt';

// Establish a new connection using PDO
try {
    $db_conn = new PDO("mysql:host={$db_host};dbname={$db_name}", $db_user, $db_pass);
    $db_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    array_push($errors, $e->getMessage());
}

// Make use of database with users
$user = new User($db_conn);
$articles = new Article($db_conn);