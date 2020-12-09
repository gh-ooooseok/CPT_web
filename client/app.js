
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


const docRef = firestore.doc("collection/testData");
const outputHeader = document.querySelector("#userOutput");
const inputTextField = document.querySelector("#inputData");
const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", function() {
    const textToSave = inputTextField.value;
    console.log("Saving " + textToSave + " to firestore");
    docRef.set({
        dataTest : textToSave
    }).then(function() {
        console.log("Data saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});

loadButton.addEventListener("click", function() {
    docRef.get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            outputHeader.innerHTML = "data : " + myData.dataTest;
        }
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
}); 

getRealtimeUpdates = function() {
    docRef.onSnapshot(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            outputHeader.innerHTML = "data : " + myData.dataTest;
        }
    });
}

getRealtimeUpdates();
