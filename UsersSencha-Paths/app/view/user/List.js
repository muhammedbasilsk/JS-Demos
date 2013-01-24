Ext.define('UM.view.user.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.userlist',

	title : 'All Users',
	store : 'Users',
	initComponent : function() {
		this.columns = [ {
			header : 'Name',
			dataIndex : 'name',
			flex : 1
		}, {
			header : 'Email',
			dataIndex : 'email',
			flex : 1
		}, {
			header : 'Location',
			dataIndex : 'position',
			flex : 1
		},{
           xtype: 'actioncolumn',
           header : 'Action',
           dataIndex : 'delete',
           width:30,
           sortable: false,
           items: [{
               icon: 'icons/fam/delete.gif',
               tooltip: 'Delete User',
           }]
		}];
		this.callParent(arguments);
	}
});