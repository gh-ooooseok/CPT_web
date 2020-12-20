

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

