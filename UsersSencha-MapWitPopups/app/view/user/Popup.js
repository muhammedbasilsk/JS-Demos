Ext.define('UM.view.user.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.userpopup',

    title: 'User',
    layout: 'fit',
    autoShow: false,

    initComponent: function() {
        this.items = [
                      {
                          xtype: 'form',
                          items: [
                              {
                                  xtype: 'displayfield',
                                  name : 'name',
                                  fieldLabel: 'Name'
                              },
                              {
                                  xtype: 'displayfield',
                                  name : 'email',
                                  fieldLabel: 'Email'
                              },
                              {
                                  xtype: 'displayfield',
                                  name : 'position',
                                  fieldLabel: 'Location'
                              }
                          ]
                      }
                  ];
                  this.callParent(arguments);
              }
});