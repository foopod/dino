var tired = 50,
    hunger = 50,
    happiness = 50,
    age = 0.0;
var lastPlay = new Date().getTime();

// localStorage.setItem("tired", tired);
// localStorage.setItem("hunger", hunger);
// localStorage.setItem("happiness", happiness);
// localStorage.setItem("lastPlay", lastPlay);
// localStorage.setItem("age", age);


var fun = setInterval(load, 1);


function load() {
    var temp = null;
    temp = localStorage.getItem("tired");
    if (temp != null) {
        tired = parseFloat(temp);
    }
    temp = localStorage.getItem("hunger");
    if (temp != null) {
        hunger = parseFloat(temp);
    }
    temp = localStorage.getItem("happiness");
    if (temp != null) {
        happiness = parseFloat(temp);
    }
    temp = localStorage.getItem("age");
    if (temp != null) {
        age = parseFloat(temp);
    }
    temp = localStorage.getItem("lastPlay");
    if (temp != null) {
        lastPlay = parseFloat(temp);
        var difference = new Date().getTime() - lastPlay;
        if (difference / 10000 > 1) {
            for (var i = 0; i < difference / 10000; i++) {
                tired--;
                hunger - 2;
                happiness--;
                if (tired > 25 && hunger > 25 && happiness > 25) {
                    age += 0.01;
                }
            }
        }
        if (tired < 0) {
            tired = 0;
        }
        if (hunger < 0) {
            hunger = 0;
        }
        if (happiness < 0) {
            happiness = 0;
        }
    } else {
        localStorage.setItem("age", age);
        localStorage.setItem("lastPlay", lastPlay);
    }
}

var fps = 10;
var oldTired = tired.toFixed(0),
    oldHunger = hunger.toFixed(0),
    oldHappiness = happiness.toFixed(0);
var firstRun = true;

function run() {
    if (firstRun) {
        document.getElementById('tiredStat').innerHTML = imageBar(tired.toFixed(0));
        document.getElementById('hungerStat').innerHTML = imageBar(hunger.toFixed(0));
        document.getElementById('happinessStat').innerHTML = imageBar(happiness.toFixed(0));
        firstRun = false;
    }
    if (oldTired != tired.toFixed(0)) {
        document.getElementById('tiredStat').innerHTML = imageBar(tired.toFixed(0));
        oldTired = tired.toFixed(0);
    }
    if (oldHunger != hunger.toFixed(0)) {
        document.getElementById('hungerStat').innerHTML = imageBar(hunger.toFixed(0));
        oldHunger = hunger.toFixed(0);
    }
    if (oldHappiness != happiness.toFixed(0)) {
        document.getElementById('happinessStat').innerHTML = imageBar(happiness.toFixed(0));
        oldHappiness = happiness.toFixed(0);
    }
    // document.getElementById('tiredStat').innerHTML=tired.toFixed(0);
    // document.getElementById('hungerStat').innerHTML=hunger.toFixed(0);
    // document.getElementById('happinessStat').innerHTML=happiness.toFixed(0);
    document.getElementById('age').innerHTML = "Age : " + age.toFixed(2);
}

// Start the game loop
var intervalId = setInterval(run, 1000 / fps);

function imageBar(num) {
    var imageString = '<img src=';
    if (num > 75) {
        imageString += '"images/green.png" ';
    } else if (num > 50) {
        imageString += '"images/yellow.png" ';
    } else if (num > 25) {
        imageString += '"images/orange.png" ';
    } else {
        imageString += '"images/red.png" ';
    }
    imageString += 'height="' + (num / 100 * 80) + '" width="40">';
    //alert(imageString);
    return imageString;
}

var block = false;

function feed() {
    if (!block) {
        document.mainImage.src = 'images/lildude/eating.gif';
        block = true;
        setTimeout(function () {
            defaultImage();
            block = false;
        }, 2000);
        hunger += 10;
        if (hunger > 100) {
            hunger = 100;
        }
        localStorage.setItem("hunger", hunger);
        //document.getElementById('hungerStat').innerHTML=hunger;
    }
}

function sleep() {
    if (!block && tired < 75) {
        document.mainImage.src = 'images/lildude/depressed.gif';
        block = true;
        setTimeout(function () {
            tired = 100;
            localStorage.setItem("tired", tired);
            defaultImage();
            block = false;
        }, (100 - tired) * 100);
        //document.getElementById('tiredStat').innerHTML=tired;
    }
}

function play() {
    if (!block) {
        document.mainImage.src = 'images/lildude/dance.gif';
        block = true;
        setTimeout(function () {
            defaultImage();
            block = false;
        }, 2000);
        happiness += 15;
        if (happiness > 100) {
            happiness = 100;
        }
        localStorage.setItem("happiness", happiness);
        //document.getElementById('happinessStat').innerHTML=happiness;
    }
}

function defaultImage() {
    document.mainImage.src = 'images/lildude/looking.gif';
}

setTimeout(function () {
    runLoop();
}, 10000);

function runLoop() {
    tired -= .1;
    hunger -= .2;
    happiness -= .1;
    if (tired > 25 && hunger > 25 && happiness > 25) {
        age += 0.01;
        localStorage.setItem("age", age);
    }

    if (hunger < 0) {
        hunger = 0;
    }
    if (tired < 0) {
        tired = 0;
    }
    if (happiness < 0) {
        happiness = 0;
    }
    localStorage.setItem("tired", tired);
    localStorage.setItem("hunger", hunger);
    localStorage.setItem("happiness", happiness);
    localStorage.setItem("lastPlay", new Date().getTime());

    setTimeout(function () {
        runLoop();
    }, 10000);
}