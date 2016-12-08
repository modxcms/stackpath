Ext.onReady(function() {
    MODx.load({ xtype: 'scdn-page-home', renderTo: 'scdn-wrapper-div'});
});
 
StackPath.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'scdn-page-home'
        ,cls: 'container form-with-labels'
        ,layout: 'form'
        ,border: false
        ,components: [{
            xtype: 'panel'
            ,html: '<h2>'+_('scdn.desc')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'form'
            ,id: 'scdn-formpanel-home'
            ,border: false
            ,items: [{
                xtype: 'modx-tabs'
                ,id: 'scdn-tabs'
                ,width: '98%'
                ,padding: 10
                ,border: true
                ,deferredRender: false
                ,defaults: {
                    border: false
                    ,autoHeight: true
                    ,defaults: {
                        border: false
                    }
                }
                ,items: [{
                    title: _('scdn.reporting')
                    ,items: [{
                        html: '<h2 class="scdn-logo"><img src=" ' + StackPath.config.assetsUrl + 'images/sp-logo-light.svg" /></h2>' +
                            '<div class="scdn-top-stat scdn-top-stat-last">' +
                            '<p class="scdn-top-stat-title">' + _('scdn.reporting_mb_transferred') + '</p>' +
                            '<p class="scdn-top-stat-figure" id="scdn-mb-transferred"></p>' +
                            '</div>' +
                            '<div class="scdn-top-stat">' +
                            '<p class="scdn-top-stat-title">' + _('scdn.reporting_non_cache_hits') + '</p>' +
                            '<p class="scdn-top-stat-figure" id="scdn-non-cache-hits"></p>' +
                            '</div>' +
                            '<div class="scdn-top-stat">' +
                            '<p class="scdn-top-stat-title"> ' + _('scdn.reporting_cache_hits') + '</p>' +
                            '<p class="scdn-top-stat-figure" id="scdn-cache-hits"></p>' +
                            '</div>' +
                            '<div id="scdn-chart-line-daily"></div>' +
                            '<div id="scdn-chart-bar-transfer"></div>' +
                            '<div id="scdn-chart-geo-nodes"></div>' +
                            '<div id="scdn-chart-pie-ratio"></div>' +
                            '<div class="scdn-clear"></div>' +
                            '<div id="scdn-table-popularfiles"></div>' +
                            '<div class="scdn-clear"></div><br />'
                    }]
                },{
                    title: _('scdn.rules')
                    ,items: [{
                        xtype: 'scdn-grid-rules'
                        ,preventRender: true
                    }]
                },{
                    title: _('scdn.purge')
                    ,items: this.getPurgeFields(config)
                }]
                ,stateful: true
                ,stateId: 'scdn-page-home'
                ,stateEvents: ['tabchange']
                ,getState: function() {
                    return {
                        activeTab:this.items.indexOf(this.getActiveTab())
                    };
                }
                ,listeners: {
                    'tabchange': function(tp, t) {
                        var idx = tp.items.indexOf(t);
                        if (idx == 0) {
                            refreshReporting();
                        }
                    }
                }
            }]
        }]
    });
    StackPath.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(StackPath.page.Home,MODx.Component,{
    getPurgeFields: function(config) {
        config.id = config.id || Ext.id();
        var s = [{
            layout:'form'
            ,border: false
            ,anchor: '100%'
            ,defaults: {
                labelSeparator: ''
                ,labelAlign: 'top'
                ,border: false
                ,layout: 'form'
                ,msgTarget: 'under'
            }
            ,items:[{
                defaults: {
                    border: false
                    ,msgTarget: 'under'
                }
                ,items: [{
                    xtype: 'xcheckbox'
                    ,boxLabel: _('scdn.purge_all')
                    ,hideLabel: true
                    ,id: config.id + 'scdn-purge-all'
                    ,name: 'purge_all'
                    ,value: 1
                    ,checked: false
                    ,handler: function(o,v) {
                        if (v == true) {
                            Ext.getCmp(config.id + 'scdn-purge-files').disable().setValue('');
                        } else {
                            Ext.getCmp(config.id + 'scdn-purge-files').enable();
                        }
                    }
                },{
                    xtype: 'textarea'
                    ,fieldLabel: _('scdn.purge_files')
                    ,id: config.id + 'scdn-purge-files'
                    ,name: 'purge_files'
                    ,anchor: '100%'
                    ,width: '100%'
                    ,height: 200
                },{
                    html: '<p><i>' + _('scdn.purge_files_desc') + '</i></p>'
                }]
            }]
            ,buttonAlign: 'center'
            ,buttons: [{
                xtype: 'button'
                ,text: _('scdn.purge')
                ,scope: this
                ,handler: this.purge
            }]
        }];
        return s;
    }

    ,purge: function() {
        Ext.Ajax.request({
            url: StackPath.config.connectorUrl
            ,params: {
                action: 'mgr/files/purge'
                ,purge_all: Ext.getCmp(this.config.id + 'scdn-purge-all').getValue()
                ,purge_files: Ext.getCmp(this.config.id + 'scdn-purge-files').getValue()
            }
            ,scope: this
            ,success: function(r) {
                var response = Ext.decode(r.responseText);
                MODx.msg.alert(_('scdn.purge'), response.message);

                Ext.getCmp(this.config.id + 'scdn-purge-all').setValue(false);
                Ext.getCmp(this.config.id + 'scdn-purge-files').setValue('');
            }
        });
    }

});
Ext.reg('scdn-page-home', StackPath.page.Home);