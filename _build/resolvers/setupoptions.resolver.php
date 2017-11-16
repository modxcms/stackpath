<?php
$success= false;
switch ($options[xPDOTransport::PACKAGE_ACTION]) {
    case xPDOTransport::ACTION_INSTALL:
        $settings = array(
            'alias',
            'consumer_key',
            'consumer_secret',
            'zone_id',
            'default_cdn_url',
            'auth_header_value',
            'url_preview_param',
            'enabled'
        );

        $accountInfo = explode('.', $options['default_cdn_url']);
        $accountInfo = explode('-', $accountInfo[0]);
        $options['alias'] = $accountInfo[count($accountInfo) - 1];

        foreach ($settings as $key) {
            if (isset($options[$key])) {
                $setting = $object->xpdo->getObject('modSystemSetting',array('key' => 'stackpath.'.$key));
                if ($setting !== null) {
                    if ($key !== 'auth_header_value') {
                        $setting->set('value', $options[$key]);
                    } else {
                        $setting->set('value', md5(uniqid('', true)));
                    }
                    $setting->save();
                } else {
                    $object->xpdo->log(xPDO::LOG_LEVEL_ERROR,'[StackPath] '.$key.' setting could not be found, so the setting could not be changed.');
                }
            }
        }

        $success= true;
        break;
    case xPDOTransport::ACTION_UPGRADE:
    case xPDOTransport::ACTION_UNINSTALL:
        $success= true;
        break;
}
return $success;