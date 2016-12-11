<?php

// HOMEPAGE
$app->get('/', function() use ($app) {
    return $app['twig']->render('pages/home.twig');
})->bind('home');

return $app;

// THEMEPAGE
$app->get('/theme', function() use ($app) {
    return $app['twig']->render('pages/theme.twig');
})->bind('theme');
return $app;
