const tabs = document.querySelectorAll('.tabblock__item');

if (tabs.length > 0) {
  const tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabblock__items');

  function hideTabcontent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show');
    });

    tabs.forEach((item) => {
      item.classList.remove('tabblock__item_active');
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabblock__item_active');
  }

  hideTabcontent();
  showTabContent(0);

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabblock__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabcontent();
          showTabContent(i);
        }
      });
    }
  });
}


const goTopBtn = document.querySelector('.go-top');
if (goTopBtn !== null) {
  goTopBtn.addEventListener('click', goTop);
  window.addEventListener('scroll', trackScroll);

  function trackScroll() {
    const offSet = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    if (offSet > coords) {
      goTopBtn.classList.add('go-top--show');
    } else {
      goTopBtn.classList.remove('go-top--show');
    }
  }

  function goTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -15);
      setTimeout(goTop, 0);
    }
  }
}
const swiperHome = document.querySelector('.home-slider');

if (swiperHome !== null) {
  new Swiper(swiperHome, {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
      el: '.home-slider__pagination',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        let allTotal = total >= 10 ? total : `0${total}`;
        let currentSlide = current >= 10 ? current : `0${current}`;
        return `<b>${currentSlide}</b><span></span> ${allTotal}`;
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
}

const sliderHeading = document.querySelectorAll('.home__slider-title');
if (sliderHeading !== null) {
  sliderHeading.forEach((item) => {
    let textHeading = item.innerText.split(' ');
    let first = textHeading.shift();
    item.innerHTML = `${first} <br/> <span>${textHeading.join(' ')}</span>`;
  });
}

const swiperPartners = document.querySelector('.swiper__partners');
if (swiperPartners !== null) {
  const swiperPartners = new Swiper('.swiper__partners', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 15,
      },

      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });
}

const swiperBlog = document.querySelector('.swiper-blog');
if (swiperBlog !== null) {
  const swiperBlog = new Swiper('.swiper-blog', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
    pagination: {
      el: document.querySelector('.swiper-pagination__blog'),
      clickable: true,
    },
  });
}

const swiper = document.querySelector('.mySwiper');
if (swiper !== null) {
  new Swiper(swiper, {
    spaceBetween: 5,
    slidesPerView: 8,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper('.mySwiper2', {
    spaceBetween: 5,

    thumbs: {
      swiper: swiper,
    },
  });
}


const form = document.querySelector('.map__form');
const tel = document.querySelector('input[type = "tel"]')
const inputMaskTel = new Inputmask('+380 (99) 999-99-99');
const TOKEN = '6678647392:AAGSvx3Bm_8vmFocJK6l1caO9_VbhNO36rk';
const CHAT_ID = "-1001740011161";
const URI_APi = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;
const success = document.getElementById('success')

if (form !== null) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    let message = `<b>Заявка с сайта</b>\n`;
    message += `<b>Имя:</b> ${this.name.value}\n`;
    message += `<b>Номер:</b> ${this.tel.value}\n`;
    message += `<b>Сообщение:</b> ${this.text.value}`

    axios.post(URI_APi, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message
    })
    .then((res) => {
      this.name.value = ""
      this.tel.value = ""
      this.text.value = ""
      success.innerHTML = "Спасибо Толик, сейчас посмотрю :)"
      success.style.display = "block"
    })
    .catch((err) => {
      console.warn(err)
    })
    .finally(() => {
      console.log('end')
    })

    // const name = event.target.name.value;
    // const tel = event.target.tel.value;
    // const text = event.target.text.value;
    // const userData = {
    //   name,
    //   tel,
    //   text,
    // };
    // const userDataJson = JSON.stringify(userData);
    // const formData = new FormData(form)
    
  });
}
inputMaskTel.mask(tel)

const validation = new JustValidate('form', {
  tooltip: {
    position: 'top',
  },
  
});

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage : 'Введите имя',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage : 'Минимум 3 символа',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage : 'Максимум 30 символов',
    }
    
  ])
