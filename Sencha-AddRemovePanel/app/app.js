Ext.application({
	requires : [ 'Ext.container.Viewport', 'Ext.panel.Panel' ],
	name : 'TM',
	appFolder : 'app',
	controllers : [ 'Tweets' ],
	init : function() {
		eventManager = new Ext.util.Observable();
	},
	launch : function() {
		me = this;
		formPanel = new Ext.Panel({
				title : 'Start Page',
				id : 'start',
				renderTo : Ext.getBody(),
				width : '100%',
				height : '100%',
				items : [ new Ext.Button({
					text : 'Add',
					listeners : {
						click : function() {
							pan = new Ext.Panel({
								title : 'Newly Added Panel',
								items:[{
									xtype: 'label',
							        text: 'My new Panel'}]
							});
							formPanel.add(pan);
						}
					}
				}), new Ext.Button({
					text : 'Remove',
					listeners : {
						click : function() {
							formPanel.remove(pan);
						}
					}
				}),  new Ext.Button({
					text : 'Remove All',
					listeners : {
						click : function() {
							formPanel.removeAll();
						}
					}
				})
				]
			}) ;
		items: [formPanel]
	}
});