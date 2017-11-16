<?php
$hits = array();
$stats = array();
$data = $modx->cacheManager->get('stats.waf_ddos', $modx->scdn->cacheOptions);
$statusData = $modx->cacheManager->get('stats.waf_status', $modx->scdn->cacheOptions);
if (!$data || !$statusData) {
    if ($modx->scdn->authenticate()) {
        $zone = $modx->getOption('stackpath.zone_id', null, '');
        if (!$data) {
            $stats = $modx->scdn->api->get('/sites/' . $zone . '/waf/ddos');
            $data = $modx->fromJSON($stats);
        }

        if (!$statusData) {
            $wafStatus = $modx->scdn->api->get('/sites/' . $zone . '/waf');
            $statusData = $modx->fromJson($wafStatus);
        }


        if (is_array($data) && is_array($statusData)) {
            $modx->cacheManager->set('stats.waf_ddos', $data, 900, $modx->scdn->cacheOptions);
            $modx->cacheManager->set('stats.waf_status', $statusData, 60, $modx->scdn->cacheOptions);
        }
    }
}

$subsecondThreshold = $data['data']['ddos']['sub_second_burst_threshold'];
$burstThreshold = $data['data']['ddos']['burst_threshold'];
$globalThreshold = $data['data']['ddos']['global_threshold'];
$wafStatus = $statusData['data']['mode'];

return $modx->toJSON(array(
    'ddos_subsecond_threshold' => number_format($subsecondThreshold, 0),
    'ddos_burst_threshold' => number_format($burstThreshold, 0),
    'ddos_global_threshold' => number_format($globalThreshold, 0),
    'waf_status' => ucfirst($wafStatus)
));