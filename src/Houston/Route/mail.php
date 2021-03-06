<?php
use Silex\Application;

use Houston\Controller\MailController;

$app['mail.controller'] = $app->share(function() use ($app) {
	return new MailController($app);
});

$app->get('/api/mailbox/test', 'mail.controller:mailboxTestAction')->before($secure);

$app->get('/api/mailbox/scan', 'mail.controller:mailboxScanAction')->before($secure);