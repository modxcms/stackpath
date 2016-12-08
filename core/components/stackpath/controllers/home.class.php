<?php
/**
 * The name of the controller is based on the path (home) and the
 * namespace. This home controller is the main client view.
 */
class StackPathHomeManagerController extends StackPathManagerController {
    /**
     * Any specific processing we need on the Home controller.
     * @param array $scriptProperties
     */
    public function process(array $scriptProperties = array()) {
    }

    /**
     * The pagetitle to put in the <title> attribute.
     * @return null|string
     */
    public function getPageTitle() {
        return $this->modx->lexicon('scdn');
    }

    /**
     * Register all the needed javascript files. Using this method, it will automagically
     * combine and compress them if enabled in system settings.
     */
    public function loadCustomCssJs() {
        $this->addHtml('<script type="text/javascript" src="https://www.google.com/jsapi"></script>');
        $this->addJavascript($this->scdn->config['jsUrl'].'mgr/widgets/combos.js');
        $this->addJavascript($this->scdn->config['jsUrl'].'mgr/widgets/rules.windows.js');
        $this->addJavascript($this->scdn->config['jsUrl'].'mgr/widgets/rules.grid.js');
        $this->addLastJavascript($this->scdn->config['jsUrl'].'mgr/sections/home.js');
        $this->addLastJavascript($this->scdn->config['jsUrl'].'mgr/stackpath.reporting.js');
    }

    /**
     * The name for the template file to load.
     * @return string
     */
    public function getTemplateFile() {
        return $this->scdn->config['templatesPath'].'home.tpl';
    }
}
