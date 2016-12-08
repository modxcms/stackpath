StackPath.combo.CDNURLs = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        xtype: 'superboxselect'
        ,mode: 'remote'
        ,triggerAction: 'all'
        ,extraItemCls: 'x-tag'
        ,expandBtnCls: 'x-form-trigger'
        ,clearBtnCls: 'x-form-trigger'
        ,fields: ['cdn_url']
        ,displayField: 'cdn_url'
        ,valueField: 'cdn_url'
        ,store: new Ext.data.JsonStore({
                 id:'cdn_url'
                ,url: StackPath.config.connectorUrl
                ,root:'results'
                ,fields: ['cdn_url']
                ,baseParams: {
                    action: 'mgr/combos/cdn/getlist'
                }
        })
        ,pageSize: 15
        ,hiddenName: 'cdn_url[]'
    });
    StackPath.combo.CDNURLs.superclass.constructor.call(this,config);
};
Ext.extend(StackPath.combo.CDNURLs,Ext.ux.form.SuperBoxSelect);
Ext.reg('scdn-combo-cdnurls',StackPath.combo.CDNURLs);

StackPath.combo.Scheme = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.JsonStore({
            fields: ['name','scheme']
            ,data: [
                {"name": _('scdn.http'),"scheme": 'http://'}
                ,{"name": _('scdn.https'),"scheme": 'https://'}
                ,{"name": _('scdn.schemeless'),"scheme": '//'}
            ]
        })
        ,displayField: 'name'
        ,valueField: 'scheme'
        ,hiddenName: config.name || 'scheme'
        ,mode: 'local'
        ,triggerAction: 'all'
        ,editable: false
        ,selectOnFocus: false
        ,preventRender: true
        ,forceSelection: true
        ,enableKeyEvents: true
    });
    StackPath.combo.Scheme.superclass.constructor.call(this,config);
};
Ext.extend(StackPath.combo.Scheme,Ext.form.ComboBox);
Ext.reg('scdn-combo-scheme',StackPath.combo.Scheme);