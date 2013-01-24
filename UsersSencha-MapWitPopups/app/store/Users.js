Ext.define('UM.store.Users', {
	extend : 'Ext.data.Store',
	model: 'UM.model.User',
	data : [ {
		name : 'Ed',
		email : 'ed@sencha.com',
		position : 'Chennai'
	}, {
		name : 'Tommy',
		email : 'tommy@sencha.com',
		position : 'Mumbai'
	} ]
});