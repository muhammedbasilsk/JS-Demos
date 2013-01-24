Ext.define('TM.controller.Tweets', {
	extend : 'Ext.app.Controller',
	views : [ 'tweet.List','tweet.MapView'],
	stores : [ 'Interactions' ],
	models : [ 'Twitter', 'Tweet' ],
	hmap : Ext.create('Ext.util.HashMap'),
	init : function() {
		this.control({
			'tweetlist' : {
				itemdblclick : this.zoomMarker
			}
		});
		var me = this;
		var interactions = Ext.getStore("Interactions");
		interactions.load({
			callback: function(records, operation, success) {
				var data = {};
				data.hmap = me.hmap;
				data.records = records;
				eventManager.fireEvent('populateMarker', data);
			}
		});
		eventManager.on('populateMarker', this.populateMarker);
	},
	populateMarker : function(ob) {
		var lon;
		var lat;
		Ext.each(ob.records,function(){
    		lon = this.raw.twitter.geo.longitude;
    		lat = this.raw.twitter.geo.latitude;
    	 	var marker = L.marker([lat,lon]).addTo(map);
    	 	marker.bindPopup("<b>Author:"+this.raw.interaction.author.name+"</b><br>"+this.raw.twitter.text);
    	 	ob.hmap.add(this.id, marker);
    	});
        map.setView([lat, lon], 6);
	},
	zoomMarker : function(grid, record) {
		var x = this.hmap.get(record.id);
		map.setView([record.raw.twitter.geo.latitude, record.raw.twitter.geo.longitude], 15);
		x.openPopup();
	}
		
});