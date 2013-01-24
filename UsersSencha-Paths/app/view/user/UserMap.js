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
		var gmap = new OpenLayers.Layer.Google("Google Streets", // the default
		{
			numZoomLevels : 20
		});
		map.addLayers([ gmap ]);
		var center = toMercator(new OpenLayers.Geometry.Point(80, 13)); 
		map.setCenter(new OpenLayers.LonLat(center.x,center.y),10);
		/**
		 * Create 5 random vector features.  Your features would typically be fetched
		 * from the server. The features are given an attribute named "foo".
		 * The value of this attribute is an integer that ranges from 0 to 100.
		 */
		var features = [];
		for ( var i = 0; i < 1; i++) {
			features[i] = new OpenLayers.Feature.Vector(
					toMercator(new OpenLayers.Geometry.Point(80, 13)), {
						foo : 100 * Math.random() | 0
					}, {
						fillColor : 'red',
						fillOpacity : 0.5,
						strokeColor : "white",
						strokeOpacity : 1,
						strokeWidth : 2,
						pointRadius : 10
					});
		}

		// create the layer with listeners to create and destroy popups
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
		vector.addFeatures(features);
		// create the select feature control
		var selector = new OpenLayers.Control.SelectFeature(vector, {
			hover : true,
			autoActivate : true
		});
		map.addLayers([ osm, vector ]);
		map.addControl(selector);
	}
});