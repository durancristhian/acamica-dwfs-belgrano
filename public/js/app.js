var drone;

window.onload = () => {
  setTimeout(fetchDataset, 1000);
};

const fetchDataset = () => {
  fetch(`${window.location.origin}/dataset.json`)
    .then((response) => response.json())
    .then((dataset) => ({
      lessons: dataset.lessons,
      content: dataset.content[0],
      styles: dataset.styles[0]
    }))
    .then(showContent)
    .catch(showError);
};

const notReactDOM = {
  render(h, e) {
    e.innerHTML = h;
  }
};

const setDocumentProperty = (cssVariable, cssVariableValue) => {
  document.documentElement.style.setProperty(cssVariable, cssVariableValue);
};

const showContent = ({ lessons, content, styles }) => {
  setDocumentProperty('--main-color', styles.main_color);
  toggleClass('loading', 'dn');

  showHeader(content);
  showProgress(content, lessons.length);
  showBaseProject();
  showLessons(lessons);
  showStudents();
  showFooter(content);

  toggleClass('content', 'visibility-hidden');
  toggleClass('content', 'fade-in');

  drone = document.getElementById('drone');
  document.getElementById('header').addEventListener('mousemove', moveDrone);
};

const moveDrone = (event) => {
  const { pageX, pageY } = event;

  drone.style.left = `${pageX - 75}px`;
  drone.style.top = `${pageY < 385 ? pageY - 30 : 385}px`;
};

const showBaseProject = () => {
  notReactDOM.render(
    /* html */ `<h3 class="mv5 silver tc ttu">✅ Proyecto base con Node.js</h3>
      <p class="black-70 mb3 mt0">
        <em>En el siguiente link encontrarás una carpeta con un proyecto de Node.js básico ya configurado para tener un servidor local y desarrollar en un entorno prolijo luego de que instales las dependencias. <strong>No te olvides de leer el archivo README.md para entender cuales son las instrucciones para hacer funcionar todo</strong>. Happy coding!.</em>
      </p>
      <div class="tc">
        <a href="https://drive.google.com/open?id=1E5tg2MGZ5grHZWDffiSAqKWsHWpkVfwu" target="_blank" rel="noopener noreferrer" class="b--black-20 ba bg-main bw1 dib f4 link ph4 pv3 text-shadow-1 ttu white">Descargar</a>
      </div>
    `,
    document.getElementById('base-project')
  );
};

const showError = (error) => {
  console.error(error);

  toggleClass('loading', 'dn');
  toggleClass('error', 'dn');
};

const showFooter = (content) => {
  notReactDOM.render(
    /* html */ `<div class="b--black-10 bg-white bt bw1">
      <div class="center mw-px-600">
      <div class="ph3 pv4 tc">
          <p class="mb4 mt0">${content.footer_title}</p>
          <img src="${content.footer_image}" alt="${content.footer_image_alt}" class="db w-100" />
        </div>
      </div>
    </div>`,
    document.getElementById('footer')
  );
};

const showHeader = (content) => {
  notReactDOM.render(
    /* html */ `<div class="b--black-10 bg-main bb bw1 flex items-center justify-center relative vh-50">
      <div class="absolute h-100 left-0 top-0 w-100 z-1">
        <div id="drone"></div>
        <div id="pilot"></div>
      </div>
      <div class="center mw-px-600 relative z-2">
        <div class="ph3 pv4 text-shadow-1">
          <div class="tc">
            <h1 class="mb4 mt0 normal white">${content.header_title}</h1>
            <h2 class="mv0 normal white-70">${content.header_subtitle}</h2>
          </div>
        </div>
      </div>
    </div>`,
    document.getElementById('header')
  );
};

