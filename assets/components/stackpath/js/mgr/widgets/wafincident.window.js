StackPath.window.Incident = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('stackpath.view_details')
        ,width: 750
        ,closeAction: 'close'
        ,url: StackPath.config.connectorUrl
        ,baseParams: {}
        ,id: Ext.id()
        ,fields: [{
            layout: 'column'
            ,items: [{
                columnWidth: 0.5
                ,layout: 'form'
                ,items: [{
                    xtype: 'displayfield'
                    ,fieldLabel: _('stackpath.rule')
                    ,id: config.id + 'rule_name'
                    ,name: 'rule_name'
                    ,anchor: '100%'
                },{
                    xtype: 'displayfield'
                    ,fieldLabel: _('stackpath.date')
                    ,id: config.id + 'timestamp'
                    ,name: 'timestamp'
                    ,anchor: '100%'
                }]
            },{
                columnWidth: 0.5
                ,layout: 'form'
                ,items: [{
                    xtype: 'displayfield'
                    ,fieldLabel: _('stackpath.action')
                    ,id: config.id + 'action'
                    ,name: 'action'
                    ,anchor: '100%'
                },{
                    xtype: 'displayfield'
                    ,fieldLabel: _('stackpath.result')
                    ,id: config.id + 'result'
                    ,name: 'result'
                    ,anchor: '100%'
                }]
            }]
        },{
            html: '<hr />'
        },{
            layout: 'column'
            ,items: [{
                columnWidth: 0.5
                ,layout: 'form'
                ,items: [{
                    xtype: 'displayfield'
                    ,fieldLabel: _('stackpath.client_ip')
                    ,id: config.id + 'client_ip'
                    ,name: 'client_ip'
                    ,anchor: '100%'
                },{
                    xtype: 'displayfield'
                    ,fieldLabel: _('stackpath.country')
                    ,id: config.id + 'country'
                    ,name: 'country'
                    ,anchor: '100%'
                }]
            },{
                columnWidth: 0.5
                ,layout: 'form'
                ,items: [{
                    xtype: 'displayfield'
                    ,fieldLabel: _('stackpath.domain')
                    ,id: config.id + 'domain'
                    ,name: 'domain'
                    ,anchor: '100%'
                },{
                    xtype: 'displayfield'
                    ,fieldLabel: _('stackpath.method')
                    ,id: config.id + 'method'
                    ,name: 'method'
                    ,anchor: '100%'
                }]
            }]
        },{
            html: '<hr />'
        },{
            xtype: 'displayfield'
            ,fieldLabel: _('stackpath.url')
            ,id: config.id + 'url'
            ,name: 'viewedPage'
            ,value: '-'
        },{
            xtype: 'displayfield'
            ,fieldLabel: _('stackpath.useragent')
            ,id: config.id + 'useragent'
            ,name: 'userAgent'
            ,anchor: '100%'
            ,value: '-'
        },{
            xtype: 'displayfield'
            ,fieldLabel: _('stackpath.description')
            ,id: config.id + 'description'
            ,name: 'description'
            ,value: '-'
        },{
            xtype: 'textarea'
            ,fieldLabel: _('stackpath.headers')
            ,id: config.id + 'headers'
            ,name: 'httpHeaders'
            ,readOnly: true
            ,height: 200
            ,anchor: '100%'
        }]
        ,buttons: [{
            text: config.cancelBtnText || _('cancel')
            ,scope: this
            ,handler: function() { config.closeAction !== 'close' ? this.hide() : this.close(); }
        }]
    });

    StackPath.window.Incident.superclass.constructor.call(this,config);
    this.on('beforeshow', this.setup, this);
};

Ext.extend(StackPath.window.Incident,MODx.Window, {
    setup: function(w) {
        console.log(w.record.data);
        this.setValues(w.record.data);

        if (!Ext.isEmpty(w.record.data.incident_id)) {
            Ext.Ajax.request({
                url: this.config.url
                ,params: {
                    action: 'mgr/waf/events/incident/get'
                    ,incident: w.record.data.incident_id
                }
                ,scope: this
                ,success: function(r) {
                    r = Ext.decode(r.responseText);
                    if (r.success) {
                        this.setValues(r.object);
                    }
                }
            });
        }
    }
});
Ext.reg('stackpath-window-incident',StackPath.window.Incident);