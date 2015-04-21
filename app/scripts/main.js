/*global require*/
'use strict';

require([
    'app/app'
], function (App) {
    console.log('Hello!');
    var calculator = new App("calculator", "clearID", "screenID", "dotID", "calcID", "number", "operator");
        calculator.init();
        console.log(calculator);
});
