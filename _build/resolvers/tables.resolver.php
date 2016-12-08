<?php
/* @var modX $modx */

if ($object->xpdo) {
    $modx =& $object->xpdo;
    $modelPath = $modx->getOption('scdn.core_path',null,$modx->getOption('core_path').'components/stackpath/').'model/';
    $modx->addPackage('stackpath',$modelPath, '');
    $manager = $modx->getManager();

    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_UPGRADE:
            $manager->alterField('scdnRule', 'cdn_url', array());
            break;
        case xPDOTransport::ACTION_INSTALL:
            $loglevel = $modx->setLogLevel(modX::LOG_LEVEL_ERROR);
            
            $objects = array('scdnRule');
            foreach ($objects as $obj) {
                $manager->createObjectContainer($obj);
            }

            $modx->setLogLevel($loglevel);
        break;
    }

}
return true;

