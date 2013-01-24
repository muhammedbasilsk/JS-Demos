Ext.define('TM.view.tweet.StartPage', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.startpage',
	title : 'Map',
    autoShow: true,
    initComponent: function() {
        this.items = [
            	Ext.create('Ext.panel.Panel', {
    				width: '100%',
    			    height: '100%',
    			    title: 'Kosovo Map',
    			    layout: 'border',
    			    items: [{
    					    	xtype : 'panel',
    					        region:'center',
    							title : 'Location Map',
    							width: '70%',
    							height : '100%',
    							items : [ {
    								xtype : "component",
    								scroll : true,
    								id : "map",
    								width: '100%',
    								height : '100%',
    								listeners : {
    									render : function() {
    										var self = this;
    										var view = Ext.widget('mapview');
    									},
    									resize : function() {
    										if (window.map) {
    											map.invalidateSize();
    										}
    									}
    								}
    							}]
    					    }
    					    ,{
    					        // xtype: 'panel' implied by default
    					        title: 'TweetList',
    					        region:'west',
    					        xtype: 'tweetlist',
    					        margins: '5 0 0 5',
    					        width: '30%',
    					        collapsible: true,   // make collapsible
    					        id: 'west-region-container',
    					        layout: 'fit'
    					    }],
    			    renderTo: Ext.getBody()
    			})
        ];
       this.callParent(arguments);
    }
});