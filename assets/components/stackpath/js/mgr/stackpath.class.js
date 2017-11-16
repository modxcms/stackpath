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
