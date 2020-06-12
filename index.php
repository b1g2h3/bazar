<?php

require('server.php');
$allUsers = \App\Controller\UserController::index();


require('./includes/src/header.php');
require('./includes/src/nav.php');
require('./includes/views/Users/index.php');
require('./includes/src/footer.php');
