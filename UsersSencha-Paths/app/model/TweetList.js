Ext.define('TM.model.TweetList', {
	extend : 'Ext.data.Model',
	fields : [ 'count', 'hash', 'hash_type', 'id' ],
	hasMany : [ 'interactions', {
		model : 'Twitter',
		name : 'interactions'
	} ]
});