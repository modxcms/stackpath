StackPath.window.Whitelist = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('stackpath.whitelist_ip')
        ,width: 750
        ,closeAction: 'close'
        ,url: StackPath.config.connectorUrl
        ,baseParams: {
            action: 'mgr/waf/events/whitelist'
        }
        ,id: Ext.id()
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: _('stackpath.rule')
            ,id: config.id + 'whitelist_name'
            ,name: 'whitelist_name'
            ,required: true
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('stackpath.client_ip')
            ,id: config.id + 'client_ip'
            ,name: 'client_ip'
            ,readOnly: true
            ,width: 200
        }]
    });

    StackPath.window.Whitelist.superclass.constructor.call(this,config);
    this.on('beforeshow', this.setup, this);
};

Ext.extend(StackPath.window.Whitelist,MODx.Window, {
    setup: function(w) {
        this.setValues(w.record.data);
    }
});
Ext.reg('stackpath-window-whitelist',StackPath.window.Whitelist);