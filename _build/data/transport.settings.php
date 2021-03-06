<?php

$s = array(
    'alias' => '',
    'consumer_key' => '',
    'consumer_secret' => '',
    'zone_id' => '',
    'default_cdn_url' => '',
    'url_preview_param' => 'guid',
    'enabled' => true,
    'resource_inclusion_tv' => '',
    'purge_on_clear_cache' => true
);

$settings = array();

foreach ($s as $key => $value) {
    if (is_string($value) || is_int($value)) { $type = 'textfield'; }
    elseif (is_bool($value)) { $type = 'combo-boolean'; }
    else { $type = 'textfield'; }

    $parts = explode('.',$key);
    if (count($parts) == 1) { $area = 'Default'; }
    else { $area = $parts[0]; }
    
    $settings['scdn.'.$key] = $modx->newObject('modSystemSetting');
    $settings['scdn.'.$key]->set('key', 'scdn.'.$key);
    $settings['scdn.'.$key]->fromArray(array(
        'value' => $value,
        'xtype' => $type,
        'namespace' => 'stackpath',
        'area' => $area
    ));
}

return $settings;


