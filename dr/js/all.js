// 首頁輪撥
$('.dr_big_photo').slick({
  dots: true,
  draggable: true,
  infinite: true,
  touchMove: true,
  useCSS: true,
  arrows: false,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});

// 影音專區
$('.video_box').slick({
  dots: true,
  draggable: true,
  infinite: true,
  touchMove: true,
  useCSS: true,
  arrows: false,
  speed: 3000,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

// 美胸案例
$('.case_box').slick({
  dots: true,
  draggable: true,
  infinite: true,
  touchMove: true,
  useCSS: true,
  arrows: false,
  speed: 5000,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


// 右側下方浮動，置頂按鈕
$(function(){
    $('#BackTop').click(function(){ 
        $('html,body').animate({scrollTop:0}, 333);
    });
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 300 ){
            $('#BackTop').fadeIn(222);
        } else {
            $('#BackTop').stop().fadeOut(222);
        }
    }).scroll();
});

// 繁簡轉換
var defaultEncoding = 1;
var translateDelay = 0;
var cookieDomain = "https://<?php echo $_SERVER['HTTP_HOST'];?>";
var msgToTraditionalChinese = "繁體";
var msgToSimplifiedChinese = "简体";
var translateButtonId = "translateLink1";
translateInitilization();

function enterKey(){
    if (event.keyCode == 13) 
    	location.href='main_search.php?keyword='+$('#search').val();
}

// AOS 轉場動畫設定
AOS.init({
    easing: 'ease-out-back',
    duration: 1500
});

// 數字滾動動畫
$(".num").numScroll({
  time:1300,
});