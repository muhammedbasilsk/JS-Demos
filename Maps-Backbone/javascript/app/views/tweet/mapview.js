define(
		[ 'jquery', 'underscore', 'backbone', 'leafpile' ],
		function($, _, Backbone, leafpile) {
			var MapView = Backbone.View
					.extend({
						initialize : function() {
						},
						render : function() {
							map = L.map('map');
							var cloudmade = L
									.tileLayer(
											'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
											{
												key : 'BC9A493B41014CAABB98F0471D759707',
												styleId : 22677
											}).addTo(map);
							var interactions = this.collection.models;
							var lat;
							var lon;
							markers = [];
							$
									.each(
											interactions,
											function() {
												lat = this.attributes.interaction.geo.latitude;
												lon = this.attributes.interaction.geo.longitude;
												var marker = L.marker([ lat,
														lon ]);
												marker
														.bindPopup("<b>Author : </b>"
																+ this.attributes.interaction.author.username
																+ "<br>"
																+ this.attributes.interaction.content);
												marker.cid = this.cid;
												markers.push(marker);
											});
							var options = {
								radius : 120,
								maxZoomLevel : 13
							};
							var group = new L.LeafpileGroup(options, markers);
							map.addLayer(group);
							map.setView([ lat, lon ], 6);
						}
					});
			return MapView;
		});
