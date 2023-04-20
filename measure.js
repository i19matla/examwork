// ==UserScript==
// @name     02 Automatic jQuery Mats measure script jQuery Exam
// @version  1
// @grant    none
// @match http://127.0.0.1:5500/vue.html
// @match http://127.0.0.1:5500/jquery.html
// @description Render time script
// ==/UserScript==


const bodyEle = document.getElementsByTagName("body")[0];

const configuration = {
    attributes: true,
    childList: true,
    subtree: true
};
var tamperTimer1 = 0;
var tamperTimer2 = 0;
var tamperTimeTotal = 0;
var tamperCounter = 0;
var nodesChanged;
let indexa = 0;

const callback = (mutationList, listen) => {
    tamperTimer1 = Date.now();
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            //console.log("Added/removed a child node");
            //console.log(mutation.addedNodes[0]);
            //console.log(mutation.removedNodes[0]);
            console.log("xxxxxxxxxxxxxxxRemovedxxxxxxxxxxxxxxxxxxxxx" + mutation.removedNodes.forEach(node => nodesChanged = node));
            console.log(mutation.addedNodes.forEach(node => nodesChanged = node));
        } else if (mutation.type === "attributes") {
            console.log(`The ${mutation.attributeName} attribute was modified.`);
        }
    }
    tamperTimer2 = Date.now();
    tamperTimeTotal += tamperTimer2-tamperTimer1;
   // console.log("XXXXXXXXXXXXXXXXXX   Tiden " + tamperTimeTotal);
   // console.log(tamperCounter);
    tamperCounter++;
    if (tamperCounter > 0) {
        tamperTimeTotal = 0;
        tamperCounter = 0;
    }
};

const listen = new Mutationlisten(callback);

listen.observe(bodyEle, configuration);
