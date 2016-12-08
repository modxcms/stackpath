<?php
$event = $modx->event->name;
switch ($event) {
    case 'OnSiteRefresh':
        $path = $modx->getOption('scdn.core_path', null, $modx->getOption('core_path') . 'components/stackpath/');
        $stackpath = $modx->getService('stackpath','StackPath', $path.'model/stackpath/');

        if ($stackpath->isDisabled()) {
            break;
        }

        $purgeCache = $modx->getOption('scdn.purge_on_clear_cache', null, true);
        if ($purgeCache == false) {
            break;
        }

        if ($stackpath->authenticate()) {
            $response = $stackpath->purge();
            $response = $modx->fromJSON($response);
            if ($response['code'] !== 200) {
                $modx->log(modX::LOG_LEVEL_ERROR, $response['error']['type']. ': ' .$response['error']['message']);
            }
            $modx->log(modX::LOG_LEVEL_INFO, $modx->lexicon('scdn.purge_request_sent'));
        } else {
            $modx->log(modX::LOG_LEVEL_ERROR, $modx->lexicon('scdn.purge_request_no_auth'));
        }
        break;
    default:
        break;
}