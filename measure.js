// ==UserScript==
// @name     01 Mats measure script Exam
// @version  1
// @grant    none
// @include	 http://127.0.0.1:5500/vue.html
// @include http://127.0.0.1:5500/jquery.html
// ==/UserScript==

const bodyEle = document.getElementsByTagName("body")[0];

const configuration = {
    attributes: true,
    childList: true,
    subtree: true
};
var timer1 = 0;
var timer2 = 0;

const callback = (mutationList, listen) => {
    timer1 = Date.now();
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            console.log("Added/removed a child node");
        } else if (mutation.type === "attributes") {
            console.log(`${mutation.attributeName} was modified.`);
        }
    }
    timer2 = Date.now();
    console.log(timer2-timer1);
};

const listen = new Mutationlisten(callback);

listen.observe(bodyEle, configuration);