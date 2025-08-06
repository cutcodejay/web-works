
// ================ 點擊按鈕複製email，加入 Bootstrap tooltip

document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(el => {
    new bootstrap.Tooltip(el, { html: true }); // 啟用 HTML 模式
  });
});

async function copyEmail(button) {
  const email = button.getAttribute("data-email");
  const tooltip = bootstrap.Tooltip.getOrCreateInstance(button);

  const defaultText = '點擊複製 Email<br>Click to copy Email';
  const copiedText  = '✅ 已複製！<br>Copied!';
  const failedText  = '❌ 複製失敗<br>Failed to copy';

  const setTooltip = (msg) => {
    if (typeof tooltip.setContent === 'function') {
      tooltip.setContent({ '.tooltip-inner': msg });
    } else {
      button.setAttribute('data-bs-original-title', msg);
    }
  };

  const restoreTooltip = () => setTooltip(defaultText);

  let ok = false;
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch (_) {}
  }
  if (!ok) {
    const ta = document.createElement('textarea');
    ta.value = email;
    ta.style.position = 'fixed';
    ta.style.opacity   = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
    document.body.removeChild(ta);
  }

  setTooltip(ok ? copiedText : failedText);
  tooltip.show();
  setTimeout(() => {
    tooltip.hide();
    restoreTooltip();
  }, 2000);
}

// ================ 移除第一個是●的文字圖型
// // 選擇所有包含文字的元素
// const elements = document.querySelectorAll("p, span, div, li");

// elements.forEach(element => {
//   // 取得元素內的 HTML 內容
//   let htmlContent = element.innerHTML.trim();
//   // 若內容的第一個字是 `●`
//   if (htmlContent.startsWith("●")) {
//     // 移除開頭的 `●`，保留後續內容與 HTML 結構
//     element.innerHTML = htmlContent.substring(1).trim();
//   }
// });

// ================ 獲取當前年份並更新到指定元素(Footer)
  document.getElementById('current-year').textContent = new Date().getFullYear();

// ================ ul li 選單 hover
// $('ul.Ul__Nav--hover > li').click(function (e) {
//   e.preventDefault();
//   $('ul.Ul__Nav--hover > li').removeClass('active');
//   $(this).addClass('active');
// });

document.querySelectorAll('ul.Ul__Nav--hover > li').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('ul.Ul__Nav--hover > li').forEach(li => {
      li.classList.remove('active');
    });
    this.classList.add('active');
  });
});

// ================ head bar 滾動樣式替換
document.addEventListener('DOMContentLoaded', () => {
  window.onscroll = () => myFunction();

  const header = document.getElementById('myHeader');
  const sticky = header.offsetTop;

  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }
});

// ================ 按鈕往下滾動
/* <a class="ct-btn-scroll ct-js-btn-scroll" href="#名稱">圖片</a> */
/* <div id="名稱"></div> */

// $(function(){
//   $("a").on('click', function(event) {
//     if (this.hash !== "") {
//       event.preventDefault();
//       var hash = this.hash;
//       $('html, body').animate({
//         scrollTop: $(hash).offset().top
//       }, 800, function(){
//         window.location.hash = hash;
//       });
//     }
//   });
// });

// ================ 瀑布流式排版
// 網址：https://masonry.desandro.com/
// <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>

// css:
// <style type="text/css">
// .grid-item, .grid-sizer { width: 33%; float: left; display:block; }
// </style>

// html:
// <div class="grid">
//  <div class="grid-sizer"></div>
//  <div class="grid-sizer"></div>
//  <div class="grid-sizer"></div>
// </div>

// $(function(){
//   $('.grid').masonry({
//     itemSelector:'.grid-item',
//     // columnWidth: '.grid-sizer',
//     percentPosition: true,
//   });
// });

// ================ 右側下方浮動，置頂按鈕
// $(function(){
//     $('#BackTop').click(function(){
//         $('html,body').animate({scrollTop:0}, 333);
//     });
//     $(window).scroll(function() {
//         if ( $(this).scrollTop() > 300 ){
//             $('#BackTop').fadeIn(222);
//         } else {
//             $('#BackTop').stop().fadeOut(222);
//         }
//     }).scroll();
// });

document.addEventListener("DOMContentLoaded", () => {
  const backTopButton = document.getElementById('BackTop');

  backTopButton.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  const handleScroll = () => {
      if (window.scrollY > 300) {
          backTopButton.style.display = 'block';
          backTopButton.style.opacity = '1';
          backTopButton.style.transition = 'opacity 0.222s';
      } else {
          backTopButton.style.opacity = '0';
          setTimeout(() => {
              if (window.scrollY <= 300) {
                  backTopButton.style.display = 'none';
              }
          }, 222);
      }
  };

  window.addEventListener('scroll', handleScroll);

  // Initialize the scroll check
  handleScroll();
});


// ================ 繁簡轉換
// <a id="translateLink1" href="javascript:translatePage();">繁體</a>

