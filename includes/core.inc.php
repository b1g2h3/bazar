<?php
error_reporting(E_ALL ^ E_NOTICE);
session_start();

$GLOBALS['config'] = array(
    'mysql' => array(
        'host' => '127.0.0.1',
        'username' => 'admin',
        'password' => '123456',
        'db' => 'bazar2',
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

require_once 'functions/sanitize.php';
