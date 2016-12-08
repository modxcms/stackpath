StackPath.window.Rule = function(config) {
    config = config || {};
    config.id = config.id || Ext.id(),
        Ext.applyIf(config,{
            title: (config.isUpdate) ?
                _('scdn.update_rule') :
                _('scdn.add_rule')
            ,autoHeight: true
            ,url: StackPath.config.connectorUrl
            ,baseParams: {
                action: (config.isUpdate) ?
                    'mgr/rules/update' :
                    'mgr/rules/create'
            }
            ,width: 750
            ,fields: [{
                xtype: 'hidden',
                name: 'id'
            },{
                layout: 'column',
                items: [{
                    columnWidth: 0.75
                    ,layout: 'form'
                    ,items: [{
                        xtype: 'textfield'
                        ,name: 'name'
                        ,fieldLabel: _('scdn.name')
                        ,allowBlank: false
                        ,anchor: '100%'
                    },{
                        xtype: 'textarea'
                        ,name: 'description'
                        ,fieldLabel: _('scdn.description')
                        ,anchor: '100%'
                    },{
                        xtype: 'scdn-combo-scheme'
                        ,name: 'scheme'
                        ,fieldLabel: _('scdn.scheme')
                        ,allowBlank: false
                        ,anchor: '50%'
                    },{
                        xtype: 'scdn-combo-cdnurls'
                        ,id: config.id + 'scdn-combo-cdnurls'
                        ,name: 'cdn_url'
                        ,fieldLabel: _('scdn.cdn_url')
                        ,allowBlank: false
                        ,anchor: '100%'
                    }]
                },{
                    columnWidth: 0.25,
                    layout: 'form',
                    items: [{
                        xtype: 'numberfield'
                        ,name: 'sortorder'
                        ,fieldLabel: _('scdn.sortorder')
                        ,allowBlank: false
                        ,minValue: 0
                        ,maxValue: 9999999999
                        ,anchor: '100%'
                        ,value: 0

                    },{
                        xtype: 'modx-combo-content-type'
                        ,name: 'content_type'
                        ,fieldLabel: _('scdn.content_type')
                        ,allowBlank: false
                        ,anchor: '100%'
                    },{
                        xtype: 'checkbox'
                        ,name: 'disabled'
                        ,fieldLabel: _('scdn.disabled')
                        ,anchor: '100%'
                    },{
                        xtype: 'checkbox'
                        ,id: config.id + 'scdn-checkbox-all-contexts'
                        ,name: 'all_contexts'
                        ,fieldLabel: _('scdn.all_contexts')
                        ,anchor: '100%'
                        ,itemCls: 'scdn-all-contexts'
                        ,handler: function(o,v) {
                            if (v == true) {
                                Ext.getCmp(config.id + 'scdn-combo-context').disable();
                            } else {
                                Ext.getCmp(config.id + 'scdn-combo-context').enable();
                            }
                        }
                    },{
                        xtype: 'modx-combo-context'
                        ,id: config.id + 'scdn-combo-context'
                        ,name: 'context'
                        ,fieldLabel: _('scdn.context')
                        ,anchor: '100%'
                    }]
                }]
            },{
                xtype: 'textarea'
                ,name: 'input'
                ,fieldLabel: _('scdn.input')
                ,anchor: '100%'
            },{
                xtype: 'textarea'
                ,name: 'output'
                ,fieldLabel: _('scdn.output')
                ,anchor: '100%'
            }]
            ,keys: [] /*prevent enter in textarea from firing submit */
        });
    StackPath.window.Rule.superclass.constructor.call(this,config);
    this.on('beforeshow', this.setup, this);
};
Ext.extend(StackPath.window.Rule,MODx.Window, {
    setup: function(w) {
        if (w.config.isUpdate !== true) {
            Ext.getCmp(w.config.id + 'scdn-checkbox-all-contexts').setValue(true);
            Ext.getCmp(w.config.id + 'scdn-combo-context').disable();
        } else {
            if (Ext.getCmp(w.config.id + 'scdn-checkbox-all-contexts').getValue() == true) {
                Ext.getCmp(w.config.id + 'scdn-combo-context').disable();
            }
            w.setValues({
                'cdn_url[]': w.record.cdn_url
            });
        }
    }
});
Ext.reg('scdn-window-rule',StackPath.window.Rule);
