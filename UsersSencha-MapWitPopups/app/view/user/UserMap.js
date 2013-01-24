Ext.define('UM.view.user.UserMap', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.usermap',
	title : 'All Users',
	store : 'Users',
	initComponent : function() {
		usr = Ext.getStore("Users").data;
		map = new OpenLayers.Map('map');
		var osm = new OpenLayers.Layer.OSM();
		var toMercator = OpenLayers.Projection.transforms['EPSG:4326']['EPSG:3857'];
		var gmap = new OpenLayers.Layer.Google("Google Streets");
		map.addLayers([ gmap ]);
		/**
		 * Create 5 random vector features.  Your features would typically be fetched
		 * from the server. The features are given an attribute named "foo".
		 * The value of this attribute is an integer that ranges from 0 to 100.
		 */
		var userItems =  usr.items;
		var features = [];
		var vector = new OpenLayers.Layer.Vector("Points", {
			eventListeners : {
				'featureselected' : function(evt) {
					var ob = {};
					ob.event = evt;
					ob.map = map;
					eventManager.fireEvent('selectNode', ob);
				},
				'featureunselected' : function(evt) {
					var ob = {};
					ob.event = evt;
					ob.map = map;
					eventManager.fireEvent('unSelectNode', ob);
				}
			}
		});
		var selector = new OpenLayers.Control.SelectFeature(vector, {
			hover : true,
			autoActivate : true
		});
		map.addLayers([ osm, vector ]);
		map.addControl(selector);
		var avglat = 0;
		var avglng = 0;
		Ext.each(userItems,function(){
			var geocoder = new google.maps.Geocoder();
			var lng;
			var lat;
			var data = this;
			var address = this.data.position;
			geocoder.geocode({'address' : address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					lng = results[0].geometry.location.lng();
					lat = results[0].geometry.location.lat();
					avglng = avglng+(lng/2);
					avglat = avglat+(lat/2);
					console.log(data);
					features.push(new OpenLayers.Feature.Vector(
							toMercator(new OpenLayers.Geometry.Point(lng, lat)), data, {
								fillColor : 'red',
								fillOpacity : 0.5,
								strokeColor : "white",
								strokeOpacity : 1,
								strokeWidth : 2,
								pointRadius : 10
							}));
					console.log(results);
					vector.addFeatures(features);
					// create the select feature control
					var center = toMercator(new OpenLayers.Geometry.Point(avglng,avglat)); 
					map.setCenter(new OpenLayers.LonLat(center.x,center.y),04);
				}
			});
		});
		
	}
});