window.onload = () => {
  setTimeout(fetchDataset, 1000);
};

const fetchDataset = () => {
  fetch(`${window.location.href}dataset.json`)
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
  showLessons(lessons);
  showFooter(content);

  toggleClass('content', 'visibility-hidden');
  toggleClass('content', 'fade-in');
};

const showError = (error) => {
  console.error(error);

  toggleClass('loading', 'dn');
  toggleClass('error', 'dn');
};

const showFooter = (content) => {
  notReactDOM.render(
    /* html */ `<div class="b--black-10 bg-light-gray bt bw1">
      <div class="center mw-px-600">
      <div class="ph3 pv4 tc">
          <p class="mb4 mt0">${content.footer_title}</p>
          <div class="img-overlay">
            <img src="${content.footer_image}" alt="${content.footer_image_alt}" class="db w-100" />
          </div>
        </div>
      </div>
    </div>`,
    document.getElementById('footer')
  );
};

const showHeader = (content) => {
  notReactDOM.render(
    /* html */ `<div class="b--black-10 bg-main bb bw1">
      <div class="center mw-px-600">
        <div class="ph3 pv4 text-shadow-1">
          <div class="tc">
            <h1 class="f2 mb4 mt0 normal white">${content.header_title}</h1>
            <h2 class="f3 mv0 normal white-70">${content.header_subtitle}</h2>
          </div>
        </div>
      </div>
    </div>`,
    document.getElementById('header')
  );
};

const showLessons = (lessons) => {
  notReactDOM.render(
    lessons
      .map((lesson) => {
        const { name, date, description, summary, multimedia, resources } = lesson;

        return /* html */ `<div class="mt4 pt4">
          <h4 class="mb4 mt0">${name} - ${date}</h4>
          <div class="ml4">
            <p class="mb3 mt0">
              <em>${description}</em>
            </p>
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
          </div>
        </div>`;
      })
      .join(''),
    document.getElementById('lessons')
  );
};

const showProgress = (content, lessonsLength) => {
  const lessons_amount = content.total_lessons;
  const percentage = Number((lessonsLength * 100) / lessons_amount).toFixed(2);
  const percentageAsString = percentage.toString().replace('.', ',');

  notReactDOM.render(
    /* html */ `<div class="mt4">
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
      </div>
    </div>`,
    document.getElementById('progress')
  );
};

const toggleClass = (id, cssClass) => {
  document.getElementById(id).classList.toggle(cssClass);
};
