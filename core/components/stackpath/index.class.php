<?php

require_once dirname(__FILE__) . '/model/stackpath/stackpath.class.php';

/**
 * The main Manager Controller.
 * In this class, we define stuff we want on all of our controllers.
 */
abstract class StackPathManagerController extends modExtraManagerController {
    /** @var StackPath $scdn */
    public $scdn = null;

    /**
     * Initializes the main manager controller. In this case we set up the
     * StackPath class and add the required javascript on all controllers.
     */
    public function initialize() {
        /* Instantiate the class in the controller */
        $this->scdn = new StackPath($this->modx);

        /* Add the main javascript class and our configuration */
        $this->addJavascript($this->scdn->config['jsUrl'].'mgr/stackpath.class.js');
        $this->addCss($this->scdn->config['cssUrl'].'mgr/stackpath.css');
        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            StackPath.config = '.$this->modx->toJSON($this->scdn->config).';
        });
        </script>');
    }

    /**
     * Defines the lexicon topics to load in our controller.
     * @return array
     */
    public function getLanguageTopics() {
        return array('stackpath:default');
    }

    /**
     * We can use this to check if the user has permission to see this
     * controller. We'll apply this in the admin section.
     * @return bool
     */
    public function checkPermissions() {
        return true;
    }
}

/**
 * The Index Manager Controller is the default one that gets called when no
 * action is present. It's most commonly used to define the default controller
 * which then hands over processing to the other controller ("home").
 */
class IndexManagerController extends StackPathManagerController {
    /**
     * Defines the name or path to the default controller to load.
     * @return string
     */
    public static function getDefaultController() {
        return 'home';
    }
}
