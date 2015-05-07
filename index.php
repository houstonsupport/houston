<?php
define('PHP_START', microtime(true));

// Character encoding
mb_internal_encoding('UTF-8');
mb_detect_order(array('UTF-8', 'ASCII'));
mb_http_output('UTF-8');

// Default timezone
date_default_timezone_set('UTC');

// Define document root
define('DOCUMENT_ROOT', __DIR__);

// Import application config
$ini_array = parse_ini_file(DOCUMENT_ROOT.'/application/config.ini');
foreach($ini_array as $key => $val) {
	define($key, $val);
}

// Require Composer autoloader
require_once DOCUMENT_ROOT.'/vendor/autoload.php';

// Class importing / aliasing
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Storage\Handler\MongoDbSessionHandler;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\MonologServiceProvider;
use Silex\Provider\SwiftmailerServiceProvider;
use Mongo\Silex\Provider\MongoServiceProvider;
use Merqlove\Silex\Provider\AirbrakeServiceProvider;
use Houston\Core\System;
use Houston\Component\ApiResponse;

// Instantiate Silex
$app = new Application();
$app['charset'] = 'UTF-8';
if(DEBUG) {
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	$app['debug'] = true;
}

// Register URL generator service provider
$app->register(new UrlGeneratorServiceProvider());

// Register controller service provider
$app->register(new ServiceControllerServiceProvider());

// Register MongoDB service provider
$app->register(new MongoServiceProvider, array(
    'mongo.connections' => array(
        'default' => array(
            'server' => 'mongodb://'.MONGO_USER.':'.MONGO_PASSWORD.'@'.MONGO_HOST,
            'options' => array('connect' => true)
        )
    ),
));

// Register session handling service provider
$app->register(new SessionServiceProvider());
$app['session.storage.handler'] = $app->share(function ($app) {
	return new MongoDbSessionHandler(
		$app['mongo']['default'],
		array('database' => 'houston', 'collection' => 'sessions')
	);
});

// Register Monolog service provider for local logging
$app->register(new MonologServiceProvider(), array(
    'monolog.logfile' => DOCUMENT_ROOT.LOG_PATH,
	'monolog.name' => 'Houston',
	'monolog.level' => LOG_LEVEL
));

// Setup Airbrake error tracking service provider
$app->register(new AirbrakeServiceProvider(), array(
    'airbrake.api_key' => AIRBRAKE_API_KEY,
	'airbrake.options' => array(
		'secure' => false,
		'environmentName' => APP_ENV
	)
));

// Register Swiftmailer service provider
$app->register(new SwiftmailerServiceProvider());
$app['swiftmailer.options'] = array(
	'host' => SMTP_HOST,
	'port' => SMTP_PORT,
	'username' => SMTP_USERNAME,
	'password' => SMTP_PASSWORD,
	'encryption' => null,
	'auth_mode' => null
);

// Error handler
$app->error(function(\Exception $e, $code) use ($app) {
	$app['airbrake']->notifyOnException($e);

	if($app['debug']) return;

	switch($code) {
		case 404:
			return $app->redirect('/');
			break;

		default:
			$message = 'Sorry, something went wrong.';
			break;
	}

	return new Response($message);	// Update this to custom error template
});

// Define security middleware
$secure = function(Request $request, Application $app) {
	// Accept requests from either a valid API key or an authenticated session
	try {
		System::validateApiKey($app, $request->get('apikey'));
	} catch(\Exception $e) {
		if(!$app['session']->get('isAuthenticated')) {
			if(strpos($request->get("_route"), 'api') !== false) {
				return ApiResponse::error('SESSION_EXPIRED');
			} else {
				return $app->redirect('/');
			}
		}
	}
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

// Autoload houston components - MOVE THESE INTO SERVICE PROVIDERS!
foreach(glob(DOCUMENT_ROOT."/application/components/*.php") as $filename) {
    require_once $filename;
}

// Autoload models
foreach(glob(DOCUMENT_ROOT."/application/models/*.php") as $filename) {
    require_once $filename;
}

// Autoload controllers
foreach(glob(DOCUMENT_ROOT."/application/controllers/*.php") as $filename) {
    require_once $filename;
}

// Autoload routes
foreach(glob(DOCUMENT_ROOT."/application/routes/*.php") as $filename) {
    require_once $filename;
}

$app->run();
