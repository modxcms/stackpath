<?php
/**
 * Duplicates a scdnRule object
 */
class scdnRuleDuplicateProcessor extends modObjectDuplicateProcessor {
    public $classKey = 'scdnRule';
    public $languageTopics = array('stackpath:default');

    public function getNewName() {
        $newName = $this->modx->lexicon('scdn.duplicate_of') . $this->object->get('name');
        return $newName;
    }

    /**
     * Before saving, we disable the duplicated rule.
     * @return bool
     */
    public function beforeSave() {
        $this->newObject->set('disabled', true);
        return parent::beforeSave();
    }
}
return 'scdnRuleDuplicateProcessor';
