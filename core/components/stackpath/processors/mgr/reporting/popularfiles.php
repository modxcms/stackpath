<?php
$files = array();
$data = $modx->cacheManager->get('popularfiles_monthly', $modx->scdn->cacheOptions);
$zone = $modx->getOption('scdn.zone_id', null, '');

if (!$data) {
    if ($modx->scdn->authenticate()) {
        $stats = $modx->scdn->api->get('/reports/popularfiles', array(
            'date_from' => date('Y-m-d', strtotime('-1 month')),
            'date_to' => date('Y-m-d'),
            'page_size' => 20
        ));
        $data = $modx->fromJSON($stats);
        if (is_array($data)) {
            $modx->cacheManager->set('popularfiles_monthly', $data, 300, $modx->scdn->cacheOptions);
        }
    }
}

foreach ($data['data']['popularfiles'] as $obj) {
    if ($obj['bucket_id'] !== $zone) continue;
    $files[] = array($obj['uri'],(int)$obj['hit']);
}

$stats = array(
    'cols' => array(
        array('type' => 'string','name' => $modx->lexicon('scdn.reporting_uri')),
        array('type' => 'number','name' => $modx->lexicon('scdn.reporting_hits'))
    ),
    'rows' => $files
);

return $modx->toJSON($stats);