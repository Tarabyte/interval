module('Time'); 

var api = 'second|seconds|millisecond|milliseconds|minutes|minute|hour|hours|day|days'.split('|'), 
    multipliers = {
        second: 1000,
        seconds: 1000,
        millisecond: 1,
        milliseconds: 1,
        minute: 60*1000,
        minutes: 60*1000,
        hour: 60*60*1000,
        hours: 60*60*1000,
        day: 24*60*60*1000,
        days: 24*60*60*1000
};

test('number prototype extension', function(){
    var num = 5;

    api.forEach(function(name) {
        ok(num[name], name + ' should be defined');
    });
});

test('api', function() {
    var num = 500,
        date = new Date(1991, 1, 12, 10, 42, 15, 111),
        isCloseTo = function(what, to, message) {
            ok(Math.abs(what - to) < 10, message);    
        }; 

    api.forEach(function(name) {
        var testing = num[name],
            delta = multipliers[name]*num;

        isCloseTo(+testing.later, +new Date(+Date.now() + delta), name + '.later works');

        isCloseTo(+testing.ago, +new Date(+Date.now() - delta), name + '.ago works');

        isCloseTo(+testing.before(date), +new Date(+date - delta), name + '.before works');
        isCloseTo(+testing.after(date), +new Date(+date + delta), name + '.after works');
        equal(+testing, delta, 'should be convertible to number by unary plus');

    });

});

asyncTest('delay', function() {
    var now = +Date.now(),
        num = 500;
    num.milliseconds.delay(function() {
        ok(Math.abs(+Date.now() - now - num) < 20, 'called with a delay');
        start();
    });
});

asyncTest('repeat', function() {
      var now = +Date.now(),
          num = 1,
          called = 0,
          timer = num.second.repeat(function() {
              called++;
              ok(Math.abs(+Date.now() - now - called*1000) < 20, 'called with a delay');

              if(called == 5) {
                  clearTimeout(timer);
                  start();
              }
          });
});