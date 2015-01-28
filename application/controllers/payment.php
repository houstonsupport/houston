<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;	

use Houston\Extra\Payment;

// Charge payment to customer - Combine controller code with registration controller!
$app->post('/payment/charge', function(Request $request, Application $app) {
	$data = json_decode(file_get_contents('php://input'));
	
	$payment = new Payment($app);
	
	$payment->setPlan($data->plan);
	
	$payment->setToken($data->token);
	
	$payment->createStripeCustomer();
	
	$charge = $payment->createStripeCharge();

	return json_encode($charge);
});

// Create user account - Complete

// Create Stripe customer - Complete

// Charge Stripe customer - Charge pre-defined subscription not value!

// On login check that stripe customer has valid subscription