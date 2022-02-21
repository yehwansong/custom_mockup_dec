$('document').ready(function(){
    currentcorner = -1;

    var win_w = window.innerWidth
    var win_h = window.innerHeight
    var counter = 10
    var init = true

    width_array = [5.33, 3.46, 1.62, 5.75, 2.22, 6.7, 1.62, 5.4, 1.45, 1.98]
    height_array = [7.2, 3.77, 3.49, 3.28, 8.57, 2.54, 5.54, 5.72, 5.29]

    corner_array =  Array(10)
    for (var i = corner_array.length - 1; i >= 0; i--) {
        corner_array[i] = Array(9)
        for (var j = corner_array[i].length - 1; j >= 0; j--) {
            corner_array[i][j] = Array(8)
        }
    }


            for (var i = width_array.length - 1; i >= 0; i--) {
                $('.img_x_'+i).css({'width':get_width(i)+'px'})
                $('.img_x_'+i).css({'left':get_left(i)+'px'})
                for (var k = corner_array[i].length - 1; k >= 0; k--) {
                    if(k == 0 && i == 0){
                        for (var l = height_array.length - 1; l >= 0; l--) {
                            $('.img_y_'+l).css({'height':get_height(l)+'px'})
                            $('.img_y_'+l).css({'top':get_top(l)+'px'})
                        }
                    }
                }
            }

            // update()
            function get_width(k){
                return width_array[k]/35.53*win_w
            }
            function get_height(k){
                return height_array[k]/35.53*win_w
            }
            function get_left(k){
                if(k>0){
                    var whole = 0
                    for (var i = k-1; i >= 0; i--) {
                        whole = whole + width_array[i]
                        if(i==0){
                            return whole/35.53*win_w
                        }
                    }
                }else{
                    return 0
                }
            }
            function get_top(k){
                if(k>0){
                    var whole = 0
                    for (var i = k-1; i >= 0; i--) {
                        whole = whole + height_array[i]
                        if(i==0){
                            return whole/35.53*win_w
                        }
                    }
                }else{
                    return 0
                }
            }




    var pos_x = 0
    var pos_y = 0
    var ori_x = 0
    var ori_y = 0
    var dis_x = 0
    var dis_y = 0
    var dis_angle = 0
    var selected_x = 0
    var selected_y = 0
    var selected = null
    var selected_ori_x = null
    var selected_ori_y = null
    var selected_width = 0
    var selected_height = 0
    var org_left
    var org_top
    var selectedtouch = false
    $('.img').bind('touchstart', function(e) {
        selected_x = parseInt($(this).attr('class').split('img_x_')[1].split(' ')[0])
        selected_y = parseInt($(this).attr('class').split('img_y_')[1].split(' ')[0])


        if((selected_x == 7 && selected_y ==3)||
            (selected_x == 3 && selected_y ==3)||
            (selected_x == 5 && selected_y ==6)||
            (selected_x == 9 && selected_y ==4)||
            (selected_x == 0 && selected_y ==4)||
            (selected_x == 5 && selected_y ==2)){
            selectedtouch = true
        }else{
            selectedtouch = false
        }
        selected = $(this)
        org_left = selected.offset().left
        org_top = selected.offset().top
    })
    $(document).bind('touchmove', function(e) {
    if(selectedtouch){
        init = false
        e.preventDefault();

        pos_x = e.originalEvent.touches[0].pageX
        pos_y = e.originalEvent.touches[0].pageY
        dis_x = pos_x - ori_x
        dis_y = pos_y - ori_y
        dis_angle = get_angle(pos_x, pos_y, ori_x, ori_y)
        // console.log(dis_x)
        // console.log(dis_y)
        // console.log(dis_angle)

         selected.css({'left':(org_left + dis_x)+'px'})
         selected.css({'top':(org_top + dis_y)+'px'})
         var k1 = -1*(get_angle(
                    get_left(selected_x),
                    get_top(selected_y-1),
                    selected.offset().left,
                    selected.offset().top
                  ) - 90)
        var a = selected.offset().top-get_top(selected_y-1)
        var b = get_height(selected_y-1)


         $('.img_x_'+(selected_x)+'_y_'+(selected_y-1)).css({'transform':'skew('+k1+'deg) scaleY('+a/b+')'})

         var k2 = -1*(get_angle(
                    get_left(selected_x),
                    get_top(selected_y+1)+get_height(selected_y+1),
                    selected.offset().left,
                    selected.offset().top+get_height(selected_y)
                    ) - 90)
         console.log(k2)
        var a = (get_top(selected_y+1)+get_height(selected_y+1)) - (selected.offset().top+get_height(selected_y))
        var b = get_height(selected_y+1)
         $('.img_x_'+(selected_x)+'_y_'+(selected_y+1)).css({'transform-origin':'left bottom'})
         $('.img_x_'+(selected_x)+'_y_'+(selected_y+1)).css({'transform':'skewX('+k2+'deg) scaleY('+a/b+')'})


         var k3 = (get_angle(
                    get_left(selected_x-1),
                    get_top(selected_y),
                    selected.offset().left,
                    selected.offset().top
                    ))
        var a = selected.offset().left-get_left(selected_x-1)
        var b = get_width(selected_x-1)
         $('.img_x_'+(selected_x-1)+'_y_'+(selected_y)).css({'transform':'skewY('+k3+'deg) scaleX('+a/b+')'})


         var k4 =  (get_angle(
                    get_left(selected_x+1)+get_width(selected_x+1),
                    get_top(selected_y),
                    selected.offset().left+get_width(selected_x),
                    selected.offset().top
                    ))
        var a = (get_left(selected_x+1)+get_width(selected_x+1))-(selected.offset().left+selected.outerWidth())
        var b = get_width(selected_x+1)
         $('.img_x_'+(selected_x+1)+'_y_'+(selected_y)).css({'transform-origin':'right top'})
         $('.img_x_'+(selected_x+1)+'_y_'+(selected_y)).css({'transform':'skewY('+k4+'deg) scaleX('+a/b+')'})

    }

    });

    $(document).bind('touchstart', function (e) {

        pos_x = e.originalEvent.touches[0].pageX
        pos_y = e.originalEvent.touches[0].pageY
        ori_x = pos_x
        ori_y = pos_y

    });


    function get_distance(x1,y1,x2,y2){var a = x1 - x2;
var b = y1 - y2;

var c = Math.sqrt( a*a + b*b );}
    function transform2d(x, y) {
        counter++
        var elt = document.getElementsByClassName("img_x_"+(x)+"_y_"+(y))[0];
        $(".img_x_"+(x)+"_y_"+(y)).css({'z-index':counter})
            console.log(init)
        if(!init){
            console.log(init)
                $(".img_x_"+(x)+"_y_"+(y)).css({'opacity':1})}
        var x1 = corner_array[x][y][0]
        var y1 = corner_array[x][y][1]
        var x2 = corner_array[x][y][2]
        var y2 = corner_array[x][y][3]
        var x3 = corner_array[x][y][4]
        var y3 = corner_array[x][y][5]
        var x4 = corner_array[x][y][6]
        var y4 = corner_array[x][y][7]
        if(x1>x2){
            x2 = x1+1
            y2 =  y1+1
                $(".img_x_"+(x)+"_y_"+(y)).css({'z-index':counter-10})
            console.log('hey')}
        if(x3>x4){
            x4 = x3+1
            y4 = y3+1
                $(".img_x_"+(x)+"_y_"+(y)).css({'z-index':counter-10})
            console.log('hey')}
        if(y1>y3){
            y3 = y1+1
            x3 = x1+1
                $(".img_x_"+(x)+"_y_"+(y)).css({'z-index':counter-10})
            console.log('hey')}
        if(y2>y4){
            y4 = y2+1
            x4 = x2+1
                $(".img_x_"+(x)+"_y_"+(y)).css({'z-index':counter-10})
            console.log('hey')}

            if(!intersects(x1, y1, x4, y4, x2, y2, x3, y3)){
                $(".img_x_"+(x)+"_y_"+(y)).css({'z-index':counter-10})
                return false
            }

        var w = elt.offsetWidth, h = elt.offsetHeight;

        var transform = PerspT([0, 0, w, 0, 0, h, w, h], [x1, y1, x2, y2, x3, y3, x4, y4]);
        var t = transform.coeffs;
        t = [t[0], t[3], 0, t[6],
             t[1], t[4], 0, t[7],
             0   , 0   , 1, 0   ,
             t[2], t[5], 0, t[8]];
        t = "matrix3d(" + t.join(", ") + ")";
        elt.style["-webkit-transform"] = t;
        elt.style["-moz-transform"] = t;
        elt.style["-o-transform"] = t;
        elt.style.transform = t;
    }
    function get_angle(x1,y1,x2,y2){
        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    }
    // returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function intersects(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};
})
