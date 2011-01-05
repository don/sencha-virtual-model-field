# Virtual Fields in Sencha Models

I wanted to display a user's full name in a [Sencha Touch Select](http://dev.sencha.com/deploy/touch/docs/?class=Ext.form.Select) control.  I figured this would be as easy as defining a template for the control.

    // this doesn't work
    {
        xtype: 'selectfield',
        label: 'Name',
        store: store,
        valueField: 'id',
        tpl: '{firstName} {lastName}'
    }

Unfortunately, that didn't work.

Next I decided to create a fullName() function my model.

    Ext.regModel('Person', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'firstName', type: 'string'},
            {name: 'lastName', type: 'string'}
        ],
        fullName: function() {
            return this.data.firstName + " " + this.data.lastName;
        }
    });

The function worked great, but not in the Select control.  Select#displayField expects a field name and won't call a function.

I needed to create a virtual field in the model.  I couldn't find any documentation for this, but Rich Waters offered a solution via the Sencha Touch Forums.

    Ext.regModel('Person', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'firstName', type: 'string'},
            {name: 'lastName', type: 'string'},
            {name: 'fullName', type: 'string',
                convert: function(v, rec) {
                    return rec.data.firstName + " " + rec.data.lastName;
                }
            }
        ]
    });

Once the virtual model field was created, I could use it in the select control.

    {
        xtype: 'selectfield',
        label: 'Name',
        store: store,
        valueField: 'id',
        displayField: 'fullName'
    }

For a full example see http://github.com/don/sencha-virtual-model-field
