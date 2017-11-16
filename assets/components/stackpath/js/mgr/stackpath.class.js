var StackPath = function(config) {
    config = config || {};
    StackPath.superclass.constructor.call(this,config);
};
Ext.extend(StackPath,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},tabs:{},combo:{},
    config: {
        connector_url: ''
    },
    inVersion: false
});
Ext.reg('stackpath',StackPath);
StackPath = new StackPath();


var wafActionStore = [
    ['A', 'Allow'],
    ['B', 'Block'],
    ['C', 'Captcha'],
    ['G', 'Gateway (Browser Validation)'],
    ['H', 'Handshake (Extended Browser Validation)'],
    ['M', 'Monitor']
];

StackPath.combo.WAFActions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: wafActionStore
        ,name: 'waf_action'
        ,hiddenName: 'waf_action'
        ,displayField: 'name'
        ,valueField: 'value'
        ,fields: ['value','name']
        ,mode: 'local'
    });
    StackPath.combo.WAFActions.superclass.constructor.call(this,config);
};
Ext.extend(StackPath.combo.WAFActions,MODx.combo.ComboBox);
Ext.reg('stackpath-combo-wafactions',StackPath.combo.WAFActions);


var wafResultStore = [
    ['blocked', 'Blocked'],
    ['passed', 'Passed']
];


StackPath.combo.WAFResult = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: wafResultStore
        ,name: 'waf_result'
        ,hiddenName: 'waf_result'
        ,displayField: 'name'
        ,valueField: 'value'
        ,fields: ['value','name']
        ,mode: 'local'
    });
    StackPath.combo.WAFResult.superclass.constructor.call(this,config);
};
Ext.extend(StackPath.combo.WAFResult,MODx.combo.ComboBox);
Ext.reg('stackpath-combo-wafresult',StackPath.combo.WAFResult);