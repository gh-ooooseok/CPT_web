
function gyroInit() {

    //Find out Div Element
    var dataContainerOrientation = document.getElementById('dataContainerOrientation');
    var dataContainerMotion = document.getElementById('dataContainerMotion');
    var ball = document.getElementById("ball");
    var garden = document.getElementById("garden")

    var maxX = garden.clientWidth * 2 - ball.clientWidth;
    var maxY = garden.clientHeight * 2- ball.clientHeight;

    //가속도계가 기기의 방향의 변화를 감지 했을때
    console.log("add el");
    // if(this.isWithoutDeviceMotion) {
    window.addEventListener('deviceorientation', function(event) {
        var absolute = event.absolute;
        var alpha = event.alpha;
        var beta = event.beta; //(-180, 180)
        var gamma = event.gamma; //(-90, 90)
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

    }, true);
    // }

    window.ondevicemotion = function(event) {
        var accelerationX = event.accelerationIncludingGravity.x;
        var accelerationY = event.accelerationIncludingGravity.y;
        var accelerationZ = event.accelerationIncludingGravity.z;
    }
}

window.onload = function () {
    gyroInit();

}