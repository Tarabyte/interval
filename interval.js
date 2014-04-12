/*global setTimeout, setInterval*/
~function(number, factory, Date) {
    'use strict';
    'use drugs';
    var $value = '$value',
        apiBuilder = function(multiplier) {
            return function() {
                return new Api(this * multiplier);            
            };
        }, 
        defineProperty = function(obj, name, config) {
            factory.defineProperty(obj, name, config);    
        },
        addProperty = function(name, value) {
            var config = {get: value};
            
            defineProperty(number, name, config); 
            defineProperty(number, name + 's', config);
            return addProperty;
        }, 
        multiplier = 1,
        addApi = function(name, value) {
            defineProperty(Api.prototype, name, {get: value});
            return addApi;
        };
   
    function Api(value) {
        this[$value] = value;    
    }

    addApi('later', function() {
        return this.after(Date.now());    
    })
    ('ago', function() {
        return this.before(Date.now());
    })
    ('before', function() {
        var delta = this[$value];
        return function(from) {
            return new Date(+from - delta);    
        };
    })
    ('after', function() {
        var delta = this[$value];
        return function(from) {
            return new Date(+from + delta);    
        };
    })
    ('delay', function() {
        var delta = this[$value];        
        return function(cb) {
            return setTimeout(cb, delta);    
        };
    })
    ('repeat', function() {
        var delta = this[$value];
        return function(cb) {
            return setInterval(cb, delta);        
        };
    });    
    
    addProperty('millisecond', apiBuilder(multiplier))
                ('second', apiBuilder(multiplier *= 1000))
                ('minute', apiBuilder(multiplier *= 60))
                ('hour', apiBuilder(multiplier *= 60))
                ('day', apiBuilder(multiplier *= 24));    
}(Number.prototype, Object, Date);

