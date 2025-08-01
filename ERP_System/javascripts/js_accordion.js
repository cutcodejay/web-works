// 獲取所有的手風琴項
const accordionItems = document.querySelectorAll('.accordion-item');

// 為每個手風琴項添加點擊事件監聽器
accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  header.addEventListener('click', () => {
    // 如果當前項已經是打開狀態，則將其關閉
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    }
    // 如果當前項是關閉狀態，則將其打開，並關閉其他項
    else {
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      item.classList.add('active');
    }
  });
});


// // 獲取所有的手風琴項
// const accordionItems = document.querySelectorAll('.accordion-item');

// // 當前展開項目的索引
// let activeIndex = localStorage.getItem('activeAccordionIndex');
// if (activeIndex !== null) {
//   activeIndex = parseInt(activeIndex);
// }

// // 為每個手風琴項添加點擊事件監聽器
// accordionItems.forEach((item, index) => {
//   const header = item.querySelector('.accordion-header');
//   header.addEventListener('click', (e) => {
//     // 如果當前項已經是打開狀態，則將其關閉
//     if (item.classList.contains('active')) {
//       item.classList.remove('active');
//       localStorage.removeItem('activeAccordionIndex'); // 移除本地存儲中的狀態
//     }
//     // 如果當前項是關閉狀態，則將其打開，並關閉其他項
//     else {
//       accordionItems.forEach((otherItem) => {
//         otherItem.classList.remove('active');
//       });
//       item.classList.add('active');
//       localStorage.setItem('activeAccordionIndex', index); // 將當前索引存入本地存儲
//     }
//   });

//   // 根據本地存儲的索引來設置初始狀態
//   if (activeIndex === index) {
//     item.classList.add('active');
//   }
// });
