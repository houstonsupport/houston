<?php
namespace Houston\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Cookie;

use Houston\Core\System;
use Houston\Component\ApiResponse;
use Houston\Component\Payment;
use Houston\Model\UserModel;
use Houston\Model\CompanyModel;

class AuthController 
{
	protected $app;
	
	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function authLoginAction()
	{
		$json = json_decode(file_get_contents('php://input'));
		
		$userModel = new UserModel($this->app);
		$userModel->loadUser($json->user);
			
		// Does verified user exist?
		if(!$userModel->isVerified($json->user)) return ApiResponse::error('USER_UNVERIFIED');
		
		// Do password hashes match?
		if($userModel::hashPassword($json->password) !== $userModel->user['password']) return ApiResponse::error('PASSWORD_INVALID');
		
		$companyModel = new CompanyModel($this->app);
		$companyModel->loadCompanyByID($userModel->user['companyID']);
		
		// Does this company have a valid subscription (check with Stripe)
		$payment = new Payment($this->app);
		if(!$payment->validSubscription($companyModel->company['stripeCustomerID'])) return ApiResponse::error('STRIPE_INVALID_SUBSCRIPTION');
		
		// Authenticate session and register default database connection
		System::setupSession($this->app, true, $companyModel->company['database'], (string) $userModel->user['_id'], (string) $userModel->user['companyID']);
		
		// Remember me?
		if($json->remember == 1) {
			$remember = $userModel->rememberMeSet($json->user);
			
			$cookie = new Cookie('r', $remember, (time() + 3600 * 24 * 30));
			
			$response = new Response();
			$response->setContent('1');
			$response->setStatusCode(Response::HTTP_OK);
			$response->headers->setCookie($cookie);
			
			return $response;
		}
		
		return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
	}
	
	public function authLogoutAction()
	{
		$response = Response::create('', 302, array("Location" => "/"));
		$response->headers->clearCookie('r');
		
		System::destroySession($this->app);
		
		return $response;
	}
	
	public function registerAction() 
	{
		$json = json_decode(file_get_contents('php://input'));
		
		$stripeToken = $json->stripeToken; 
		unset($json->stripeToken);
		
		$stripePlan = $json->plan; 
		unset($json->plan);
		
		$userModel = new UserModel($this->app);
		$companyModel = new CompanyModel($this->app);
		
		// Does verified user or company already exist?
		if($userModel->isVerified($json->emailAddress) || $companyModel->companyExists($json->company)) return ApiResponse::error('USER_UNVERIFIED');
		
		// Create company
		$company = $companyModel->generateCompany($json);
		$json->companyID = $company->_id;
		unset($json->company);
		
		// Generate unique database identifier
		$databaseIdentifier = System::generateDatabaseIdentifier($json->companyID);
		
		// Update company with database identifier
		$companyModel->updateDatabaseIdentifier($json->companyID, $databaseIdentifier);
		
		// Create user account
		$userModel->registerUser($json);
		
		// Perform stripe charge and link stripe customer to company
		$payment = new Payment($this->app);
		$payment->setPlan($stripePlan);
		$payment->setToken($stripeToken);
		
		try {
			$customer = $payment->createStripeCustomer($payment->token, $json->_id, $payment->plan['id']);
		} catch(\Stripe_Error $e) {
			$body = $e->getJsonBody();
			return json_encode($body['error']);
		}
		
		// Send verification email
		mail($json->emailAddress, "Welcome to Houston!", "Welcome to Houston!\r\n\r\nPlease click the link to verify your user account: ".\Config::DOMAIN."/verify/".$json->verify);
		
		return $customer->__toJSON();	
	}
	
	public function verifyAction($token)
	{
		$userModel = new UserModel($this->app);
		$userModel->isVerified(null, $token);
		
		if(!isset($userModel->user)) return 'The verification code supplied was invalid.';	// Return error message to backbone
		
		// Set account as verified
		$userModel->verifyAccount($userModel->user['emailAddress']);
		
		// Load users company to get the database identifier
		$companyModel = new CompanyModel($this->app);
		$companyModel->loadCompanyByID($userModel->user['companyID']);
		
		System::setupSession($this->app, true, $companyModel->company['database'], (string) $userModel->user['_id'], (string) $userModel->user['companyID']);
		
		// Redirect to load authenticated assets
		return $this->app->redirect('/');	
	}
	
	public function authResetAction()
	{
		$json = json_decode(file_get_contents('php://input'));
		
		$userModel = new UserModel($this->app);
		$userModel->loadUser($json->emailAddress);
		
		// Flag password reset request on user account and generate token
		$token = $userModel->resetPasswordRequest($json->emailAddress);
		
		// Send email link
		mail($json->emailAddress, "Houston - Reset Password", "A request to reset the password of the account associated with this email address was recently submitted. If this was not submitted by you, please ignore this email.\r\n\r\nIf you would like to proceed with the password reset please click the following link: ".Config::DOMAIN."/#/reset/".$token);
		
		return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
	}
	
	public function authResetCompleteAction()
	{
		$json = json_decode(file_get_contents('php://input'));
		
		$userModel = new UserModel($this->app);
		
		$userModel->resetPassword($json->token, $json->password);
		
		// Load users company to get the database identifier
		$companyModel = new CompanyModel($this->app);
		$companyModel->loadCompanyByID($userModel->user['companyID']);
		
		// Authenticate session
		System::setupSession($this->app, true, $companyModel->company['database'], (string) $userModel->user['_id'], (string) $userModel->user['companyID']);
		
		return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
	}
}