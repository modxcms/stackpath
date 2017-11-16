<?php
$hits = array();
$stats = array();
$data = $modx->cacheManager->get('stats.daily', $modx->scdn->cacheOptions);
if (!$data) {
    if ($modx->scdn->authenticate()) {
        $zone = $modx->getOption('stackpath.zone_id', null, '');
        $stats = $modx->scdn->api->get('/reports/' . $zone . '/stats/daily', array(
            'date_from' => date('Y-m-d', strtotime('-1 month')),
            'date_to' => date('Y-m-d')
        ));
        $data = $modx->fromJSON($stats);
        if (is_array($data)) {
            $modx->cacheManager->set('stats.daily', $data, 300, $modx->scdn->cacheOptions);
        }
    }
}

$cacheHits = $data['data']['summary']['cache_hit'];
$nonCacheHits = $data['data']['summary']['noncache_hit'];
$bytesTransferred = $data['data']['summary']['size'];

return $modx->toJSON(array(
    'cache_hits' => number_format($cacheHits, 0),
    'non_cache_hits' => number_format($nonCacheHits, 0),
    'size' => number_format($bytesTransferred/1048576, 2)
));