StackPath.grid.Events = function(config) {
    config = config || {};

    this.exp = new Ext.grid.RowExpander({
        tpl : new Ext.Template(
            '<p></p>'
        )
    });

    Ext.applyIf(config,{
        id: 'stackpath-grid-events'
        ,url: StackPath.config.connectorUrl
        ,baseParams: {
            action: 'mgr/waf/events/getlist'
        }
        ,fields: ['ref_id','incident_id','rule_name', 'client_ip', 'timestamp', 'action', 'country', 'result', 'domain', 'uri', 'method']
        ,autoHeight: true
        ,width: '100%'
        ,sortBy: 'id'
        ,paging: true
        ,showPerPage: false
        ,remoteSort: false
        ,plugins: this.exp
        ,columns: [{
            header: _('id')
            ,dataIndex: 'ref_id'
            ,sortable: true
            ,hidden: true
        },{
            header: _('stackpath.rule')
            ,dataIndex: 'rule_name'
            ,width: 150
            ,sortable: true
        },{
            header: _('stackpath.action')
            ,dataIndex: 'action'
            ,width: 175
            ,sortable: true
        },{
            header: _('stackpath.result')
            ,dataIndex: 'result'
            ,width: 50
            ,sortable: true
        },{
            header: _('stackpath.client_ip')
            ,dataIndex: 'client_ip'
            ,width: 60
            ,sortable: true
        },{
            header: _('stackpath.country')
            ,dataIndex: 'country'
            ,width: 40
            ,sortable: true
        },{
            header: _('stackpath.date')
            ,dataIndex: 'timestamp'
            ,width: 100
            ,sortable: true
        },{
            header: ''
            ,width: 125
            ,renderer: function (v, m, r) {
                var allowId = Ext.id();
                var detailsId = Ext.id();
                var me = this;
                Ext.defer(function() {
                    var btn = new Ext.Button({
                        renderTo: allowId
                        ,text: _('stackpath.allow')
                        ,width: 100
                        ,handler: function() {
                            Ext.getCmp('stackpath-grid-events').showWhitelist(r);
                        }
                    });
                }, 50);
                Ext.defer(function() {
                    var btn = new Ext.Button({
                        renderTo: detailsId
                        ,text: _('stackpath.view_details')
                        ,width: 100
                        ,handler: function() {
                            Ext.getCmp('stackpath-grid-events').showIncident(r);
                        }
                    });
                }, 50);

                return String.format('<span id="{0}"></span><span class="waf_allow_btn" id="{1}"></span>', allowId, detailsId);
            }
        }]
        ,tbar: ['->', {
            xtype: 'stackpath-combo-wafactions'
            ,text: _('stackpath.action')
            ,id: 'stackpath-waf-events-action'
            ,emptyText: _('stackpath.action')
            ,allowBlank: true
            ,width: 300
            ,listeners: {
                'select': {fn: this.search, scope:this}
            }
        },'-', {
            xtype: 'stackpath-combo-wafresult'
            ,text: _('stackpath.result')
            ,id: 'stackpath-waf-events-result'
            ,emptyText: _('stackpath.result')
            ,allowBlank: true
            ,width: 150
            ,listeners: {
                'select': {fn: this.search, scope: this}
            }
        },'-',{
            xtype: 'textfield'
            ,fieldLabel: _('stackpath.search')
            ,id: 'stackpath-waf-events-search'
            ,emptyText: _('stackpath.client_ip')
            ,listeners: {
                'change': {fn:this.search,scope:this}
                ,'render': {fn: function(cmp) {
                        new Ext.KeyMap(cmp.getEl(), {
                            key: Ext.EventObject.ENTER
                            ,fn: function() {
                                this.fireEvent('change',this);
                                this.blur();
                                return true; }
                            ,scope: cmp
                        });
                    },scope:this}
            }
        },'-',{
            xtype: 'button'
            ,id: 'stackpath-event-clearfilter'
            ,text: _('stackpath.clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });

    StackPath.grid.Events.superclass.constructor.call(this,config);

    this.addListener('beforerender',function() {
        var bb = Ext.getCmp('stackpath-grid-events').getBottomToolbar();
        //bb.displayInfo = false;
        bb.displayMsg = '';
        bb.emptyMsg = '';
        bb.first.hidden = true;
        bb.last.hidden = true;
        bb.inputItem.hidden = true;

        bb.items.item(3).destroy();
        bb.items.item(4).destroy();
    }, this);
};

Ext.extend(StackPath.grid.Events,MODx.grid.Grid, {
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.client_ip = Ext.getCmp('stackpath-waf-events-search').getValue();
        s.baseParams.waf_action = Ext.getCmp('stackpath-waf-events-action').getValue();
        s.baseParams.waf_result = Ext.getCmp('stackpath-waf-events-result').getValue();
        this.getBottomToolbar().changePage(1);
        /* this.refresh(); */
    },

    clearFilter: function() {
        this.getStore().baseParams = {
            action: 'mgr/waf/events/getlist'
        };
        Ext.getCmp('stackpath-waf-events-search').reset();
        Ext.getCmp('stackpath-waf-events-action').reset();
        Ext.getCmp('stackpath-waf-events-result').reset();
        this.getBottomToolbar().changePage(1);
        /* this.refresh(); */
    },

    showIncident: function(r) {
        var showIncident = MODx.load({
            xtype: 'stackpath-window-incident'
            ,record: r
            ,listeners: {
                'success': {fn:function() { this.refresh(); },scope:this}
            }
        });

        showIncident.show();
    },

    showWhitelist: function(r) {
        var showWhitelist = MODx.load({
            xtype: 'stackpath-window-whitelist'
            ,record: r
            ,listeners: {
                'success': {fn:function() {
                        this.refresh();
                        var rulesGrid = Ext.getCmp('stackpath-grid-rules');
                        if (!Ext.isEmpty(rulesGrid)) {
                            rulesGrid.getStore().load();
                        }
                    },scope:this}
            }
        });

        showWhitelist.show();
    }
});

Ext.reg('stackpath-grid-events',StackPath.grid.Events);