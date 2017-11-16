<?php
/**
 * Gets a list of WAF incident.
 */
class scdnWAFIncidentGetProcessor extends modObjectGetProcessor {
    public $languageTopics = array('stackpath:default');

    public function initialize() {
        return true;
    }

    public function process() {
        $results = array();
        if ($this->modx->scdn->authenticate()) {
            $zone = $this->modx->getOption('stackpath.zone_id', null, '');
            $json = $this->modx->scdn->api->get('/sites/' . $zone . '/waf/events/' . $_POST['incident'] . '/incidents', array(
                'page_size' => 1,
                'page' => 0
            ));
            $data = $this->modx->fromJSON($json);

            if ($data['code'] == 200) {
                $results = $data['data']['incidents'][0]['data']['eventDetails'];
                $results = array_merge($results, $data['data']['incidents'][0]['data']['server']);
                /* unset values we already have in the parent event data */
                unset($results['action']);
            }
        }

        return $this->success('', $results);
    }
}
return 'scdnWAFIncidentGetProcessor';