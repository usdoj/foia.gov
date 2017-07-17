<?php
    // turning off peer validation is ugly and wrong.
    // not sure if this is a PHP CA thing, or a foia.gov cert thing.
    $ssl_opts = array(
        "ssl" => array(
            "verify_peer"=>false,
            "verify_peer_name"=>false,
        ),
    );
    $base_url = 'https://www.foia.gov/';
    if (!isset($_GET['u'])) {
        header('X-FOIA: missing u param', 400, false);
        print "Missing 'u' param";
        exit;
    }

    // grab entire query string instead of using $_GET because
    // param value may be un-escaped and $_GET may mangle parsing.
    $path = preg_replace('/^u=/', '', $_SERVER['QUERY_STRING']);

    $resp = file_get_contents($base_url . $path, false, stream_context_create($ssl_opts));
    // error_log("resp for $path: $resp");
    if (!$resp) {
        header('X-FOIA: bad upstream response', 404, false);
    }

    $filtered = filter_response($resp);
    // error_log("filtered: $filtered");
    print $filtered;

    function filter_response($resp) {
        $resp = preg_replace('/\/FusionCharts\//', './FusionCharts/', $resp);
        $resp = preg_replace('/\/foia\/FormChart/', './foia-proxy.php?u=/foia/FormChart', $resp);
        return $resp;
    }
?>
