<?php
$hits = array();
$stats = array();
$data = $modx->cacheManager->get('stats.daily', $modx->scdn->cacheOptions);
if (!$data) {
    if ($modx->scdn->authenticate()) {
        $zone = $modx->getOption('scdn.zone_id', null, '');
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

foreach ($data['data']['stats'] as $obj) {
    $hits[] = array(
        'c' => array(
            array(
                'v' => date('M j', strtotime($obj['timestamp']))
            ),
            array (
                'v' => (int)$obj['cache_hit']
            ),
            array(
                'v' => (int)$obj['noncache_hit']
            )
        )
    );
}
$stats = array(
    'cols' => array(
        array(
            'id' => '',
            'label' => $modx->lexicon('scdn.reporting_time'),
            'pattern' => '',
            'type' => 'string'
        ),
        array(
            'id' => '',
            'label' => $modx->lexicon('scdn.reporting_cache_hits'),
            'pattern' => '',
            'type' => 'number'
        ),
        array(
            'id' => '',
            'label' => $modx->lexicon('scdn.reporting_non_cache_hits'),
            'pattern' => '',
            'type' => 'number'
        )
    ),
    'rows' => $hits
);

return $modx->toJSON($stats);