var defaultEncoding = 1; // 網站編寫字體是否繁體，1-繁體，2-簡體
var translateDelay = 0; // 延遲時間,若不在前, 要設定延遲翻譯時間, 如100表示100ms,預設為0
var cookieDomain = "https://<?php echo $_SERVER['HTTP_HOST'];?>"; // Cookie位址, 一定要設定, 通常為你的網址
var msgToTraditionalChinese = "繁"; // 這裡可以更改為你想要顯示的文字
var msgToSimplifiedChinese = "简"; // 同上，但兩處均不建議更改
var translateButtonId = "translateLink1"; // 預設互換id
translateInitilization();

function enterKey(){
  if (event.keyCode == 13) {
    location.href='main_search.php?keyword='+$('#search').val();
  }
}

// ================ slick 輪撥設定 (RWD)
// $('.responsive_case').slick({
//   dots: true,
//   arrows: true,
//   draggable: true,
//   infinite: true,
//   touchMove: true,
//   // useCSS: true,
//   speed: 1000,
//   slidesToShow: 3,
//   slidesToScroll: 3,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   responsive: [
//     {
//       breakpoint: 992,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 3,
//       }
//     },
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//       }
//     },
//     {
//       breakpoint: 576,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//   ]
// });
// You can unslick at a given breakpoint now by adding:
// settings: "unslick"
// instead of a settings object

// ================ AOS 轉場動畫設定
// 網址：https://michalsnik.github.io/aos/
// <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
// <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
AOS.init({
    easing: 'ease-out-back',
    duration: 1500
});

// ================ WOW 轉場動畫設定
// 網址：https://wowjs.uk/
// wow.min.js
// const wow = new WOW({
//   boxClass: 'wow',          // animated element css class (default is wow)
//   animateClass: 'animated', // animation css class (default is animated)
//   offset: 120,              // distance to the element when triggering the animation (default is 0)
//   mobile: false,            // trigger animations on mobile devices (default is true)
//   live: true                // act on asynchronously loaded content (default is true)
// });
// wow.init();

// ================ css animate動畫
// 網址：https://animate.style/#attention_seekers

// ================ 數字滾動動畫
/*
<script src="js/jquery.numscroll.js" type="text/javascript" charset="utf-8"></script>
默認寫法:
<span class="num">888888</span>
推薦寫法:
<span class="num2" data-num="888888"></span>
*/

// $(".num").numScroll({
//     'number': 888888,
//     'time': 1500,
//     'delay': 0,
//     'symbol':true
// });

// ================ Bootstrap 頁籤點擊，置錨點頁面
/*
<ul class="nav nav-tabs" id="myTab" role="tablist">
	<li class="nav-item"><a class="nav-link active" id="file-tab" data-toggle="tab" href="#file" role="tab" aria-controls="file" aria-selected="true">馬來西亞小檔案</a></li>
	<li class="nav-item"><a class="nav-link" id="attractions-tab" data-toggle="tab" href="#attractions" role="tab" aria-controls="attractions" aria-selected="false">馬來西亞景點介紹</a></li>
	<li class="nav-item"><a class="nav-link" id="hotel-tab" data-toggle="tab" href="#hotel" role="tab" aria-controls="hotel" aria-selected="false">馬來西亞飯店介紹</a></li>
	<li class="nav-item"><a class="nav-link" id="food-tab" data-toggle="tab" href="#food" role="tab" aria-controls="food" aria-selected="false">馬來西亞美食推薦</a></li>
</ul>
*/
// 標籤頁的點擊切換
$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
// 判斷a頁面中是哪個tab標籤頁的more跳過來的
let ur=location.href;
let type=ur.split('?')[1].split("=")[1];
switch (type){
  case 'file':
      $('#myTab a[href="#file"]').tab('show')
      break;
  case 'worldheritage':
      $('#myTab a[href="#worldheritage"]').tab('show')
      break;
  case 'attractions':
      $('#myTab a[href="#attractions"]').tab('show')
      break;
  case 'hotel':
      $('#myTab a[href="#hotel"]').tab('show')
      break;
  case 'food':
      $('#myTab a[href="#food"]').tab('show')
      break;
}

// ================ mobile nav
/*
<script src="js/classie.js"></script>
<script src="js/gnmenu.js"></script>
*/
// new gnMenu(document.getElementById('gn-menu'));


// ================ mobile nav
// Responsive Single-level Dropdown Menu With JavaScript
// https://www.cssscript.com/tag/dropdown-menu/
// rwd_nav.js


// ================ 圖表繪製

/*
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js"></script>
圖表類型：li|ne、bar、radar、polarArea、pie、doughnut、bubble

<script>
var ctx = document.getElementById('man').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar', // 圖表類型
    data: {
        labels: ['項目1', '項目2', '項目3', '項目4', '項目5'], // 標題
        datasets: [{
            backgroundColor: [ // 背景色
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'

            ],
            borderColor: [ // 外框顏色景色
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1, // 外框寬度
            label: '標題名稱', // 標籤
            data: [5, 10, 3, 5, 2], // 資料(5項目,5資料 )
            borderRadius: 5, // 圓角
        }]
    },
});
</script>
*/
