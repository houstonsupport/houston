<?php
namespace Houston\Component;

class Notify
{
	private static function sendRequest($url, $payload)
	{
		$payload = json_encode($payload);

		// Send HTTP request via cURL to Node.js server
		$ch = curl_init($url);

		// Use HTTP Header authentication for sending requests to Node.js server (non socket)
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($ch, CURLOPT_USERPWD, NODE_USER.':'.NODE_PASSWORD);

		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'Content-Type: application/json',
			'Content-Length: '.strlen($payload))
		);

		$output = curl_exec($ch);
		curl_close($ch);

		return $output;
	}

	private static function removeAttachments($payload)
	{
		if(isset($payload->files)) unset($payload->files);
		return $payload;
	}

	public static function socketBroadcast($route, $payload = null, $socketNamespace = null)
	{
		// Clone object to prevent the web socket namespace property being added to original
		$obj = (isset($payload)) ? clone $payload : new \stdClass();

		if(isset($socketNamespace)) $obj->socketNamespace = (string) $socketNamespace;
		return self::sendRequest(NODE_HOST.$route, self::removeAttachments($obj));
	}
}
