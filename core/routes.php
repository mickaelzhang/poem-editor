<?php

// HOMEPAGE
$app->get('/', function() use ($app) {
    return $app['twig']->render('pages/home.twig');
})->bind('home');

// Jeu
$app->get('/jeu', function() use ($app) {
    return $app['twig']->render('pages/jeu.twig');
})->bind('jeu');

return $app;
