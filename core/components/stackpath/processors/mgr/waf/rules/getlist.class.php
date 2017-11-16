<?php
/**
 * Gets a list of scdnRules objects.
 */
class scdnWAFRulesGetListProcessor extends modObjectGetListProcessor {
    public $languageTopics = array('stackpath:default');

    public function process() {
        $results = $this->modx->cacheManager->get('stats.waf_rules', $this->modx->scdn->cacheOptions);

        if (!$results) {
            if ($this->modx->scdn->authenticate()) {
                $zone = $this->modx->getOption('stackpath.zone_id', null, '');
                $json = $this->modx->scdn->api->get('/sites/' . $zone . '/waf/rules');
                $data = $this->modx->fromJSON($json);

                $results = array();
                if ($data['code'] == 200) {
                    foreach ($data['data']['rules'] as $rule) {
                        $row = array(
                            'id' => $rule['id'],
                            'name' => $rule['name'],
                            'description' => $rule['description'],
                            'action' => $rule['action'],
                            'active' => $rule['active']
                        );

                        $conditions = '';
                        foreach ($rule['conditions'] as $condition) {
                            $conditions .= '<li>' . $condition['scope'] . ' = ' . $condition['data'] . '</li>';
                        }
                        $row['conditions'] = $conditions;

                        $results[] = $row;
                    }

                    $this->modx->cacheManager->set('stats.waf_rules', $results, 120, $this->modx->scdn->cacheOptions);
                }
            }
        }

        return $this->outputArray($results, count($results));
    }
}
return 'scdnWAFRulesGetListProcessor';
