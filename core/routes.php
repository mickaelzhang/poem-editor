<?php

// HOMEPAGE
$app->get('/', function() use ($app) {
    return $app['twig']->render('pages/home.twig');
})->bind('home');

// Jeu
$app->get('/jeu', function() use ($app) {
    return $app['twig']->render('pages/theme.twig');
})->bind('game');

$app->get('/rime', function() use ($app) {
    return $app['twig']->render('pages/rime.twig');
})->bind('rime');

$app->get('/syllabe', function() use ($app) {
    return $app['twig']->render('pages/syllabe.twig');
})->bind('syllabe');

$app->get('/vers', function() use ($app) {
    return $app['twig']->render('pages/vers.twig');
})->bind('vers');

return $app;
