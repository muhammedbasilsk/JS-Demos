Ext.application({
	requires : [ 'Ext.container.Viewport','Ext.panel.Panel'],
	name : 'TM',
	appFolder : 'app',
	//controllers : [ 'Users' ],
	init : function() {
		eventManager = new Ext.util.Observable();
	},
	launch : function() {
		Ext.create('Ext.panel.Panel', {
			width: '100%',
		    height: '100%',
		    title: 'Kosovo Map',
		    layout: 'border',
		    items: [{
		        title: 'Map',
		        region: 'center',     // position for region
		        xtype: 'panel',
		        height: 100,
		        split: true,         // enable resizing
		        margins: '0 5 5 5'
		    },{
		        // xtype: 'panel' implied by default
		        title: 'TweetList',
		        region:'west',
		        xtype: 'panel',
		        margins: '5 0 0 5',
		        width: 200,
		        collapsible: true,   // make collapsible
		        id: 'west-region-container',
		        layout: 'fit'
		    }],
		    renderTo: Ext.getBody()
		});
	}
});