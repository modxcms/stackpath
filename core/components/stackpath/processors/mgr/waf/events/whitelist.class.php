<?php
/**
 * Gets a list of WAF incident.
 */
class scdnWAFWhitelistProcessor extends modProcessor {
    public $languageTopics = array('stackpath:default');

    public function initialize() {
        return true;
    }

    public function process() {
        if ($this->modx->scdn->authenticate()) {
            $zone = $this->modx->getOption('stackpath.zone_id', null, '');
            $params = array(
                'name' => $_POST['whitelist_name'],
                'action' => 'Allow',
                'active' => '1',
                'conditions' => json_encode(array(
                    (['scope'=>'Ip', 'data'=> $_POST['client_ip']])
                ))
            );

            $json = $this->modx->scdn->api->post('/sites/' . $zone . '/waf/rules', $params);
            $response = $this->modx->fromJSON($json);
            if ($response['code'] == 200) {
                $this->modx->cacheManager->delete('stats.waf_rules', $this->modx->scdn->cacheOptions);
                return $this->success('');
            } else {
                return $this->failure($this->modx->lexicon('stackpath.whitelist_fail'));
            }
        } else {
            return $this->failure($this->modx->lexicon('stackpath.whitelist_no_auth'));
        }
    }
}
return 'scdnWAFWhitelistProcessor';