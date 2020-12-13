// connect to firebase
var firebaseConfig = {
    apiKey: "AIzaSyBZExEUTtP9SvWQVYEzJzMRnyXs8IPvfr8",
    authDomain: "id430-cpt-firestore.firebaseapp.com",
    databaseURL: "https://id430-cpt-firestore.firebaseio.com",
    projectId: "id430-cpt-firestore",
    storageBucket: "id430-cpt-firestore.appspot.com",
    messagingSenderId: "298453501935",
    appId: "1:298453501935:web:38383e46040adab182181a"
};

firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
const CurPPTRef = firestore.collection('Main').doc('CurPPT');
const ControlInputRef = firestore.collection('Main').doc('ControlInput');
const FocusOnPresenterRef = firestore.collection('Main').doc('FocusOnPresenter');
const dimButton = document.querySelector("#dimButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const permsButton = document.querySelector("#accelPermsButton");
var mModestate;



dimButton.addEventListener("click", function() {
    if (mModestate == "off") { 
        uploadModeState("on");
    } else {
        uploadModeState("off");
    }
});

prevButton.addEventListener("click", function() {
    const textToSave = "prevPage";
    console.log("Saving " + textToSave + " to firestore");
    ControlInputRef.set({
        cmd : textToSave
    }).then(function() {
        console.log("Data saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});

nextButton.addEventListener("click", function() {
    const textToSave = "nextPage";
    console.log("Saving " + textToSave + " to firestore");
    ControlInputRef.set({
        cmd : textToSave
    }).then(function() {
        console.log("Data saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});

permsButton.addEventListener("click", function() {
    getAccel();
});




addQuestionsListener = function() {
    const ref  = firestore.collection(curPPT).doc('audience').collection('questions');

    ref.onSnapshot(function(snapshot) {
        if(snapshot.empty) {
            console.log('No data.');
            return;
        }

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

addCurNameListener = function() {
    CurPPTRef.onSnapshot(function(doc) {
        curPPT = doc.data().Name;
        console.log(curPPT);
        if(curPPT) { 
            nextButton.disabled = false;
            prevButton.disabled = false;
            document.getElementById("listTitle").innerHTML = " - 질문 목록 - ";
            addQuestionsListener();
        }
        else {
            nextButton.disabled = true;
            prevButton.disabled = true;
            document.getElementById("listTitle").innerHTML = "";
            document.getElementById("questionList").innerHTML = "";
        }
    });
}

addFocusOnPresenterListener = function() {
    FocusOnPresenterRef.onSnapshot(function(doc) {
        modeState = doc.data().State;
        console.log(modeState);
        updateModeState(modeState);
    });
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

function updateModeState(s) {
    mModestate = s;
}

addCurNameListener();
addFocusOnPresenterListener();







// gyro function

function getAccel(){
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
            console.log("accelerometer permission granted");
            window.addEventListener("deviceorientation", handleOrientation);
        }
    });
}

function handleOrientation(event) {
    const alpha = event.alpha,
        beta = event.beta,
        gamma = event.gamma;
    if (!beta) {
        addMouseEvent()
    }

    if (beta < 0) { 
        uploadModeState("on");
    } else {
        uploadModeState("off");
    }
    // document.getElementById("alpha").innerText = "a : " + alpha;
    // document.getElementById("beta").innerText = "b : " + beta;
    // document.getElementById("gamma").innerText = "c : " + gamma;
}