<?php
// Require application config
define('DOCUMENT_ROOT', __DIR__);
require_once(__DIR__.'/application/config.php');

// PHP error reporting
if(Config::ERROR_REPORTING === true) {
	error_reporting(E_ALL);
	ini_set("display_errors", 1);	
}

// Require Composer autoloader
require_once(__DIR__.'/vendor/autoload.php');

// Class importing / aliasing
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Silex\Provider\MonologServiceProvider;
use Mongo\Silex\Provider\MongoServiceProvider;

// Instantiate Silex framework
$app = new Application();
$app['debug'] = true;

// Register URL generator service provider
$app->register(new UrlGeneratorServiceProvider());

// Register session handling service provider
$app->register(new SessionServiceProvider());

// Register MongoDB service provider
$app->register(new MongoServiceProvider, array(
    'mongo.connections' => array(
        'default' => array(
            'server' => 'mongodb://'.Config::MONGO_USER.':'.Config::MONGO_PASSWORD.'@'.Config::MONGO_HOST,
            'options' => array("connect" => true)
        )
    ),
));

// Register Monolog service provider
$app->register(new MonologServiceProvider(), array(
    'monolog.logfile' => __DIR__.Config::LOG_PATH,
	'monolog.name' => 'Houston',
	'monolog.level' => Config::LOG_LEVEL
));

// Define REST API security middleware
$secure = function(Request $request, Application $app) {
	if(!$app['session']->get('isAuthenticated')) return $app->redirect('/');
};

// Autoload only required classes (PSR-4) - MAKE THIS WORK!
/*spl_autoload_register( function ($className) {
    $className = ltrim($className, '\\');
    $fileName  = '';
    $namespace = '';
    if ($lastNsPos = strrpos($className, '\\')) {
        $namespace = substr($className, 0, $lastNsPos);
        $className = substr($className, $lastNsPos + 1);
        $fileName  = str_replace('\\', DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
    }
    $fileName .= str_replace('_', DIRECTORY_SEPARATOR, $className) . '.php';

    require $fileName;
});*/

// Autoload extras
foreach(glob(__DIR__."/application/extras/*.php") as $filename) {
    include $filename;
}

// Autoload models
foreach(glob(__DIR__."/application/models/*.php") as $filename) {
    include $filename;
}

// Autoload routes & controllers
foreach(glob(__DIR__."/application/controllers/*.php") as $filename) {
    include $filename;
}

$app->run();