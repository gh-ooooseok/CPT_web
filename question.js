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
// const docRef = firestore.doc("questionList/1");

const notice = document.querySelector("#title");
const inputField = document.querySelector("#inputField");
const sendButton = document.querySelector("#sendButton");
const output = document.querySelector("#questionText");

var curPPT = null;


sendButton.addEventListener("click", function() {
    if(curPPT == null) return;
    
    const textToSave = inputField.value;
    console.log("Saving " + textToSave + " to firestore");
    inputField.value = "";
    
    var time = new Date().getTime(); 
    const docRef  = firestore.collection(curPPT).doc('audience').collection('questions').doc(time+"");

    docRef.set({
        question : textToSave
    }).then(function() {
        console.log("Data saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});


getRealtimeUpdates = function() {
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

getCurPPTName = function() {
    const ref  = firestore.collection('Main').doc('CurPPT');

    ref.onSnapshot(function(doc) {
        curPPT = doc.data().Name;
        console.log(curPPT);
        if(curPPT) { 
            notice.innerHTML = "무엇이든 질문해주세요.";
            inputField.disabled = false;
            sendButton.disabled = false;
            document.getElementById("listTitle").innerHTML = " - 질문 목록 - ";
            getRealtimeUpdates();
        }
        else {
            notice.innerHTML = "진행 중인 발표가 없습니다.";
            inputField.disabled = true;
            sendButton.disabled = true;
            document.getElementById("listTitle").innerHTML = "";
            document.getElementById("questionList").innerHTML = "";
        }
    });
}

getCurPPTName();

