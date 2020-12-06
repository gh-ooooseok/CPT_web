
var dataContainerOrientation = document.getElementById('dataContainerOrientation');
var dataContainerMotion = document.getElementById('dataContainerMotion');
var ball = document.getElementById("ball");
var garden = document.getElementById("garden")

var maxX = garden.clientWidth * 2 - ball.clientWidth;
var maxY = garden.clientHeight * 2- ball.clientHeight;

function gyroInit() {
    //Find out Div Element
    window.addEventListener("deviceorientation", handleOrientation, true);
    console.log("add el");
    var html =  "test";
}

function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;
    // Do stuff with the new orientation data
    console.log(gamma);
    var html =  "absolute: " +absolute+ "<br>alpha: " +alpha+ "<br>bata: " +beta+ "<br>gamma: "+ gamma; 
    dataContainerOrientation.innerHTML = html;	

    //볼을 움직이자.
    if(beta > 90) {beta = 90};
    if(beta < -90) {beta = -90};
    beta +90;
    gamma +90;

    ball.style.top = (maxX*beta/180 + 100) + "px";
    ball.style.left = (maxY*gamma/180 + 100) + "px";
}

window.onload = function () {
    gyroInit();
}