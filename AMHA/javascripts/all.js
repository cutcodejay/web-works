

// ================ Admin Aside 左側選單收放
const Content = document.querySelector('#AdminContent')
const Aside = document.querySelector('#Admin__Aside')
const AsideBtn = document.querySelector('#asideBtn')
AsideBtn.addEventListener('click', (e) => {
  // e.preventDefault();
  Content.classList.toggle('noAside')
  Aside.classList.toggle('noAside')
})

Aside.addEventListener('click', (e) => {
  // e.preventDefault();
  if(e.target.closest('li')) {
    let aRemove = document.querySelectorAll('#Admin__Aside li')
    aRemove.forEach(item => item.classList.remove('active'))
    e.target.closest('li').classList.toggle('active');
  }
})

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

