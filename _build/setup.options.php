<?php
$output = '';
switch ($options[xPDOTransport::PACKAGE_ACTION]) {
    case xPDOTransport::ACTION_INSTALL:
        $output = '
            <input type="hidden" name="auth_header_value" id="auth_header_value" value="" />
            
            <label for="consumer_key">Consumer Key</label>
            <input type="text" name="consumer_key" id="consumer_key" width="300" value="" />
            <br /><br />

            <label for="consumer_secret">Consumer Secret</label>
            <input type="text" name="consumer_secret" id="consumer_secret" width="300" value="" />
            <br /><br />

            <label for="zone_id">Site ID</label>
            <input type="text" name="zone_id" id="zone_id" width="300" value="" />
            <br /><br />

            <label for="default_cdn_url">CDN URL (<i>site_name</i>-<i>company_alias</i>.stackpathdns.com)</label>
            <input type="text" name="default_cdn_url" id="default_cdn_url" width="300" value="" />
            <br /><br />

            <label for="url_preview_param">URL Preview Parameter</label>
            <input type="text" name="url_preview_param" id="url_preview_param" width="300" value="guid" />
            <br /><br />

            <label for="enabled">Enable StackPath</label>
            <input type="radio" name="enabled" value="1" checked="checked">Yes<br />
            <input type="radio" name="enabled" value="0">No
        ';

        break;
    case xPDOTransport::ACTION_UPGRADE:
        break;
    case xPDOTransport::ACTION_UNINSTALL:
        break;
}

return $output;
