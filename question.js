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

const inputField = document.querySelector("#inputField");
const sendButton = document.querySelector("#sendButton");

const output = document.querySelector("#questionText");


sendButton.addEventListener("click", function() {
    const textToSave = inputField.value;
    console.log("Saving " + textToSave + " to firestore");
    inputField.value = "";
    
    var time = new Date().getTime(); 
    const docRef  = firestore.doc("questionList/" + time);

    docRef.set({
        question : textToSave
    }).then(function() {
        console.log("Data saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });

});


getRealtimeUpdates = function() {
    const ref  = firestore.collection('questionList');

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
getRealtimeUpdates();


