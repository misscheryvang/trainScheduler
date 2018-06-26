// Initialize Firebase
var config = {
    apiKey: "AIzaSyDp5CTy5P8lEfbMtm_UuSIZlju3JJoCmJ0",
    authDomain: "train-schedule-59090.firebaseapp.com",
    databaseURL: "https://train-schedule-59090.firebaseio.com",
    projectId: "train-schedule-59090",
    storageBucket: "",
    messagingSenderId: "537424771296"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();


$("body").on("click", "#searchButton", function (event) {

    event.preventDefault();

    var train = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var freq = $("#freq").val().trim();

    var timeConverted = moment(firstTrain, "hh:mm A").subtract(10, "years");
    var timeRemains = moment().diff(moment(timeConverted), "minutes") % freq;
    var minutesAway = freq - timeRemains;
    var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm A");

    database.ref().push({
        trainName: train,
        destination: destination,
        firstTrainTime: firstTrain,
        frequency: freq,
        Arrival: nextTrain,
        minutesAway: minutesAway,
    });

    database.ref().on("child_added", function (childSnapshot) {

        var firstTrainName = childSnapshot.val().trainName;
        var Firedest = childSnapshot.val().destination;
        var fireArrival = childSnapshot.val().Arrival;
        var fireFreq = childSnapshot.val().frequency;

        $(".table").append("<tr><td> " + childSnapshot.val().trainName +
            " </td><td> " + childSnapshot.val().destination +
            " </td><td> " + childSnapshot.val().frequency +
            " </td><td> " + childSnapshot.val().Arrival + 
            "</td><td> " + childSnapshot.val().minutesAway + "</td></tr>");
    })

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#freq").val("");

})