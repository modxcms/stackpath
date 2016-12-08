<?php
/**
 * Gets a list of CDN URLs from StackPath.
 */
class comboCDNGetListProcessor extends modProcessor {
    public $languageTopics = array('stackpath:default');

    public function process() {
        $list = array();

        $defaultCDN = $this->modx->getOption('scdn.default_cdn_url', null, '');
        if (!empty($defaultCDN)) {
            $list[]['cdn_url'] = $defaultCDN;
        }

        if($this->modx->scdn->authenticate()) {
            $zone = $this->modx->getOption('scdn.zone_id', null, '');
            $response = $this->modx->scdn->api->get('/sites/' . $zone . '/customdomains');
            $domains = $this->modx->fromJSON($response);

            foreach ($domains['data']['customdomains'] as $domain) {
                $list[]['cdn_url'] = $domain['custom_domain'];
            }
        }
        return $this->outputArray($list, count($list));
    }
}
return 'comboCDNGetListProcessor';
