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
            array(
                'v' => round(($obj['size']/1024)/1024, 2)
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
            'label' => $modx->lexicon('scdn.reporting_mb_transferred'),
            'pattern' => '',
            'type' => 'number'
        )
    ),
    'rows' => $hits
);

return $modx->toJSON($stats);