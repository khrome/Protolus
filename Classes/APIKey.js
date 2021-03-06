new Class({
    Extends : Data,
    initialize : function(options){
        if(typeOf(options) == 'string') options = {key:options};
        if(!options) options = {};
        options.datasource = 'database';
        options.name = 'api_key';
        this.fields = [
            'key',
            'name',
            'secret',
            'contact'
        ];
        this.primaryKey = 'key';
        this.parent(options);
        if(options.key) this.load(options.key);
    }
});

