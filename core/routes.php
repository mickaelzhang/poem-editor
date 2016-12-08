<?php

// HOMEPAGE
$app->get('/', function() use ($app) {
    return $app['twig']->render('pages/home.twig');
})->bind('home');

$app->get('/editeur', function() use ($app) {
    return $app['twig']->render('pages/editor.twig');
})->bind('editor');

return $app;
