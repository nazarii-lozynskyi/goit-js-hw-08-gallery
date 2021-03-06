const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  gallery: document.querySelector('.gallery'),
  wrapper: document.querySelector('.lightbox'),
  backdrop: document.querySelector('.lightbox__overlay'),
  wrapperContent: document.querySelector('.lightbox__content'),
  wrapperImg: document.querySelector('.lightbox__image'),
  closeWrapperButton: document.querySelector('.lightbox__button'),
};

/*Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.*/

const galleryItemsMarkup = createElGalleryMarkup(galleryItems);
refs.gallery.insertAdjacentHTML('beforeend', galleryItemsMarkup);

function createElGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class = "gallery__item">
      <a
        class = "gallery__link"
        href = ${original}
      >
        <img
          loading="lazy"
          class = "gallery__image"
          src = "${preview}"
          data-source = "${original}"
          alt = "${description}"
        />
      </a>
    </li>
    `;
    })
    .join('');
}

/* Реализация делегирования на галерее ul.js-gallery и получение url большого изображения */

refs.gallery.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(evt) {
  /*  Отмена действия по умолчанию при клике на ссылку */
  evt.preventDefault();
  /* ****** */

  const isGalleryEl = evt.target.classList.contains('gallery__image');
  if (!isGalleryEl) {
    return;
  }

  /* Открытие модального окна по клику на элементе галереи. */
  window.addEventListener('keydown', onEscPress);
  refs.wrapper.classList.add('is-open');

  /* Подмена значения атрибута src, alt элемента img.lightbox__image. */
  refs.wrapperImg.src = evt.target.dataset.source;
  refs.wrapperImg.alt = evt.target.alt;
  console.log(evt.target.dataset.source);
  console.log(evt.target.alt);
}

/* Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. */

refs.closeWrapperButton.addEventListener('click', onCloseWrapper);

function onCloseWrapper() {
  refs.wrapper.classList.remove('is-open');
  window.removeEventListener('keydown', onEscPress);

  /* Очистка значения атрибута src элемента img.lightbox__image. */
  refs.wrapperImg.src = '';
}

/* Закрытие модального окна по клику на div.lightbox__overlay. */

refs.backdrop.addEventListener('click', onBackdropClick);

function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseWrapper();
  }
}

/* Закрытие модального окна по нажатию клавиши ESC. */

function onEscPress(evt) {
  const ESC_KEY_CODE = 'Escape';

  if (evt.code === ESC_KEY_CODE) {
    onCloseWrapper();
  }
  //console.log(evt);
}

/* Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо". */
let arr = [];
for (let child of refs.gallery.children) {
  //console.log(child.previousElementSibling);
  arr.push(child);

  //console.log(child.querySelector('.gallery__image').dataset.source);
}
console.log(arr[0]);

// console.log(refs.gallery.firstElementChild);
// console.log(refs.gallery.lastElementChild);