const showLessons = (lessons) => {
  notReactDOM.render(
    `<h3 class="mv5 silver tc ttu">Resúmenes 🤩</h3>
    ${lessons
      .map((lesson) => {
        const { name, date, description, summary, multimedia, resources, picture } = lesson;

        return /* html */ `<div class="b--black-10 ba bg-white bw1 mv5 pa4">
          <h4 class="mb4 mt0 tc">${name} - ${date}</h4>
          <p class="black-70 mb3 mt0">
            <em>${description}</em>
          </p>
          ${
            picture
              ? /* html */ `<div class="mb3 pt2">
                  <img src="${picture}" class="db w-100" />
                </div>`
              : ''
          }
          <ul class="list mv0 pl0">
            <li>
              <a
                href="${summary}"
                target="_blank"
                class="color-main dib emoji-link pv2"
              >Resumen</a>
            </li>
            <li class="${multimedia ? 'db' : 'dn'}">
              <a
                href="${multimedia}"
                target="_blank"
                class="color-main dib emoji-multimedia pv2"
              >Fotos y Videos</a>
            </li>
            <li class="${resources ? 'db' : 'dn'}">
              <a
                href="${resources}"
                target="_blank"
                class="color-main dib emoji-resources pv2"
              >Recursos usados en clase</a>
            </li>
          </ul>
        </div>`;
      })
      .join('')}`,
    document.getElementById('lessons')
  );
};

const showProgress = (content, lessonsLength) => {
  const lessons_amount = content.total_lessons;
  const percentage = Number((lessonsLength * 100) / lessons_amount).toFixed(2);
  const percentageAsString = percentage.toString().replace('.', ',');

  notReactDOM.render(
    /* html */ `<h3 class="mv5 silver tc ttu">Información general 🤓</h3>
    <h4 class="mv0">
      Progreso del curso:
      <span class="color-main">${percentageAsString}%</span>, ${lessonsLength} clases de ${lessons_amount}
    </h4>
    <div class="b--black-20 ba bg-light-gray bw1 mt5 relative">
      <div class="absolute progress-emoji rotate-x top-0" style="left: calc(${percentage}% - (var(--icon-size) / 2.5));">
        🏃
      </div>
      <div class="absolute progress-emoji progress-emoji-medal top-0" style="right: calc(-1.25 * (var(--icon-size) / 2));">🎖</div>
      <div class="bg-main h2" style="width: ${percentage}%;" />
    </div>`,
    document.getElementById('progress')
  );
};

const showStudents = () => {
  const students = [
    {
      firstName: 'Diego',
      lastName: 'Feresin',
      video: 'diego-feresin'
    },
    {
      firstName: 'Esteban',
      lastName: 'Yañez',
      video: 'esteban-yañez'
    },
    {
      firstName: 'Guido',
      lastName: 'Galanternik',
      video: 'guido-galanternik'
    },
    {
      firstName: 'Gustavo',
      lastName: 'Malamud',
      video: 'gustavo-malamud'
    },
    {
      firstName: 'Juan Ignacio',
      lastName: 'Tabarez',
      video: 'juan-ignacio-tabarez'
    },
    {
      firstName: 'Lu',
      lastName: 'Godoy',
      video: 'lu-godoy'
    },
    {
      firstName: 'Mariano',
      lastName: 'Lazzarini',
      video: 'mariano-lazzarini'
    },
    {
      firstName: 'Matias',
      lastName: 'De Bonis',
      video: 'matias-de-bonis'
    },
    {
      firstName: 'Sebastián',
      lastName: 'Villanueva',
      video: 'sebastian-villanueva'
    }
  ];

  notReactDOM.render(
    /* html */ `<h3 class="mv5 silver tc ttu">¡Hay equipo! 💪🏼</h3>
    <div class="center mw-px-400">
      ${students
        .map(
          (student) => /* html */ `<div class="mv5">
            <div class="overlay">
              <p class="overlay-text">
                <span>${student.firstName}</span>
                <br />
                <strong>${student.lastName}</strong>
              </p>
              <video
                src="/assets/videos/${student.video}.mp4"
                loop
                muted
                class="db w-100"
                onmouseover="this.play();"
                onmouseleave="this.pause(); this.currentTime = 0;">
              </video>
            </div>
          </div>`
        )
        .join('')}
      </div>`,
    document.getElementById('students')
  );
};

const toggleClass = (id, cssClass) => {
  document.getElementById(id).classList.toggle(cssClass);
};
