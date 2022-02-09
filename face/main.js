
$('document').ready(function(){
    currentcorner = -1;

    var win_w = window.innerWidth
    var win_h = window.innerHeight
    var counter = 10
    var init = true

    width_array = [5.33, 3.46, 1.62, 5.75, 2.22, 6.7, 1.62, 5.4, 1.45, 1.98]
    height_array = [7.2, 3.77, 3.49, 3.28, 8.57, 2.54, 5.54, 5.72, 5.29]

    corners = [100, 100, 300, 100, 100, 300, 300, 300];
    corner_array =  Array(10)
    for (var i = corner_array.length - 1; i >= 0; i--) {
        corner_array[i] = Array(9)
        for (var j = corner_array[i].length - 1; j >= 0; j--) {
            corner_array[i][j] = Array(8)
        }
    }


            for (var i = width_array.length - 1; i >= 0; i--) {
                // $('.img_x_'+i).css({'width':get_width(i)+'px'})
                // $('.img_x_'+i).css({'left':get_left(i)+'px'})
                for (var k = corner_array[i].length - 1; k >= 0; k--) {
                    corner_array[i][k][0] = get_left(i)
                    corner_array[i][k][2] = get_left(i) + get_width(i)
                    corner_array[i][k][4] = get_left(i)
                    corner_array[i][k][6] = get_left(i) + get_width(i)
                    if(k == 0 && i == 0){
                        for (var l = height_array.length - 1; l >= 0; l--) {
                            // $('.img_y_'+l).css({'height':get_height(l)+'px'})
                            // $('.img_y_'+l).css({'top':get_top(l)+'px'})
                            for (var m = corner_array.length - 1; m >= 0; m--) {
                                corner_array[m][l][1] = get_top(l)
                                corner_array[m][l][3] = get_top(l)
                                corner_array[m][l][5] = get_top(l) + get_height(l)
                                corner_array[m][l][7] = get_top(l) + get_height(l)
                                            console.log(l)
                                            console.log(m)
                                if(l==0 && m == 0){
                                            console.log(corner_array.length)
                                    for (var a = corner_array.length - 1; a >= 0; a--) {
                                            console.log( corner_array[a].length)
                                        for (var b = corner_array[a].length - 1; b >= 0; b--) {
                                            transform2d(a,b);
                                            // console.log('hey')
                                        }
                                    }
                                }
                            }
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
    var selected_x = 0
    var selected_y = 0
    var selected = null
    var selected_ori_x = null
    var selected_ori_y = null
    var selected_width = 0
    var selected_height = 0
    $('.img').bind('touchstart', function(e) {
        selected_x = parseInt($(this).attr('class').split('img_x_')[1].split(' ')[0])
        selected_y = parseInt($(this).attr('class').split('img_y_')[1].split(' ')[0])
        selected = $(this)
        selected_ori_x = corner_array[selected_x][selected_y][0]
        selected_ori_y = corner_array[selected_x][selected_y][1]
        selected_width = corner_array[selected_x][selected_y][2]-corner_array[selected_x][selected_y][0]
        selected_height = corner_array[selected_x][selected_y][5]-corner_array[selected_x][selected_y][1]
    })
    $(document).bind('touchmove', function(e) {
        init = false
        console.log('fk')
        e.preventDefault();

        pos_x = e.originalEvent.touches[0].pageX
        pos_y = e.originalEvent.touches[0].pageY
        dis_x = pos_x - ori_x
        dis_y = pos_y - ori_y

        // selected.css({'left':selected_ori_x+dis_x+'px'})
        // selected.css({'top':selected_ori_y+dis_y+'px'})

        var x_1 = selected_ori_x+dis_x
        var x_2 = selected_ori_x+dis_x + selected_width
        var y_1 = selected_ori_y+dis_y
        var y_2 = selected_ori_y+dis_y +selected_height

        corner_array[selected_x-1][selected_y-1][6] = x_1
        corner_array[selected_x-1][selected_y-1][7] = y_1
        corner_array[selected_x+0][selected_y-1][4] = x_1
        corner_array[selected_x+0][selected_y-1][5] = y_1
        corner_array[selected_x-1][selected_y-0][2] = x_1
        corner_array[selected_x-1][selected_y-0][3] = y_1

        corner_array[selected_x+0][selected_y-1][6] = x_2
        corner_array[selected_x+0][selected_y-1][7] = y_1
        corner_array[selected_x+1][selected_y-1][4] = x_2
        corner_array[selected_x+1][selected_y-1][5] = y_1
        corner_array[selected_x+1][selected_y-0][0] = x_2
        corner_array[selected_x+1][selected_y-0][1] = y_1


        corner_array[selected_x-1][selected_y-0][6] = x_1
        corner_array[selected_x-1][selected_y-0][7] = y_2
        corner_array[selected_x-1][selected_y+1][2] = x_1
        corner_array[selected_x-1][selected_y+1][3] = y_2
        corner_array[selected_x+0][selected_y+1][0] = x_1
        corner_array[selected_x+0][selected_y+1][1] = y_2


        corner_array[selected_x+1][selected_y-0][4] = x_2
        corner_array[selected_x+1][selected_y-0][5] = y_2
        corner_array[selected_x+0][selected_y+1][2] = x_2
        corner_array[selected_x+0][selected_y+1][3] = y_2
        corner_array[selected_x+1][selected_y+1][0] = x_2
        corner_array[selected_x+1][selected_y+1][1] = y_2

        corner_array[selected_x+0][selected_y-0][0] = x_1
        corner_array[selected_x+0][selected_y-0][1] = y_1
        corner_array[selected_x+0][selected_y-0][2] = x_2
        corner_array[selected_x+0][selected_y-0][3] = y_1
        corner_array[selected_x+0][selected_y-0][4] = x_1
        corner_array[selected_x+0][selected_y-0][5] = y_2
        corner_array[selected_x+0][selected_y-0][6] = x_2
        corner_array[selected_x+0][selected_y-0][7] = y_2
        transform2d(selected_x-1,selected_y-1);
        transform2d(selected_x-1,selected_y-0);
        transform2d(selected_x-1,selected_y+1);
        transform2d(selected_x-0,selected_y-1);
        transform2d(selected_x-0,selected_y-0);
        transform2d(selected_x-0,selected_y+1);
        transform2d(selected_x+1,selected_y-1);
        transform2d(selected_x+1,selected_y-0);
        transform2d(selected_x+1,selected_y+1);

    });

    $(document).bind('touchmove mousemove', function (e) {

        currentY = e.originalEvent.touches ?  e.originalEvent.touches[0].pageY : e.pageY;
        currentX = e.originalEvent.touches ?  e.originalEvent.touches[0].pageX : e.pageX;



    });



    $(document).bind('touchstart', function (e) {

        pos_x = e.originalEvent.touches[0].pageX
        pos_y = e.originalEvent.touches[0].pageY
        ori_x = pos_x
        ori_y = pos_y

    });



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
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
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