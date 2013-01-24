Ext.define('UM.controller.Users', {
	extend : 'Ext.app.Controller',
	views : [ 'user.List', 'user.Edit','user.Create', 'user.UserMap','user.Popup' ],
	stores : [ 'Users' ],
	models : [ 'User' ],
	init : function() {
		this.control({
			'userlist' : {
				itemdblclick : this.editUser
			},
			'userlist actioncolumn' : {
				click : this.deleteUser
			},
			'useredit button[action=save]' : {
				click : this.updateUser
			},
			'button[id=adduser]' : {
				click : this.addUser
			},
			'usercreate button[action=save]' : {
				click : this.createUser
			}
		});
		eventManager.on('selectNode', this.selectNode);
		eventManager.on('unSelectNode', this.unSelectNode);
	},
	selectNode : function(ob) {
		var view = Ext.widget('userpopup');
		view.setSize(250,120)
		var feature = ob.event.feature;
		view.down('form').loadRecord(feature.attributes);
		view.show();
		view.hide();
		var popup = new OpenLayers.Popup.AnchoredBubble("popup",
				OpenLayers.LonLat.fromString(feature.geometry
						.toShortString()), new OpenLayers.Size(250,120),
				view.getEl().dom.innerHTML, null, false);
		feature.popup = popup;
		ob.map.addPopup(popup);
	},
	unSelectNode : function(ob) {
		var feature = ob.event.feature;
		ob.map.removePopup(feature.popup);
		feature.popup.destroy();
		feature.popup = null;
	},

	addUser : function() {
		var view = Ext.widget('usercreate');

	},
	editUser : function(grid, record) {
		var view = Ext.widget('useredit');
		view.down('form').loadRecord(record);
	},
	updateUser: function(button) {
	    var win    = button.up('window'),
	        form   = win.down('form'),
	        record = form.getRecord(),
	        values = form.getValues();

	    record.set(values);
	    win.close();
	},
	deleteUser : function(grid, record , rowIndex ,colIndex) {
		 var rec = this.getUsersStore().getAt(rowIndex);
	     this.getUsersStore().remove(rec);
	},
	createUser: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
        var user = new UM.model.User(values);
        this.getUsersStore().add(user);
        win.close();
    }

});