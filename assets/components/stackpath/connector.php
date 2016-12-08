<?php
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/config.core.php';
require_once MODX_CORE_PATH.'config/'.MODX_CONFIG_KEY.'.inc.php';
require_once MODX_CONNECTORS_PATH.'index.php';

$corePath = $modx->getOption('scdn.core_path',null,$modx->getOption('core_path').'components/stackpath/');
require_once $corePath.'model/stackpath/stackpath.class.php';
$modx->scdn = new StackPath($modx);

$modx->lexicon->load('stackpath:default');

/* handle request */
$path = $modx->getOption('processorsPath',$modx->scdn->config,$corePath.'processors/');
$modx->request->handleRequest(array(
    'processors_path' => $path,
    'location' => '',
));