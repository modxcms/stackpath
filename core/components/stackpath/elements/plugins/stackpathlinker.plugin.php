<?php
$eventName = $modx->event->name;
switch($eventName) {
    case 'OnWebPagePrerender':
        $path = $modx->getOption('scdn.core_path', null, $modx->getOption('core_path') . 'components/stackpath/');
        $stackpath = $modx->getService('stackpath','StackPath', $path.'/model/stackpath/');

        if ($stackpath->isDisabled(true)) {
            break;
        }

        $c = $modx->newQuery('scdnRule');
        $c->where(array(
            'content_type' => $modx->resource->get('content_type'),
            'disabled' => false,
            array(
                array(
                    'all_contexts' => true
                ),
                array(
                    'OR:context:=' => $modx->context->get('key')
                )
            )
        ));
        $c->sortby('sortorder', 'ASC');

        $rules = $modx->getIterator('scdnRule', $c);
        foreach ($rules as $rule) {
            $callback = function($matches) use ($rule) {
                static $matchCount = 0;

                $output = $rule->get('output');
                foreach($matches as $k => $v) {
                    if ($k == 0) continue;
                    $output = str_replace('{match'.$k.'}', $v, $output);
                }
                $output = str_replace('{cdn_url}', $rule->getCdnUrl($matchCount), $output);
                $matchCount++;

                return $output;
            };

            $modx->resource->_output = preg_replace_callback($rule->getRegex(), $callback, $modx->resource->_output);
        }
        break;
    default:
        break;
}