define([
  'underscore', 
  'backbone', 
  'app/models/tweet/tweet'
  ], function(_, Backbone, Tweet){
	  
	var Tweets = Backbone.Collection.extend({
		  model : Tweet,
		  initialize : function(models, options) {
		    this.query = options.query;
		  },
		  url : function() {
		    return "json/kosovo.json";
		  },
		  parse : function(data) {
		 
		    // note that the original result contains tweets inside of a 'results' array, not at 
		    // the root of the response.
		    return data.interactions;
		  }
		});
	return Tweets;
});