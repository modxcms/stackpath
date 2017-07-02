<?php
$output = '';
switch ($options[xPDOTransport::PACKAGE_ACTION]) {
    case xPDOTransport::ACTION_INSTALL:
        $output = '
            <label for="consumer_key">Consumer Key</label>
            <input type="text" name="consumer_key" id="scdn_consumer_key" width="300" value="" />
            <br /><br />

            <label for="consumer_secret">Consumer Secret</label>
            <input type="text" name="consumer_secret" id="scdn_consumer_secret" width="300" value="" />
            <br /><br />

            <label for="zone_id">Site ID</label>
            <input type="text" name="zone_id" id="scdn_zone_id" width="300" value="" />
            <br /><br />

            <label for="default_cdn_url">Default CDN URL (<i>site_name</i>-<i>company_alias</i>.stackpathdns.com)</label>
            <input type="text" name="default_cdn_url" id="scdn_default_cdn_url" width="300" value="" />
            <br /><br />

            <label for="url_preview_param">URL Preview Parameter</label>
            <input type="text" name="url_preview_param" id="scdn_url_preview_param" width="300" value="guid" />
            <br /><br />

            <label for="enabled">Enable StackPath</label>
            <input type="radio" name="enabled" value="1" checked="checked">Yes<br />
            <input type="radio" name="enabled" value="0">No
            
            <br /><br />

            <label for="rules">Install Default Rules</label>
            <input type="radio" name="rules" value="1" checked="checked">Yes<br />
            <input type="radio" name="rules" value="0">No
            
            <br /><br />
            
            <label for="use_https">If installing default rules, use HTTPS for the CDN URL?<br />
            <i>You should leave this as Yes unless you have a specific reason to not use HTTPS.</i>
            </label>
            <input type="radio" name="use_https" value="1" checked="checked">Yes<br />
            <input type="radio" name="use_https" value="0">No

        ';

        break;
    case xPDOTransport::ACTION_UPGRADE:
        break;
    case xPDOTransport::ACTION_UNINSTALL:
        break;
}

return $output;
