<?php
header("Access-Control-Allow-Origin: *");

require __DIR__ . '/../src/config.php';
require __DIR__ . '/../vendor/autoload.php';

$app = new \SlimRest\App;

$app->run();
