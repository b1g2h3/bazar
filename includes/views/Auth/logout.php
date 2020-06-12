<?php
require_once './includes/core.inc.php';

$user= new User();
$user->logout();

Redirect::to('indexx.php');