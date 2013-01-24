var store = Ext.define('TM.store.Interactions', {
	extend : 'Ext.data.Store',
	model: 'TM.model.Tweet',
	proxy: {
        type: 'ajax',
        url: 'json/kosovo-1.json',
        reader: {
            type: 'json',
            root: 'interactions'
        }
    }
});
