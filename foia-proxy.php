<?php

define('FOIA_BASE_URL', 'https://www.foia.gov/');

if (!isset($_GET['u'])) {
    header('X-FOIA: missing u param', 400, false);
    print "Missing 'u' param";
    exit;
}

// grab entire query string instead of using $_GET because
// param value may be un-escaped and $_GET may mangle parsing.
$path = preg_replace('/^u=/', '', $_SERVER['QUERY_STRING']);
$path = urldecode($path);

$resp = curl_get_contents(FOIA_BASE_URL . $path);

// error_log("resp for $path: $resp");
if (!$resp) {
    header('X-FOIA: bad upstream response', 404, false);
}

$filtered = filter_response($resp);
// error_log("filtered: $filtered");
print $filtered;


/**
 *
 *
 * @param string  $resp
 * @return string
 */
function filter_response($resp) {
    $resp = preg_replace('/\/FusionCharts\//', './FusionCharts/', $resp);
    $resp = preg_replace('/\/foia\/FormChart/', './foia-proxy.php?u=/foia/FormChart', $resp);
    $resp = preg_replace('/href="\/quarter.html\?/', 'href="./quarter.html?', $resp);
    $resp = preg_replace('/href="\/glance.html\?/', 'href="./glance.html?', $resp);
    $resp = preg_replace('/src="\/images\//', 'src="./images/', $resp);
    return $resp;
}


/**
 *
 *
 * @param string  $url
 * @return string
 */
function curl_get_contents($url) {
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
    $data = curl_exec($curl);
    curl_close($curl);
    return $data;
}
