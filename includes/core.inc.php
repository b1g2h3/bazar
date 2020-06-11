<?php
error_reporting(E_ALL ^ E_NOTICE);
session_start();

$GLOBALS['config'] = array(
    'mysql' => array(
        'host' => 'srv-insodev.ccv.cz',
        'username' => 'insodev',
        'password' => 'isis',
        'db' => 'toku_adaptacniprojekt'
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
