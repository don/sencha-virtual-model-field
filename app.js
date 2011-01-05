/*global Ext*/
Ext.setup({
    onReady: function() {
        Ext.regModel('Person', {
            fields: [
                {name: 'id', type: 'int'},         
                {name: 'firstName', type: 'string'},
                {name: 'lastName', type: 'string'},
                // virtual attribute
                {name: 'fullName', type: 'string', 
                    convert: function(v, rec) { 
                        return rec.data.firstName + " " + rec.data.lastName; 
                        }
                }                
            ],
            // function works, but can't be used for Select#displayField
            fullNameFunction: function() {
                return this.data.firstName + " " + this.data.lastName;                
            }
        });
        
        var store = new Ext.data.Store({
            model: 'Person',
            data : [
                {id: 1, firstName: 'George', lastName: 'Washington'},
                {id: 2, firstName: 'John', lastName: 'Adams'},
                {id: 3, firstName: 'Thomas', lastName: 'Jefferson'},
                {id: 4, firstName: 'James', lastName: 'Madison'},
                {id: 5, firstName: 'James', lastName: 'Monroe'}                
            ]
        });

        var panel = new Ext.Panel({
            fullscreen: true,
            items: [
                {
                    id: 'firstNameSelectField',
                    xtype: 'selectfield',
                    label: 'First Name',
                    store: store,
                    valueField: 'id',
                    displayField: 'firstName',
                    listeners: {
                        change: function(select, value) {
                            var person = store.findRecord('id', value);
                            Ext.Msg.alert('Using function to get full name', 'You chose ' + person.fullNameFunction(), Ext.emptyFn);

                        }
                    }
                },
                {
                    xtype: 'selectfield',
                    label: 'Full Name',
                    store: store,
                    valueField: 'id',
                    displayField: 'fullName'
                },
                {
                    xtype: 'selectfield',
                    label: 'Broken',
                    store: store,
                    valueField: 'id',
                    displayField: 'fullNameFunction'
                }
            ]
        });
    }
});