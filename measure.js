// ==UserScript==
// @name         jQuery & Vue measure script 200 items
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Measure load and rendertime
// @author       Mats Läth
// @match        http://127.0.0.1:5500/jquery200.html
// @match        http://127.0.0.1:5500/jquery200.html?dataset=datasetOne200
// @match        http://127.0.0.1:5500/jquery200.html?dataset=datasetTwo200
// @match        http://127.0.0.1:5500/vue200.html
// @match        http://127.0.0.1:5500/vue200.html?dataset=datasetOne200
// @match        http://127.0.0.1:5500/vue200.html?dataset=datasetTwo200
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==

addEventListener("load", (event) => {
    var timeAfterLoaded = Date.now();
    
    if (localStorage.getItem("readyToRun") == null) {
        var amountOfMeasurements = 1000;
        var counter;
        var datasetOneButtonEle = document.getElementById("buttonSetOne");
        var datasetTwoButtonEle = document.getElementById("buttonSetTwo");
        if (window.location.href.search("jquery") == -1) {
            var activeFrameWork = "Vue";
        } else {
            var activeFrameWork = "jQuery";
        }

        counterHandler();
        calculateMeasuredRound();
        startMeasureRound();

        function counterHandler() {
            if (localStorage.getItem("counter") == null) {
                localStorage.setItem("counter", 0);
                counter = 0;
            } else {
                counter = parseInt(localStorage.getItem("counter"));
            }
        }

        function calculateMeasuredRound() {
            if (counter > 0) {
                timeThisRound = timeAfterLoaded - parseInt(localStorage.getItem("timeStartLoading" + activeFrameWork + counter));
                localStorage.setItem(activeFrameWork + "TimeRound" + counter, timeThisRound);
            }
        }

        function startMeasureRound() {
            if (counter < amountOfMeasurements) {
                if (window.location.href == "http://127.0.0.1:5500/jquery200.html" || window.location.href == "http://127.0.0.1:5500/vue200.html" || window.location.href == "http://127.0.0.1:5500/jquery200.html?dataset=datasetOne200" ||window.location.href == "http://127.0.0.1:5500/vue200.html?dataset=datasetOne200") {
                    counter++
                    localStorage.setItem("counter", counter);
                    localStorage.setItem("timeStartLoading" + activeFrameWork + counter, Date.now());
                    datasetTwoButtonEle.click();
                } else {
                    counter++
                    localStorage.setItem("counter", counter);
                    localStorage.setItem("timeStartLoading" + activeFrameWork + counter, Date.now());
                    datasetOneButtonEle.click();
                }
            } else {
                if (window.location.href.search("jquery") == -1) {
                    createTextFile();
                } else {
                    localStorage.setItem("counter", 0);
                    alert("Stäng ner webbläsaren, starta om datorn och kör Vue.");
                }
            }
        }

        function createTextFile() {
            localStorage.setItem("readyToRun", "no");
            var jQueryAverage = 0;
            var vueAverage = 0;
            /* // Human readable
            let measurePoints = "jQuery      Vue\n";
            for (let i = 1; i < amountOfMeasurements + 1; i++) {
                measurePoints += localStorage.getItem("jQueryTimeRound" + i) + "         " + localStorage.getItem("VueTimeRound" + i) + "\n";
                jQueryAverage += parseInt(localStorage.getItem("jQueryTimeRound" + i));
                vueAverage += parseInt(localStorage.getItem("VueTimeRound" + i));
            }
            var writeToFile = "Average:     Average:\n" + (jQueryAverage / amountOfMeasurements) + "        "  + (vueAverage / amountOfMeasurements) + "\n" + measurePoints; */
            // For Python
            let measurePoints = "";
            for (let i = 1; i < amountOfMeasurements + 1; i++) {
                measurePoints += localStorage.getItem("jQueryTimeRound" + i) + "," + localStorage.getItem("VueTimeRound" + i) + "\n";
            }
            const blob = new Blob([measurePoints], {type: "text/plain"});
            const fileUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = amountOfMeasurements + "MeasurementsjQueryVue";
            link.href = fileUrl;
            link.click();
        }
    }
});