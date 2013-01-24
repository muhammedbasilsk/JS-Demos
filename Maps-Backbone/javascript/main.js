//require.config({
//  paths: {
//    jquery: 'libs/jquery/jquery',
//    underscore: 'libs/underscore/underscore-min',
//    backbone: 'libs/backbone/backbone',
//    text: 'libs/require/text',
//   	jquerytable: 'libs/jquery/jquery.dataTables',
//   	jquerylayout: 'libs/jquery/jquery.layout-latest',
//   	jquerylatest: 'libs/jquery/jquery-latest',
//   	leaflet: 'libs/leaflet/dist/leaflet-src',
//  }
//
//});
//
//require(['views/app'], function(AppView){
//  var app_view = new AppView().render();
//});

requirejs.config({
    baseUrl: "javascript/lib",
    paths: {
	"app": "../app"
    },
    shim: {
	backbone: {
	    deps: ["underscore", "jquery"],
	    exports: "Backbone"
	},
	underscore: {
	    exports: "_"
	},
	jquerylayout: {
	    deps: ["jquery" ],
	},
	jquerytable: {
	    deps: ["jquery" ],
	},
	leafpile : {
		deps : ["leaflet"],
	}
    }
});

require(["jquery",
	 "underscore",
	 "backbone",
	 "app/views/app"],
function($, _, Backbone, AppView) {
    console.log("All ready to go now");
    // set up the global event channel
    window.channel = _.extend(Backbone.Events);
    window.app = new AppView();
    window.app.render();
    window.$ = $;
});