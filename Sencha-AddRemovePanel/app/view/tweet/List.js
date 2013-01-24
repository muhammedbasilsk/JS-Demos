Ext.define('TM.view.tweet.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.tweetlist',
	title : 'All Tweets',
	store : 'Interactions',
	initComponent : function() {
		this.columns = [ {
			header : 'Messages',
			dataIndex : 'twitter',
			renderer: function(value) {
	            return value.text;
	        },
			flex : 1
		}];
		this.callParent(arguments);
	}
});