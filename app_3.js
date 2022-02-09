$(document).ready(function(){
    console.log('sddg')
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
    var pos_x = 0
    var pos_y = 0
    var ori_x = 0
    var ori_y = 0
    $(document).bind('touchmove', function(e) {
    });

    $(document).bind('touchmove mousemove', function (e) {

        currentY = e.originalEvent.touches ?  e.originalEvent.touches[0].pageY : e.pageY;
        currentX = e.originalEvent.touches ?  e.originalEvent.touches[0].pageX : e.pageX;



    });


    function onFirebaseReady() {
    $(document).bind('touchstart', function (e) {
    $('.img').removeClass('smooth')

        pos_x = e.originalEvent.touches[0].pageX
        pos_y = e.originalEvent.touches[0].pageY
        ori_x = pos_x
        ori_y = pos_y

    });
    $(document).bind('touchmove', function (e) {
        e.preventDefault();

        pos_x = e.originalEvent.touches[0].pageX
        pos_y = e.originalEvent.touches[0].pageY

            setFirebaseValues({
                posx_3d : pos_x - ori_x,
                posy_3d : pos_y - ori_y
            });
    });
window.addEventListener('touchend',function(event) {
    $('.img').addClass('smooth')
            setFirebaseValues({
                posx_3d : 0,
                posy_3d : 0
            });
},false);

    }
    function firebaseValueChangeHandler(values) {
        if($('body').hasClass('left')){
            $('.img').css({'transform': 'scale(3.05) translateX(-55vw) translateY(-70vw) translateY('+(values.posy_3d)+'px) translateX('+(values.posx_3d)+'px) rotate(0deg)'})
        }
        if($('body').hasClass('right')){
            $('.img').css({'transform': 'scale(2.7) translateX(96vw) translateY(-95vw) translateX('+(-1*values.posy_3d)+'px) translateY('+(values.posx_3d)+'px) rotate(90deg)'})
        }
        if($('body').hasClass('top')){
            $('.img').css({'transform': 'scale(-3.05) translateX(-120vw) translateY(-35vw) translateY('+(values.posy_3d)+'px) translateX('+(values.posx_3d)+'px) rotate(0deg)'})
        }
    }