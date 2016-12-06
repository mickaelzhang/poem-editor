<?php


require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();

$app = require __DIR__.'/../core/app.php';
$app = require __DIR__.'/../core/routes.php';

$app->run();