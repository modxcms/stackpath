<?php
$plugins = array();

/* create the plugin object */
$plugins[0] = $modx->newObject('modPlugin');
$plugins[0]->set('id',1);
$plugins[0]->set('name','StackPath Manager');
$plugins[0]->set('description','Provides manager functionality for resources if resources are being cached to StackPath.');
$plugins[0]->set('plugincode', getSnippetContent($sources['plugins'] . 'stackpath.plugin.php'));
$plugins[0]->set('category', 0);
switch ($options[xPDOTransport::PACKAGE_ACTION]) {
    case xPDOTransport::ACTION_INSTALL:
        $plugins[0]->set('disabled', 1);
        break;
    default:
        break;
}

$events = include $sources['events'].'events.stackpath.php';
if (is_array($events) && !empty($events)) {
    $plugins[0]->addMany($events);
    $modx->log(xPDO::LOG_LEVEL_INFO,'Packaged in '.count($events).' Plugin Events for StackPath.'); flush();
} else {
    $modx->log(xPDO::LOG_LEVEL_ERROR,'Could not find plugin events for StackPath!');
}
unset($events);

/* create the plugin object */
$plugins[1] = $modx->newObject('modPlugin');
$plugins[1]->set('id',1);
$plugins[1]->set('name','StackPath Linker');
$plugins[1]->set('description','Rewrites frontend links based on StackPath Rules specified in the StackPath component.');
$plugins[1]->set('plugincode', getSnippetContent($sources['plugins'] . 'stackpathlinker.plugin.php'));
$plugins[1]->set('category', 0);

$events = include $sources['events'].'events.stackpathlinker.php';
if (is_array($events) && !empty($events)) {
    $plugins[1]->addMany($events);
    $modx->log(xPDO::LOG_LEVEL_INFO,'Packaged in '.count($events).' Plugin Events for StackPath Linker.'); flush();
} else {
    $modx->log(xPDO::LOG_LEVEL_ERROR,'Could not find plugin events for StackPath Linker!');
}
unset($events);

/* create the plugin object */
$plugins[2] = $modx->newObject('modPlugin');
$plugins[2]->set('id',1);
$plugins[2]->set('name','StackPath Purge on Clear Cache');
$plugins[2]->set('description','Purges the StackPath Cache when selecting Clear Cache in the MODX Manager.');
$plugins[2]->set('plugincode', getSnippetContent($sources['plugins'] . 'stackpathpurgecache.plugin.php'));
$plugins[2]->set('category', 0);

$events = include $sources['events'].'events.stackpathpurgecache.php';
if (is_array($events) && !empty($events)) {
    $plugins[2]->addMany($events);
    $modx->log(xPDO::LOG_LEVEL_INFO,'Packaged in '.count($events).' Plugin Events for StackPath Purge.'); flush();
} else {
    $modx->log(xPDO::LOG_LEVEL_ERROR,'Could not find plugin events for StackPath Purge!');
}
unset($events);

return $plugins;
