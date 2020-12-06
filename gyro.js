
var dataContainerOrientation = document.getElementById('dataContainerOrientation');
var ball = document.getElementById("ball");
var garden = document.getElementById("garden")

var maxX = garden.clientWidth * 2 - ball.clientWidth;
var maxY = garden.clientHeight * 2- ball.clientHeight;

function gyroInit() {
    //Find out Div Element
    window.addEventListener("deviceorientation", handleOrientation, true);
    console.log("add el");
    // dataContainerOrientation.innerHTML = "test";	

    window.addEventListener('devicemotion', function(event) {
        console.log(event.acceleration.x + ' m/s2');
        // dataContainerOrientation.innerHTML = "1 " + event.acceleration.x;	
    });
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
    if (window.DeviceOrientationEvent) {
        dataContainerOrientation.innerHTML = "DeviceOrientation is supported";
       } else if (window.OrientationEvent) {
        dataContainerOrientation.innerHTML = ("MozOrientation is supported";
       }
       
}