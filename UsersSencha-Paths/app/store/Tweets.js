Ext.define('TM.store.Tweets', {
	extend : 'Ext.data.Store',
	model: 'TM.model.Tweet',
	proxy: {
        type: 'ajax',
        url: 'json/kosovo-1.json',
        reader: {
            type: 'json',
            root: 'tweets'
        }
    },
    autoLoad: true
});