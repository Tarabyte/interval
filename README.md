interval
========

Crazy Number.prototype extension that allows to work with time intervals.

```javascript
(5).seconds.later; //returns new Date 5 seconds from now
1..minute.ago; //returns new Date 1 minute ago
10..hours.before(someDate); //returns new Date 10 hours before the date specified
(1).day.after(someDate); //returns new Date a day after the date specified

200..milliseconds.delay(callback); //run callback in 200 milliseconds
(1).second.repeat(callback); //run callback every second
```

To avoid using parentheses or double dots you can store a number in a variable:

```javascript
var fifty = 50;

console.log(fifty.minutes.ago); //logs a Date fifty minutes ago
```

If you want to get the raw value in milliseconds you can use unary plus or any other method calling `valueOf`

```javascript
console.log(+12.5.minutes); //750000
```
