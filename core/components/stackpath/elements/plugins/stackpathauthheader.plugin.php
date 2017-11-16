<?php
$event = $modx->event->name;
switch ($event) {
    case 'OnMODXInit':
        $path = $modx->getOption('stackpath.core_path', null, $modx->getOption('core_path') . 'components/stackpath/');
        $stackpath = $modx->getService('stackpath','StackPath', $path.'model/stackpath/');

        if ($stackpath->isDisabled()) {
            break;
        }

        $stackpath->addAuthHeader();

        break;
    default:
        break;
}
return;