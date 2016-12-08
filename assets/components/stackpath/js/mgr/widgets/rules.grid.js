StackPath.grid.Rules = function(config) {
    config = config || {};

    this.exp = new Ext.grid.RowExpander({
        tpl : new Ext.Template(
            '<p class="scdn_cdn_url"><strong>' + _('scdn.cdn_url') + '</strong>: {cdn_url}</p>' +
            '<p class="scdn_cdn_url"><strong>' + _('scdn.input') + '</strong>: {input}</p>' +
            '<p class="scdn_cdn_url"><strong>' + _('scdn.output') + '</strong>: {output}</p>'
        )
    });

    Ext.applyIf(config,{
        url: StackPath.config.connectorUrl
        ,id: 'macdn-grid-rules'
        ,baseParams: {
            action: 'mgr/rules/getlist'
        }
        ,emptyText: _('scdn.error.noresults')
        ,fields: [
            {name: 'id', type: 'int'}
            ,{name: 'name', type: 'string'}
            ,{name: 'description', type: 'string'}
            ,{name: 'content_type', type: 'int'}
            ,{name: 'all_contexts', type: 'int'}
            ,{name: 'context', type: 'string'}
            ,{name: 'content_type_name', type: 'string'}
            ,{name: 'input', type: 'string'}
            ,{name: 'output', type: 'string'}
            ,{name: 'zone', type: 'string'}
            ,{name: 'scheme', type: 'string'}
            ,{name: 'cdn_url', type: 'string'}
            ,{name: 'disabled', type: 'int'}
            ,{name: 'sortorder', type: 'int'}
        ]
        ,grouping: true
        ,groupBy: 'content_type_name'
        ,singleText: _('scdn.rule')
        ,pluralText: _('scdn.rules')
        ,paging: true
        ,remoteSort: true
        ,plugins: this.exp
        ,columns: [this.exp,{
            header: _('scdn.content_type')
            ,dataIndex: 'content_type_name'
            ,hidden: true
        },{
            header: _('scdn.context')
            ,dataIndex: 'context'
            ,sortable: true
            ,width: 30
            ,renderer: function(v) {
                if (v == '') {
                    return _('scdn.all');
                } else {
                    return v;
                }
            }
        },{
            header: _('scdn.name')
            ,dataIndex: 'name'
            ,sortable: true
            ,width: 175
        },{
            header: _('scdn.description')
            ,dataIndex: 'description'
            ,sortable: true
            ,width: 200
        },{
            header: _('scdn.disabled')
            ,dataIndex: 'disabled'
            ,sortable: true
            ,width: 75
            ,renderer: this.rendYesNo
        },{
            header: _('scdn.sortorder')
            ,dataIndex: 'sortorder'
            ,sortable: true
            ,width: 50
        }]
        ,tools: [{
            id: 'plus'
            ,qtip: _('expand_all')
            ,handler: this.expandAll
            ,scope: this
        },{
            id: 'minus'
            ,hidden: true
            ,qtip: _('collapse_all')
            ,handler: this.collapseAll
            ,scope: this
        }]
        ,tbar: [{
            text: _('scdn.add_rule')
            ,handler: this.addRule
            ,scope: this
        }]
    });
    this.view = new Ext.grid.GroupingView({
        emptyText: config.emptyText || _('ext_emptymsg')
        ,forceFit: true
        ,autoFill: true
        ,showPreview: true
        ,enableRowBody: true
        ,scrollOffset: 0
    });
    StackPath.grid.Rules.superclass.constructor.call(this,config);
};
Ext.extend(StackPath.grid.Rules,MODx.grid.Grid,{
    addRule: function() {
        var win = MODx.load({
            xtype: 'scdn-window-rule'
            ,listeners: {
                success: {fn: function(r) {
                    this.refresh();
                },scope: this}
                ,scope: this
            }
        });
        win.show();
    }
    ,updateRule: function() {
        var record = this.menu.record;
        var win = MODx.load({
            xtype: 'scdn-window-rule'
            ,listeners: {
                success: {fn: function(r) {
                    this.refresh();
                },scope: this}
                ,scope: this
            }
            ,isUpdate: true
        });
        win.record = record;
        win.setValues(record);
        win.show();
    }
    ,duplicateRule: function() {
        MODx.Ajax.request({
            url: StackPath.config.connectorUrl
            ,params: {
                action: 'mgr/rules/duplicate'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    }
    ,removeRule: function() {
        var id = this.menu.record.id;
        MODx.msg.confirm({
            title: _('scdn.remove_rule')
            ,text: _('scdn.remove_rule.confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/rules/remove'
                ,id: id
            },
            listeners: {
                success: {fn: function(r) {
                    this.refresh();
                },scope: this}
                ,scope: this
            }
        });
    }
    ,getMenu: function() {
        var m = [];

        m.push({
            text: _('scdn.update_rule')
            ,handler: this.updateRule
            ,scope: this
        },'-',{
            text: _('scdn.duplicate_rule')
            ,handler: this.duplicateRule
            ,scope: this
        },'-',{
            text: _('scdn.remove_rule')
            ,handler: this.removeRule
            ,scope: this
        });
        return m;
    }

});
Ext.reg('scdn-grid-rules',StackPath.grid.Rules);
