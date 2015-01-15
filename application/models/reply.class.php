<?php
namespace Houston\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class ReplyModel {
	protected $app;
	public $ticket;
	public $reply;
	
	public function __construct(Application $app, TicketModel $ticket) {
		$this->app = $app;
		$this->ticket = $ticket;
	}
	
	public function loadReplyByID($replyID) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
				
		$this->reply = $db->replies->findOne(array('_id' => new \MongoId($id)));
		
		if(!empty($this->reply)) {			
			return $this->reply;
		} else {
			throw new \Exception('Reply not found');
		}
	}
	
	public function getReplies($ticketID) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$collection = $db->replies;
		$result = $collection->find(array('ticketID' => $ticketID));
		
		$docs = array();
		foreach($result as $doc) {
		    array_push($docs, $doc);
		}
		
		return $docs;
	}
	
	public function reply($reply) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		try {	
			$collection = $db->replies;
			$collection->save($reply);
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
}