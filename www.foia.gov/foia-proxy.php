<?php

define('FOIA_BASE_URL', 'https://archive.foia.gov/');

if (!isset($_GET['u'])) {
    header('FOIA-Proxy: missing u param', 400, false);
    print "Missing 'u' param";
    exit;
}

// http://www.electrictoolbox.com/php-get-headers-sent-from-browser/
if(!function_exists('apache_request_headers')) {
  function apache_request_headers() {
    $headers = array();
    foreach($_SERVER as $key => $value) {
      if(substr($key, 0, 5) == 'HTTP_') {
	$headers[str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))))] = $value;
      }
    }
    return $headers;
  }
}

$path = $_GET['u'];

// Proxy the request headers, back end relies on session cookies and other headers
$headers = array_filter(apache_request_headers(), function ($header) {
  // Remove the Host header
  return !preg_match('/^host$/i', $header);
}, ARRAY_FILTER_USE_KEY);

$headers = array_map(function ($header, $value) {
  return $header . ': ' . $value;
}, array_keys($headers), $headers);

// Proxy the query string
$query = rm_array_to_url(array_filter($_GET, function ($param) {
  // Remove our internal `u` parameter

  return $param !== 'u';
}, ARRAY_FILTER_USE_KEY));
error_log('request archive.foia.gov ' . $query);

list($headers, $body) = curl_get_contents(FOIA_BASE_URL . $path, $query, $headers);
if (!$headers || !$body) {
  header('FOIA-Proxy', 404, false);
}

// Proxy the response headers
foreach ($headers as $header) {
  header($header, false);
}

print $body;


/**
 *
 *
 * @param array  $query
 * @return string
 */
function rm_array_to_url($queries) {
    $ret = '';
    $first = true;
    foreach ($queries as $key => $value) {
      if (is_array($value)) {
        foreach ($value as $val) {
          $ret .= (!$first?'&':'') . $key . '=' . $val;
          $first = false;
        }
      }
      else {
        $ret .= (!$first?'&':'') . $key . '=' . $value;
        $first = false;
      }
    }
    $ret = str_replace(" ", "%20", $ret);
    return $ret;
}


/**
 *
 *
 * @param string  $url
 * @return string
 */
function curl_get_contents($url, $query, $headers) {
    if (strlen($query)) {
      $url = $url . '?' . $query;
    }

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_VERBOSE, 0);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($curl, CURLOPT_HEADER, 1);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

    $data = curl_exec($curl);
    if($data === false) {
        error_log(curl_error($curl));
        curl_close($curl);
        return array(array(), 'The reporting server returned an invalid response, please try again later.');
    }

    $header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
    $response_headers = substr($data, 0, $header_size);
    $response_body = substr($data, $header_size);
    curl_close($curl);

    // Split the headers into an array
    $response_headers = explode("\r\n", $response_headers);
    // Drop the HTTP line
    array_shift($response_headers);

    // Proxy a limited set of headers. The back end relies on session cookies.
    $response_headers = array_filter($response_headers, function ($header) {
      return preg_match('/^content-type:/i', $header)
	|| preg_match('/^content-disposition:/i', $header)
	|| preg_match('/^cache-control:/i', $header)
	|| preg_match('/^pragma:/i', $header)
	|| preg_match('/^set-cookie:/i', $header);
    });

    return array($response_headers, $response_body);
}
