<?php
/**
 * Gets a list of WAF events.
 */
class scdnWAFEventsGetListProcessor extends modObjectGetListProcessor {
    public $languageTopics = array('stackpath:default');

    public function process() {
        //$results = $this->modx->cacheManager->get('stats.waf_events', $this->modx->scdn->cacheOptions);

        if (!$results) {
            if ($this->modx->scdn->authenticate()) {
                $actions = array(
                    'A' =>  'Allow',
                    'B' => 'Block',
                    'C' => 'Captcha',
                    'G' => 'Gateway (Browser Validation)',
                    'H' => 'Handshake (Extended Browser Validation)',
                    'M' => 'Monitor'
                );


                $zone = $this->modx->getOption('stackpath.zone_id', null, '');
                $json = $this->modx->scdn->api->get('/sites/' . $zone . '/waf/events', array(
                    'start' => date('Y-m-d 00:00:00', strtotime('-6 days')),
                    'end' => date('Y-m-d 23:59:59'),
                    'page_size' => (int)$_POST['limit'],
                    'page' => floor(($_POST['start']) / $_POST['limit']),
                    'sort_by' => 'timestamp',
                    'sort_dir' => 'desc',
                    'filter_client_ip' => isset($_POST['client_ip']) ? $_POST['client_ip'] : ''
                ));
                $data = $this->modx->fromJSON($json);

                $results = array();
                if ($data['code'] == 200) {
                    foreach ($data['data']['events'] as $event) {
                        $row = array(
                            'ref_id' => $event['ref_id'],
                            'incident_id' => $event['incident_id'],
                            'timestamp' => date('Y-m-d H:i:s',$event['timestamp']),
                            'rule_name' => $event['rule_name'],
                            'client_ip' => $event['client_ip'],
                            'action' => $actions[$event['action']],
                            'country' => $event['country'],
                            'result' => ucfirst($event['result']),
                            'domain' => $event['domain'],
                            'uri' => $event['uri'],
                            'method' => $event['method']
                        );

                        $results[] = $row;
                    }

                    //$this->modx->cacheManager->set('stats.waf_events', $results, 120, $this->modx->scdn->cacheOptions);
                }
            }
        }

        return $this->outputArray($results, 100000000);
    }
}
return 'scdnWAFEventsGetListProcessor';
