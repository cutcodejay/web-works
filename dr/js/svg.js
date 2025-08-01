$(document).ready(function() {



//svg
// function dot(width, height, speed) {
//   //Picks a random starting coordinate and speed within the bounds given
//   //在給定的邊界內挑選一個隨機的起始坐標和速度
//   this.x = Math.round(Math.random()*width);
//   this.y = Math.round(Math.random()*height);
//   this.speedX = Math.round(Math.random()*speed-speed/2);
//   this.speedY = Math.random(Math.random()*speed-speed/2);
// }

// function dotGraph() {
//   var maxDistance = 600;
//   var numDots = 30;
  
//   var canvas = document.getElementById("stage");
//   var stage;
//   var about_item4 = $('.about_item4');
//   var width = about_item4.innerWidth;
//   var height = about_item4.innerHeight;
//   var dots = [];
//   var timer;
  
//   var tick = function () {
    
//     //Paints over old frame
//     //塗料在舊框架
//     stage.fillStyle = "#FFFFFF";
//     stage.rect(0, 0, width, height);
//     stage.fill();
    
  
//     var i=0;
//     for (i=0; i<dots.length; i++) {
      
//       //Move dot
//       //移動點
//       dots[i].x+=dots[i].speedX;
//       dots[i].y+=dots[i].speedY;
      
//       //Bounce dot off walls
//       //從牆上反彈
//       if (dots[i].x<0) {
//         dots[i].x=0;
//         dots[i].speedX *= -1;
//       }
//       if (dots[i].x>width) {
//         dots[i].x=width;
//         dots[i].speedX *= -1;
//       }
//       if (dots[i].y<0) {
//         dots[i].y=0;
//         dots[i].speedY *= -1;
//       }
//       if (dots[i].y>height) {
//         dots[i].y=height;
//         dots[i].speedY *= -1;
//       }
      
//       //Draw dot
//       //繪製點
//       stage.beginPath();
//       stage.arc(dots[i].x,dots[i].y,3,0,2*Math.PI);
//       stage.fill();
//     }
    
//     //Calculate distances between every dot
//     //計算每個點之間的距離
//     var distances = [];
//     for (i=0; i<dots.length; i++) {
//       for (var j=i+1; j<dots.length; j++) {
        
//         //Add the line to the draw list if it's shorter than the specified max distance
//         //如果線條長度小於指定的最大距離，則將該線條添加到繪圖列表中
//         var dist = Math.sqrt(Math.pow(dots[i].x-dots[j].x, 2) + Math.pow(dots[i].y-dots[j].y, 2));
//         if (dist <= maxDistance) distances.push([i, j, dist]);
//       }
//     }

//     //Draw the lines
//     //畫線
//     for (i=2; i<distances.length; i++) {
      
//       //The farther the distance of the line, the less opaque it will be drawn
//       //線的距離越遠，它將被繪製得越不透明
//       stage.strokeStyle = "rgba(121, 121, 121, " + (maxDistance-distances[i][2])/maxDistance + ")";
//       stage.beginPath();
//       stage.moveTo(dots[distances[i][0]].x, dots[distances[i][0]].y);
//       stage.lineTo(dots[distances[i][1]].x, dots[distances[i][1]].y);
//       stage.stroke();
//     }
//   };
  
//   var resizeCanvas = function() {
//     width = window.innerWidth;
//     height = window.innerHeight;
//     canvas.width=width;
//     canvas.height=height;
//     console.log(width + ", " + height);
//   };
  
//   window.addEventListener("resize", function () {
//     resizeCanvas();
//   });
  
//   //Maximize and set up canvas
//   resizeCanvas();
//   if (canvas.getContext) {
//     stage = canvas.getContext("2d");
    
//     //Create dots
//     for (var i=0; i<numDots; i++) {
//       dots.push(new dot(width, height, 1));
//     }
    
//     //Set up timed function
//     timer=setInterval(tick, 60);
//   } else {
//     alert("Canvas not supported.");
//   }
// }

// var graph = new dotGraph();




	//svg變顏色
	$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    $.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = $(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }
	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');
	        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }
	        // Replace image with new SVG
	        $img.replaceWith($svg);
	    }, 'xml');
	});

});




//meeting 手機 價格方案用

