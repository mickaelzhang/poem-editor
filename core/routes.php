<?php

// HOMEPAGE
$app->get('/', function() use ($app) {
    return $app['twig']->render('pages/home.twig');
})->bind('home');

// Jeu
$app->get('/jeu', function() use ($app) {
    return $app['twig']->render('pages/jeu.twig');
})->bind('jeu');

// Poésie
$app->get('/poesie', function() use ($app) {
    return $app['twig']->render('pages/poesie.twig');
})->bind('poesie');

// End
// Poésie
$app->get('/fin', function() use ($app) {
    return $app['twig']->render('pages/end.twig');
})->bind('end');

return $app;
