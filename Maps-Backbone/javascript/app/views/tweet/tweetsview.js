define([ 'jquery', 'underscore', 'backbone', 'jquerytable' ], function($, _,
		Backbone) {
	var TweetsView = Backbone.View.extend({
		el : $("#tweets-table"),
		initialize : function() {
		},
		events : function() {
			eventManager.bind("clicked", this.alert);
		},
		render : function() {
			console.log(this.el);
			table = $(this.el).dataTable({
				"aoColumns" : [ {
					"sDefaultContent" : '',
					"sTitle" : "Tweets",
					"fnRender" : function(obj) {
						sReturn = obj.aData.attributes.interaction.content;
						return sReturn;
					},
				} ],
				"fnCreatedRow" : function(nRow, aData, iDataIndex) {
					$(nRow).live('click', function() {
						/*$(table.fnSettings().aoData).each(function (){
							$(this.nTr).removeClass('row_selected');
						});
						$(this).addClass('row_selected');*/
						eventManager.trigger("clicked", aData, this, table);
					});
				},
				"bPaginate" : false,
				"bJqueryUI" : true,
				"bDestroy" : true,
				"bFilter" : false,
				"bInfo" : false,
			});
			table.fnAddData(this.collection.models);
		},
		alert : function(data, row, table) {
			$(table.fnSettings().aoData).each(function() {
				$(this.nTr).removeClass('row_selected');
			});
			$(row).addClass('row_selected');
			$.each(markers, function(index, value) {
				if (value.cid == data.cid) {
					value.openPopup();
					return false;
				}
			});
		}
	});
	return TweetsView;
});