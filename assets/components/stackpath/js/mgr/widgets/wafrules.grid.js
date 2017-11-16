StackPath.grid.Rules = function(config) {
    config = config || {};

    this.exp = new Ext.grid.RowExpander({
        tpl : new Ext.Template(
            '<p><strong>' + _('stackpath.conditions') + '</strong>:</p><p><ul>{conditions}</ul></p>'
        )
    });

    Ext.applyIf(config,{
        id: 'stackpath-grid-rules'
        ,url: StackPath.config.connectorUrl
        ,baseParams: {
            action: 'mgr/waf/rules/getlist'
        }
        ,fields: ['id','name','description','action','active','conditions']
        ,autoHeight: true
        ,sortBy: 'id'
        ,plugins: this.exp
        ,columns: [this.exp,{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: true
            ,width: 25
            ,hidden: true
        },{
            header: _('stackpath.name')
            ,dataIndex: 'name'
            ,width: 200
            ,sortable: true
        },{
            header: _('stackpath.action')
            ,dataIndex: 'action'
            ,sortable: true
        },{
            header: _('stackpath.active')
            ,dataIndex: 'active'
            ,renderer: this.rendYesNo
            ,sortable: true
        }]
    });
    StackPath.grid.Rules.superclass.constructor.call(this,config);
};
Ext.extend(StackPath.grid.Rules,MODx.grid.Grid);
Ext.reg('stackpath-grid-rules',StackPath.grid.Rules);