<?php
/**
 * Creates a scdnRule object.
 */
class scdnRuleCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'scdnRule';
    public $languageTopics = array('stackpath:default');

    /**
     * Before setting, we check if the name is filled and/or already exists. Also checkboxes.
     * @return bool
     */
    public function beforeSet() {
        $key = $this->getProperty('name');
        if (empty($key)) {
            $this->addFieldError('name',$this->modx->lexicon('stackpath.error.name_not_set'));
        }
        $this->setCheckbox('disabled', true);
        $this->setCheckbox('all_contexts', true);
        if ($this->getProperty('all_contexts')) {
            $this->setProperty('context', '');
        }
        $this->setProperty('cdn_url', implode(',', $this->getProperty('cdn_url')));

        return parent::beforeSet();
    }
}
return 'scdnRuleCreateProcessor';
