$(document).ready(function(){
    onLoadFinish()
})
function onLoadFinish() {
    console.log('onLoadFinish');
const firebaseConfig = {

    apiKey: "AIzaSyD6VDp-claJ8dGapcaBU6srl203H5NZvYc",
  authDomain: "customellow-16c19.firebaseapp.com",
  projectId: "customellow-16c19",
  storageBucket: "customellow-16c19.appspot.com",
  messagingSenderId: "216655320866",
  appId: "1:216655320866:web:31117b30933646689c377b",
  databaseURL: "https://customellow-16c19-default-rtdb.firebaseio.com/",
  measurementId: "G-WW4LDYJY3M"
};
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    window.setFirebaseValues = function (values) {
        firebase.database().ref('values').update(values);
    };

    firebase.database().ref('values').on('value', function (snapshot) {
        if (typeof window.firebaseValueChangeHandler !== 'function') {
            return;
        }
        window.firebaseValueChangeHandler(snapshot.val());
    }); // ready to go

    if (typeof window.onFirebaseReady === 'function') {
        window.onFirebaseReady();
    } // empty value change queue


    window.firebaseSetValuesQueue.forEach(function (values) {
        window.setFirebaseValues(values);
    });
    window.firebaseSetValuesQueue = [];
} // start loading firebase scripts

var w = window.innerWidth
var h = window.innerHeight
var timeout
var posy = 0
var counter = 0
        $(document).bind('touchmove', function(e) {
            posx = e.originalEvent.touches[0].pageX
            posy = e.originalEvent.touches[0].pageY
        });

        function onFirebaseReady() {
                $(document).bind('touchmove mousemove', function (e) {

                       e.preventDefault();
                        var currentY = e.originalEvent.touches ?  e.originalEvent.touches[0].pageY : e.pageY;
                        var currentX = e.originalEvent.touches ?  e.originalEvent.touches[0].pageX : e.pageX;
                        setFirebaseValues({
                            posx : currentY,
                            posy : currentX
                        });

                     
                     
                 });

        }
            function firebaseValueChangeHandler(values) {
                     $('.follower').css({
                         top: values.posy - 50,
                         left: values.posx - 50
                     });
            }