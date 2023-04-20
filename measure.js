// ==UserScript==
// @name     01 Mats measure script Exam
// @version  1
// @grant    none
// @include	 http://127.0.0.1:5500/v09vue.html
// @include http://127.0.0.1:5500/j05jquery.html
// ==/UserScript==


var counter = 0;
var timer2;
var timer1;

document.addEventListener('DOMContentLoaded', function (event) {
    timer1 = Date.now();
    console.log("Sidan har laddats");
    if (counter < 3) {
        timeMeasure();
    }
});

function timeMeasure() {
    if (counter > 0) {
        console.log(timer1);
        console.log(timer2);
        console.log(timer1 - timer2);
    }

    timer2 = Date.now();
    counter++;
    // XXXXXXXXXXXX EVERYTHING BELOW THIS COMMENT WILL BE MEASURED XXXXXXXXXXXX
    document.getElementById("buttonSetTwo").click();
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
}

timeMeasure();
