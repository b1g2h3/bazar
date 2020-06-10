<?php
error_reporting(E_ALL ^ E_NOTICE);
session_start();

$GLOBALS['config'] = array(
    'mysql' => array(
        'host' => '127.0.0.1',
        'username' => 'admin',
        'password' => '123456',
        'db' => 'bazar'
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


spl_autoload_register(function ($class) {
    include 'classes/' . $class . '.class.php';
});

require_once 'functions/sanitize.php';


// Define variable for custom error messages
$errors = [];
