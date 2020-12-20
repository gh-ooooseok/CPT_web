const CurPPTRef = firestore.collection('Main').doc('CurPPT');
const ControlInputRef = firestore.collection('Main').doc('ControlInput');
const FocusOnPresenterRef = firestore.collection('Main').doc('FocusOnPresenter');
const permsButton = document.querySelector("#permsButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

var mModestate;
var alpha;
var beta;
var gamma;
var notchSide = null;

// write firebase
prevButton.addEventListener("click", function() {
    setControlInput("prevPage");
});

nextButton.addEventListener("click", function() {
    setControlInput("nextPage");
});

function setControlInput(input) {
    console.log("Saving " + input + " to firestore");
    ControlInputRef.set({
        cmd : input
    }).then(function() {
        console.log("Data saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
}


// read firebase

addCurNameListener();
addCurNameListener = function() {
    CurPPTRef.onSnapshot(function(doc) {
        curPPT = doc.data().Name;
        console.log(curPPT);

        if(curPPT) { 
            // presentation is started
            nextButton.disabled = false;
            prevButton.disabled = false;
            document.getElementById("listTitle").innerHTML = " - 질문 목록 - ";
            addQuestionsListener();
        }
        else {
            // no presentaion
            nextButton.disabled = true;
            prevButton.disabled = true;
            document.getElementById("listTitle").innerHTML = "";
            document.getElementById("questionList").innerHTML = "";
        }
    });
}

addQuestionsListener = function() {
    const ref  = firestore.collection(curPPT).doc('audience').collection('questions');

    ref.onSnapshot(function(snapshot) {
        if (snapshot.empty) {
            console.log('No data.');
            return;
        }

        // show all questions
        document.getElementById("questionList").innerHTML = "";
        snapshot.forEach(function (doc) {
            let docs = doc.data();
            for(let i in docs) {
                console.log(docs[i]+'.\n');

                const newQuestion = document.createElement("div");
                newQuestion.innerHTML = "<div class = 'question'> Q : " + docs[i] + "<div>";
                document.getElementById("questionList").prepend(newQuestion);
            }
        });
    });
}

addFocusOnPresenterListener();
addFocusOnPresenterListener = function() {
    FocusOnPresenterRef.onSnapshot(function(doc) {
        modeState = doc.data().State;
        console.log(modeState);
        updateModeState(modeState);
    });
}

function updateModeState(s) {
    mModestate = s;
    if (notchSide != null) {
        permsButton.innerHTML = "Focus On Me Mode : " + modeState;
    }
}



// gyro function

permsButton.addEventListener("click", function() {

    var UserAgent = String( navigator.platform ).toLowerCase();
	if (/iphone|ipad|macintel/.test(UserAgent)) {
        // activate gyro
        getAccel();
        permsButton.innerHTML = "Focus On Me Mode : " + modeState;
        permsButton.disabled = true;
	} else {
        alert("This feature is only working on iOS 14+ iPhone, iPad.\nCurrent device : " + UserAgent);
		return;
    }
});

function getAccel(){
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
            console.log("accelerometer permission granted");
            window.addEventListener("deviceorientation", handleOrientation);
        }
    });
}

function handleOrientation(event) {
    alpha = event.alpha;
    beta = event.beta;
    gamma = event.gamma;

    if(notchSide == null) {
        if(gamma > 0) notchSide = 'right';
        else notchSide = 'left';
    }

    if (gamma > 0 && notchSide == 'right' && mModestate == 'on') { 
        uploadModeState("off");
    } else if (gamma < 0 && notchSide == 'right' && mModestate == 'off') {
        uploadModeState("on");
    } else if (gamma > 0 && notchSide == 'left' && mModestate == 'off') { 
        uploadModeState("on");
    } else if (gamma < 0 && notchSide == 'left' && mModestate == 'on') {
        uploadModeState("off");
    }
}

function uploadModeState(state) {
    FocusOnPresenterRef.set({
        State : state
    }).then(function() {
        console.log("Data saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
}
