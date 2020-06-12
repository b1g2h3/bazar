<?php
session_start();
require __DIR__ . '/vendor/autoload.php';
\Tracy\Debugger::enable(\Tracy\Debugger::DEVELOPMENT);