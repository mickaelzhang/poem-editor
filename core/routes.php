<?php

// HOMEPAGE
$app->get('/', function() use ($app) {
    return $app['twig']->render('pages/home.twig');
})->bind('home');

return $app;