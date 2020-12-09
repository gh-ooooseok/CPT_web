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
const docRef = firestore.doc("controlInput/lastCmd");

const dimButton = document.querySelector("#dimButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

dimButton.addEventListener("mousedown", function() {
    console.log("Saving " + "dimMode : On" + " to firestore");
    firestore.doc("controlInput/dimMode").set({
        mode : "on"
    }).then(function() {
        console.log("Data saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});

dimButton.addEventListener("mouseup", function() {
    console.log("Saving " + "dimMode : Off" + " to firestore");
    firestore.doc("controlInput/dimMode").set({
        mode : "off"
    }).then(function() {
        console.log("Data saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});


prevButton.addEventListener("click", function() {
    const textToSave = "prevPage";
    console.log("Saving " + textToSave + " to firestore");
    docRef.set({
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
    docRef.set({
        cmd : textToSave
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