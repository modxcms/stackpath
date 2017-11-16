<?php
$hits = array();
$stats = array();
$data = $modx->cacheManager->get('stats.waf_traffic', $modx->scdn->cacheOptions);
if (!$data) {
    if ($modx->scdn->authenticate()) {
        $zone = $modx->getOption('stackpath.zone_id', null, '');
        $stats = $modx->scdn->api->get('/sites/' . $zone . '/waf/traffic', array(
            'resolution' => 'hour',
            'start' => date('Y-m-d 00:00:00', strtotime('-6 days')),
            'end' => date('Y-m-d 23:59:59'),
            'fields' => 'abs_blocked,csrf_blocked,ddos_blocked,dyn_blocked,rep_blocked,stc_blocked,waf_blocked'
        ));
        $data = $modx->fromJSON($stats);
        if (is_array($data)) {
            $modx->cacheManager->set('stats.waf_traffic', $data, 3600, $modx->scdn->cacheOptions);
        }
    }
}

//print_r($data);

foreach ($data['data']['traffic'] as $obj) {
    $hits[] = array(
        'c' => array(
            array(
                'v' => date('M j', $obj['timestamp'])
            ),
            array(
                'v' => $obj['abs_blocked']
            ),
            array(
                'v' => $obj['csrf_blocked']
            ),
            array(
                'v' => $obj['ddos_blocked']
            ),
            array(
                'v' => $obj['dyn_blocked']
            ),
            array(
                'v' => $obj['rep_blocked']
            ),
            array(
                'v' => $obj['stc_blocked']
            ),
            array(
                'v' => $obj['waf_blocked']
            )

        )
    );
}
$stats = array(
    'cols' => array(
        array(
            'id' => '',
            'label' => $modx->lexicon('stackpath.reporting_time'),
            'pattern' => '',
            'type' => 'string'
        ),
        array(
            'id' => '',
            'label' => $modx->lexicon('stackpath.reporting_abs'),
            'pattern' => '',
            'type' => 'number'
        ),
        array(
            'id' => '',
            'label' => $modx->lexicon('stackpath.reporting_csrf'),
            'pattern' => '',
            'type' => 'number'
        ),
        array(
            'id' => '',
            'label' => $modx->lexicon('stackpath.reporting_ddos'),
            'pattern' => '',
            'type' => 'number'
        ),
        array(
            'id' => '',
            'label' => $modx->lexicon('stackpath.reporting_dyn'),
            'pattern' => '',
            'type' => 'number'
        ),
        array(
            'id' => '',
            'label' => $modx->lexicon('stackpath.reporting_rep'),
            'pattern' => '',
            'type' => 'number'
        ),
        array(
            'id' => '',
            'label' => $modx->lexicon('stackpath.reporting_stc'),
            'pattern' => '',
            'type' => 'number'
        ),
        array(
            'id' => '',
            'label' => $modx->lexicon('stackpath.reporting_waf'),
            'pattern' => '',
            'type' => 'number'
        )
    ),
    'rows' => $hits
);

return $modx->toJSON($stats);