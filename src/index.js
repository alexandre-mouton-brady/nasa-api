import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import './style.css';

const metaInfo = [];

function positionImages() {
  const grid = document.querySelector('.grid');

  const msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
  });

  imagesLoaded(grid).on('progress', () => {
    msnry.layout();
  });
}

function toggleInfo() {
  const meta = document.querySelector('.meta');
  const blur = document.querySelector('.blur');
  if (!meta.classList.contains('show') && !blur.classList.contains('active')) {
    meta.classList.add('show');
    blur.classList.add('active');
    const id = this.dataset.id;
    const description = document.querySelector('.description');
    const title = document.querySelector('.title');
    const copy = document.querySelector('.copyright');
    const link = document.querySelector('.link-hd');

    metaInfo.forEach((info) => {
      if (id === info.date) {
        title.innerHTML = info.title;
        link.setAttribute('href', info.hdurl);
        description.innerHTML = info.explanation;
        if (info.copyright !== undefined) {
          copy.innerHTML = info.copyright;
        } else {
          copy.innerHTML = '';
        }
      }
    });
  } else {
    meta.classList.remove('show');
    blur.classList.remove('active');
  }
}

function fetchImage(grid) {
  let i = 0;

  // @TODO: make each month an object and add the number of day per month v

  const Months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];

  for (i = 0; i < 10; i += 1) {
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = date.getMonth();
    let day = date.getDate() - i;
    const numberDigit = (Math.log(day) * Math.LOG10E) + 1 || 0;

    if (numberDigit < 2) {
      day = `0${day}`;
    }

    const fullDate = `${year}-${Months[month]}-${day}`;

    fetch(`https://api.nasa.gov/planetary/apod?date=${fullDate}&hd=false&api_key=xPjrLiMda2CmzGJ5AWjM61kI7MOuJKZc2ioRuqVm`)
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((data) => {
              metaInfo.push(data);

              const img = document.createElement('img');
              img.setAttribute('src', data.url);
              img.setAttribute('class', 'image');

              const div = document.createElement('div');
              div.setAttribute('class', 'grid-item');
              div.setAttribute('data-id', data.date);
              div.addEventListener('click', toggleInfo);

              div.appendChild(img);
              grid.appendChild(div);
            })
            .then(positionImages);
        }
      });
  }
}

function main() {
  const grid = document.querySelector('.grid');
  const quit = document.querySelector('.quit');
  const blur = document.querySelector('.blur');
  quit.addEventListener('click', toggleInfo);
  blur.addEventListener('click', toggleInfo);

  fetchImage(grid, metaInfo);
}

main();
