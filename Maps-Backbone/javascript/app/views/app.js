define(
		[ 'jquery', 'underscore', 'backbone', 'app/views/tweet/mapview',
				'app/views/tweet/tweetsview', 'app/collections/tweets',
				'jquerylayout' ], function($, _, Backbone, MapView, TweetsView,
				Tweets) {
			var AppView = Backbone.View.extend({

				// Instead of generating a new element, bind to the existing
				// skeleton of
				// the App already present in the HTML.
				el : $('#viz'),

				// Delegated events for creating new items, and clearing
				// completed ones.
				events : {},

				// At initialization we bind to the relevant events on the Users
				// collection, when items are added or changed.
				initialize : function() {
				},
				render : function() {
					$(this.el).layout({
						applyDemoStyles : true
					});
					var tweets = new Tweets([], {
						query : "cats"
					});
					var mapview = new MapView({
						collection : tweets
					});
					var tweetsView = new TweetsView({
						collection : tweets
					});
					tweets.fetch({
						success : function(collection) {
							mapview.render();
							tweetsView.render();
						}
					});
				}
			});
			eventManager = {};
			_.extend(eventManager, Backbone.Events);
			return AppView;
		});
