Ext.define('TM.view.tweet.MapView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.mapview',
	title : 'Map',
	store : 'Interactions',
	initComponent : function() {
			map = L.map('map');
	        var cloudmade = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
	            key: 'BC9A493B41014CAABB98F0471D759707',
	            styleId: 997
	        }).addTo(map);
	}
});