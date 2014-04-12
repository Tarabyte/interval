interval
========

Crazy extension to Number.prototype that allows to work with time intervals.

```javascript
(5).seconds.later; //returns new Date 5 seconds from now
(1).minute.ago; //returns new Date 1 minute ago
(10).hours.before(someDate); //returns new Date 10 hours before the date specified
(1).day.after(someDate); //returns new Date a day after the date specified

(200).milliseconds.delay(callback); //run callback in 200 milliseconds
(1).second.repeat(callback); //run callback every second
```

To avoid using bracets you can store a number in a variable

```javascript
var fifty = 50;

console.log(fifty.minutes.ago); //logs a Date fifty minutes ago
```
