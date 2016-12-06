<?php

$isCached = false;
$twigCacheOption = $isCached ? __DIR__ . '/../cache/twig' : false;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
	'twig.path' => array(__DIR__.'/../core/views'),
    'twig.options'    => array(
		'cache' => $twigCacheOption,
    ),
));

return $app;